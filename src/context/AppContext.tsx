import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AppState {
  sidebarOpen: boolean;
  currentView: 'properties' | 'favorites' | 'visits' | 'simulator' | 'referrals' | 'chat';
  favorites: string[];
  searchTerm: string;
  loading: boolean;
}

interface AppContextType extends AppState {
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  toggleFavorite: (propertyId: string) => void;
  setSearchTerm: (term: string) => void;
  setLoading: (loading: boolean) => void;
}

const initialState: AppState = {
  sidebarOpen: false,
  currentView: 'properties',
  favorites: [],
  searchTerm: '',
  loading: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const setSidebarOpen = (sidebarOpen: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen }));
  };

  const setCurrentView = (currentView: AppState['currentView']) => {
    setState(prev => ({ ...prev, currentView }));
  };

  const toggleFavorite = (propertyId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(propertyId)
        ? prev.favorites.filter(id => id !== propertyId)
        : [...prev.favorites, propertyId]
    }));
  };

  const setSearchTerm = (searchTerm: string) => {
    setState(prev => ({ ...prev, searchTerm }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const contextValue: AppContextType = {
    ...state,
    setSidebarOpen,
    setCurrentView,
    toggleFavorite,
    setSearchTerm,
    setLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};