import React from 'react'

// Components
import styles from './VideoDescription.module.css'
import Button from "../../Button";
import ButtonStyles from '../../Button/Button.module.css'

export default function VideoDescription(props) {

    return (<>
        <div className={styles.main}>
            <div className={styles.container}>
                {props.isLoading && (
                    <>
                        <h2>{props.video.snippet.title}</h2>
                        <div className={styles.interactedField}>
                            <p>{`${props.statistic.statistics.viewCount} views`}</p>
                            <div className={styles.like}>
                                <i className={`fa-regular fa-heart ${styles.likeIcon}`}></i>
                                <p>{`${props.statistic.statistics.likeCount}`}</p>
                            </div>
                            <i className={`fa-solid fa-flag ${styles.reportIcon}`}></i>
                        </div>
                        <div className={styles.channelContainer}>
                            <img src={props.channel.snippet.thumbnails.default.url} alt='channel'
                                 className={styles.channelImg}/>
                            <div className={styles.subscribe}>
                                <h3 className={styles.title}>{props.channel.snippet.channelTitle}</h3>
                                <Button styles={ButtonStyles.outline} type='button'
                                        customStyles={{color: 'white', marginTop: '-15px'}} action={() => {
                                }}>Subscribe Now!</Button>
                            </div>
                        </div>
                        <p>{props.video.snippet.description}</p>
                    </>)}
            </div>
        </div>
    </>)

}