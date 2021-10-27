import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import GalleryItem from './GalleryItem';
import Masonry from 'react-masonry-css';
import styles from '../styles/Gallery.module.css';

import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

type GalleryProps = {
    board?: string[];
    deleteFile?: any;
    boardID?: string;
    note?: boolean;
    items: { file: File; filePath: string; preview: string }[];
    setItems: Function;
};

const Gallery = ({ board, deleteFile, boardID, items, setItems }: GalleryProps) => {
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    const breakpointColumnsObj = {
        default: (items?.length === 1 && 1) || (items?.length === 2 && 2) || (items?.length === 3 && 3) || 4,
        1800: (items?.length === 1 && 1) || (items?.length === 2 && 2) || 3,
        1300: (items?.length === 1 && 1) || 2,
        900: 1,
    };

    function handleDragEnd(event: { active: any; over: any }) {
        const { active, over } = event;

        if (active?.id !== over?.id) {
            setItems((items: object[]) => {
                const oldIndex = items.findIndex((i: any) => i.filePath === active.id);
                const newIndex = items.findIndex((i: any) => i.filePath === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <>
            <AnimatePresence>
                <DndContext
                    autoScroll={false}
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                >
                    {!boardID && items && !board ? (
                        <SortableContext
                            items={items?.map((i: any) => i?.filePath)}
                            strategy={rectSortingStrategy}
                        >
                            <div className={`${styles.galleryContainer} ${boardID && styles.noPadding}`}>
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className={styles.masonry}
                                    columnClassName={styles.masonryColumn}
                                >
                                    {items &&
                                        items?.map((img: any, i: number) => (
                                            <GalleryItem
                                                boardID={boardID}
                                                itemKey={i}
                                                deleteFile={deleteFile}
                                                img={img}
                                                key={i}
                                            />
                                        ))}
                                </Masonry>
                            </div>
                        </SortableContext>
                    ) : (
                        <div className={`${styles.galleryContainer} ${boardID && styles.noPadding}`}>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className={`${styles.masonry} ${styles.noPadding}`}
                                columnClassName={styles.masonryColumn}
                            >
                                {board &&
                                    board?.map((img: string, i: number) => (
                                        <GalleryItem
                                            boardID={boardID}
                                            itemKey={i}
                                            deleteFile={deleteFile}
                                            img={img}
                                            key={i}
                                        />
                                    ))}
                            </Masonry>
                        </div>
                    )}
                </DndContext>
            </AnimatePresence>
        </>
    );
};

export default Gallery;
