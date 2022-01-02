import { PropsWithChildren, ReactNode, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Login from './Login';
import Navigator from './Navigator';
import styles from '../styles/layout.module.css';

type ComponentWithChildProps = PropsWithChildren<{ children: ReactNode }>;

export default function Layout({ children }: ComponentWithChildProps) {
	const [modal, setModal] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<Navigator setModal={setModal} />
				<main className={styles.main}>{children}</main>
				<AnimatePresence exitBeforeEnter>
					{modal && <Login setModal={setModal} key={'loginKey'} />}
				</AnimatePresence>
				<footer className={styles.footer}>
					<Link href="/privacy" passHref>
						<span>TOS | Privacy</span>
					</Link>
					<span>moodhoarder © {new Date().getFullYear()}</span>
				</footer>
			</div>
		</>
	);
}
