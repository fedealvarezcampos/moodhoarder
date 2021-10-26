import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Login from './Login';
import styles from '../styles/layout.module.css';

const ThemeSwitch = dynamic(() => import('../components/ThemeSwitch'), {
    ssr: false,
});

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
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileHover={{ x: -1 }}
                                animate={{ x: 0, opacity: 1 }}
                                whileTap={{ x: 0 }}
                                transition={{ duration: 0.2 }}
                                aria-label="my boards button"
                                className={styles.loginButton}
                            >
                                <Link href="/myboards" passHref>
                                    My boards
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                onClick={() => setModal(true)}
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
                                whileHover={{ x: -1 }}
                                whileTap={{ x: 0 }}
                                transition={{ duration: 0.2 }}
                                aria-label="login button"
                                className={styles.loginButton}
                            >
                                Log in
                            </motion.div>
                        )}
                        <ThemeSwitch />
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
