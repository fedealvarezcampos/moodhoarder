import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BOARDS_BUCKET } from '../lib/constants';
import { v4 as uuidv4 } from 'uuid';
import Gallery from './Gallery';

const Uploader = () => {
    const [gallery, setGallery] = useState<Array<string>>([]);
    const [images, setImages] = useState<Array<object>>([]);

    console.log(images);

    // console.log(avatarUrl);

    async function setPreviews(e: any) {
        e.preventDefault();
        try {
            const files = e.target.files;
            setImages([...images, ...files]);

            let previewsArray: Array<string> = [...gallery];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = `${fileName}`;

                // let { error: uploadError } = await supabase.storage
                //     .from(BOARDS_BUCKET)
                //     .upload(filePath, file);

                // if (uploadError) {
                //     throw uploadError;
                // } else {
                const url = URL.createObjectURL(file);
                previewsArray.push(url);
                // }
            }

            setGallery(previewsArray);
        } catch (error: any) {
            console.log('Error downloading image: ', error.message);
        }
    }

    const deleteFile = (key: string) => {
        const filteredPreviews = gallery.filter(index => index !== key);
        const filteredImages = gallery.filter(index => index !== key);

        setGallery(filtered);
        console.log(filtered);
    };

    return (
        <>
            <input type="file" multiple accept="image/*" id="uploader" onChange={setPreviews} />
            <Gallery gallery={gallery} deleteFile={deleteFile} />
        </>
    );
};

export default Uploader;
