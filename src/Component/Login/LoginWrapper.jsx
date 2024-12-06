import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile/UserProfile';
import LoginPage from './LoginPage';

function LoginWrapper() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const handleLogin = (status) => {
        setIsUserLoggedIn(status);
    };

    const handleLogout = () => {
        setIsUserLoggedIn(false);
        localStorage.clear();
    };

    useEffect(() => {
        const userLoginStatus = localStorage.getItem('isUserLoggedIn');
        if (userLoginStatus === 'true') {
            const loggedInUser = localStorage.getItem('userData');
            const userJSON = JSON.parse(loggedInUser);
            setUserDetails(userJSON);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [isUserLoggedIn]);

    return isUserLoggedIn ? (
        <UserProfile userDetails={userDetails} handleLogout={handleLogout} />
    ) : (
        <LoginPage handleLogin={handleLogin} />
    );
}

export default LoginWrapper;
