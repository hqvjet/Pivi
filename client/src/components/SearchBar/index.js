import React from "react"

export default function SearchBar(props) {

    return (
        <>
            <input
                type='text'
                id={props.id}
                className={props.class}
            />
            <button/>
        </>
    )

}