import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CopyRight from "./CopyRight";
import {postDataForSignUp} from "../api/SignUp";
import {IconButton, Snackbar} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

export default function SignUp() {

    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState('')

    useEffect(() => {
        if(localStorage.getItem('PiviUser') !== null)
           window.location.href = '/'
    }, [])

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpen(false)}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Fragment>
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('email') === '' || data.get('username') === '' || data.get('password') === '')
            setAlert('Null Value Is Not Allowed!')

        if (data.get('agreed') !== null) {
            postDataForSignUp(data.get('email'), data.get('username'), data.get('password'))
                .then(() => {
                    setAlert('Register Successful, Please Sign In!')
                })
                .catch(err => {
                    setAlert(err.response.data.error)
                })
        }

        else
            setAlert('You Must Agree Our Term And Policy To Register!')
        setOpen(true)
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Snackbar
                                open={open}
                                autoHideDuration={10000}
                                message={alert}
                                onClose={() => setOpen(false)}
                                action={action}
                            />
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="un"
                                    label="User Name"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="agreed" color="primary" name='agreed'/>}
                                    label="I have read Pivi's Term And Policy and have agreed."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <CopyRight sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}