import { colors } from "../../shared/themes";

export const HeaderTitleStyle = {
    height: "100%",
    backgroundColor: colors.background_dark,
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    color: colors.primary_light,
    fontSize: 20,
    fontWeight: 900
}

export const ButtonHeaderStyle = {
    backgroundColor: colors.neutral_light, color: "#000", '&:hover': {
        backgroundColor: colors.primary_light,
        color: "#000"
    }
}