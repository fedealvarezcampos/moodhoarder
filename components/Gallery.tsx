import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import GalleryItem from './GalleryItem';
import Spinner from '../assets/spinner';
import Masonry from 'react-masonry-css';
import styles from '../styles/Gallery.module.css';

import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';

type GalleryProps = {
    gallery: { preview: string; file: object; filePath: string }[];
    deleteFile?: any;
    boardID?: string;
};

const Gallery = ({ gallery, deleteFile, boardID }: GalleryProps) => {
    const [items, setItems] = useState<any>(gallery);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    function handleDragEnd(event: { active: any; over: any }) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items: object[]) => {
                const oldIndex = items.findIndex((i: any) => i.filePath === active.id);
                const newIndex = items.findIndex((i: any) => i.filePath === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    useEffect(() => {
        setItems(gallery);
    }, [gallery]);

    // masonry config
    const breakpointColumnsObj = {
        default: (items?.length === 1 && 1) || (items?.length === 2 && 2) || (items?.length === 3 && 3) || 4,
        1800: (items?.length === 1 && 1) || (items?.length === 2 && 2) || 3,
        1300: (items?.length === 1 && 1) || 2,
        900: 1,
    };

    const whatever = ['a', 'b', 'c'];

    return (
        <>
            <AnimatePresence>
                <DndContext
                    autoScroll={false}
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                    // modifiers={[restrictToWindowEdges]}
                >
                    {!boardID && gallery && (
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
                                {!items && <Spinner />}
                            </div>
                        </SortableContext>
                    )}
                    {boardID && (
                        <div className={`${styles.galleryContainer} ${boardID && styles.noPadding}`}>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className={`${styles.masonry} ${styles.noPadding}`}
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
                            {!items && <Spinner />}
                        </div>
                    )}
                </DndContext>
            </AnimatePresence>
        </>
    );
};

export default Gallery;
