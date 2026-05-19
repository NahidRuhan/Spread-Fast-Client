import { NavLink, useNavigate } from "react-router"
import Logo from "../../../components/logo/Logo"
import useAuth from "../../../hooks/useAuth"

const Navbar = () => {
  const navigate = useNavigate()
  const { user,signOutUser } = useAuth()

    const navLinkClass = ({ isActive }) => 
      isActive ? "bg-primary text-black font-semibold" : "";

    const links = <>
        <li><NavLink to="/" end className={navLinkClass}>Services</NavLink></li>
        <li><NavLink to="/coverage" className={navLinkClass}>Coverage</NavLink></li>
        <li><NavLink to="/about-us" className={navLinkClass}>About Us</NavLink></li>
        <li><NavLink to="/send-parcel" className={navLinkClass}>Send Parcel</NavLink></li>
        <li><NavLink to="/rider" className={navLinkClass}>Be a rider</NavLink></li>
        {
          user && <>
        <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
        </>
        }
    </>

    const handleLogout = () => {
      signOutUser()
      .then()
      .catch(error=>console.log(error))
    }

  return (
<div className="navbar bg-base-100 rounded-2xl px-7 py-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
      </ul>
    </div>
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end gap-5">
    {
      !user ? <button onClick={()=>navigate('/login')} className="btn">Login</button>  :
      <button onClick={handleLogout} className="btn">Log out</button>
    }
    <button onClick={()=>navigate('/rider')} className="btn bg-primary text-black">Be a Rider</button>
    
  </div>
</div>
  )
}

export default Navbar
