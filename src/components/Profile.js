import './profile.scss'

const InputForms = () => {
    return(
        <div className='container'>
            <section className='wrapper center-align '>
                <img src="https://images.unsplash.com/photo-1509768368676-f3c3b060679d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80" class="image--cover"/>
            </section>
            <main className='center-align'>
                <ul className="collection">

                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="last_name" type="text" className="validate"/>
                            <label for="last_name">Username</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="birthday" type="text" className="validate"/>
                            <label for="birthday">Birthday</label>
                        </div>
                    </li>
                    
                    <li className="collection-item avatar valign-wrapper">
                        <i className="material-icons medium">account_circle</i>
                        <div className="input-field">
                            <input id="phone" type="number" className="validate"/>
                            <label for="phone">Phone</label>
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

                <a class="waves-effect waves-light indigo btn-large">SAVE PROFILE</a>
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