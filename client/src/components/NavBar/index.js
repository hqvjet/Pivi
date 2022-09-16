import React from "react"
import styles from './NavBar.module.css'
import searchBarStyles from '../SearchBar/SearchBar.module.css'
import {URL_HOME} from "../../constants/urls";
import {LOGO} from "../../constants/images";
import SearchBar from "../SearchBar";
import {PH_SEARCHBAR} from "../../constants/PlaceHolder";
import Button from "../Button";
import ButtonStyles from '../Button/Button.module.css'
import {ANONYMOUS_AVT} from "../../constants/images";
import ImageStyles from '../Image/Image.module.css'
import Image from "../Image";
import axios from "axios";

export default function NavBar() {
    const user = {
        username: 'Viet Hoang',
        password: 'v1231233',
        gmail: 'viethq@gmail.com'
    }

    const openNotification = () => {

    }

    const openAvatar = () => {

    }

    return (
        <>
            <div className={styles.NavBar}>
                <div className={styles.left}>
                    <div className={styles.menuIcon}>
                        <i className="fa-sharp fa-solid fa-bars" id={ImageStyles['menu']}></i>
                    </div>
                    <div>
                        <a href={URL_HOME} className={styles.logoLink}>
                            <div className={styles.logoContainer}>
                                <Image src={LOGO} alt='logo' id={ImageStyles['logo']}/>
                                <h1 className={styles.logoHeader}>Pivi</h1>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.searchBarContainer}>
                        <SearchBar styles={searchBarStyles.outline} PH={PH_SEARCHBAR}
                                   id={searchBarStyles['searchBar']}/>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.userField}>
                        <div className={styles.notifications}>
                            <Button
                                styles={ButtonStyles.primary}
                                clicked={openNotification}
                                customStyles={{
                                    color: 'white',
                                    fontSize: '1.5em'
                                }}
                            >
                                <i className="fa-regular fa-bell"></i>
                            </Button>
                        </div>
                        <div className={styles.user}>
                            <Button
                                styles={ButtonStyles.primary}
                                clicked={openAvatar}
                                type='button'
                                customStyles={{
                                    borderRadius: '100%'
                                }}
                            >
                                <Image src={ANONYMOUS_AVT} alt='avatar' id={ImageStyles['avatar']}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}