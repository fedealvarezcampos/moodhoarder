import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { supabase } from '../lib/supabaseClient';
import { useSession } from '../context/SessionContext';
import Gallery from '../components/Gallery';
import { notifyError, notifyMessage } from '../assets/toasts';

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

    const getBoard = async () => {
        try {
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
        }
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
            <Gallery board={board} boardID={boardID} items={images} setItems={setImages} />
        </>
    );
};

export default Home;
