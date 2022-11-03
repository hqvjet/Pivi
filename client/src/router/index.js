import React, {useEffect, useState} from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

//components
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import styles from './Global.css'
import Video from "../pages/Video";

export default function Routers() {

    return (
        <>
            <div className={styles.main}>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/watch/v=:videoID' element={<Video/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )

}