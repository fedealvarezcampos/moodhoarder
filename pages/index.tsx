import type { NextPage } from 'next'
import Head from 'next/head'

import { Uploader } from '../components/Uploader'

const Home: NextPage = ({ images, setImages }: any) => {
    return (
        <>
            <Head>
                <title>moodhoarder</title>
                <meta
                    name="description"
                    content="Moodhoarder | Create your own moodboards"
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>

            <Uploader images={images} setImages={setImages} />
        </>
    )
}

export default Home
