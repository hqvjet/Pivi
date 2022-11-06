import React from "react";
import {Avatar, Box} from "@mui/material";

export default function User() {

    return (
        <>
            <Avatar alt='user' src='/resources/images/anonymous.jpg'
                    sx={{
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }}
                    >

            </Avatar>
        </>
    )

}