import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { BOARDS_BUCKET } from '../lib/constants';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { notifyError, notifyMessage } from '../assets/toasts';
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
    const user = supabase.auth.user();

    const router = useRouter();
    const uid = new ShortUniqueId({ length: 16 });

    const [uploadButtonLabel, setUploadButtonLabel] = useState<string>('Save & share');
    const [boardName, setBoardName] = useState('');

    async function setPreviews(e: any) {
        e.preventDefault();
        try {
            const files = e.target.files;

            let previewsArray: Gallery[] = [];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();

                if (fileExt !== 'jpg' && fileExt !== 'png' && fileExt !== 'jpeg' && fileExt !== 'webp') {
                    notifyError('File/s must be jpg | webp | png!');
                    return;
                }

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

            const { data, error } = await supabase
                .from('boards')
                .insert([
                    { uuid: uuid, images: urls, owner_uid: user?.id || null, board_title: boardName || null },
                ]);

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
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={styles.uploaderTitle}
            >
                UPLOAD IMAGES HERE
            </motion.div>
            <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={styles.buttonsContainer}
            >
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
            </motion.span>
            {images.length !== 0 && (
                <input
                    type="text"
                    name="boardName"
                    id="boardName"
                    placeholder="Name this board!"
                    onChange={e => setBoardName(e.target.value)}
                    className={styles.boardNameInput}
                />
            )}
            <input
                type="file"
                name="uploader"
                multiple
                accept="image/jpeg, image/png, image/webp"
                id="uploader"
                onChange={setPreviews}
            />
            <Gallery deleteFile={deleteFile} items={images} setItems={setImages} />
        </>
    );
};

export default Uploader;
