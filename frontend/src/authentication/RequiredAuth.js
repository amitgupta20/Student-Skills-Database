import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";
export const RequiredAuth = ({children}) => {
    const auth = useAuth()
    
    if(!auth.user){
        return <Navigate to="/signup"></Navigate>
    }
    return children;
}
 