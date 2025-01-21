import {createContext, useContext, useEffect, useState} from "react";
import { auth } from "../firebaseConfig";
import {
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

interface IUserAuthProviderProps {
    children: React.ReactNode;
}

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

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    login,
    signup,
    logout,
    googleSignin,
});

export const UserAuthProvider: React.FC<IUserAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("The logged in user state is: ", user);
                setUser(user);
            }

           return () => {
                unsubscribe();
           }
        });
    });
    const value: AuthContextData = {
        user,
        login,
        signup,
        logout,
        googleSignin,
    }
    return(
        <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}