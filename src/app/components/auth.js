'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import {app} from '../../../firebase.config.js';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState('');

    useEffect(() => {
        const authInstance = getAuth(); // Use getAuth() to get the Firebase authentication instance
        const alreadyLoggedInUser = authInstance.currentUser;

        if (alreadyLoggedInUser) {
            setUser(alreadyLoggedInUser);
        } else {
            const unsubscribe = onAuthStateChanged(
                authInstance,
                (currentUser) => {
                    if (currentUser) {
                        setUser(currentUser);
                        setId(user?.uid);
                    } else {
                        setUser(null); // No user is signed in
                    }
                },
            );

            return () => {
                unsubscribe();
            };
        }
    }, []);

    return (
        <UserContext.Provider value={{user, id}}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
