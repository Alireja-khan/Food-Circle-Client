import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../../services/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register new user
    const createUser = async (email, password) => {
        if (!email || !password) {
            return Promise.reject(new Error('Email and password are required'));
        }
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    // Sign in user with email/password
    const signInUser = async (email, password) => {
        if (!email || !password) {
            return Promise.reject(new Error('Email and password are required'));
        }
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    // Google Sign-In
    const googleSignIn = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } finally {
            setLoading(false);
        }
    };

    // Sign out user
    const signOutUser = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    // Monitor user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
