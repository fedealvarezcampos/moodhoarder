import styles from '../styles/BoardPreview.module.css';
import { supabaseHost } from '../lib/constants';
import { boardItemAnimation } from '../styles/framer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BoardPreview {
    boardItem: {
        id: number;
        uuid: string;
        images: string[];
        board_title: string;
    };
}
[];

function BoardPreview({ boardItem }: BoardPreview) {
    return (
        <Link href={'/' + boardItem?.uuid} passHref>
            <motion.li
                whileHover={{ scale: 1.03, cursor: 'pointer', backgroundColor: 'var(--pink)' }}
                whileTap={{ scale: 1.01 }}
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
                    />
                </div>
                <div className={styles.boardTitle}>{boardItem?.board_title || 'untitled'} </div>
            </motion.li>
        </Link>
    );
}

export default BoardPreview;
