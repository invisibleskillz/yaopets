import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  Home,
  Stethoscope
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

export default function VetSidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/vet/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      name: 'Appointments',
      path: '/vet/appointments',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      name: 'Patients',
      path: '/vet/patients',
      icon: <Users className="h-5 w-5" />
    },
    {
      name: 'Messages',
      path: '/chat',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      name: 'Medical Records',
      path: '/vet/records',
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <Link to="/vet/dashboard" className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-md mr-3">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">YaoPets</h1>
            <p className="text-xs text-gray-500">Veterinarian Portal</p>
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
                  ? "bg-blue-600 text-white"
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