import React from "react"
import Button from "../Button";
import ButtonStyles from '../Button/Button.module.css'
import styles from './SearchBar.module.css'
import axios from "axios";

export default function SearchBar(props) {

    const onSubmitted = () => {

    }

    return (
        <>
            <input
                type='text'
                id={props.id}
                className={`${styles.searchBar} ${props.styles}`}
                placeholder={props.PH}
            />
            <Button styles={ButtonStyles.primary} type='submit' clicked={onSubmitted}
                customStyles={{
                    backgroundColor: '#CCCCCC',
                    fontSize: '1.3em'
                }}
            >
                <i className={`fa-solid fa-magnifying-glass`}></i>
            </Button>
        </>
    )

}