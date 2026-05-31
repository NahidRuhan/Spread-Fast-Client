import { useNavigate } from 'react-router'
import logo from '../../assets/logo.png'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate('/')} className='flex items-end hover:cursor-pointer'>
      <img src={logo} alt="" />
      <h1 className='text-3xl font-bold -ms-2.5'>Spread Fast</h1>
    </div>
  )
}

export default Logo
