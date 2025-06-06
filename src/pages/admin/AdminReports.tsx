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
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  Flag,
  ShieldAlert,
  MessageSquare,
  Image,
  AlertTriangle
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock report data
const mockReports = [
  {
    id: 1,
    type: 'post',
    contentId: 101,
    reason: 'inappropriate_content',
    description: 'This post contains offensive language and inappropriate images',
    reportedBy: {
      id: 3,
      name: 'Mike Johnson',
      username: 'mikej',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    reportedUser: {
      id: 6,
      name: 'David Brown',
      username: 'davidb',
      profileImage: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    status: 'pending',
    priority: 'high',
    createdAt: '2025-05-10T14:30:00Z'
  },
  {
    id: 2,
    type: 'comment',
    contentId: 202,
    reason: 'harassment',
    description: 'User is harassing others with threatening comments',
    reportedBy: {
      id: 4,
      name: 'Sarah Williams',
      username: 'sarahw',
      profileImage: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    reportedUser: {
      id: 7,
      name: 'Alex Thompson',
      username: 'alext',
      profileImage: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    status: 'pending',
    priority: 'medium',
    createdAt: '2025-05-11T09:15:00Z'
  },
  {
    id: 3,
    type: 'user',
    contentId: 5,
    reason: 'fake_account',
    description: 'This appears to be a fake account posting suspicious content',
    reportedBy: {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    reportedUser: {
      id: 8,
      name: 'Unknown User',
      username: 'unknown123',
      profileImage: ''
    },
    status: 'resolved',
    priority: 'high',
    createdAt: '2025-05-09T16:45:00Z',
    resolvedAt: '2025-05-10T11:20:00Z'
  },
  {
    id: 4,
    type: 'post',
    contentId: 103,
    reason: 'spam',
    description: 'User is spamming the same content across multiple posts',
    reportedBy: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    reportedUser: {
      id: 9,
      name: 'Spam Account',
      username: 'spammer',
      profileImage: ''
    },
    status: 'resolved',
    priority: 'low',
    createdAt: '2025-05-08T13:10:00Z',
    resolvedAt: '2025-05-09T10:30:00Z'
  },
  {
    id: 5,
    type: 'pet',
    contentId: 104,
    reason: 'false_information',
    description: 'This pet listing contains false information about the animal',
    reportedBy: {
      id: 3,
      name: 'Mike Johnson',
      username: 'mikej',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    reportedUser: {
      id: 10,
      name: 'Pet Seller',
      username: 'petseller',
      profileImage: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
    status: 'pending',
    priority: 'medium',
    createdAt: '2025-05-12T08:45:00Z'
  }
];

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter reports based on search query and status
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterReports(query, statusFilter);
  };
  
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    filterReports(searchQuery, status);
  };
  
  const filterReports = (query: string, status: string | null) => {
    let filtered = mockReports;
    
    // Apply search query filter
    if (query) {
      filtered = filtered.filter(report => 
        report.reportedUser.name.toLowerCase().includes(query) ||
        report.reportedUser.username.toLowerCase().includes(query) ||
        report.reportedBy.name.toLowerCase().includes(query) ||
        report.reportedBy.username.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (status) {
      filtered = filtered.filter(report => report.status === status);
    }
    
    setFilteredReports(filtered);
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get badge color based on report status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Resolved</Badge>;
      case 'dismissed':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Dismissed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get badge color based on report priority
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  
  // Get icon based on report type
  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <Image className="h-4 w-4 text-purple-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'user':
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case 'pet':
        return <PawPrint className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Report Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search reports..."
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        {statusFilter ? `Status: ${statusFilter}` : 'Filter by Status'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStatusFilter(null)}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('pending')}>
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('resolved')}>
                        Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('dismissed')}>
                        Dismissed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getReportTypeIcon(report.type)}
                            <span className="capitalize">{report.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={report.reportedUser.profileImage} alt={report.reportedUser.name} />
                              <AvatarFallback>{report.reportedUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{report.reportedUser.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={report.description}>
                            {report.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={report.reportedBy.profileImage} alt={report.reportedBy.name} />
                              <AvatarFallback>{report.reportedBy.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{report.reportedBy.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                        <TableCell>{formatDate(report.createdAt)}</TableCell>
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
                                <Eye size={16} />
                                View Details
                              </DropdownMenuItem>
                              {report.status === 'pending' && (
                                <>
                                  <DropdownMenuItem className="flex items-center gap-2 text-green-600">
                                    <CheckCircle size={16} />
                                    Mark as Resolved
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 text-gray-600">
                                    <XCircle size={16} />
                                    Dismiss
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredReports.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No reports found matching your criteria.</p>
                </div>
              )}
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredReports.length}</span> of{" "}
                  <span className="font-medium">{mockReports.length}</span> reports
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

function PawPrint(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  )
}