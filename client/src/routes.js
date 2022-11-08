import {Box} from "@mui/material";
import {ChannelDetail, Feed, Navbar, SearchFeed, VideoDetail} from "./components";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Signin';
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

export default function Router() {

    return (
        <>
            <BrowserRouter>
                <Box sx={{backgroundColor: '#000'}}>
                    <Navbar/>
                    <Routes>
                        <Route exact path='/' element={<Feed/>}/>
                        <Route path='/video/:id' element={<VideoDetail/>}/>
                        <Route path='/channel/:id' element={<ChannelDetail/>}/>
                        <Route path='/search/:searchTerm' element={<SearchFeed/>}/>
                        <Route path='/sign-in' element={<SignIn/>}/>
                        <Route path='/sign-up' element={<SignUp/>}/>
                    </Routes>
                </Box>
            </BrowserRouter>
        </>
    )

}