import { firestore, auth } from './base'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './profile.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const Profile = ({ user, setUser }) => {

    const [profile, setProfile] = useState({});
    const history = useHistory();

    const logout = async () => {
        try {
            await auth.signOut()
            history.push('/login')
        } catch (e) {
            alert(e)
        }
    }


    const saveProfile = async () => {

        try {
            await firestore.doc(`users/${user.uid}`).set({
                ...user,
                ...profile
            })
            history.push('/')

        } catch (e) {
            console.error(e);
        }

        setUser(profile);

    }

    return (
        <div className='container'>
            <section className='wrapper center-align '>
                <img src="https://images.unsplash.com/photo-1509768368676-f3c3b060679d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80" className="image--cover" />
            </section>
            <main className='center-align'>
                <ul className="collection">

                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input onChange={(e) => { setProfile({ ...user, username: e.target.value }) }}
                                defaultValue={user.username}
                                placeholder='Username'
                                id="last_name" type="text" className="validate" />
                        </div>
                        <Link className="waves-effect waves-light indigo btn-small">location</Link>
                    </li>

                </ul>
                <div className='btn-container'>
                    <Link onClick={saveProfile} className="waves-effect waves-light indigo btn-large">SAVE PROFILE</Link>
                    <Link onClick={logout} className="waves-effect waves-light red btn-large">log out</Link>
                </div>
            </main>
        </div>
    )
}


export default Profile;