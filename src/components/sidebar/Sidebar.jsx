import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  Store, 
  Tag,
  Bike,
  Map, 
  Settings, 
  KeyRound, 
  HelpCircle, 
  LogOut,
  X
} from 'lucide-react';
import Logo from '../logo/Logo';

// 1. Define NavItem OUTSIDE the main component
const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
          isActive 
            ? 'bg-primary text-gray-900 font-medium' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon size={20} className={isActive ? 'text-gray-900' : 'text-gray-400'} />
        <span>{label}</span>
      </Link>
    </li>
  );
};

const Sidebar = ({ onClose }) => {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shrink-0">
      
      {/* Logo Area */}
      <div className='p-5 flex items-center justify-between'>
        <Logo></Logo>
        <button onClick={onClose} className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        
        {/* MENU SECTION */}
        <div className="mb-8">
          <p className="px-4 text-xs font-semibold text-gray-400 tracking-wider mb-3 uppercase">
            Menu
          </p>
          <ul className="space-y-1">
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/payment-history" icon={CreditCard} label="Payments" />
            <NavItem to="/rider-dashboard" icon={Bike} label="Riders" />
            <NavItem to="/stores" icon={Store} label="Stores" />
            <NavItem to="/pricing" icon={Tag} label="Pricing Plan" />
            <NavItem to="/coverage" icon={Map} label="Coverage Area" />
          </ul>
        </div>

        {/* GENERAL SECTION */}
        <div>
          <p className="px-4 text-xs font-semibold text-gray-400 tracking-wider mb-3 uppercase">
            General
          </p>
          <ul className="space-y-1">
            <NavItem to="/settings" icon={Settings} label="Settings" />
            <NavItem to="/change-password" icon={KeyRound} label="Change Password" />
            <NavItem to="/help" icon={HelpCircle} label="Help" />
            <NavItem to="/logout" icon={LogOut} label="Logout" />
          </ul>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;