import 'react-toastify/dist/ReactToastify.css'
import '../styles/toasts.css'
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import Layout from '../components/layout'
import SessionContext from '../context/SessionContext'

export interface Gallery {
    preview: string
    file: any
    filePath: string
}
;[]

function MyApp({ Component, pageProps }: AppProps) {
    const [images, setImages] = useState<Gallery[]>([])

    return (
        <SessionContext>
            <Layout>
                <Component
                    {...pageProps}
                    images={images}
                    setImages={setImages}
                />
                <ToastContainer />
            </Layout>
        </SessionContext>
    )
}
export default MyApp
