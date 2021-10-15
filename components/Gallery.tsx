import Image from 'next/image';
import styles from '../styles/Gallery.module.css';

function Gallery({ gallery }: { gallery: string[] }) {
    return (
        <div className={styles.galleryContainer}>
            {gallery &&
                gallery.map(img => (
                    <div className={styles.imageContainer} key={img}>
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
}

export default Gallery;
