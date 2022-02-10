import { Dispatch, SetStateAction, useState } from 'react';
import { Provider } from '@supabase/gotrue-js';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { useClosingKey } from '../helpers/useKeys';
import { notifyError, notifyMessage } from '../assets/toasts';
import { AiFillGoogleCircle } from '@react-icons/all-files/ai/AiFillGoogleCircle';
import { AiFillTwitterCircle } from '@react-icons/all-files/ai/AiFillTwitterCircle';
import styles from '../styles/Login.module.css';

export interface Login {
	setModal: Dispatch<SetStateAction<boolean>>;
}

function Login({ setModal }: Login) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');

	const handleLogin = async (email: string) => {
		try {
			setLoading(true);
			const { error } = await supabase.auth.signIn({ email });

			if (error) throw error;

			notifyMessage('Check your email for the login link!');
			setModal(false);
		} catch (error: any) {
			notifyError(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleProviderLogin = async (e: any, provider: Provider) => {
		e.preventDefault();
		try {
			const { error } = await supabase.auth.signIn({
				provider: provider,
			});

			if (error) throw error;
		} catch (error: any) {
			notifyError(error.error_description || error.message);
		} finally {
			setModal(false);
		}
	};

	useClosingKey('Escape', undefined, setModal);

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
						<span>Sign in:</span>
						<form>
							<label>
								<span>With just your email</span>
								<input
									name="email"
									type="email"
									placeholder="Your email"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</label>
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
									disabled={loading}
								>
									<span>{loading ? 'Loading' : 'Send magic link'}</span>
								</motion.button>
							</div>
						</form>
						<div>
							<span>With Google</span>
							<br />
							<motion.button
								onClick={e => handleProviderLogin(e, 'google')}
								whileHover={{ y: -3 }}
								whileTap={{ y: 0 }}
								transition={{ duration: 0.2 }}
								aria-label="google login button"
								disabled={loading}
								className={styles.googleButton}
							>
								<AiFillGoogleCircle /> Google
							</motion.button>
						</div>
						<div>
							<span>With Twitter</span>
							<br />
							<motion.button
								onClick={e => handleProviderLogin(e, 'twitter')}
								whileHover={{ y: -3 }}
								whileTap={{ y: 0 }}
								transition={{ duration: 0.2 }}
								aria-label="google login button"
								disabled={loading}
								className={styles.googleButton}
							>
								<AiFillTwitterCircle /> Twitter
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
