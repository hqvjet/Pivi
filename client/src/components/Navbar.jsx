import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

import {logo} from "../utils/constants";
import {SearchBar} from "./";
import React, {useEffect, useState} from "react";
import UserBar from "./UserBar";

const Navbar = () => {

    return (
        <Stack direction="row" alignItems="center" p={2}
               sx={{
                   position: 'sticky', background: '#000', top: 0, justifyContent: "space-between",
                   borderStyle: 'none none solid none', borderColor: 'gray', height: '40px'
               }}>
            <Link to="/" style={{display: "flex", alignItems: "center"}}>
                <img src={logo} alt="logo" height={45}/>
            </Link>
            <SearchBar/>
            <UserBar/>
        </Stack>
    );
}
export default Navbar;
