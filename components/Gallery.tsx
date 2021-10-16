import Image from 'next/image';
import styles from '../styles/Gallery.module.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';

type GalleryProps = {
    gallery: { preview: string; file: object; filePath: string }[];
    deleteFile: Function;
};

const Gallery = ({ gallery, deleteFile }: GalleryProps) => {
    console.log(gallery);

    return (
        <div className={styles.galleryContainer}>
            {gallery &&
                gallery.map((img, i) => (
                    <div className={styles.imageContainer} key={i}>
                        <RiDeleteBin2Fill onClick={() => deleteFile(i)} />
                        <Image
                            src={img.preview}
                            height="100%"
                            width="100%"
                            layout="responsive"
                            objectFit="contain"
                            alt="image"
                        />
                    </div>
                ))}
        </div>
    );
};

export default Gallery;
