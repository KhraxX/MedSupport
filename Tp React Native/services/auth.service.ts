import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, Auth } from "firebase/auth";

import { auth } from "@/config/firebaseConfig";

export const signin = (
    email:string,
    password:string
):Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
}

