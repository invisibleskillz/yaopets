import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Filter, 
  Edit, 
  Trash2, 
  ShieldAlert, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserType } from '@/types';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    userType: 'tutor' as UserType,
    status: 'active',
    verified: true,
    createdAt: '2025-01-15T10:30:00Z',
    lastLogin: '2025-05-10T14:25:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    email: 'jane@example.com',
    username: 'drjane',
    userType: 'veterinarian' as UserType,
    status: 'active',
    verified: true,
    createdAt: '2025-02-20T09:15:00Z',
    lastLogin: '2025-05-12T11:45:00Z',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    username: 'mikej',
    userType: 'tutor' as UserType,
    status: 'inactive',
    verified: true,
    createdAt: '2025-03-05T14:20:00Z',
    lastLogin: '2025-04-28T16:30:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    username: 'sarahw',
    userType: 'volunteer' as UserType,
    status: 'active',
    verified: true,
    createdAt: '2025-03-12T11:10:00Z',
    lastLogin: '2025-05-11T09:20:00Z',
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 5,
    name: 'Admin User',
    email: 'admin@example.com',
    username: 'admin',
    userType: 'admin' as UserType,
    status: 'active',
    verified: true,
    createdAt: '2025-01-01T00:00:00Z',
    lastLogin: '2025-05-12T08:30:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: 6,
    name: 'David Brown',
    email: 'david@example.com',
    username: 'davidb',
    userType: 'tutor' as UserType,
    status: 'suspended',
    verified: true,
    createdAt: '2025-04-02T13:45:00Z',
    lastLogin: '2025-05-01T10:15:00Z',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
  {
    id: 7,
    name: 'Dr. Maria Garcia',
    email: 'maria@example.com',
    username: 'drmaria',
    userType: 'veterinarian' as UserType,
    status: 'pending',
    verified: false,
    createdAt: '2025-05-01T16:20:00Z',
    lastLogin: null,
    profileImage: 'https://randomuser.me/api/portraits/women/7.jpg'
  }
];

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  
  // Filter users based on search query
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredUsers(mockUsers);
      return;
    }
    
    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
    
    setFilteredUsers(filtered);
  };
  
  // Format date to readable string
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get badge color based on user status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Suspended</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get badge for user type
  const getUserTypeBadge = (userType: UserType) => {
    switch (userType) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Admin</Badge>;
      case 'veterinarian':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Veterinarian</Badge>;
      case 'volunteer':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Volunteer</Badge>;
      case 'tutor':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Pet Owner</Badge>;
      default:
        return <Badge variant="outline">{userType}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="User Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Users</h1>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                  </Button>
                  
                  <Button className="flex items-center gap-2">
                    <UserPlus size={16} />
                    Add User
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.profileImage} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500">@{user.username}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getUserTypeBadge(user.userType)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          {user.verified ? (
                            <CheckCircle className="text-green-500" size={18} />
                          ) : (
                            <XCircle className="text-red-500" size={18} />
                          )}
                        </TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>{formatDate(user.lastLogin)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={16} />
                                Edit
                              </DropdownMenuItem>
                              {user.status === 'active' ? (
                                <DropdownMenuItem className="flex items-center gap-2 text-amber-600">
                                  <ShieldAlert size={16} />
                                  Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="flex items-center gap-2 text-green-600">
                                  <CheckCircle size={16} />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                <Trash2 size={16} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredUsers.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No users found matching your search criteria.</p>
                </div>
              )}
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                  <span className="font-medium">{mockUsers.length}</span> users
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}