import { useRef, useEffect } from 'react';
import M from 'materialize-css'
import './friendrequests.scss'

const FriendRequestList = () => {
    return (
        <li className="collection-item friend-requests-list valign-wrapper">
            <i className="material-icons medium">account_circle</i>
            <span className='friend-requests-username'> Username</span>
            <div className='accept-delete-btn'>
                <a href='#' className="waves-effect waves-light green btn-small accept-btn">Accept</a>
                <a href='#' className="waves-effect waves-light red btn-small delete-btn">Delete</a>
            </div>
        </li>

    )
}



const FriendRequests = () => {

    const elementRef = useRef();

    useEffect(() => {
        const modalRef = elementRef.current
        let instances = M.Modal.init(modalRef, {})
    }, [])

    return (
        <div className='container'>
            <header className='center-align'> <h4>FRIEND REQUESTS</h4>
                <a className="waves-effect waves-light indigo btn modal-trigger" href="#modal1" >Add Friend</a>
                <div id="modal1" className="modal" ref={elementRef} >
                    <div className="modal-content">
                        <li className="collection-item avatar valign-wrapper">
                            <div className="input-field">
                                <input id="phone" type="text" className="validate" />
                                <label for="phone">Search by username</label>
                            </div>
                        </li>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect indigo white-text waves-green btn-flat">Send Requests</a>
                    </div>
                </div>
            </header>
            <main className='center-align friend-requests-container'>
                <ul className="collection">

                    <FriendRequestList />
                </ul>
            </main>
        </div>
    )
}

export default FriendRequests;