import react from 'react';
import { Outlet } from 'react-router-dom';
import WomenNav from '../Navbar/WomenNav';
const WomenMain = () => {
    return (
        <>
          <WomenNav />
          <Outlet />
        </>
    )
}
export default WomenMain;