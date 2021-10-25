import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

function ThemeSwitch({ children }: PropsWithChildren<{ children: ReactNode }>) {
    const [activeTheme, setActiveTheme] = useState<any>(document.documentElement.dataset.theme);
    const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        document.documentElement.dataset.theme = activeTheme;
        window?.localStorage.setItem('theme', activeTheme);
    }, [activeTheme]);

    return <button onClick={() => setActiveTheme(inactiveTheme)}>{children}</button>;
}

export default ThemeSwitch;
