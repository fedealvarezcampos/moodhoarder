import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { supabase } from '../lib/supabaseClient';
import Gallery from '../components/Gallery';
import Head from 'next/head';

export interface Boards {
    uuid: any;
    images: string[] | undefined;
}

const Home: NextPage = ({ images, setImages }: any) => {
    const router = useRouter();
    const { board: boardID }: any = router.query;

    const user = supabase.auth.user();

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

            console.log(data);

            if (error) throw error;
            else {
                const { error } = await supabase.storage.from('boards').remove(board);
                if (error) throw error;
            }

            router.push('/');
        } catch (error: any) {
            console.log(error.message);
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
