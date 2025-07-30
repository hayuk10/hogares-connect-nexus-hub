import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAppContext } from '@/context/AppContext';
import { useAuthContext } from '@/context/AuthContext';
import { MockDataService } from '@/services/mockDataService';
import { Property } from '@/types';
import { PropertiesGrid } from '@/components/properties/PropertiesGrid';
import { SearchHero } from '@/components/properties/SearchHero';
import { UserBenefits } from '@/components/UserBenefits';
import { EmptyState } from '@/components/EmptyState';

// Lazy load heavy components
const VisitForm = lazy(() => import('@/components/forms/VisitForm').then(module => ({ default: module.VisitForm })));
const ChatBot = lazy(() => import('@/components/chatbot/ChatBot').then(module => ({ default: module.ChatBot })));
const FinancialSimulator = lazy(() => import('@/components/FinancialSimulator').then(module => ({ default: module.FinancialSimulator })));
const ReferralPanel = lazy(() => import('@/components/ReferralPanel').then(module => ({ default: module.ReferralPanel })));

const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export const Dashboard: React.FC = () => {
  const { profile } = useAuthContext();
  const { 
    currentView, 
    favorites, 
    searchTerm, 
    loading,
    setLoading,
    toggleFavorite,
    setSearchTerm 
  } = useAppContext();

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, favorites, currentView, searchTerm]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await MockDataService.getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    // Filter by view type
    if (currentView === 'favorites') {
      filtered = filtered.filter(p => favorites.includes(p.id));
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.neighborhood?.toLowerCase().includes(term)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleScheduleVisit = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'simulator':
        return (
          <Suspense fallback={<ComponentLoader />}>
            <FinancialSimulator 
              onClose={() => {}}
              onContactFinanhogar={() => {}}
            />
          </Suspense>
        );
      
      case 'referrals':
        return (
          <Suspense fallback={<ComponentLoader />}>
            <ReferralPanel 
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
            />
          </Suspense>
        );
      
      case 'chat':
        return (
          <Suspense fallback={<ComponentLoader />}>
            <ChatBot
              onClose={() => {}}
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
              onOpenCalculator={() => {}}
              onOpenInvestors={() => {}}
            />
          </Suspense>
        );
      
      case 'visits':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Mis Visitas</h2>
            <p className="text-muted-foreground">Panel de gestión de visitas programadas</p>
          </div>
        );
      
      default:
        return (
          <>
            <SearchHero 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onQuickAction={(action) => {
                // Handle quick actions
                console.log('Quick action:', action);
              }}
              favoriteCount={favorites.length}
            />

            {profile && (
              <UserBenefits userType={profile.user_type} isPremium={profile.is_premium} />
            )}

            {filteredProperties.length === 0 && !loading ? (
              <EmptyState 
                title={currentView === 'favorites' ? 'Sin favoritos' : 'Sin propiedades'}
                description={currentView === 'favorites' 
                  ? 'Aún no has marcado ninguna propiedad como favorita'
                  : 'No se encontraron propiedades que coincidan con tu búsqueda'
                }
                onAction={() => {
                  setSearchTerm('');
                  // Reset filters logic here
                }}
                actionLabel="Ver todas las propiedades"
              />
            ) : (
              <PropertiesGrid
                properties={filteredProperties}
                loading={loading}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onScheduleVisit={handleScheduleVisit}
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
                title={currentView === 'favorites' ? 'Tus Favoritos' : 'Propiedades Disponibles'}
              />
            )}
          </>
        );
    }
  };

  return (
    <Layout>
      {renderCurrentView()}

      {/* Visit Form Modal */}
      {selectedPropertyId && (
        <Suspense fallback={<ComponentLoader />}>
          <VisitForm
            propertyId={selectedPropertyId}
            propertyTitle={properties.find(p => p.id === selectedPropertyId)?.title || ""}
            onClose={() => setSelectedPropertyId(null)}
            onSuccess={() => setSelectedPropertyId(null)}
          />
        </Suspense>
      )}
    </Layout>
  );
};