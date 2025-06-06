import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from '@/store/authStore';
import { Capacitor } from '@capacitor/core';
import { useEffect } from 'react';

// Layout components
import MobileStatusBar from "@/components/mobile/MobileStatusBar";
import NativePushNotifications from "@/components/mobile/PushNotifications";
import NativeBottomNavigation from "@/components/mobile/NativeBottomNavigation";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Main pages
import PetFeed from "@/pages/PetFeed";
import PetsPage from "@/pages/PetsPage";
import DonationsPage from "@/pages/DonationsPage";
import VetHelpPage from "@/pages/VetHelpPage";
import EnhancedProfilePage from "@/pages/EnhancedProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/not-found";

// Detail pages
import PetDetailsPage from "@/pages/PetDetailsPage";
import VetProfilePage from "@/pages/VetProfilePage";
import NewPetPageReplacement from "@/pages/NewPetPageReplacement";
import CreatePostPage from "@/pages/CreatePostPage";

// Chat pages
import ChatsListPage from "@/pages/ChatsListPage";
import ChatPage from "@/pages/ChatPage";

// Store pages
import StorePage from "@/pages/StorePage";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminPets from "@/pages/admin/AdminPets";
import AdminReports from "@/pages/admin/AdminReports";

// Vet dashboard pages
import VetDashboard from "@/pages/vet/VetDashboard";
import VetAppointments from "@/pages/vet/VetAppointments";
import VetPatients from "@/pages/vet/VetPatients";

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }: { 
  children: React.ReactNode, 
  allowedRoles?: string[] 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/home\" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuthStore();
  
  // Add class for native app detection
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      document.body.classList.add('native-app');
      
      if (Capacitor.getPlatform() === 'ios') {
        document.body.classList.add('ios-app');
      } else if (Capacitor.getPlatform() === 'android') {
        document.body.classList.add('android-app');
      }
    }
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <MobileStatusBar />
      <NativePushNotifications />
      
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/auth/login" element={
            isAuthenticated ? <Navigate to="/home\" replace /> : <LoginPage />
          } />
          <Route path="/auth/register" element={
            isAuthenticated ? <Navigate to="/home\" replace /> : <RegisterPage />
          } />
          
          {/* Public routes */}
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/home\" replace /> : <Navigate to="/auth/login" replace />
          } />
          
          {/* Protected routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <div className="pb-16">
                <PetFeed />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/pets" element={
            <ProtectedRoute>
              <div className="pb-16">
                <PetsPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/donations" element={
            <ProtectedRoute>
              <div className="pb-16">
                <DonationsPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/vet-help" element={
            <ProtectedRoute>
              <div className="pb-16">
                <VetHelpPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="pb-16">
                <EnhancedProfilePage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/profile/:id" element={
            <ProtectedRoute>
              <div className="pb-16">
                <EnhancedProfilePage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <div className="pb-16">
                <SettingsPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/chat" element={
            <ProtectedRoute>
              <div className="pb-16">
                <ChatsListPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/chat/:id" element={
            <ProtectedRoute>
              <div className="pb-16">
                <ChatPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/store" element={
            <ProtectedRoute>
              <div className="pb-16">
                <StorePage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/create-post" element={
            <ProtectedRoute>
              <div className="pb-16">
                <CreatePostPage />
                <NativeBottomNavigation />
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/new-pet" element={
            <ProtectedRoute>
              <NewPetPageReplacement />
            </ProtectedRoute>
          } />
          
          <Route path="/pet-details/:id" element={
            <ProtectedRoute>
              <PetDetailsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/vet-profile/:id" element={
            <ProtectedRoute>
              <VetProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          
          <Route path="/payment-success" element={
            <ProtectedRoute>
              <PaymentSuccessPage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/pets" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPets />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
            </ProtectedRoute>
          } />
          
          {/* Vet dashboard routes */}
          <Route path="/vet/dashboard" element={
            <ProtectedRoute allowedRoles={['veterinarian']}>
              <VetDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/vet/appointments" element={
            <ProtectedRoute allowedRoles={['veterinarian']}>
              <VetAppointments />
            </ProtectedRoute>
          } />
          
          <Route path="/vet/patients" element={
            <ProtectedRoute allowedRoles={['veterinarian']}>
              <VetPatients />
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;