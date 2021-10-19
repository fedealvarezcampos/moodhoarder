import Image from 'next/image';
import styles from '../styles/Gallery.module.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type GalleryProps = {
    gallery: { preview: string; file: object; filePath: string }[];
    deleteFile?: any;
    boardID?: string;
};

const supabaseHost = 'https://bluhemglezuxswtcifom.supabase.in/storage/v1/object/public/boards/';

const Gallery = ({ gallery, deleteFile, boardID }: GalleryProps) => {
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

    return (
        <>
            <div className={`${styles.galleryContainer} ${boardID && styles.noPadding}`}>
                <AnimatePresence>
                    {gallery &&
                        gallery.map((img, i) => (
                            <div
                                className={styles.gallerySectionContainer}
                                key={i}
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
                                        src={img.preview ? img.preview : supabaseHost + img}
                                        // height="100%"
                                        // width="100%"
                                        layout="fill"
                                        // objectFit="contain"
                                        alt="image"
                                    />
                                </motion.div>
                            </div>
                        ))}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Gallery;
