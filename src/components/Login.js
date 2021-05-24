import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { firestore, auth } from './base'
import './login.scss'
import { useHistory } from "react-router-dom";


const PhoneAuth = ({ user }) => {
    const [input, setInput] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const history = useHistory();

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
        });

    }, []);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            history.push('./profile')
          } else {
          }
        });
      
      }, [user])
    
    

    const sendConfirmCode = async () => {
        setLoading(true);
        const appVerifier = window.recaptchaVerifier;

        try {
            window.confirmationResult = await auth.signInWithPhoneNumber(`+976 ${input}`, appVerifier);
            setSentCode(true);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }

    const login = async () => {
        try {
            user = await window.confirmationResult.confirm(confirmCode);
            console.log('user', user)


        } catch (e) {
            alert('Wrong code')
            console.log(e);
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
                <a href="#!" onClick={sendConfirmCode} className="modal-close waves-effect indigo white-text waves-green btn-flat">get verification code</a>
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

const Login = ({ user }) => {

    return (
        <div className="container row card-container">
            <div className="login-card card center-align">
                <div className="card-content black-text">
                    <span className="card-title ">Log In </span>
                    <PhoneAuth user={ user }/>
                </div>
            </div>
        </div>
    )
}


export default Login;