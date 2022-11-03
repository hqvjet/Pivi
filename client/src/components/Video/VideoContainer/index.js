import React from "react"
import styles from './VideoContainer.module.css'
import ReactPlayer from "react-player"
import {useParams} from "react-router-dom";

export default function VideoContainer(props) {
    const vidId = useParams()
    console.log(vidId)
    return (
        <>
            <div className={styles.main}>
                {props.isLoading && (
                    <>
                        <ReactPlayer
                            url={`https://www.youtube.com/embed/${vidId.videoID}`}
                            width={'750px'}
                            height={'400px'}
                            playing={true}
                            controls={true}
                        />
                    </>
                )}

            </div>
        </>
    )

}