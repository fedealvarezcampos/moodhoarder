import type { NextPage } from 'next';
import Uploader from '../components/Uploader';
import Head from 'next/head';

const Home: NextPage = ({ setNote, images, setImages }: any) => {
    return (
        <>
            <Head>
                <title>moodhoarder</title>
                <meta name="description" content="Moodhoarder | Create your own moodboards" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Uploader setNote={setNote} images={images} setImages={setImages} />
        </>
    );
};

export default Home;
