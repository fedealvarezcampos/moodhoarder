import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { supabaseHost } from '../lib/constants';
import { motion } from 'framer-motion';
import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft';
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight';
import { useClosingKey, useNavKey } from '../helpers/useKeys';
import Spinner from '../assets/spinner';
import styles from '../styles/BoardBrowser.module.css';

interface BoardBrowser {
	image: string | undefined;
	images: string[];
	setBoardNav: Dispatch<SetStateAction<boolean>>;
	imageKey: number;
	setImageKey: Dispatch<SetStateAction<number>>;
}

function BoardBrowser({ image, images, setBoardNav, setImageKey, imageKey }: BoardBrowser) {
	useNavKey(imageKey, setImageKey, images?.length);
	useClosingKey('Escape', true, setBoardNav);

	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<>
			<motion.div
				initial={{ y: -30, opacity: 0, zIndex: 3 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ opacity: 0, zIndex: 3 }}
				className={styles.navigation}
			>
				{imageKey !== 0 && (
					<button onClick={() => setImageKey(imageKey - 1)}>
						<AiFillCaretLeft />
					</button>
				)}
				{images?.length !== imageKey + 1 && (
					<button onClick={() => setImageKey(imageKey + 1)}>
						<AiFillCaretRight />
					</button>
				)}
			</motion.div>
			<motion.div
				initial={{ y: -30, opacity: 0, zIndex: 3 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ opacity: 0, zIndex: 3 }}
				transition={{
					duration: 0.3,
				}}
				className={styles.boardNavContainer}
			>
				{!imageLoaded && <Spinner />}
				<div className={styles.imageContainer}>
					<Image
						src={supabaseHost + image}
						layout="fill"
						alt="image in board"
						quality={85}
						placeholder="blur"
						onLoad={() => setImageLoaded(true)}
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
						className={styles.imageComponent}
					/>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				className={styles.modalBG}
				onClick={() => setBoardNav(false)}
			/>
		</>
	);
}

export default BoardBrowser;
