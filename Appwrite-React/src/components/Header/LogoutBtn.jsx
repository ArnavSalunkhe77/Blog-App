import React from 'react';
import {useDispatch} from 'react-redux';
import AuthService from '../../Appwrite/Auth';
import { logout } from '../../store/authSlice';
function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler =  () => {
        AuthService.Logout().then(() => {
            dispatch(logout());
        });
    }
    return ( 
        <button className='inline-block px-6 py-2.5 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
    );
}

export default LogoutBtn;

// A small button, used inside Header, that ends the Appwrite session and clears the Redux auth state when clicked — 
// the two things need to happen together, or the UI and the actual backend session would disagree about whether you're logged in.