import React from "react"
import {Button, Fade, Menu, MenuItem, Stack} from "@mui/material";
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import LogoutIcon from '@mui/icons-material/Logout';
import {useEffect, useState} from "react";

export default function UserBar(props) {

    const [token, setToken] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('PiviUser')
        window.location.href = '/'
    }

    useEffect(() => {
        if (localStorage.getItem('PiviUser') !== null)
            setToken(localStorage.getItem('PiviUser'));
    }, [localStorage.getItem('PiviUser')])

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={token === '' ?
                    () => {
                        window.location.href = '/sign-in'
                    } :
                    handleClick
                }
            >
                {token === '' ? (<>Sign In</>) : (<>{JSON.parse(localStorage.getItem('PiviUser')).username}</>)}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                <Button startIcon={<PersonalVideoIcon/>}>Storage</Button>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <Button startIcon={<LogoutIcon/>} onClick={logout}>Logout</Button>
            </Menu>
        </div>
    )
}