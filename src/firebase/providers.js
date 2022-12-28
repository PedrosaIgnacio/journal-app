import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(
            FirebaseAuth,
            googleProvider
        );
        const { displayName, email, photoURL, uid } = response.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
        // const credentials =
        //     GoogleAuthProvider.credentialFromResult(result);
    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        };
    }
};

export const registerUserWithEmailAndPassword = async ({
    displayName,
    email,
    password,
}) => {
    try {
        const { photoURL, uid } =
            await createUserWithEmailAndPassword(
                FirebaseAuth,
                email,
                password
            );

        await updateProfile(FirebaseAuth.currentUser, {
            displayName,
        });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        };
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const loginWithEmailAndPassword = async ({
    email,
    password,
}) => {
    try {
        const { user } = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );
        const { uid, displayName, photoURL } = user;

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};
