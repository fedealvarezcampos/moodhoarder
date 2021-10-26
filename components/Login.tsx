import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Login.module.css';

export interface Login {
    setModal: Function;
}

function Login({ setModal }: Login) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogin = async (email: string) => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email });

            if (error) throw error;
            else {
                const { data, error } = await supabase.from('users').insert([{ email: email }]);

                if (error) throw error;
            }
            alert('Check your email for the login link!');
        } catch (error: any) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{
                    duration: 0.3,
                }}
                className={styles.inputsOuterContainer}
            >
                <div className={styles.loginContainer}>
                    <div className={styles.inputsContainer}>
                        <p className="description">Sign in via magic link</p>
                        <input
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div>
                            <motion.button
                                onClick={e => {
                                    e.preventDefault();
                                    handleLogin(email);
                                }}
                                whileHover={{ y: -3 }}
                                whileTap={{ y: 0 }}
                                transition={{ duration: 0.2 }}
                                aria-label="send login mail button"
                                className="button block"
                                disabled={loading}
                            >
                                <span>{loading ? 'Loading' : 'Send magic link'}</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.modalBG}
                onClick={() => setModal(false)}
            />
        </>
    );
}

export default Login;
