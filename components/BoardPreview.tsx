import { motion as m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { supabaseHost } from '../lib/constants'
import { Board } from '../pages/myboards'
import s from '../styles/BoardPreview.module.css'
import { boardItemAnimation } from '../styles/framer'

export interface boardPreview {
    boardItem: Board
}
;[]

function BoardPreview({ boardItem }: boardPreview) {
    return (
        <Link href={'/' + boardItem?.uuid} passHref>
            <m.li
                variants={boardItemAnimation}
                className={s.boardItemContainer}
                key={boardItem?.id}
            >
                <div className={s.imageContainer}>
                    <Image
                        src={supabaseHost + boardItem?.images[0]}
                        layout="fill"
                        objectFit="cover"
                        alt="image in board"
                        quality={35}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMNgYAAO8AkE7ayCwAAAAASUVORK5CYII="
                    />
                </div>
                <div className={s.boardTitle}>
                    {boardItem?.board_title || 'untitled'}{' '}
                </div>
            </m.li>
        </Link>
    )
}

export default BoardPreview
