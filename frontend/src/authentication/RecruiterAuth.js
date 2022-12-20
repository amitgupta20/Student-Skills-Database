import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";
export const RecruiterAuth = ({children}) => {
    const auth = useAuth()
    
    if(auth.user != "Recruiter"){
        return <Navigate to="/signup"></Navigate>
    }
    return children;
}
 