import React, { useEffect, useState } from 'react'
import firebase, { firestore, auth } from './base'
import './login.scss'

const PhoneAuth = () => {
    const [input, setInput] = useState('89900749');
    const [confirmCode, setConfirmCode] = useState('');
    const [sentCode, setSentCode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            // 'size': 'invisible',
            // 'callback': (response) => {

            // }
        })
    }, []);
    
    const sendConfirmCode = async () => {
        setLoading(true);
        const appVerifier = window.recaptchaVerifier;
        console.log(appVerifier);

        try {
            window.confirmationResult = await auth.signInWithPhoneNumber(`+976 ${ input }`, appVerifier);
            setSentCode(true);
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const login = async () => {
        try {
            const user = await window.confirmationResult.confirm(confirmCode);
            console.log(user)
        } catch(e) {
            console.log(e);
            alert('Wrong code')
        }        
    }
    
    return (
        <div className='App container'>
            <input
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder = 'Phone number'
            />

            {!sentCode && <button onClick={sendConfirmCode}>Continue</button> }
            {
                sentCode && (
                    <>
                        <input
                            value={confirmCode}
                            onChange={event => setConfirmCode(event.target.value)}
                            placeholder = 'Verification code'
                            />
                        <button onClick={login}>Log</button>
                    </>
                )
            }
            <div id='sign-in-button'></div>
        </div>
    )

}

export default PhoneAuth;