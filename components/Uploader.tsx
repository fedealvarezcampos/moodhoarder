import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { BOARDS_BUCKET } from '../lib/constants';
import { v4 as uuidv4 } from 'uuid';
import Gallery from './Gallery';

function Uploader() {
    const [gallery, setGallery] = useState<Array<string>>([]);

    // console.log(avatarUrl);

    async function uploadImages(e: any) {
        e.preventDefault();
        try {
            const files = e.target.files;

            let imageArray: Array<string> = [...gallery];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = `${fileName}`;

                let { error: uploadError } = await supabase.storage
                    .from(BOARDS_BUCKET)
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                } else {
                    const url = URL.createObjectURL(file);
                    imageArray.push(url);
                }
            }

            setGallery(imageArray);
        } catch (error: any) {
            console.log('Error downloading image: ', error.message);
        }
    }

    return (
        <>
            <input type="file" multiple accept="image/*" id="uploader" onChange={uploadImages} />
            <Gallery gallery={gallery} />
        </>
    );
}

export default Uploader;
