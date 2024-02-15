import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom";

function Layout({title, logo}) {
    return (
      <div>
       <Header title={title} logo={logo}/>
        <Outlet />
        <Footer/>
      </div>
    );
  }

  export default Layout;