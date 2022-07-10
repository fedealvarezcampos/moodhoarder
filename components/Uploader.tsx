import { motion as m } from 'framer-motion'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/dist/client/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { BOARDS_BUCKET } from '../lib/constants'
import { supabase } from '../lib/supabaseClient'
import s from '../styles/Uploader.module.css'
import { notifyError, notifyMessage } from './common/toasts'
import Gallery from './Gallery'

export interface Gallery {
    preview: string
    file: File
    filePath: string
}
;[]

export interface Uploader {
    images: { file: File; filePath: string; preview: string }[]
    setImages: Dispatch<SetStateAction<object[]>>
}

const Uploader = ({ images, setImages }: Uploader) => {
    const router = useRouter()
    const user = supabase?.auth.user()

    const [uploadButtonLabel, setUploadButtonLabel] =
        useState<string>('Save & share')
    const [boardName, setBoardName] = useState<string>('')

    async function setPreviews(e: any) {
        e.preventDefault()
        try {
            const files = e.target.files

            const previewsArray: Gallery[] = []

            for (const file of files) {
                const fileExt = file.name.split('.').pop()

                if (
                    file?.type !== 'image/png' &&
                    file?.type !== 'image/webp' &&
                    file?.type !== 'image/jpeg'
                ) {
                    notifyError('File/s must be jpg | webp | png !')
                    return
                }

                if (file?.size > 1200000) {
                    notifyError('All files must be 1MB or less!')
                    return
                }

                const fileName = `${uuidv4()}.${fileExt}`

                const url = URL.createObjectURL(file)
                previewsArray.push({
                    preview: url,
                    file: file,
                    filePath: fileName,
                })
            }

            setImages([...images, ...previewsArray])
        } catch (error: any) {
            notifyError(error.message)
        }
    }

    const uploadFiles = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const uuid = nanoid()

            const urls: string[] = []
            setUploadButtonLabel('Saving board...')

            for (const image of images) {
                const fileName = image.filePath
                const file = image.file

                const { error: uploadError } = await supabase.storage
                    .from(BOARDS_BUCKET)
                    .upload(fileName, file)

                if (uploadError) {
                    throw uploadError
                }

                urls.push(fileName)
            }

            const { data, error } = await supabase.from('boards').insert([
                {
                    uuid: uuid,
                    images: urls,
                    owner_uid: user?.id || null,
                    board_title: boardName || null,
                },
            ])

            if (error) throw error

            router.push(uuid)

            navigator.clipboard.writeText(window.location.href + uuid)

            notifyMessage('Board url copied to clipboard!')
        } catch (error: any) {
            notifyError(error.message)
        }
    }

    const deleteFile = (key: string | undefined) => {
        const filtered = images.filter(
            (i: any, value: any) => i.preview !== key,
        )

        setImages(filtered)
    }

    return (
        <>
            <m.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={s.uploaderTitle}
            >
                UPLOAD IMAGES HERE
            </m.div>
            <m.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={s.buttonsContainer}
            >
                <m.label
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                    htmlFor="uploader"
                >
                    Add files
                </m.label>
                {images.length !== 0 && (
                    <m.button
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setImages([])}
                        aria-label="clear board button"
                        className={s.publishButton}
                    >
                        Clear board
                    </m.button>
                )}
                {images.length !== 0 && (
                    <m.button
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => uploadFiles(e)}
                        aria-label="publish board button"
                        className={s.publishButton}
                    >
                        {uploadButtonLabel}
                    </m.button>
                )}
            </m.span>
            {user && images.length !== 0 && (
                <form action="" onSubmit={(e) => uploadFiles(e)}>
                    <input
                        type="submit hidden"
                        name="boardName"
                        id="boardName"
                        placeholder="Name this board!"
                        onChange={(e) => setBoardName(e.target.value)}
                        className={s.boardNameInput}
                    />
                </form>
            )}
            <input
                type="file"
                name="uploader"
                multiple
                accept="image/jpeg, image/png, image/webp"
                id="uploader"
                onChange={setPreviews}
            />

            {images?.length === 0 ? (
                <m.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className={s.noImages}
                    suppressHydrationWarning
                >
                    Your images will be here when you upload some. <br />
                    <br />
                    {user
                        ? "You're logged in so your boards will be saved to your profile."
                        : 'Log in if you want to save your moodboards to your profile!'}
                </m.div>
            ) : (
                <Gallery
                    deleteFile={deleteFile}
                    items={images}
                    setItems={setImages}
                />
            )}
        </>
    )
}

export default Uploader
