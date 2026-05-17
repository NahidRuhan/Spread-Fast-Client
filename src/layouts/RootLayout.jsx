import { Outlet, ScrollRestoration } from "react-router"
import Footer from "../pages/shared/footer/Footer"
import Navbar from "../pages/shared/navbar/Navbar"

const RootLayout = () => {
  return (
    <div className="bg-[#EAECED] py-5">
      <div className="max-w-7xl mx-auto space-y-10">
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  )
}

export default RootLayout
