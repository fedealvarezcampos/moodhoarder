import { useState } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toasts.css';
import '../styles/globals.css';

export interface Gallery {
    preview: string;
    file: any;
    filePath: string;
}
[];

function MyApp({ Component, pageProps }: AppProps) {
    const [note, setNote] = useState<boolean>(false);
    const [images, setImages] = useState<Gallery[]>([]);

    return (
        <Layout>
            <Component {...pageProps} setNote={setNote} images={images} setImages={setImages} />
            {note && <ToastContainer />}
        </Layout>
    );
}
export default MyApp;
