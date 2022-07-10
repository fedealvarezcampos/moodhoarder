import {
    closestCorners,
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable'
import { AnimatePresence } from 'framer-motion'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isMobile as mobile } from 'react-device-detect'
import Masonry from 'react-masonry-css'

import s from '../styles/Gallery.module.css'
import GalleryItem from './GalleryItem'

type GalleryProps = {
    handleSelected?: (key: number) => void
    board?: string[]
    deleteFile?: (key: string | undefined) => void
    boardID?: string
    note?: boolean
    items?: { file: File; filePath: string; preview: string }[]
    setItems: Dispatch<SetStateAction<object[]>>
    setImageKey?: Dispatch<SetStateAction<number>>
}

const Gallery = ({
    board,
    deleteFile,
    boardID,
    items,
    setItems,
    handleSelected,
}: GalleryProps) => {
    const [layoutEffect, setLayoutEffect] = useState(false)

    useEffect(() => {
        setLayoutEffect(true)
    }, [])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    )

    const breakpointColumnsObj = {
        default:
            (items?.length === 1 && 1) ||
            (items?.length === 2 && 2) ||
            (items?.length === 3 && 3) ||
            4,
        1800: (items?.length === 1 && 1) || (items?.length === 2 && 2) || 3,
        1300: (items?.length === 1 && 1) || 2,
        900: 1,
    }

    function handleDragEnd(event: { active: any; over: any }) {
        const { active, over } = event

        if (active?.id !== over?.id) {
            setItems((items: object[]) => {
                const oldIndex = items.findIndex(
                    (i: any) => i.filePath === active.id,
                )
                const newIndex = items.findIndex(
                    (i: any) => i.filePath === over?.id,
                )

                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    return (
        <>
            {layoutEffect && (
                <AnimatePresence>
                    <DndContext
                        autoScroll={false}
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragEnd={handleDragEnd}
                    >
                        {!boardID && items && !board ? (
                            <SortableContext
                                items={items?.map(
                                    (el: { filePath: string }) => el?.filePath,
                                )}
                                strategy={rectSortingStrategy}
                            >
                                <div
                                    className={`${s.galleryContainer} ${
                                        boardID && s.noPadding
                                    }`}
                                >
                                    <Masonry
                                        breakpointCols={breakpointColumnsObj}
                                        className={s.masonry}
                                        columnClassName={s.masonryColumn}
                                    >
                                        {items &&
                                            items?.map(
                                                (img: any, i: number) => (
                                                    <GalleryItem
                                                        boardID={boardID}
                                                        itemKey={i}
                                                        deleteFile={deleteFile}
                                                        img={img}
                                                        key={i}
                                                    />
                                                ),
                                            )}
                                    </Masonry>
                                </div>
                            </SortableContext>
                        ) : (
                            <div
                                className={`${s.galleryContainer} ${
                                    boardID && s.noPadding
                                }`}
                            >
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className={`${s.masonry} ${s.noPadding}`}
                                    columnClassName={s.masonryColumn}
                                >
                                    {board &&
                                        board?.map((img: any, i: number) => (
                                            <span
                                                key={i}
                                                onClick={() =>
                                                    !mobile &&
                                                    handleSelected &&
                                                    handleSelected(i)
                                                }
                                            >
                                                <GalleryItem
                                                    boardID={boardID}
                                                    itemKey={i}
                                                    deleteFile={deleteFile}
                                                    img={img}
                                                />
                                            </span>
                                        ))}
                                </Masonry>
                            </div>
                        )}
                    </DndContext>
                </AnimatePresence>
            )}
        </>
    )
}

export default Gallery
