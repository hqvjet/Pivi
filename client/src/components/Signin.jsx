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
import Copyright from "./CopyRight";
import {postDataForSignIn} from "../api/SignIn";
import {useEffect, useState} from "react";
import {IconButton, Snackbar} from "@mui/material";
import {Fragment} from "react";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

export default function SignIn() {

    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
        if (data.get('un') === '' || data.get('password') === '')
            setAlert('Null Value Is Not Allowed!')
        else
            postDataForSignIn(data.get('un'), data.get('password'))
                .then(res => {
                    localStorage.setItem('PiviUser', JSON.stringify(res))
                    window.location.href = '/'
                })
                .catch(err => setAlert(err.response.data.error))

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Snackbar
                            open={open}
                            autoHideDuration={10000}
                            message={alert}
                            onClose={() => setOpen(false)}
                            action={action}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="un"
                            label="User Name"
                            name="un"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color='primary' id='remember' name='remember' onClick={() => setShowPassword(!showPassword)}/>}
                            label="Show Password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}