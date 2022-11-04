import React, {useEffect, useState} from "react"

// Components
import styles from '../style/Video.module.css'
import VideoContainer from "../components/Video/VideoContainer"
import VideoDescription from "../components/Video/VideoDescription";
import RelatedVideo from "../components/Video/RelatedVideo";
import VideoComment from "../components/Video/VideoComment";
import {getAPI, getVideoDetails, statisticVideo} from "../api/YoutubeAPI";
import {useParams} from "react-router-dom";

export default function Video(props) {
    const [loading, setLoading] = useState(false)
    const [channel, setChannel] = useState({})
    const [statistical, setStatistical] = useState({})
    const [videoData, setVideoData] = useState({id: ''})
    const vidId = useParams()

    useEffect(() => {
        async function fetch() {
            const vData = await getVideoDetails(vidId.videoID)
            console.log(vidId)
            setVideoData(vData.items[0])
        }

        fetch().then()
    }, [])

    useEffect(() => {
        async function fetch() {
            if (videoData.id !== '') {
                const statistic = await statisticVideo(vidId.videoID)
                console.log(videoData)
                const data = await getAPI(videoData.snippet.channelTitle, 'channel', 1)

                setChannel(data.items[0])
                setStatistical(statistic.items[0])

                setLoading(true)
            }
        }

        fetch().then()
    }, [videoData])

    console.log(videoData)
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.row1}>
                        <div className={styles.videoContainer}>
                            <VideoContainer isLoading={loading}/>
                        </div>
                        <div className={styles.videoDescription}>
                            <VideoDescription video={videoData} channel={channel} isLoading={loading}
                                              statistic={statistical}/>
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles.playList}>
                            <VideoComment isLoading={loading}/>
                        </div>
                        <div className={styles.relatedVideo}>
                            <RelatedVideo isLoading={loading}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}