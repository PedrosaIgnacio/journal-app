import {
    Alert,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

const formData = {
    displayName: "",
    email: "",
    password: "",
};

const formValidations = {
    displayName: [
        (value) => value.length >= 2,
        "El nombre es obligatorio",
    ],
    email: [
        (value) => value.includes("@"),
        "El correo debe de tener un @",
    ],
    password: [
        (value) => value.length >= 6,
        "El correo debe de tener al menos 7 caracteres",
    ],
};

export const RegisterPage = () => {
    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(
        (state) => state.auth
    );

    const {
        displayName,
        email,
        password,
        onInputChange,
        formState,
        isFormValid,
        displayNameValid,
        emailValid,
        passwordValid,
    } = useForm(formData, formValidations);

    const isCheckingAuth = useMemo(
        () => status === "checking",
        [status]
    );

    const [formSubmited, setFormSubmited] = useState(false);
    const onSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid) return;
        console.log(console.log(isFormValid));
        setFormSubmited(true);
        dispatch(startCreatingUserWithEmailAndPassword(formState));
    };

    return (
        <AuthLayout title="Crear Cuenta">
            <form
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            placeholder="Ignacio Pedrosa"
                            fullWidth
                            value={displayName}
                            onChange={onInputChange}
                            name="displayName"
                            error={!!displayNameValid && formSubmited}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Correo"
                            type="text"
                            placeholder="correo@gmail.com"
                            fullWidth
                            value={email}
                            onChange={onInputChange}
                            name="email"
                            error={!!emailValid && formSubmited}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="*****"
                            fullWidth
                            value={password}
                            onChange={onInputChange}
                            name="password"
                            error={!!passwordValid && formSubmited}
                            helperText={passwordValid}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? "" : "none"}>
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAuth}
                                variant="contained"
                                fullWidth
                                type="submit">
                                Registrarse
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="end">
                        <Typography sx={{ mr: 1 }}>
                            ¿Ya tienes cuenta?
                        </Typography>
                        <Link
                            component={RouterLink}
                            color="inherit"
                            to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
