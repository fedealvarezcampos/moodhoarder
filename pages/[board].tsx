import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { supabase } from '../lib/supabaseClient';
import Head from 'next/head';
import Image from 'next/image';
import Gallery from '../components/Gallery';
import styles from '../styles/Home.module.css';

export interface Boards {
    uuid: string;
    images: string[] | undefined;
}

const Home: NextPage = () => {
    const router = useRouter();
    const { board: boardID }: any = router.query;

    const [board, setBoard] = useState<any>([]);

    const getBoard = async () => {
        try {
            const { data, error } = await supabase
                .from<Boards>('boards')
                .select('images')
                .in('uuid', [boardID]);

            if (error) {
                throw error;
            }

            setBoard(data);
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

            <Gallery gallery={board[0]?.images} boardID={boardID} />
        </>
        // </div>
    );
};

export default Home;