import { PropsWithChildren, ReactNode } from 'react';
import styles from '../styles/layout.module.css';
import Image from 'next/image';

type ComponentWithChildProps = PropsWithChildren<{ children: ReactNode }>;

export default function Layout({ children }: ComponentWithChildProps) {
    return (
        <>
            <span className={styles.logo}>
                <Image
                    src="/images/logo.svg"
                    alt="moodhoarder logo"
                    // width="100%"
                    // height="100%"
                    layout="fill"
                    objectFit="fill"
                />
            </span>
            {children}
        </>
    );
}
