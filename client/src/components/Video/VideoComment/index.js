import React from "react"

// Components
import styles from './VideoComment.module.css'

export default function VideoComment(props) {

    return (
        <>
            <div className={styles.main}>
                <div className={styles.VideoComment}>
                    <div className={styles.userCommentField}>
                        <div className={styles.user}>

                        </div>
                        <div className={styles.chatbox}>

                        </div>
                        <div className={styles.send}>

                        </div>
                    </div>
                    <div className={styles.commentContainer}>
                        {props.loading && (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}