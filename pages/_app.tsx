import { useState } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toasts.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const [note, setNote] = useState<boolean>(false);

    return (
        <Layout>
            <Component {...pageProps} setNote={setNote} />
            {note && <ToastContainer />}
        </Layout>
    );
}
export default MyApp;
