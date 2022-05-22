import { Navigate } from "react-router-dom";

const RequireAuth = ({isAuth, children}) => {
    
    if (!isAuth) {
        return <Navigate to="/signin" />
    }
    
    return children
}

export default RequireAuth