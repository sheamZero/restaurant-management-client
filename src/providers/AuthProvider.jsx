import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // sign up user
    const signUpWithEmailPass = (email, pass) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // google sign in
    const signInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // sign in user with email password
    const signInWithEmailPass = (email, pass) => {
        setIsLoading(true);
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
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true });
        console.log(data);
        signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
            console.log("User -->>", currentUser);
            if (currentUser) {
                const token_user = { email: currentUser?.email };
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, token_user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        })
        return () => unSubscribe();
    }, [])

    const auth_info = {
        isLoading,
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