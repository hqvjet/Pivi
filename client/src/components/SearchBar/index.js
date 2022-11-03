import React, {useEffect} from "react"
import Button from "../Button";
import ButtonStyles from '../Button/Button.module.css'
import styles from './SearchBar.module.css'

export default function SearchBar(props) {

    const onSubmitted = searchText => {
        sessionStorage.setItem('keyword', searchText)
        window.location.href = '/'
    }

    const handleInput = e => {

        const searchText = document.getElementById(props.id).value
        if (e.key === 'Enter' && searchText !== '') {
            onSubmitted(searchText)
        }
    }

    return (
        <>
            <input
                type='text'
                id={props.id}
                className={`${styles.searchBar} ${props.styles}`}
                placeholder={props.PH}
                defaultValue={sessionStorage.getItem('keyword')}
                onKeyPress={handleInput}
            />
            <Button styles={ButtonStyles.primary} type='button' action={onSubmitted}
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