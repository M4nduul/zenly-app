import { useRef, useEffect } from 'react';
import M from 'materialize-css'
import './friendrequests.scss'
import { Link } from 'react-router-dom';

const FriendRequestList = () => {
    return (
        <li className="collection-item friend-requests-list valign-wrapper">
            <i className="material-icons medium">account_circle</i>
            <span className='friend-requests-username'> Username</span>
            <div className='accept-delete-btn'>
                <Link href='#' className="waves-effect waves-light green btn-small accept-btn">Accept</Link>
                <Link href='#' className="waves-effect waves-light red btn-small delete-btn">Delete</Link>
            </div>
        </li>

    )
}



const FriendRequests = () => {

    const elementRef = useRef();

    useEffect(() => {
        const modalRef = elementRef.current
        M.Modal.init(modalRef, {})
    }, [])

    return (
        <div className='container'>
            <header className='center-align'> <h4>FRIEND REQUESTS</h4>
                <Link className="waves-effect waves-light indigo btn modal-trigger" href="#modal1" >Add Friend</Link>
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
                        <Link href="#!" className="modal-close waves-effect indigo white-text waves-green btn-flat">Send Requests</Link>
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