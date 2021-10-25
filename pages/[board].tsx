import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { supabase } from '../lib/supabaseClient';
import Gallery from '../components/Gallery';
import Head from 'next/head';
import { useSession } from '../context/SessionContext';
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

    const getBoard = async () => {
        try {
            const { data, error }: any = await supabase
                .from<Boards>('boards')
                .select('images')
                .in('uuid', [boardID]);

            if (error) throw error;

            const images = data[0]?.images;
            setBoard(images);
            setImages([]);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const deleteBoard = async () => {
        try {
            const { data, error }: any = await supabase
                .from<Boards>('boards')
                .delete()
                .match({ uuid: boardID });

            if (error) throw error;
            else {
                const { error } = await supabase.storage.from('boards').remove(board);
                if (error) throw error;
            }

            notifyMessage('Board deleted!');
        } catch (error: any) {
            console.log(error.message);
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
                <title>moodhoarder | your moodboard</title>
            </Head>

            {user && <button onClick={() => deleteBoard()}>Delete this board</button>}
            <Gallery board={board} boardID={boardID} items={images} setItems={setImages} />
        </>
    );
};

export default Home;
