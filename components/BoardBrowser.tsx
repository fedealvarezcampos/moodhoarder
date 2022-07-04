import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { supabaseHost } from '../lib/constants';
import { motion } from 'framer-motion';
import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft';
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight';
import { useClosingKey, useNavKey } from '../helpers/useKeys';
import Spinner from './common/spinner';
import styles from '../styles/BoardBrowser.module.css';

interface BoardBrowser {
	images: string[];
	setBoardNav: Dispatch<SetStateAction<boolean>>;
	imageKey: number;
	setImageKey: Dispatch<SetStateAction<number>>;
}

function BoardBrowser({ images, setBoardNav, setImageKey, imageKey }: BoardBrowser) {
	const [isImageLoading, setImageLoading] = useState(false);
	const [isGalleryFirstLoad, setGalleryFirstLoad] = useState(false);

	const goToPrevImage = (imageKey: number) => {
		setImageKey(imageKey - 1);
		setImageLoading(true);
	};

	const goToNextImage = (imageKey: number) => {
		setImageKey(imageKey + 1);
		setImageLoading(true);
	};

	useNavKey(goToPrevImage, goToNextImage, imageKey, images?.length);
	useClosingKey('Escape', true, setBoardNav);

	useEffect(() => {
		setImageLoading(true);
		setGalleryFirstLoad(true);
	}, []);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, zIndex: 3 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, zIndex: 3 }}
				className={styles.navigation}
			>
				{imageKey !== 0 && (
					<button onClick={() => goToPrevImage(imageKey)}>
						<AiFillCaretLeft />
					</button>
				)}
				{images?.length !== imageKey + 1 && (
					<button onClick={() => goToNextImage(imageKey)}>
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
				<div
					className={`${styles.imageContainer} ${isGalleryFirstLoad ? styles.firstLoad : ''} ${
						isImageLoading ? styles.loading : styles.loaded
					}`}
				>
					{isGalleryFirstLoad && <Spinner />}
					<Image
						src={supabaseHost + images[imageKey]}
						layout="fill"
						alt="image in board"
						quality={85}
						placeholder="blur"
						onLoad={() => {
							setGalleryFirstLoad(false);
							setImageLoading(false);
						}}
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
						className={isImageLoading ? styles.imageLoading : styles.imageLoaded}
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
