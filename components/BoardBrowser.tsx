import Image from 'next/image';
import { supabaseHost } from '../lib/constants';
import { motion } from 'framer-motion';
import styles from '../styles/BoardBrowser.module.css';

interface BoardBrowser {
    image: string | undefined;
    setBoardNav: Function;
}

function BoardBrowser({ image, setBoardNav }: BoardBrowser) {
    return (
        <>
            <motion.div
                initial={{ y: -30, opacity: 0, zIndex: 3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0, zIndex: 3 }}
                transition={{
                    duration: 0.3,
                }}
                className={styles.boardNavContainer}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={supabaseHost + image}
                        layout="fill"
                        // width="100%"
                        // height="100%"
                        alt="image in board"
                        // quality={85}
                        // placeholder="blur"
                        // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
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
