import styles from '../styles/BoardPreview.module.css';
import { supabaseHost } from '../lib/constants';
import Image from 'next/image';

interface BoardPreview {
    boardItem: {
        id: number;
        images: string[];
        board_title: string;
    };
}
[];

function BoardPreview({ boardItem }: BoardPreview) {
    return (
        <div key={boardItem.id} className={styles.boardItemContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src={supabaseHost + boardItem.images[0]}
                    layout="fill"
                    // width="100%"
                    // height="100%"
                    objectFit="cover"
                    alt="image in board"
                />
            </div>
            <div className={styles.boardTitle}>{boardItem.board_title || 'untitled'} </div>
        </div>
    );
}

export default BoardPreview;
