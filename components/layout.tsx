import { PropsWithChildren, ReactNode, useState } from 'react';
import { useSession } from '../context/SessionContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Login from './Login';
import styles from '../styles/layout.module.css';

type ComponentWithChildProps = PropsWithChildren<{ children: ReactNode }>;

export default function Layout({ children }: ComponentWithChildProps) {
    const [modal, setModal] = useState(false);

    const session = useSession();
    const user = session?.user;

    return (
        <>
            <div className={styles.container}>
                <nav className={styles.navContainer}>
                    <div className={styles.navItems}>
                        <Link href="/" passHref>
                            <motion.div
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 1.0, transition: { duration: 0.2 } }}
                            >
                                <Image
                                    src="/images/logo.svg"
                                    alt="moodhoarder logo"
                                    width="100%"
                                    height="100%"
                                    layout="intrinsic"
                                />
                            </motion.div>
                        </Link>
                        {user ? (
                            <div>My boards</div>
                        ) : (
                            <motion.div
                                onClick={() => setModal(true)}
                                whileHover={{ x: -1 }}
                                whileTap={{ x: 0 }}
                                transition={{ duration: 0.2 }}
                                className={styles.loginButton}
                            >
                                Log in
                            </motion.div>
                        )}
                    </div>
                </nav>
                <main className={styles.main}>{children}</main>
                <AnimatePresence exitBeforeEnter>
                    {modal && <Login setModal={setModal} key={'loginKey'} />}
                </AnimatePresence>
            </div>
        </>
    );
}
