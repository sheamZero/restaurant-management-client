import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // sign up user
    const signUpWithEmailPass = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // google sign in
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // sign in user with email password
    const signInWithEmailPass = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }
    // update user name
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // sign out user
    const signoutUser = async () => {
        setIsLoading(true);
        signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User -->>", currentUser);
        })
        return () => unSubscribe();
    }, [])

    const auth_info = {
        user,
        setUser,
        signUpWithEmailPass,
        signInWithEmailPass,
        updateUserProfile,
        signInWithGoogle,
        signoutUser,
    };

    return (
        <AuthContext.Provider value={auth_info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;