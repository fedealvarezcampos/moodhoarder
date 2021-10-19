import { Key, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import styles from '../styles/Gallery.module.css';

type GalleryProps = {
    gallery: { preview: string; file: object; filePath: string }[];
    deleteFile?: any;
    boardID?: string;
};

import type {
    // DraggableStyle,
    DroppableProvided,
    // DroppableStateSnapshot,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult,
} from 'react-beautiful-dnd';

const supabaseHost = 'https://bluhemglezuxswtcifom.supabase.in/storage/v1/object/public/boards/';

const Gallery = ({ gallery, deleteFile, boardID }: GalleryProps) => {
    const [deleteButton, setDeleteButton] = useState(false);
    const [deleteButtonIndex, setdeleteButtonIndex] = useState<number | null>(null);

    const [sortedImages, setSortedImages] = useState<any>();

    const showButton = (e: { preventDefault: () => void }, key: number) => {
        if (!boardID) {
            e.preventDefault();
            setdeleteButtonIndex(key);
            setDeleteButton(true);
        }
    };

    const hideButton = (e: { preventDefault: () => void }, key: number) => {
        if (!boardID) {
            e.preventDefault();
            setdeleteButtonIndex(key);
            setDeleteButton(false);
        }
    };

    const rearrangeItems = (result: any) => {
        const items = Array.from(sortedImages);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSortedImages(items);
    };

    useEffect(() => {
        setSortedImages(gallery);
    }, [gallery]);

    return (
        <>
            <DragDropContext onDragEnd={rearrangeItems}>
                <Droppable droppableId="galleryContainer" isDropDisabled={boardID ? true : false}>
                    {(provided: DroppableProvided) => (
                        <div
                            className={`${styles.galleryContainer} ${boardID && styles.noPadding}`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <AnimatePresence>
                                {sortedImages &&
                                    sortedImages.map((img: any, i: number) => (
                                        <Draggable
                                            key={i}
                                            draggableId={i.toString()}
                                            index={i}
                                            isDragDisabled={boardID ? true : false}
                                        >
                                            {(provided: DraggableProvided) => (
                                                <div
                                                    className={styles.gallerySectionContainer}
                                                    // key={i}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onMouseEnter={e => showButton(e, i)}
                                                    onMouseLeave={e => hideButton(e, i)}
                                                >
                                                    {!boardID && deleteButton && deleteButtonIndex === i && (
                                                        <span>
                                                            <RiDeleteBin2Fill onClick={() => deleteFile(i)} />
                                                        </span>
                                                    )}

                                                    <motion.div
                                                        initial={{ x: 20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        // exit={{ y: 100, opacity: 0 }}
                                                        transition={{ duration: 0.4 }}
                                                        className={styles.imageContainer}
                                                        key={img.filePath}
                                                    >
                                                        <Image
                                                            src={
                                                                img.preview ? img.preview : supabaseHost + img
                                                            }
                                                            // height="100%"
                                                            // width="100%"
                                                            layout="fill"
                                                            // objectFit="contain"
                                                            alt="image"
                                                        />
                                                    </motion.div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                            </AnimatePresence>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default Gallery;
