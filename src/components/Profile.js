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
                ...profile,
            })
            history.push('/')

        } catch (e) {
            console.error(e);
        }

        setUser(profile);
        console.log(user);
    }

    return (
        <div className='container'>
            <section className='wrapper center-align '>
                <img alt='' src={user.image} className="image--cover" />
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