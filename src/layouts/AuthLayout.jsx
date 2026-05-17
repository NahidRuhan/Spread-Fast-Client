import { Outlet } from "react-router"
import Logo from "../components/logo/Logo"
import img from "../assets/authImage.png"

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="mb-8">
        <Logo></Logo>
      </div>
      <div className="flex flex-1 items-center justify-center gap-8 lg:gap-16">
        <div className="flex-1 flex justify-center w-full">
            <Outlet></Outlet>
        </div>
        <div className="hidden lg:flex flex-1 justify-center items-center">
            <img src={img} alt="Auth representation" className="max-w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout