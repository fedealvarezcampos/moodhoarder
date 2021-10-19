import { PropsWithChildren, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/layout.module.css';

type ComponentWithChildProps = PropsWithChildren<{ children: ReactNode }>;

export default function Layout({ children }: ComponentWithChildProps) {
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.logo}>
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
                </nav>
                <main className={styles.main}>{children}</main>
            </div>
        </>
    );
}
