import { Box, Button, Typography } from "@mui/material"
import { colors } from "../../shared/themes"
import { HeaderTitleStyle, ButtonHeaderStyle } from "./style"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ backgroundColor: colors.background_base, height: "60px", width: "100vw" }}>
            <Box sx={{ ...HeaderTitleStyle, justifyContent: "space-between" }}>
                Desafio ICCT frontend
                <Button sx={ButtonHeaderStyle}
                    onClick={() => {
                        localStorage.removeItem("@token")
                        navigate("/")
                    }}
                >
                    Sair
                </Button>
            </Box>
        </Box>
    )
}