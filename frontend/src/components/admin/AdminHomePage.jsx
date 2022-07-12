
import {AdminNavbar} from './AdminNavbar';
import AcceptVerificaton from './AcceptVerification';
import ActivateAccounts from './ActivateAccounts';
import DeactivateAccount from './DeactivateAccount';
import SmoothScroll from "smooth-scroll";
import { useLocation } from 'react-router-dom';
export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });

const AdminHomePage = () => {
  const location = useLocation();
  return (
    <div>
        <AdminNavbar fullName={location.state.fullName}/>
        <ActivateAccounts email={location.state.email}/>
        <DeactivateAccount email={location.state.email}/>
        <AcceptVerificaton email={location.state.email}/>
        
    </div>
  );
};

export default AdminHomePage;
