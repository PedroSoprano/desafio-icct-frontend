import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { api } from '../../api';
import { toast } from "react-toastify"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { colors } from '../../shared/themes';
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { inputStyle, inputErrorStyle, buttonStyle } from "./styles.jsx"

const schema = Yup.object().shape({
    email: Yup.string().email().required('O Email é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória'),
});


export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [winSize] = useState(600)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = (data) => {
        api.post('/api/login', data).then((res) => {
            toast.success("Login realizado com sucesso!")
            localStorage.setItem("@token", res.data.message)

            navigate("/home")
        }).catch((err) => {
            toast.error(err.response.data.erros[0].msg)
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: colors.background_dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box component={"form"} onSubmit={handleSubmit(handleLogin)} sx={windowWidth < winSize ? { width: "300px", height: "500px", backgroundColor: colors.background_base, borderRadius: 5 } : { width: "600px", height: "500px", backgroundColor: colors.background_base, borderRadius: 5 }}>
                <Typography sx={windowWidth < winSize ? { color: colors.neutral_darkest, fontSize: "40px", fontWeight: 700, marginLeft: "20px", marginTop: "76px" } : { color: colors.neutral_darkest, fontSize: "40px", fontWeight: 700, marginLeft: "64px", marginTop: "76px" }}>
                    Login
                </Typography>
                <Box sx={windowWidth < winSize ? { display: "flex", flexDirection: "column", marginLeft: "20px", marginRight: "20px", gap: "50px", marginTop: "80px" } : { display: "flex", flexDirection: "column", marginLeft: "64px", marginRight: "64px", gap: "50px", marginTop: "80px" }}>
                    <TextField
                        label={errors.email?.message ?? "email"}
                        {...register("email")}
                        error={!!errors.email?.message}
                        variant="filled"
                        sx={errors.email?.message ? inputErrorStyle : inputStyle}
                    />
                    <FormControl variant="filled" sx={errors.senha?.message ? inputErrorStyle : inputStyle}>
                        <InputLabel htmlFor="filled-adornment-password">{errors.senha?.message ?? "Senha"}</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register("senha")}
                            error={!!errors.senha?.message}
                            endAdornment={
                                <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                        <Button variant='contained' type='submit' sx={{ ...buttonStyle }} >{"Entrar"}</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}