import React, {useEffect} from "react"
import styles from './HomePage.module.css'
import axios from "axios"

const videos = [
    {
        Vid: 1,
        videos: 'url',
        duration: '1:45',
        content: 'im content',
        user: 'im channel',
        views: '1B views',
        streamTime: '1 day ago'
    }
]

export default function HomePage() {

    useEffect(() => {
        axios
            .get('/:username')
    }, [])

    return (
        <>
            <div className={styles.HomePage}>
            </div>
        </>
    )

}