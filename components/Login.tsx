import { AiFillGoogleCircle } from '@react-icons/all-files/ai/AiFillGoogleCircle'
import { AiFillTwitterCircle } from '@react-icons/all-files/ai/AiFillTwitterCircle'
import { Provider } from '@supabase/gotrue-js'
import { motion as m } from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'

import { useClosingKey } from '../helpers/useKeys'
import { supabase } from '../lib/supabaseClient'
import s from '../styles/Login.module.css'
import { notifyError, notifyMessage } from './common/toasts'

export interface Login {
    setModal: Dispatch<SetStateAction<boolean>>
}

function Login({ setModal }: Login) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email: string) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })

            if (error) throw error

            notifyMessage('Check your email for the login link!')
            setModal(false)
        } catch (error: any) {
            notifyError(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleProviderLogin = async (e: any, provider: Provider) => {
        e.preventDefault()
        try {
            const { error } = await supabase.auth.signIn({
                provider: provider,
            })

            if (error) throw error
        } catch (error: any) {
            notifyError(error.error_description || error.message)
        } finally {
            setModal(false)
        }
    }

    useClosingKey('Escape', undefined, setModal)

    return (
        <>
            <m.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{
                    duration: 0.3,
                }}
                className={s.inputsOuterContainer}
            >
                <div className={s.loginContainer}>
                    <div className={s.inputsContainer}>
                        <span>Sign in:</span>
                        <form>
                            <label>
                                <span>With just your email</span>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <div>
                                <m.button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleLogin(email)
                                    }}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label="send login mail button"
                                    disabled={loading}
                                >
                                    <span>
                                        {loading
                                            ? 'Loading'
                                            : 'Send magic link'}
                                    </span>
                                </m.button>
                            </div>
                        </form>
                        <div>
                            <span>With Google</span>
                            <br />
                            <m.button
                                onClick={(e) =>
                                    handleProviderLogin(e, 'google')
                                }
                                whileHover={{ y: -3 }}
                                whileTap={{ y: 0 }}
                                transition={{ duration: 0.2 }}
                                aria-label="google login button"
                                disabled={loading}
                                className={s.googleButton}
                            >
                                <AiFillGoogleCircle /> Google
                            </m.button>
                        </div>
                        <div>
                            <span>With Twitter</span>
                            <br />
                            <m.button
                                onClick={(e) =>
                                    handleProviderLogin(e, 'twitter')
                                }
                                whileHover={{ y: -3 }}
                                whileTap={{ y: 0 }}
                                transition={{ duration: 0.2 }}
                                aria-label="google login button"
                                disabled={loading}
                                className={s.googleButton}
                            >
                                <AiFillTwitterCircle /> Twitter
                            </m.button>
                        </div>
                    </div>
                </div>
            </m.div>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={s.modalBG}
                onClick={() => setModal(false)}
            />
        </>
    )
}

export default Login
