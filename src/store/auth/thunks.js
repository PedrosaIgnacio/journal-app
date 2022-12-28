import {
    signInWithGoogle,
    registerUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    logoutFirebase,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const response = await signInWithGoogle();
        if (!response.ok)
            return dispatch(logout(response.errorMessage));
        dispatch(login(response));
    };
};

export const startCreatingUserWithEmailAndPassword = ({
    displayName,
    email,
    password,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } =
            await registerUserWithEmailAndPassword({
                displayName,
                email,
                password,
            });
        if (!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));
    };
};

export const startLoginWithEmailAndPassword = ({
    email,
    password,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage, displayName } =
            await loginWithEmailAndPassword({
                email,
                password,
            });
        if (!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout({}));
    };
};
