import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Receipt, 
  UserPlus,
  LogOut,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/patients', icon: Users, label: 'Patients', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/appointments', icon: Calendar, label: 'Appointments', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/medical-records', icon: FileText, label: 'Medical Records', roles: ['admin', 'doctor'] },
    { to: '/billing', icon: Receipt, label: 'Billing', roles: ['admin', 'receptionist'] },
    { to: '/register-user', icon: UserPlus, label: 'Register User', roles: ['admin'] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center gap-2">
          <Activity className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">SPMS</h1>
            <p className="text-xs text-blue-200">Smart Patient Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-600">
        <div className="mb-4 px-4">
          <p className="text-sm text-blue-200">Logged in as</p>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-blue-300 capitalize">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-600 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
