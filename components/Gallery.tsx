import Image from 'next/image';
import styles from '../styles/Gallery.module.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';

type GalleryProps = {
    gallery: string[];
    deleteFile: Function;
};

const Gallery = ({ gallery, deleteFile }: GalleryProps) => {
    // console.log(gallery);

    return (
        <div className={styles.galleryContainer}>
            {gallery &&
                gallery.map(img => (
                    <div className={styles.imageContainer} key={img}>
                        <RiDeleteBin2Fill onClick={() => deleteFile(img)} />
                        <Image
                            src={img}
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
