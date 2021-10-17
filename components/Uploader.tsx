import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BOARDS_BUCKET } from '../lib/constants';
import { v4 as uuidv4 } from 'uuid';
import Gallery from './Gallery';
import { motion } from 'framer-motion';
import styles from '../styles/Uploader.module.css';

export interface Gallery {
    preview: string;
    file: any;
    filePath: string;
}
[];

const Uploader = () => {
    const [images, setImages] = useState<Gallery[]>([]);

    console.log(images);

    async function setPreviews(e: any) {
        e.preventDefault();
        try {
            const files = e.target.files;

            let previewsArray: Gallery[] = [];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                // const filePath = fileName;

                // let { error: uploadError } = await supabase.storage
                //     .from(BOARDS_BUCKET)
                //     .upload(filePath, file);

                // if (uploadError) {
                //     throw uploadError;
                // } else {
                const url = URL.createObjectURL(file);
                previewsArray.push({ preview: url, file: file, filePath: fileName });
                // }
            }

            setImages([...images, ...previewsArray]);
        } catch (error: any) {
            console.log('Error downloading image: ', error.message);
        }
    }

    const uploadFiles = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            for (const image of images) {
                const fileName = image.filePath;
                const file = image.file;

                let { error: uploadError } = await supabase.storage
                    .from(BOARDS_BUCKET)
                    .upload(fileName, file);

                if (uploadError) {
                    throw uploadError;
                }
            }
        } catch (error: any) {
            console.log('Error downloading image: ', error.message);
        }
    };

    const deleteFile = (key: number) => {
        const filtered = images.filter((i, value) => value !== key);

        setImages(filtered);
        console.log(filtered);
    };

    return (
        <>
            <div className={styles.uploaderTitle}>Upload images here</div>
            <span className={styles.buttonsContainer}>
                <motion.label
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                    htmlFor="uploader"
                >
                    Add files
                </motion.label>
                {images.length !== 0 && (
                    <button onClick={e => uploadFiles(e)} className={styles.publishButton}>
                        Save & share
                    </button>
                )}
            </span>
            <input
                type="file"
                name="uploader"
                multiple
                accept="image/*"
                id="uploader"
                onChange={setPreviews}
            />
            <Gallery gallery={images} deleteFile={deleteFile} />
        </>
    );
};

export default Uploader;
