import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'

import s from '../styles/layout.module.css'
import Header from './Header'
import { Login } from './Login'

type ComponentWithChildProps = PropsWithChildren<{ children: ReactNode }>

export default function Layout({ children }: ComponentWithChildProps) {
    const [modal, setModal] = useState(false)
    const [layoutEffect, setLayoutEffect] = useState(false)

    useEffect(() => {
        setLayoutEffect(true)
    }, [])

    return (
        <>
            <Header setModal={setModal} />
            <main className={s.main}>{children}</main>
            {layoutEffect && (
                <AnimatePresence exitBeforeEnter>
                    {modal && <Login setModal={setModal} key={'loginKey'} />}
                </AnimatePresence>
            )}
            <footer className={s.footer}>
                <Link href="/privacy" passHref>
                    <span>TOS | Privacy</span>
                </Link>
                <span>moodhoarder © {new Date().getFullYear()}</span>
            </footer>
        </>
    )
}
