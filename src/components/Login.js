import React, { useEffect, useState } from 'react'
import firebase, { firestore, auth } from './base'
import './login.scss'
import { useHistory } from "react-router-dom";


const PhoneAuth = () => {
    const [input, setInput] = useState('88888888');
    const [confirmCode, setConfirmCode] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const history = useHistory();

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            // 'size': 'invisible',
            // 'callback': (response) => {
            // }
        });

        auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        });
    }, []);

    const sendConfirmCode = async () => {
        setLoading(true);
        const appVerifier = window.recaptchaVerifier;
        console.log(appVerifier);

        try {
            window.confirmationResult = await auth.signInWithPhoneNumber(`+976 ${input}`, appVerifier);
            setSentCode(true);
            history.push('./profile')
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const login = async () => {
        try {
            const user = await window.confirmationResult.confirm(confirmCode);
            console.log(user)

        } catch (e) {
            console.log(e);
            alert('Wrong code')
        }
    }

    return (
        <div>
            <input
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder='Phone number'
            />

            {
                !sentCode &&
                <a href="#!" onClick={sendConfirmCode} className="modal-close waves-effect indigo white-text waves-green btn-flat">Send Verification code</a>
            }

            {
                sentCode && (
                    <>
                        <input
                            value={confirmCode}
                            onChange={event => setConfirmCode(event.target.value)}
                            placeholder='Verification code'
                        />
                        <a href="#!" onClick={login} className="modal-close waves-effect indigo white-text waves-green btn-flat">Enter</a>

                    </>
                )
            }
            <div id='sign-in-button'></div>
        </div>
    )




}

const Login = () => {

    return (
        <div class="container row card-container">
            <div class="login-card card center-align">
                <div class="card-content black-text">
                    <span class="card-title ">Log In </span>
                    <PhoneAuth />
                </div>
            </div>
        </div>
    )
}




export default Login;