import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";
export const AdminAuth = ({children}) => {
    const auth = useAuth()
    
    if(auth.user != "Team"){
        return <Navigate to="/signup"></Navigate>
    }
    return children;
}
  