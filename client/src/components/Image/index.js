import React from "react"
import styles from './Image.module.css'

export default function Image(props) {

    return (
        <>
            <img
                id={props.id}
                alt={props.alt}
                className={props.styles}
                src={props.src}
                style={props.customStyles}
            />
        </>
    )

}