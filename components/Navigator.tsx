import { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { useSession } from '../context/SessionContext';
import { notifyError, notifyMessage } from '../assets/toasts';
import { IoLogOut } from '@react-icons/all-files/io5/IoLogOut';
import { motion } from 'framer-motion';
import styles from '../styles/Navigator.module.css';

const ThemeSwitch = dynamic(() => import('../components/ThemeSwitch'), {
    ssr: false,
});

interface Navigator {
    setModal: Dispatch<SetStateAction<boolean>>;
}

function Navigator({ setModal }: Navigator) {
    const session = useSession();
    const user = session?.user;

    const handleLogOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            notifyMessage("You're logged out!");
        } catch (error: any) {
            notifyError(error?.message);
        }
    };

    return (
        <nav className={styles.navContainer}>
            <div className={styles.navItems}>
                <Link href="/" passHref>
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 1.0, transition: { duration: 0.2 } }}
                        className={styles.logo}
                    >
                        <Image
                            src="/images/logo.svg"
                            alt="moodhoarder logo"
                            width="100%"
                            height="100%"
                            layout="intrinsic"
                            priority
                        />
                    </motion.div>
                </Link>
                {user ? (
                    <>
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
                    </>
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
                <div>
                    {user && (
                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ y: 0 }}
                            className={styles.logOutButton}
                            aria-label="log out button"
                            onClick={() => handleLogOut()}
                        >
                            <IoLogOut />
                        </motion.button>
                    )}
                    <ThemeSwitch />
                </div>
            </div>
        </nav>
    );
}

export default Navigator;
