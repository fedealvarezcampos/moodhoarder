import { Dispatch, SetStateAction } from 'react';
import { Gallery } from '../pages/_app';
import { AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import GalleryItem from './GalleryItem';
import styles from '../styles/Gallery.module.css';
import { isMobile as mobile } from 'react-device-detect';
import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

type GalleryProps = {
    handleSelected?: (key: string | undefined) => void;
    board?: string[];
    deleteFile: (key: string | undefined) => void;
    boardID?: string;
    note?: boolean;
    items: { file: File; filePath: string; preview: string }[];
    setItems: Dispatch<SetStateAction<object[]>>;
};

const Gallery = ({ board, deleteFile, boardID, items, setItems, handleSelected }: GalleryProps) => {
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
                            items={items?.map((el: { filePath: string }) => el?.filePath)}
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
                                    board?.map((img: any, i: number) => (
                                        <span
                                            key={i}
                                            onClick={() => !mobile && handleSelected && handleSelected(img)}
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
        </>
    );
};

export default Gallery;
