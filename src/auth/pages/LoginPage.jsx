import { Google } from "@mui/icons-material";
import {
    Alert,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
    startLoginWithEmailAndPassword,
    startGoogleSignIn,
} from "../../store/auth/thunks";

import { AuthLayout } from "../layout/AuthLayout";

const formData = {
    email: "",
    password: "",
};

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(
        (state) => state.auth
    );

    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo(
        () => status === "checking",
        [status]
    );

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithEmailAndPassword({ email, password }));
    };

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title="Iniciar Sesión">
            <form
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Correo"
                            type="text"
                            placeholder="correo@gmail.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="*****"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            display={!!errorMessage ? "" : "none"}>
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                fullWidth
                                type="submit">
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}>
                                <Google />
                                <Typography sx={{ ml: 1 }}>
                                    Google
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end">
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
