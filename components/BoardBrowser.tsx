import { AiFillCaretLeft } from '@react-icons/all-files/ai/AiFillCaretLeft'
import { AiFillCaretRight } from '@react-icons/all-files/ai/AiFillCaretRight'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useClosingKey, useNavKey } from '../helpers/useKeys'
import { supabaseHost } from '../lib/constants'
import s from '../styles/BoardBrowser.module.css'
import Spinner from './common/spinner'

interface BoardBrowser {
    images: string[]
    boardNav: boolean
    setBoardNav: Dispatch<SetStateAction<boolean>>
    imageKey: number
    setImageKey: Dispatch<SetStateAction<number>>
}

function BoardBrowser({
    images,
    boardNav,
    setBoardNav,
    setImageKey,
    imageKey,
}: BoardBrowser) {
    const [isImageLoading, setImageLoading] = useState(false)
    const [isGalleryFirstLoad, setGalleryFirstLoad] = useState(false)

    const goToPrevImage = (imageKey: number) => {
        setImageKey(imageKey - 1)
        setImageLoading(true)
    }

    const goToNextImage = (imageKey: number) => {
        setImageKey(imageKey + 1)
        setImageLoading(true)
    }

    useNavKey(goToPrevImage, goToNextImage, imageKey, images?.length)
    useClosingKey('Escape', true, setBoardNav)

    useEffect(() => {
        setImageLoading(true)
        setGalleryFirstLoad(true)
    }, [])

    return (
        <>
            <m.div
                initial={{ opacity: 0, zIndex: 3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, zIndex: 3 }}
                className={s.navigation}
            >
                {imageKey !== 0 && (
                    <button onClick={() => goToPrevImage(imageKey)}>
                        <AiFillCaretLeft />
                    </button>
                )}
                {images?.length !== imageKey + 1 && (
                    <button onClick={() => goToNextImage(imageKey)}>
                        <AiFillCaretRight />
                    </button>
                )}
            </m.div>
            <m.div
                initial={{ y: -30, opacity: 0, zIndex: 3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, zIndex: 3 }}
                transition={{
                    duration: 0.3,
                }}
                className={s.boardNavContainer}
            >
                {isGalleryFirstLoad && <Spinner />}
                <div
                    className={`${s.imageContainer} ${
                        isGalleryFirstLoad ? s.firstLoad : ''
                    } ${isImageLoading ? s.loading : s.loaded}`}
                >
                    <Image
                        src={supabaseHost + images[imageKey]}
                        layout="fill"
                        alt="image in board"
                        quality={85}
                        placeholder="blur"
                        onLoad={() => {
                            setGalleryFirstLoad(false)
                            setImageLoading(false)
                        }}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
                        className={
                            isImageLoading ? s.imageLoading : s.imageLoaded
                        }
                    />
                </div>
            </m.div>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={s.modalBG}
                onClick={() => setBoardNav(false)}
            />
        </>
    )
}

export default BoardBrowser
