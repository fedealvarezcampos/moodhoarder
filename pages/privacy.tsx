import { motion } from 'framer-motion';
import styles from '../styles/privacy.module.css';

function Privacy() {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className={styles.privacy}
            suppressHydrationWarning
        >
            <h1>Privacy</h1>
            <p>
                - We only use images with storing purposes, nothing else will be done with them. If you log
                in, images will be deleted from server when erasing a board.
            </p>
            <p>
                - Your email is the only information we store of you, and independent from your login method
                we will only use it for communication purposes regarding access to the site.
            </p>
        </motion.div>
    );
}

export default Privacy;
