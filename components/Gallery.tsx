import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import GalleryItem from './GalleryItem';
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

    // const rearrangeItems = (result: any) => {
    //     const items = Array.from(sortedImages);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);

    //     setSortedImages(items);
    // };

    console.log(items);

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

    // const rearrangeItems = (result: any) => {
    //     const items = Array.from(sortedImages);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);

    //     setSortedImages(items);
    // };

    useEffect(() => {
        setItems(gallery);
    }, [gallery, items]);

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
                    <SortableContext items={items.map(i => i.filePath)} strategy={rectSortingStrategy}>
                        <div className={`${styles.galleryContainer} ${boardID && styles.noPadding}`}>
                            {items &&
                                items.map((img: any, i: number) => (
                                    <GalleryItem
                                        boardID={boardID}
                                        itemKey={i}
                                        deleteFile={deleteFile}
                                        img={img}
                                        key={i}
                                    />
                                ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </AnimatePresence>
        </>
    );
};

export default Gallery;
