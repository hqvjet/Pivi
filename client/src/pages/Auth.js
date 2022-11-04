import React, {useState} from "react"
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//components
import styles from '../style/Auth.module.css'
import signinBG from '../resources/signin_bg.jpg'
import Button from "../components/Button";
import buttonStyles from '../components/Button/Button.module.css'
import {Login, Register} from "../api/user/AuthAPI";

export default function Auth() {
    //States
    const [topic, setTopic] = useState('Sign In')
    const [actionContent, setActionContent] = useState('Don\'t have any account ?')
    const [action, setAction] = useState('SIGN UP HERE')
    const [signinContent, setSigninContent] = useState('Login')
    const [mode, setMode] = useState(true) //true -> sign in , false -> sign up
    const [succeed, setSucceed] = useState(null)

    //variables
    const toastStyles = type => {
        return {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: type
        }
    }

    const switchMode = () => {
        if (topic === 'Sign In') {
            setTopic('Sign Up')
            setActionContent('Already have account ?')
            setAction('Sign In Here')
            setSigninContent('Sign Up For Free')
            setMode(!mode)
        } else {
            setTopic('Sign In')
            setActionContent('Don\'t have any account ?')
            setAction('SIGN UP HERE')
            setSigninContent('Login')
            setMode(!mode)
        }
    }

    const getUserInput = () => {
        const un = document.getElementById('un').value
        const pw = document.getElementById('pw').value
        if (!mode) {
            const cpw = document.getElementById('cpw').value
            return {
                username: un,
                password: pw,
                confirmPassword: cpw
            }
        }

        return {
            username: un,
            password: pw
        }


    }

    const doSubmit = async e => {
        e.preventDefault()
        const data = getUserInput()
        if (!mode)
            toast(await Register(data), toastStyles('error'))
        else
            toast(await Login(data))
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <img src={signinBG} alt='bg' className={styles.bg}/>
                        <div className={styles.bgContent}>
                            <h1>The Largest Video Library</h1>
                            <h3>Endless entertainment</h3>
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.rightSideContainer}>
                            <h1 className={styles.topic}>{topic}</h1>
                            <form className={styles.form} onSubmit={doSubmit}>
                                <h3>Username</h3>
                                <input type='text' id='un' className={styles.input} defaultValue='' autoComplete='off'/>
                                <h3>Password</h3>
                                <input type='password' id='pw' className={styles.input} defaultValue=''/>
                                {!mode && (
                                    <>
                                        <h3>Confirm Password</h3>
                                        <input type='password' id='cpw' className={styles.input} defaultValue=''/>
                                    </>
                                )
                                }
                                <Button type='submit' styles={buttonStyles.outline}
                                        customStyles={{
                                            color: 'white',
                                            marginTop: '20px',
                                            padding: '10px'
                                        }}>{signinContent}</Button>
                                <p className={styles.link}>
                                    {actionContent}
                                    <Button
                                        type='button'
                                        style={buttonStyles.primary}
                                        customStyles={{
                                            marginLeft: '5px'
                                        }}
                                        action={switchMode}>
                                        {action}
                                    </Button>
                                </p>
                                {!mode && (
                                    <p className={styles.term}>By clicking the "Sign up for free" button,
                                        you are creating an account, and agree to Pivi'
                                        Terms of Service and Privacy Policy</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
            </div>
        </>
    )

}