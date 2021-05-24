import { firestore, auth } from './base'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './profile.scss'
import { useState } from 'react';


const InputForms = () => {
    
    const history = useHistory();
    const [username, setUsername] = useState('username');
    const [age, setAge] = useState('age');
    const [phone, setPhone] = useState();
    
    const logout = async () => {
        try {
            const userSignOut = await auth.signOut()
            history.push('./')
        } catch(e) {
            alert(e)
        }
    }
    const saveProfile = () => {
        let user = auth.currentUser;
        console.log(auth.currentUser.uid);  
        //
        // firestore.collection(user.uid).add({
        //     username: username,
        //     age: age,
        //     phone: user.phoneNumber,
        // })
         
    }
    

    return(
        <div className='container'>
            <section className='wrapper center-align '>
                <img src="https://images.unsplash.com/photo-1509768368676-f3c3b060679d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80" className="image--cover"/>
            </section>
            <main className='center-align'>
                <ul className="collection">

                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="last_name" type="text" className="validate"/>
                            <label for="last_name">{ username }</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="age" type="number" className="validate"/>
                            <label for="age">{ age }</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="phone" type="number" className="validate"/>
                            <label for="phone">{ phone }</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="email" type="email" className="validate"/>
                            <label for="email">Email</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="password" type="password" className="validate"/>
                            <label for="password">Password</label>
                        </div>
                    </li>

                </ul>
                <div className='btn-container'>
                    <a onClick={saveProfile} className="waves-effect waves-light indigo btn-large">SAVE PROFILE</a>
                    <a onClick={logout} className="waves-effect waves-light red btn-large">log out</a>
                </div>
            </main>
        </div>
    )
}


const Profile = () => {
    return (
        <div>
            <InputForms />
        </div>
    )   
}

export default Profile;