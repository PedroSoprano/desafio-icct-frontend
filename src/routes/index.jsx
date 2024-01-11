import { Route, Routes } from "react-router-dom"
import { Login } from "../components/Login.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/">
                <Route key={"login"} path="/" element={<Login />} />
            </Route>
        </Routes>
    )
}