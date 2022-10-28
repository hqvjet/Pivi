import React, {useEffect, useState} from "react"

// Components
import styles from '../style/Video.module.css'
import VideoContainer from "../components/Video/VideoContainer"
import VideoDescription from "../components/Video/VideoDescription";
import RelatedVideo from "../components/Video/RelatedVideo";
import PlayList from "../components/Video/PlayList";
import {getAPI, statisticVideo} from "../api/YoutubeAPI";

export default function Video(props) {
    const [loading, setLoading] = useState(false)
    const [channel, setChannel] = useState({})
    const [statistical, setStatistical] = useState({})

    const videoData = JSON.parse(sessionStorage.getItem('video'))
    useEffect(() => {
        async function fetch() {
            const statistic = await statisticVideo(videoData.id.videoId)
            const data = await getAPI(videoData.snippet.channelTitle, 'channel', 1)
            console.log(data)
            console.log(statistic)
            setChannel(data.items[0])
            setStatistical(statistic.items[0])
            setLoading(true)
        }
        fetch()
    }, [])

    console.log(videoData)
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.videoContainer}>
                            <VideoContainer data={videoData}/>
                        </div>
                        <div className={styles.videoDescription}>
                            <VideoDescription video={videoData} channel={channel} isLoading={loading} statistic={statistical}/>
                        </div>
                    </div>
                    <div className={styles.relatedVideo}>
                        <RelatedVideo/>
                    </div>
                    <div className={styles.playList}>
                        <PlayList/>
                    </div>
                </div>
            </div>
        </>
    )

}