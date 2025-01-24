import { db } from "@/firebaseConfig";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
    query,
    where,
} from "firebase/firestore";
import {ProfileResponse, UserProfile} from "@/types";

const COLLECTION_NAME = "users";

export const createUserProfile = async (user: UserProfile) => {
    try {
        const docRef = addDoc(collection(db, COLLECTION_NAME), user);
        return docRef.id;
    } catch(err) {
        console.log(err);
    }
};

export const getUserProfile = async (userId: string) => {
    try{
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        let tempData: ProfileResponse = {};
        if(querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data() as UserProfile;
                tempData = {
                    id: doc.id,
                    ...userData,
                };
            });
            return tempData;
        } else {
            console.log("No user found.");
            return tempData;
        }
    }catch(err) {
        console.error(err);
    }
}

export const updateUserProfile = async (id: string, user: UserProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {
        ...user,
    });
}