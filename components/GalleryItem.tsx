import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RiDeleteBin2Fill } from '@react-icons/all-files/ri/RiDeleteBin2Fill';
import { useSortable } from '@dnd-kit/sortable';
import { supabaseHost } from '../lib/constants';
import styles from '../styles/GalleryItem.module.css';

type GalleryItemProps = {
    boardID?: string;
    itemKey: number;
    deleteFile: (key: string) => void;
    img: any;
};

const GalleryItem = ({ boardID, itemKey, deleteFile, img }: GalleryItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: img?.filePath,
        disabled: boardID ? true : false,
    });

    const [deleteButton, setDeleteButton] = useState(false);
    const [deleteButtonIndex, setdeleteButtonIndex] = useState<number | null>(null);

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

    const dragStyle = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              transition,
          }
        : undefined;

    return (
        <>
            <div className={`${styles.gallerySectionOuterContainer} ${boardID && styles.noDragger}`}>
                {!boardID && deleteButton && deleteButtonIndex === itemKey && (
                    <span>
                        <RiDeleteBin2Fill
                            onMouseEnter={e => showButton(e, itemKey)}
                            onClick={() => deleteFile(img.preview)}
                        />
                    </span>
                )}
                <div
                    style={dragStyle}
                    className={styles.gallerySectionContainer}
                    onMouseEnter={e => showButton(e, itemKey)}
                    onMouseLeave={e => hideButton(e, itemKey)}
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                >
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className={styles.imageContainer}
                        key={img?.filePath}
                    >
                        <Image
                            src={img?.preview ? img?.preview : supabaseHost + img}
                            layout="fill"
                            alt="image in board"
                            quality={50}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
                        />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default GalleryItem;
