import React, { useState } from 'react';
import { Header } from './Header';
import { MobileNavigation } from '@/components/MobileNavigation';
import { useAuthContext } from '@/context/AuthContext';
import { useAppContext } from '@/context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { profile } = useAuthContext();
  const { currentView, favorites, setCurrentView } = useAppContext();

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'properties':
        setCurrentView('properties');
        break;
      case 'favorites':
        setCurrentView('favorites');
        break;
      case 'visits':
        setCurrentView('visits');
        break;
      case 'simulator':
        setCurrentView('simulator');
        break;
      case 'referrals':
        setCurrentView('referrals');
        break;
      case 'chat':
        setCurrentView('chat');
        break;
      default:
        setCurrentView('properties');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {children}
      </main>

      <MobileNavigation
        currentUser={profile ? {
          id: profile.user_id,
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          userType: profile.user_type,
          isPremium: profile.is_premium,
          isVIP: profile.is_vip,
          favorites: [],
          visits: [],
          referidos: [],
          referralCode: profile.referral_code,
          registrationDate: new Date(profile.registration_date),
          totalReferrals: profile.total_referrals,
          premiumExpiry: profile.premium_expiry ? new Date(profile.premium_expiry) : undefined
        } : null}
        onNavigate={handleNavigation}
        activeSection={currentView}
        favoriteCount={favorites.length}
      />
    </div>
  );
};