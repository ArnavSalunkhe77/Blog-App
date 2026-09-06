import React from 'react';
import {Logo , LogoutBtn} from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
// useSelector hook is used to access the redux store and get the current user state. It allows us to conditionally render the LogoutBtn component based on whether a user is logged in or not.
import {useNavigate} from 'react-router-dom';
import Container from '../container/Container';

function Header() {
   const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name : 'Home',
            path : '/',
            active : true,
        },
        {
            name : 'Login',
            path : '/login',
            active : !authStatus,
        },
        {
            name : "Signup",
            path : '/signup',
            active : !authStatus,
        },
        {
            name : 'All Posts',
            path : '/all-posts',
            active : authStatus,
        },
        {
            name : 'Add Post',
            path : '/add-post',
            active : authStatus,
        },
    ]
    return ( 
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'> <Logo width="100px" /> </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}> <button onClick={() => navigate(item.path)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button> </li>
                            ) : null
                        )}

                        {authStatus && ( <li> <LogoutBtn /> </li> )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;

// The site navigation bar. It reads the current auth status from Redux and uses that to decide which nav links to show 
// — Login/Signup when logged out, All Posts/Add Post/Logout when logged in. 
// Clicking a nav item uses React Router's navigate() to move between pages without a full reload.