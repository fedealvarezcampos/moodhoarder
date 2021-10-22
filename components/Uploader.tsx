import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { BOARDS_BUCKET } from '../lib/constants';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { notifyMessage } from '../assets/toasts';
import { v4 as uuidv4 } from 'uuid';
import ShortUniqueId from 'short-unique-id';
import Gallery from './Gallery';
import styles from '../styles/Uploader.module.css';

export interface Gallery {
    preview: string;
    file: any;
    filePath: string;
}
[];
export interface Uploader {
    setNote: Function;
    images: { file: File; filePath: string; preview: string }[];
    setImages: Function;
}

const Uploader = ({ setNote, images, setImages }: Uploader) => {
    const router = useRouter();
    const uid = new ShortUniqueId({ length: 16 });

    const [uploadButtonLabel, setUploadButtonLabel] = useState<string>('Save & share');

    console.log(images);

    async function setPreviews(e: any) {
        e.preventDefault();
        try {
            const files = e.target.files;

            let previewsArray: Gallery[] = [];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;

                const url = URL.createObjectURL(file);
                previewsArray.push({ preview: url, file: file, filePath: fileName });
            }

            setImages([...images, ...previewsArray]);
        } catch (error: any) {
            console.log('Error: ', error.message);
        }
    }

    const uploadFiles = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const uuid: string = uid();
            let urls: string[] = [];
            setUploadButtonLabel('Saving board...');

            for (const image of images) {
                const fileName = image.filePath;
                const file = image.file;

                let { error: uploadError } = await supabase.storage
                    .from(BOARDS_BUCKET)
                    .upload(fileName, file);

                if (uploadError) {
                    throw uploadError;
                }

                urls.push(fileName);
            }

            const { data, error } = await supabase.from('boards').insert([{ uuid: uuid, images: urls }]);

            if (error) {
                throw error;
            }

            router.push(uuid);

            navigator.clipboard.writeText(window.location.href + uuid);

            data && setNote(true);
            setImages([]);
            notifyMessage('Board url copied to clipboard!');
        } catch (error: any) {
            console.log('Error: ', error.message);
        }
    };

    const deleteFile = (key: string) => {
        const filtered = images.filter((i: any, value: any) => i.preview !== key);

        setImages(filtered);
    };

    return (
        <>
            <div className={styles.uploaderTitle}>UPLOAD IMAGES HERE</div>
            <span className={styles.buttonsContainer}>
                <motion.label
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                    htmlFor="uploader"
                >
                    Add files
                </motion.label>
                {images.length !== 0 && (
                    <motion.button
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={e => uploadFiles(e)}
                        className={styles.publishButton}
                    >
                        {uploadButtonLabel}
                    </motion.button>
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
            <Gallery deleteFile={deleteFile} items={images} setItems={setImages} />
        </>
    );
};

export default Uploader;
