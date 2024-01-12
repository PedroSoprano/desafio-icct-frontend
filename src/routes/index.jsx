import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/">
                <Route key={"login"} path="/" element={<Login />} />
                <Route key={"home"} path="/home" element={<Home />} />
            </Route>
        </Routes>
    )
}