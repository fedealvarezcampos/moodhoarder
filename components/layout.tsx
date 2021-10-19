import { PropsWithChildren, ReactNode } from 'react';
import styles from '../styles/layout.module.css';
import Image from 'next/image';
import Link from 'next/image';

type ComponentWithChildProps = PropsWithChildren<{ children: ReactNode }>;

export default function Layout({ children }: ComponentWithChildProps) {
    return (
        <>
            <div className={styles.container}>
                {/* <Link href="/"> */}
                <nav className={styles.logo}>
                    <Image
                        src="/images/logo.svg"
                        alt="moodhoarder logo"
                        width="100%"
                        height="100%"
                        layout="intrinsic"
                        // objectFit="fill"
                    />
                </nav>
                {/* </Link> */}
                <main className={styles.main}>{children}</main>
            </div>
        </>
    );
}
