import { useRoutes } from "react-router-dom"
import protectedRoutes from "./protectedRoute"
import publicRoutes from "./publicRoutes"
import unmatchedRoute from "./unmatchectRoute"

const Routes = () => {
    return useRoutes([publicRoutes, protectedRoutes, unmatchedRoute])
}

export default Routes
