import { useSortable } from '@dnd-kit/sortable'
import { RiDeleteBin2Fill } from '@react-icons/all-files/ri/RiDeleteBin2Fill'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { supabaseHost } from '../lib/constants'
import s from '../styles/GalleryItem.module.css'

type GalleryItemProps = {
    boardID?: string
    itemKey: number
    deleteFile?: (key: string | undefined) => void
    img: { filePath: string; preview: string }
}

const GalleryItem = ({
    boardID,
    itemKey,
    deleteFile,
    img,
}: GalleryItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: img?.filePath,
            disabled: boardID ? true : false,
        })

    const [deleteButton, setDeleteButton] = useState(false)
    const [deleteButtonIndex, setdeleteButtonIndex] = useState<number | null>(
        null,
    )

    const showButton = (e: { preventDefault: () => void }, key: number) => {
        if (!boardID) {
            e.preventDefault()
            setdeleteButtonIndex(key)
            setDeleteButton(true)
        }
    }

    const hideButton = (e: { preventDefault: () => void }, key: number) => {
        if (!boardID) {
            e.preventDefault()
            setdeleteButtonIndex(key)
            setDeleteButton(false)
        }
    }

    const dragStyle = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition,
          }
        : undefined

    return (
        <>
            <div
                className={`${s.gallerySectionOuterContainer} ${
                    boardID && s.noDragger
                }`}
            >
                {!boardID && deleteButton && deleteButtonIndex === itemKey && (
                    <span>
                        <RiDeleteBin2Fill
                            onMouseEnter={(e) => showButton(e, itemKey)}
                            onClick={() =>
                                deleteFile && deleteFile(img?.preview)
                            }
                        />
                    </span>
                )}
                <div
                    style={dragStyle}
                    className={s.gallerySectionContainer}
                    onMouseEnter={(e) => showButton(e, itemKey)}
                    onMouseLeave={(e) => hideButton(e, itemKey)}
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                >
                    <m.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className={s.imageContainer}
                        key={img?.filePath}
                    >
                        <Image
                            src={
                                img?.preview ? img?.preview : supabaseHost + img
                            }
                            layout="fill"
                            alt="board element"
                            quality={70}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
                        />
                    </m.div>
                </div>
            </div>
        </>
    )
}

export default GalleryItem
