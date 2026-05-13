import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserCheck, AlertTriangle, Users, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Verify Employee', href: '/verify', icon: UserCheck },
    { name: 'Anomalies', href: '/anomalies', icon: AlertTriangle },
    { name: 'Employees', href: '/employees', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-government-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-government-800">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">GhostCheck</span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-government-800 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-government-700 text-white' 
                    : 'text-government-100 hover:bg-government-800'
                }`}
              >
                <item.icon size={20} className={isSidebarOpen ? 'mr-3' : ''} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-government-800 text-xs text-government-400">
          {isSidebarOpen ? '© 2026 GhostCheck Govt Tool' : 'GC'}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-xl font-semibold text-slate-800">
            {navigation.find(n => n.href === location.pathname)?.name || 'Page'}
          </h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
