import React from "react";
import styles from './Button.module.css'

export default function Button(props) {

    return(
        <>
            <button
                className={`${styles.btn} ${props.styles}`}
                id={props.id}
                type={props.type}
                onClick={props.action}
                style={props.customStyles}
            >
                {props.children}
            </button>
        </>
    )

}