import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { useSession } from '../context/SessionContext';
import BoardPreview from '../components/BoardPreview';
import styles from '../styles/myboards.module.css';

const MyBoards: NextPage = () => {
    const session = useSession();
    const user = session?.user;

    const [myBoards, setMyBoards] = useState<any>([]);

    const getBoards = async () => {
        try {
            const { data, error }: any = await supabase
                .from('boards')
                .select('*')
                .in('owner_uid', [user?.id]);

            if (error) {
                throw error;
            }

            setMyBoards(data);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    console.log(user?.id);

    console.log(myBoards);

    useEffect(() => {
        user && getBoards();
    }, [user]);

    return (
        <>
            <Head>
                <title>moodhoarder | my boards</title>
            </Head>

            <div className={styles.pageTitle}>These are all your saved boards</div>
            <div className={styles.boardsContainer}>
                {myBoards?.map((item: any) => (
                    <BoardPreview boardItem={item} />
                ))}
            </div>
        </>
    );
};

export default MyBoards;
