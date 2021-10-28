import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useSession } from '../context/SessionContext';
import { supabase } from '../lib/supabaseClient';
import { notifyError, notifyMessage } from '../assets/toasts';
import { AnimatePresence } from 'framer-motion';
import Spinner from '../assets/spinner';
import Gallery from '../components/Gallery';
import BoardBrowser from '../components/BoardBrowser';

export interface Boards {
    uuid: any;
    images: string[] | undefined;
}

const Home: NextPage = ({ images, setImages }: any) => {
    const session = useSession();
    const user = session?.user;

    const router = useRouter();
    const { board: boardID }: any = router.query;

    const [board, setBoard] = useState<any>([]);
    const [boardTitle, setBoardTitle] = useState<string>();
    const [deleteButtonLabel, setDeleteButtonLabel] = useState<string>('Delete this board');
    const [boardNav, setBoardNav] = useState<boolean>(false);
    const [selectedPic, setSelectedPic] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const getBoard = async () => {
        try {
            setLoading(true);

            const { data, error }: any = await supabase
                .from<Boards>('boards')
                .select('images, board_title')
                .in('uuid', [boardID]);

            if (error) throw error;

            const images = data[0]?.images;
            setBoardTitle(data[0]?.board_title);
            setBoard(images);
            setImages([]);
        } catch (error: any) {
            notifyError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSelected = (img: string) => {
        setSelectedPic(img);
        setBoardNav(true);
    };

    const deleteBoard = async () => {
        try {
            setDeleteButtonLabel('Deleting...');

            const { error }: any = await supabase.from<Boards>('boards').delete().match({ uuid: boardID });

            if (error) throw error;
            else {
                const { error } = await supabase.storage.from('boards').remove(board);
                if (error) throw error;
            }

            notifyMessage('Board deleted!');
        } catch (error: any) {
            notifyError(error.message);
        } finally {
            router.push('/');
        }
    };

    useEffect(() => {
        boardID && getBoard();
    }, [boardID]);

    return (
        <>
            <Head>
                <title>moodhoarder{boardTitle && ` | ${boardTitle}`}</title>
            </Head>

            {user && (
                <button aria-label="delete board button" onClick={() => deleteBoard()}>
                    {deleteButtonLabel}
                </button>
            )}
            <AnimatePresence>
                {boardNav && <BoardBrowser key="boardNav" image={selectedPic} setBoardNav={setBoardNav} />}
            </AnimatePresence>
            <Gallery
                board={board}
                boardID={boardID}
                items={images}
                setItems={setImages}
                handleSelected={handleSelected}
            />
            {loading && <Spinner />}
        </>
    );
};

export default Home;
