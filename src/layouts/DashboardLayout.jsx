import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/sidebar/Sidebar';

// 2. Main Layout Component
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f7f6] font-sans relative">
      
      {/* Mobile Dark Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with mobile slide animation */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header for Menu Toggle */}
        <div className="lg:hidden flex items-center bg-white p-4 border-b border-gray-200">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-gray-900">
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;