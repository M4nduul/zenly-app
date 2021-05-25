import { firestore, auth } from './base'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './profile.scss'
import { useState } from 'react';


const Profile = () => {
    
    const history = useHistory();
    const [profile, setProfile] = useState({
        username: 'Ner',
        age: 'Nas',
        email: 'Email hayag'
    });
    
    const logout = async () => {
        try {
            const userSignOut = await auth.signOut()
            history.push('./home')
        } catch(e) {
            alert(e)
        }
    }
    const saveProfile = async () => {
        let user = auth.currentUser;        

        try {
            console.log(profile);
            await firestore.collection('users').doc(user.uid).set({
                username: profile.username,
                age: profile.age,
                phone: user.phoneNumber,
                email: profile.email
            })
            console.log('Successful');
        } catch(e) {
            console.log(e); 
        }
         
    }

    const b = {
        b: 3
    }
    const a = {
        b:1,
        ...b,
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
                            <input onChange={(e) => {setProfile({...profile, username: e.target.value})}} id="last_name" type="text" className="validate"/>
                            <label for="last_name">{ profile.username }</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input onChange={(e) => {setProfile({...profile, age: e.target.value})}} id="age" type="text" className="validate"/>
                            <label for="age">{ profile.age }</label>
                        </div>
                    </li>
                    
                    {/* <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="phone" type="number" className="validate"/>
                            <label for="phone">{ profile.phone }</label>
                        </div>
                    </li> */}
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input onChange={(e) => {setProfile({...profile, email: e.target.value})}} id="email" type="email" className="validate"/>
                            <label for="email">{ profile.email }</label>
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


export default Profile;