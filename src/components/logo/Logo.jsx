import { useNavigate } from 'react-router'
import logo from '../../assets/logo.png'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate('/')} className='flex items-end hover:cursor-pointer'>
      <img src={logo} alt="" className="w-8 md:w-auto" />
      <h1 className='text-base md:text-3xl font-bold -ms-1 md:-ms-2.5'>Spread Fast</h1>
    </div>
  )
}

export default Logo
