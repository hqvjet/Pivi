import React from "react"
import styles from './NavBar.module.css'
import {URL_HOME} from "../../constants/url";


export default function NavBar() {

    return (
        <>
            <div className={styles.NavBar}>
                <div className={styles.left}>
                    <div className={styles.menuIcon}>
                        <i className="fa-sharp fa-solid fa-bars" id={styles['menu']}></i>
                    </div>
                    <div>
                        <a href={URL_HOME}>

                        </a>
                    </div>
                </div>
                <div className={styles.center}>

                </div>
                <div className={styles.right}>

                </div>
            </div>
        </>
    )

}