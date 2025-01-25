import { db } from "@/firebaseConfig";
import { DocumentResponse, Post, ProfileInfo } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post, displayName: string) => {
  const postWithUser = { ...post, displayName, comments: [] };
  return addDoc(collection(db, COLLECTION_NAME), postWithUser);
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const tempArr: DocumentResponse[] = [];
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Post;
        const responseObj: DocumentResponse = {
          id: doc.id,
          ...data,
        };
        tempArr.push(responseObj);
      });
      return tempArr;
    } else {
      console.log("No such document");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return getDoc(docRef);
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const updateLikesOnPost = (
  id: string,
  userlikes: string[],
  likes: number,
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    likes: likes,
    userlikes: userlikes,
  });
};
export const addCommentToPost = async (postId: string, comments: string[]) => {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, { comments });
    console.log("Comments updated successfully.");
  } catch (error) {
    console.error("Error updating comments: ", error);
    throw error;
  }
};

export const updateUserInfoOnPosts = async (profileInfo: ProfileInfo) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", profileInfo.user?.uid),
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((document) => {
      const docRef = doc(db, COLLECTION_NAME, document.id);
      updateDoc(docRef, {
        username: profileInfo.displayName,
        photoURL: profileInfo.photoURL,
      });
    });
  } else {
    console.log("User have no posts");
  }
};
