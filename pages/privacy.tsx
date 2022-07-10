import { AiFillFileText } from '@react-icons/all-files/ai/AiFillFileText'
import { RiGitRepositoryPrivateFill } from '@react-icons/all-files/ri/RiGitRepositoryPrivateFill'
import { motion } from 'framer-motion'

import styles from '../styles/privacy.module.css'

function Privacy() {
    return (
        <>
            <motion.section
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className={styles.privacy}
                suppressHydrationWarning
            >
                <article>
                    <h1>
                        <AiFillFileText /> TOS
                    </h1>
                    <p>
                        We reserve the right to delete any images uploaded if we
                        deem them inappropriate; no explicit content, be
                        reasonable. Your account may also be subject to deletion
                        if you incur in uploading such material.
                    </p>
                </article>
                <article>
                    <h1>
                        <RiGitRepositoryPrivateFill /> Privacy
                    </h1>
                    <p>
                        We only use images with storing purposes, nothing else
                        will be done with them. If you log in, images will be
                        deleted from server when erasing a board.
                    </p>
                    <p>
                        Your email is the only information we store of you, and
                        independent from your login method we will only use it
                        for communication purposes regarding access to the site.
                    </p>
                </article>
            </motion.section>
        </>
    )
}

export default Privacy
