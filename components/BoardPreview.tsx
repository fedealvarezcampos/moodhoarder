import styles from '../styles/BoardPreview.module.css';
import { supabaseHost } from '../lib/constants';
import { boardItemAnimation } from '../styles/framer';
import { motion } from 'framer-motion';
import { Board } from '../pages/myboards';
import Image from 'next/image';
import Link from 'next/link';

export interface boardPreview {
	boardItem: Board;
}
[];

function BoardPreview({ boardItem }: boardPreview) {
	return (
		<Link href={'/' + boardItem?.uuid} passHref>
			<motion.li
				whileHover={{ scale: 1.05, cursor: 'pointer', backgroundColor: 'var(--pink)' }}
				whileTap={{ scale: 1.02 }}
				variants={boardItemAnimation}
				className={styles.boardItemContainer}
				key={boardItem?.id}
			>
				<div className={styles.imageContainer}>
					<Image
						src={supabaseHost + boardItem?.images[0]}
						layout="fill"
						objectFit="cover"
						alt="image in board"
						quality={35}
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
					/>
				</div>
				<div className={styles.boardTitle}>{boardItem?.board_title || 'untitled'} </div>
			</motion.li>
		</Link>
	);
}

export default BoardPreview;
