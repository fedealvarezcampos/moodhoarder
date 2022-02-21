import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const UserContext = createContext();

function SessionContext({ children }) {
	const [session, setSession] = useState(null);

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return <UserContext.Provider value={[session, setSession]}>{children}</UserContext.Provider>;
}

export const useSession = () => useContext(UserContext)[0];
export const useSetSession = () => useContext(UserContext)[1];

export default SessionContext;
