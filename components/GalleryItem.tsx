import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useSortable } from '@dnd-kit/sortable';
import styles from '../styles/GalleryItem.module.css';
import { CSS } from '@dnd-kit/utilities';

type GalleryItemProps = {
    boardID?: string;
    itemKey: number;
    deleteFile: Function;
    img: any;
};

const supabaseHost = 'https://bluhemglezuxswtcifom.supabase.in/storage/v1/object/public/boards/';

const GalleryItem = ({ boardID, itemKey, deleteFile, img }: GalleryItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: img.filePath,
    });

    console.log(img);

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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'inline-block',

        // backgroundColor: '#ddd',
        // padding: '.5rem',
        // height: '100%',
        // margin: '0 1rem 1rem 0',
    };

    return (
        <>
            <div
                style={style}
                className={styles.gallerySectionContainer}
                onMouseEnter={e => showButton(e, itemKey)}
                onMouseLeave={e => hideButton(e, itemKey)}
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            >
                {!boardID && deleteButton && deleteButtonIndex === itemKey && (
                    <span>
                        <RiDeleteBin2Fill onClick={() => deleteFile(itemKey)} />
                    </span>
                )}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    // exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.imageContainer}
                    key={img?.filePath}
                >
                    <Image src={img?.preview ? img?.preview : supabaseHost + img} layout="fill" alt="image" />
                </motion.div>
            </div>
        </>
    );
};

export default GalleryItem;
