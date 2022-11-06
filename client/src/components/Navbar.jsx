import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

import {logo} from "../utils/constants";
import {SearchBar} from "./";
import React, {useEffect, useState} from "react";
import Login from "./Signin";
import User from "./User";

const Navbar = () => {
    const [token, setToken] = useState('')
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('PiviUser') !== null)
            setToken(localStorage.getItem('PiviUser'));
    }, [localStorage.getItem('PiviUser')])

    const DropDown = () => (
        <>

        </>
    )


    return (
        <Stack direction="row" alignItems="center" p={2}
               sx={{position: 'sticky', background: '#000', top: 0, justifyContent: "space-between"}}>
            <Link to="/" style={{display: "flex", alignItems: "center"}}>
                <img src={logo} alt="logo" height={45}/>
            </Link>
            <SearchBar/>
            <Button variant='outlined'
                    onClick={token === '' ?
                        () => {
                            window.location.href = '/sign-in'
                        } :
                        () => {
                            setClicked(!clicked)
                        }
                    }>
                {token === '' ? (<>Sign In</>) : (<>{JSON.parse(localStorage.getItem('PiviUser')).username}</>)}
            </Button>
            <DropDown/>
        </Stack>
    );
}
export default Navbar;
