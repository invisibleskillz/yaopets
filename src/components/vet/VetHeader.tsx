import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VetHeaderProps {
  title: string;
}

export default function VetHeader({ title }: VetHeaderProps) {
  const { user, logout } = useAuthStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 h-9"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.profileImage} alt={user?.name || 'Vet'} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'V'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200">
          <nav className="px-4 py-3 space-y-1">
            <a href="/vet/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-100">
              Dashboard
            </a>
            <a href="/vet/appointments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Appointments
            </a>
            <a href="/vet/patients" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Patients
            </a>
            <a href="/chat" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Messages
            </a>
            <a href="/vet/records" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Medical Records
            </a>
            <a href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}