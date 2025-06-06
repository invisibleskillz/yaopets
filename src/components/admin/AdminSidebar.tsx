import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PawPrint, 
  Flag, 
  Settings, 
  LogOut, 
  ChevronRight,
  Home
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <Users className="h-5 w-5" />
    },
    {
      name: 'Pets',
      path: '/admin/pets',
      icon: <PawPrint className="h-5 w-5" />
    },
    {
      name: 'Reports',
      path: '/admin/reports',
      icon: <Flag className="h-5 w-5" />
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <Link to="/admin" className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-md mr-3">
            <span className="text-primary font-bold text-xl">YP</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">YaoPets</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-3 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors",
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className={cn(
                "mr-3",
                isActive(item.path) ? "text-white" : "text-gray-500 group-hover:text-gray-700"
              )}>
                {item.icon}
              </div>
              <span>{item.name}</span>
              {isActive(item.path) && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-3">
          <Link
            to="/home"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Home className="mr-3 h-5 w-5 text-gray-500" />
            <span>Back to App</span>
          </Link>
          
          <button
            onClick={() => logout()}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}