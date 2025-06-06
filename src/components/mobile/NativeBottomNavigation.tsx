import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PawPrint, PlusCircle, Heart, Stethoscope, Settings } from 'lucide-react';

/**
 * Bottom navigation component for the YaoPets app (Native style)
 * New design:
 * 1. Home (house)
 * 2. Pets (paw)
 * 3. Center button for creating a post - navigates to create page
 * 4. Donations (heart)
 * 5. Vet & Help (stethoscope)
 * Settings icon appears only on specific pages.
 */
export default function NativeBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-bg flex justify-evenly items-center h-16 px-2 z-50">
      {/* Home */}
      <div className="flex items-center justify-center">
        <div 
          onClick={() => navigate('/home')} 
          className="text-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <Home size={28} className={location.pathname === '/home' ? 'text-primary' : 'text-dark-purple/70'} />
          </div>
        </div>
      </div>
      
      {/* Pets */}
      <div className="flex items-center justify-center">
        <div 
          onClick={() => navigate('/pets')} 
          className="text-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <PawPrint size={28} className={location.pathname === '/pets' ? 'text-primary' : 'text-dark-purple/70'} />
          </div>
        </div>
      </div>
      
      {/* Center button for creating a post - hidden on specific pages */}
      {location.pathname !== '/pets' && location.pathname !== '/vet-help' && location.pathname !== '/donations' && (
        <div className="flex items-center justify-center">
          <div 
            onClick={() => navigate('/create-post')} 
            className="text-center cursor-pointer"
          >
            <div className="flex items-center justify-center relative">
              <div className="bg-primary rounded-full p-3 shadow-md">
                <PlusCircle size={28} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Donations (heart) */}
      <div className="flex items-center justify-center">
        <div 
          onClick={() => navigate('/donations')} 
          className="text-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <Heart size={28} className={location.pathname === '/donations' ? 'text-primary' : 'text-dark-purple/70'} />
          </div>
        </div>
      </div>
      
      {/* Vet & Help */}
      <div className="flex items-center justify-center">
        <div 
          onClick={() => navigate('/vet-help')} 
          className="text-center cursor-pointer"
        >
          <div className="flex items-center justify-center">
            <Stethoscope size={28} className={location.pathname === '/vet-help' ? 'text-primary' : 'text-dark-purple/70'} />
          </div>
        </div>
      </div>
      
      {/* Settings icon (only on specific pages) */}
      {(location.pathname === '/pets' || location.pathname === '/vet-help' || location.pathname === '/donations') && (
        <div className="flex items-center justify-center">
          <div 
            onClick={() => navigate('/settings')} 
            className="text-center cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <Settings size={28} className="text-dark-purple/70" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}