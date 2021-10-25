import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { stagger } from '../styles/framer';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import BoardPreview from '../components/BoardPreview';
import Head from 'next/head';
import styles from '../styles/myboards.module.css';

const MyBoards: NextPage = () => {
    const user = supabase.auth.user();

    const [myBoards, setMyBoards] = useState<any>();

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

    useEffect(() => {
        user && getBoards();
    }, [user]);

    return (
        <>
            <Head>
                <title>moodhoarder | my boards</title>
            </Head>

            {myBoards && myBoards?.length !== 0 ? (
                <div className={styles.pageTitle}>These are all your saved boards</div>
            ) : (
                <div className={styles.pageTitle}>Your boards would be here... if you had any.</div>
            )}
            {myBoards && (
                <motion.ul
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className={styles.boardsContainer}
                >
                    {myBoards?.map((item: any) => (
                        <BoardPreview boardItem={item} key={item?.id} />
                    ))}
                </motion.ul>
            )}
        </>
    );
};

export default MyBoards;
