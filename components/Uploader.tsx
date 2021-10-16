import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BOARDS_BUCKET } from '../lib/constants';
import { v4 as uuidv4 } from 'uuid';
import Gallery from './Gallery';

export interface Gallery {
    preview: string;
    file: object;
    filePath: string;
}
[];

const Uploader = () => {
    const [images, setImages] = useState<Gallery[]>([]);

    // console.log(images);

    async function setPreviews(e: any) {
        e.preventDefault();
        try {
            const files = e.target.files;

            let previewsArray: Gallery[] = [];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = fileName;

                // let { error: uploadError } = await supabase.storage
                //     .from(BOARDS_BUCKET)
                //     .upload(filePath, file);

                // if (uploadError) {
                //     throw uploadError;
                // } else {
                const url = URL.createObjectURL(file);
                previewsArray.push({ preview: url, file: file, filePath: filePath });
                // }
            }

            setImages([...images, ...previewsArray]);
        } catch (error: any) {
            console.log('Error downloading image: ', error.message);
        }
    }

    const deleteFile = (key: number) => {
        const filtered = images.filter((i, value) => value !== key);

        setImages(filtered);
        console.log(filtered);
    };

    return (
        <>
            <input type="file" multiple accept="image/*" id="uploader" onChange={setPreviews} />
            <Gallery gallery={images} deleteFile={deleteFile} />
        </>
    );
};

export default Uploader;
