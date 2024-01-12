import { colors } from "../../shared/themes"

export const inputStyle = {
    borderBottom: "4px solid #2a6a54",
    backgroundColor: "#F2F2F2",
    "& label": {
        color: "#2a6a54",
    },
}

export const inputErrorStyle = {
    borderBottom: "4px solid #d32f2f",
    backgroundColor: "#F2F2F2",
    "& label": {
        color: "#d32f2f",
    },
}

export const buttonStyle = {
    backgroundColor: colors.background_dark,
    width: "150px",
    height: "50px",
    color: "#fff",
    fontWeight: 700,
    '&:hover': {
        backgroundColor: colors.primary_dark,
    }
}