import { useLocation } from "react-router-dom";
import Leaderboard from "../common/Leaderboard";
import SearchByEmail from "../recruiter/SearchByEmail";
import { Navbar } from "../../Navbar";
import { DashboardNavigation } from "../DashboardNavigation";
const ProfileLeader = (props) => {
    const location = useLocation();
    return ( 
        <div>
            <DashboardNavigation username={props.username || "My Account"} />
            <Leaderboard data={location.state}/>
            <SearchByEmail data={location.state}/>
        </div>
     );
}
 
export default ProfileLeader;