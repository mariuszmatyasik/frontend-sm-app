import { createContext } from "react";
import { auth } from "../firebaseConfig";
import {
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";


type AuthContextData = {
    user: User | null;
    login: typeof login;
    signup: typeof signup;
    logout: typeof logout;
    googleSignin: typeof googleSignin;
};

const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logout = () => {
    signOut(auth);
};

const googleSignin = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

export const userAuthContext = createContext<AuthContextData>