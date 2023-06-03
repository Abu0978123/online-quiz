import {React ,useEffect} from 'react'
import Dashboard from './Dashboard'
import NavbarDashboard from './NavbarDashboard'
import Navbar from './NavbarDashboard'
import Sidebar from './Sidebar'


const MainDashbaoard = () => {
 

  return (
    <div style={{backgroundColor:'white'}}>
                <NavbarDashboard/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <Dashboard/>
                
             </div>
            </div>  
        </div>  
  )
}

export default MainDashbaoard