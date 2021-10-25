import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ModalContext = createContext();

function SessionContext({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return <ModalContext.Provider value={[session, setSession]}>{children}</ModalContext.Provider>;
}

export const useSession = () => useContext(ModalContext)[0];
export const useSetSession = () => useContext(ModalContext)[1];

export default SessionContext;
