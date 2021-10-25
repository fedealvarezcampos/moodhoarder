import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { GiBatMask } from 'react-icons/gi';
import { HiLightBulb } from 'react-icons/hi';
import styles from '../styles/ThemeSwitch.module.css';

function ThemeSwitch() {
    const [activeTheme, setActiveTheme] = useState<any>(document.documentElement.dataset.theme);
    const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        document.documentElement.dataset.theme = activeTheme;
        window?.localStorage.setItem('theme', activeTheme);
    }, [activeTheme]);

    return (
        <button className={styles.themeButton} onClick={() => setActiveTheme(inactiveTheme)}>
            {activeTheme === 'dark' ? <HiLightBulb /> : <GiBatMask />}
        </button>
    );
}

export default ThemeSwitch;
