import React, {useEffect} from "react"
import styles from '../style/HomePage.module.css'
import axios from "axios"
import Auth from "./Auth";
import {getAPI} from "../api/YoutubeAPI";
import VideoCards from "../components/Video/VideoCards";

export default function HomePage(props) {

    // useEffect(() => {
    //     getAPI()
    // }, [])

    return (
        <>
            <div className={styles.HomePage}>
                <VideoCards getSearchText={props.getSearchText} setVideo={props.setVideo} getVideo={props.getVideo}/>
            </div>
        </>
    )

}