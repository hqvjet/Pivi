import React, {useEffect, useState} from "react"
import styles from './VideoCards.module.css'
import {getAPI} from "../../../api/YoutubeAPI";

export default function VideoCards(props) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
            const handleData = new Promise(res => {
                const getData = getAPI(sessionStorage.getItem('keyword'), 'video', 5)
                res(getData)
            })

            handleData.then(res => {
                console.log(res)
                setData(res)
                setLoading(true)
            })
        }
        , [props.getSearchText]
    )

    const VidItems = (props) => {
        const item = props.value
        return (
            <div className={styles.gridItem}
                 onClick={() => {
                     sessionStorage.setItem('video', JSON.stringify(item))
                     window.location.href = '/watch'
                 }
                 }>
                <img
                    onMouseOver={({target}) => {
                        target.style.opacity = '0.7'
                        target.style.cursor = 'pointer'
                    }}
                    onMouseOut={({target}) => {
                        target.style.opacity = '1'
                        target.style.cursor = 'default'
                    }}
                    className={styles.videoFrame}
                    src={item.snippet.thumbnails.medium.url} alt='img'/>
                <h6>{`Channel: ${item.snippet.channelTitle}`}</h6>
                <h5>{`Title: ${item.snippet.title}`}</h5>
            </div>
        )
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.gridSystem}>
                    {loading && (
                        <>
                            {data.items.map((item) =>
                                <VidItems key={item.id.videoId} value={item}/>)}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}