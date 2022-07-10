import { IoLogOut } from '@react-icons/all-files/io5/IoLogOut'
import { motion as m } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

import { useSession } from '../context/SessionContext'
import { supabase } from '../lib/supabaseClient'
import s from '../styles/Header.module.css'
import { notifyError, notifyMessage } from './common/toasts'

const ThemeSwitch = dynamic(() => import('./ThemeSwitch'), {
    ssr: false,
})

interface HeaderProps {
    setModal: Dispatch<SetStateAction<boolean>>
}

function Header({ setModal }: HeaderProps) {
    const router = useRouter()

    const session = useSession()
    const user = session?.user

    const handleLogOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()

            if (error) throw error

            router.push('/')

            notifyMessage("You're logged out!")
        } catch (error: any) {
            notifyError(error?.message)
        }
    }

    return (
        <header className={s.header}>
            <nav className={s.navContainer}>
                <div className={s.navItems}>
                    <Link href="/" passHref>
                        <m.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{
                                opacity: 0.8,
                                transition: { duration: 0.1 },
                            }}
                            whileTap={{
                                scale: 0.99,
                                transition: { duration: 0.2 },
                            }}
                            className={s.logo}
                        >
                            <Image
                                src="/images/logo.svg"
                                alt="moodhoarder logo"
                                width="100%"
                                height="100%"
                                layout="intrinsic"
                                priority
                            />
                        </m.div>
                    </Link>
                    {user ? (
                        <>
                            <m.div
                                initial={{ x: 30, opacity: 0 }}
                                whileHover={{ x: -1 }}
                                animate={{ x: 0, opacity: 1 }}
                                whileTap={{ x: 0 }}
                                transition={{ duration: 0.2 }}
                                aria-label="my boards button"
                                className={s.loginButton}
                            >
                                <Link href="/myboards" passHref>
                                    My boards
                                </Link>
                            </m.div>
                        </>
                    ) : (
                        <m.div
                            onClick={() => setModal(true)}
                            initial={{ x: 30, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: { duration: 0.5 },
                            }}
                            whileHover={{ x: -1 }}
                            whileTap={{ x: 0 }}
                            transition={{ duration: 0.2 }}
                            aria-label="login button"
                            className={s.loginButton}
                        >
                            Log in
                        </m.div>
                    )}
                    <div>
                        {user && (
                            <m.button
                                whileHover={{ y: -1 }}
                                whileTap={{ y: 0 }}
                                className={s.logOutButton}
                                aria-label="log out button"
                                onClick={() => handleLogOut()}
                            >
                                <IoLogOut />
                            </m.button>
                        )}
                        <ThemeSwitch />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
