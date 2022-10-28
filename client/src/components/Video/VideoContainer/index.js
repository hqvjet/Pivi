import React from "react"
import styles from './VideoContainer.module.css'
import ReactPlayer from "react-player"

export default function VideoContainer(props) {

    return (
        <>
            <div className={styles.main}>
                <ReactPlayer
                    url={`https://www.youtube.com/embed/${props.data.id.videoId}`}
                    width={'750px'}
                    height={'400px'}
                    playing={true}
                    controls={true}
                />
            </div>
        </>
    )

}