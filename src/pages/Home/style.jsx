import { colors } from "../../shared/themes"

export const container = {
    padding: "1em 2rem",
    maxWidth: 1280,
}

export const body = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

export const title = {
    color: "#202B71",
    fontWeight: 700,
    fontSize: "1.5rem",
    marginTop: "20px"
}

export const form = {
    marginTop: "20px"
}

export const inputGroup1 = {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gap: "20px"
}

export const inputGroupMobile = {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px"
}


export const input = {
    borderBottom: "4px solid #202B71",
    backgroundColor: "#F2F2F2",
    "& label": {
        color: "#202B71",
    },
}

export const inputError = {
    borderBottom: "4px solid #d32f2f",
    backgroundColor: "#F2F2F2",
    "& label": {
        color: "#d32f2f",
    },
}

export const inputGroup2 = {
    marginTop: "10px",
    display: "grid",
    gridTemplateColumns: "auto auto auto auto",
    gap: "20px"
}

export const containerSelect = {
    display: "flex",
    alignItems: "center",
    justfyContent: "center",
    color: "#202B71"
}

export const button = {
    backgroundColor: colors.primary_dark,
    width: "150px",
    height: "50px",
    color: colors.primary_light,
    fontWeight: 700,
    '&:hover': {
        backgroundColor: colors.primary_dark,
    }
}

export const buttonMobile = {
    backgroundColor: colors.primary_dark,
    width: "100%",
    height: "50px",
    color: colors.primary_light,
    fontWeight: 700,
    '&:hover': {
        backgroundColor: colors.primary_dark,
    }
}

export const buttonSuccess = {
    width: "224px",
    height: "56px",
    color: "#fff",
    fontWeight: 700,
}

export const buttonMobileSuccess = {
    width: "100%",
    height: "56px",
    color: "#fff",
    fontWeight: 700,
}

export const containerLoadingBtn = {
    width: "224px",
    height: "60px",
    backgroundColor: colors.primary_lightest,
    borderRadius: "10px",
    display: "flex", alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
}

export const containerLoadingBtnMobile = {
    width: "100%",
    height: "60px",
    backgroundColor: colors.primary_lightest,
    borderRadius: "10px",
    display: "flex", alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
}