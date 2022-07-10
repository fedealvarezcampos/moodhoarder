import { AnimatePresence, motion } from 'framer-motion'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import BoardBrowser from '../components/BoardBrowser'
import Spinner from '../components/common/spinner'
import { notifyError, notifyMessage } from '../components/common/toasts'
import Gallery from '../components/Gallery'
import { useSession } from '../context/SessionContext'
import { supabase } from '../lib/supabaseClient'

export interface Boards {
    uuid: string
    images: string[] | undefined
}

const Home: NextPage = ({ setImages }: any) => {
    const session = useSession()
    const user = session?.user

    const router = useRouter()
    const { board: boardID }: any = router.query

    const [board, setBoard] = useState<string[]>([])
    const [boardTitle, setBoardTitle] = useState<string>()
    const [boardNav, setBoardNav] = useState<boolean>(false)
    const [imageKey, setImageKey] = useState<number>(0)

    const [deleteButtonLabel, setDeleteButtonLabel] =
        useState<string>('Delete this board')
    const [ownerID, setOwnerID] = useState<string | null>()

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const getBoard = async () => {
            try {
                setLoading(true)

                const { data, error }: any = await supabase
                    .from<Boards>('boards')
                    .select('images, board_title, owner_uid')
                    .in('uuid', [boardID])

                if (error) throw error

                const images = data[0]?.images

                if (!images) router.push('/')

                setBoardTitle(data[0]?.board_title)
                setBoard(images)
                setOwnerID(data[0]?.owner_uid)
                setImages([])
            } catch (error: any) {
                notifyError(error.message)
            } finally {
                setLoading(false)
            }
        }

        boardID && getBoard()
    }, [boardID, router, setImages])

    const handleSelected = (key: number) => {
        setImageKey(key)
        setBoardNav(true)
    }

    const deleteBoard = async () => {
        try {
            setDeleteButtonLabel('Deleting...')

            const { error }: any = await supabase
                .from<Boards>('boards')
                .delete()
                .match({ uuid: boardID })

            if (error) throw error
            else {
                const { error } = await supabase.storage
                    .from('boards')
                    .remove(board)
                if (error) throw error
            }

            notifyMessage('Board deleted!')
        } catch (error: any) {
            notifyError(error.message)
        } finally {
            router.push('/')
        }
    }

    const [layoutEffect, setLayoutEffect] = useState(false)

    useEffect(() => {
        setLayoutEffect(true)
    }, [])

    return (
        <>
            <Head>
                <title>moodhoarder{boardTitle && ` | ${boardTitle}`}</title>
            </Head>
            {user && user?.id === ownerID && (
                <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                    aria-label="delete board button"
                    onClick={() => deleteBoard()}
                >
                    {deleteButtonLabel}
                </motion.button>
            )}
            {layoutEffect && (
                <AnimatePresence>
                    {boardNav && (
                        <BoardBrowser
                            key="boardNav"
                            imageKey={imageKey}
                            images={board}
                            setImageKey={setImageKey}
                            setBoardNav={setBoardNav}
                        />
                    )}
                </AnimatePresence>
            )}
            <Gallery
                board={board}
                boardID={boardID}
                // items={images}
                setItems={setImages}
                setImageKey={setImageKey}
                handleSelected={handleSelected}
            />
            {loading && <Spinner />}
        </>
    )
}

export default Home
