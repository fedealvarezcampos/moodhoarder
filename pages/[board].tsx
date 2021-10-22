import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { supabase } from '../lib/supabaseClient';
import Head from 'next/head';
import { supabaseHost } from '../lib/constants';
import Gallery from '../components/Gallery';
// import styles from '../styles/Home.module.css';

export interface Boards {
    uuid: any;
    images: string[] | undefined;
}

// export async function getServerSideProps(context: any) {
//     // const router = useRouter();
//     const boardID: any = context.params.board;

//     let placeHolders: string[] = [];

//     const { data, error }: any = await supabase.from<Boards>('boards').select('images').in('uuid', [boardID]);

//     if (error) {
//         throw error;
//     }

//     const images = data[0]?.images;

//     for (const image of images) {
//         const { base64 } = await getPlaiceholder(supabaseHost + image, { size: 10 });

//         placeHolders?.push(base64);
//     }

//     console.log(placeHolders);

//     // setBoard(data);

//     return {
//         props: {
//             data,
//             placeHolders,
//         },
//     };
// }

const Home: NextPage = () => {
    const router = useRouter();
    const { board: boardID }: any = router.query;

    const [board, setBoard] = useState<any>([]);
    let placeHolders: string[] = [];

    const getBoard = async () => {
        try {
            const { data, error }: any = await supabase
                .from<Boards>('boards')
                .select('images')
                .in('uuid', [boardID]);

            if (error) {
                throw error;
            }

            const images = data[0]?.images;

            setBoard(images);
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

            <Gallery gallery={board} boardID={boardID} />
        </>
        // </div>
    );
};

export default Home;
