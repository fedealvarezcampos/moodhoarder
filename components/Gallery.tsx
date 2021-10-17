import Image from 'next/image';
import styles from '../styles/Gallery.module.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type GalleryProps = {
    gallery: { preview: string; file: object; filePath: string }[];
    deleteFile: Function;
};

const Gallery = ({ gallery, deleteFile }: GalleryProps) => {
    const [deleteButton, setDeleteButton] = useState(false);
    const [deleteButtonIndex, setdeleteButtonIndex] = useState<number | null>(null);

    const showButton = (e: { preventDefault: () => void }, key: number) => {
        e.preventDefault();
        setdeleteButtonIndex(key);
        setDeleteButton(true);
    };

    const hideButton = (e: { preventDefault: () => void }, key: number) => {
        e.preventDefault();
        setdeleteButtonIndex(key);
        setDeleteButton(false);
    };

    return (
        <div className={styles.galleryContainer}>
            <AnimatePresence>
                {gallery &&
                    gallery.map((img, i) => (
                        <div
                            className={styles.gallerySectionContainer}
                            key={i}
                            onMouseEnter={e => showButton(e, i)}
                            onMouseLeave={e => hideButton(e, i)}
                        >
                            {deleteButton && deleteButtonIndex === i && (
                                <span>
                                    <RiDeleteBin2Fill onClick={() => deleteFile(i)} />
                                </span>
                            )}

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className={styles.imageContainer}
                                key={img.filePath}
                            >
                                <Image
                                    src={img.preview}
                                    height="100%"
                                    width="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                    alt="image"
                                />
                            </motion.div>
                        </div>
                    ))}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
