import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { stagger } from '../styles/framer';
import { useRouter } from 'next/dist/client/router';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { IoCaretDownOutline } from '@react-icons/all-files/io5/IoCaretDownOutline';
import { IoCaretUpOutline } from '@react-icons/all-files/io5/IoCaretUpOutline';
import { notifyError } from '../assets/toasts';
import Spinner from '../assets/spinner';
import BoardPreview from '../components/BoardPreview';
import styles from '../styles/myboards.module.css';

export interface Board {
	id: number;
	board_title: string;
	images: string[];
	uuid: string;
	owner_uid: string;
}

const MyBoards: NextPage = () => {
	const router = useRouter();
	const user = supabase.auth.user();

	const [myBoards, setMyBoards] = useState<Board[]>();
	const [order, setOrder] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);

	const getBoards = async (order: boolean) => {
		try {
			setLoading(true);

			const { data, error }: any = await supabase
				.from('boards')
				.select('id, board_title, images, uuid, owner_uid')
				.in('owner_uid', [user?.id])
				.order('created_at', { ascending: order });

			if (error) throw error;

			setMyBoards(data);
		} catch (error: any) {
			notifyError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!user) router.push('/');
		user && getBoards(order);
	}, [user, order]);

	return (
		<>
			<Head>
				<title>moodhoarder | my boards</title>
			</Head>

			{loading && <Spinner />}
			{myBoards && myBoards?.length !== 0 && !loading && (
				<>
					<motion.div
						initial={{ y: -30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className={styles.pageTitle}
					>
						These are all your saved boards
					</motion.div>
					<motion.button
						whileHover={{ y: -2 }}
						whileTap={{ y: -1 }}
						transition={{ duration: 0.2 }}
						className={styles.sortButton}
						onClick={() => setOrder(!order)}
					>
						{order ? (
							<span>
								<IoCaretDownOutline />
								Oldest to newest
							</span>
						) : (
							<span>
								<IoCaretUpOutline />
								Newest to oldest
							</span>
						)}
					</motion.button>
				</>
			)}
			{myBoards && myBoards?.length === 0 && !loading && (
				<motion.div
					initial={{ y: -30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className={styles.pageTitle}
				>
					Your boards would be here... if you had any.
				</motion.div>
			)}
			{myBoards && !loading && (
				<motion.ul
					initial="initial"
					animate="animate"
					variants={stagger}
					className={styles.boardsContainer}
				>
					{myBoards?.map((item: Board) => (
						<BoardPreview boardItem={item} key={item?.id} />
					))}
				</motion.ul>
			)}
		</>
	);
};

export default MyBoards;
