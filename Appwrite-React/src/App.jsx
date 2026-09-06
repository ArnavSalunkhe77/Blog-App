import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import authService from './Appwrite/Auth';
import { login, logout } from './store/authSlice';

import Header from './components/Header/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {

        authService.getCurrUser()
            .then((user) => {

                if (user) {
                    dispatch(login(user));
                } else {
                    dispatch(logout());
                }

            })
            .finally(() => setLoading(false));

    }, []);

    return !loading ? (

        <div className='min-h-screen flex flex-col bg-gray-100'>

            <Header />

            <main className='flex-1'>
                <Outlet />
            </main>

            <Footer />

        </div>

    ) : null;
}

export default App;