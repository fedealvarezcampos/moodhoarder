import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GiBatMask } from '@react-icons/all-files/gi/GiBatMask';
import { HiLightBulb } from '@react-icons/all-files/hi/HiLightBulb';
import styles from '../styles/ThemeSwitch.module.css';

function ThemeSwitch() {
    const ONaudio = new Audio('/switch-3.mp3');
    const OFFaudio = new Audio('/switch-4.mp3');

    const [activeTheme, setActiveTheme] = useState<any>(document.documentElement.dataset.theme);
    const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        document.documentElement.dataset.theme = activeTheme;
        window?.localStorage.setItem('theme', activeTheme);
    }, [activeTheme]);

    const handleThemeChange = (theme: string) => {
        setActiveTheme(theme);

        const remove = () => {
            ONaudio.remove();
            OFFaudio.remove();
        };

        remove();

        theme === 'light' ? ONaudio.play() : OFFaudio.play();
    };

    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            className={styles.themeButton}
            onClick={() => handleThemeChange(inactiveTheme)}
        >
            {activeTheme === 'dark' ? <HiLightBulb /> : <GiBatMask />}
        </motion.button>
    );
}

export default ThemeSwitch;
