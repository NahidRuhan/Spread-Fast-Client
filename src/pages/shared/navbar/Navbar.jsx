import { NavLink, useNavigate } from "react-router"
import Logo from "../../../components/logo/Logo"
import useAuth from "../../../hooks/useAuth"
import useRole from "../../../hooks/useRole"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"

const Navbar = () => {
  const navigate = useNavigate()
  const { user,signOutUser } = useAuth()
  const { role } = useRole()
  const axiosSecure = useAxiosSecure()

  const { data: riderInfo, refetch } = useQuery({
    queryKey: ['riderInfo', user?.email],
    enabled: !!user?.email && role === 'rider',
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/${user?.email}`);
      return res.data;
    }
  });

    const navLinkClass = ({ isActive }) => 
      isActive ? "bg-primary text-black font-semibold" : "";

    const links = <>
        <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
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

    const handleWorkStatusToggle = async () => {
      const newStatus = riderInfo?.workStatus === 'available' ? 'unavailable' : 'available';
      try {
        await axiosSecure.patch(`/rider/work-status/${user?.email}`, { workStatus: newStatus });
        refetch();
      } catch (error) {
        console.error("Failed to update work status", error);
      }
    }

  return (
<div className="navbar bg-base-100 rounded-2xl px-3 md:px-7 py-2 md:py-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
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
  <div className="navbar-end gap-2 md:gap-5">
    {
      !user ? (
        <button onClick={()=>navigate('/login')} className="btn">Login</button>
      ) : (
        <div className="dropdown dropdown-end hover:cursor-pointer">
          <div tabIndex={0} role="button" className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100 transition-all shadow-sm">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img src={user?.photoURL || 'https://i.ibb.co.com/0GS38PS/image.png'} alt={user?.displayName || 'User'} referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="text-left hidden md:block">
              <p className="font-bold text-sm text-[#0A2533] leading-tight">{user?.displayName}</p>
              <p className="text-xs text-gray-500 capitalize font-medium">{role}</p>
            </div>
          </div>
          <ul tabIndex={0} className="dropdown-content z-50 menu p-3 shadow-lg bg-white rounded-2xl w-56 mt-4 border border-gray-100 gap-1">
            <div className="md:hidden border-b border-gray-100 pb-3 mb-2 px-2">
              <p className="font-bold text-sm text-[#0A2533]">{user?.displayName}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
            <li><button onClick={() => navigate('/dashboard')} className="hover:bg-gray-50 font-medium text-gray-700">Dashboard</button></li>
            {role === 'rider' && (
              <li>
                <label className="flex items-center justify-between hover:bg-gray-50 font-medium text-gray-700 w-full cursor-pointer">
                  <span>Work Status</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-success toggle-sm" 
                    checked={riderInfo?.workStatus === 'available'}
                    onChange={handleWorkStatusToggle}
                  />
                </label>
              </li>
            )}
            <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50 font-medium mt-1">Logout</button></li>
          </ul>
        </div>
      )
    }
    
  </div>
</div>
  )
}

export default Navbar
