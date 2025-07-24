import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { FinancingCTA } from "@/components/FinancingCTA";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { FinancialSimulator } from "@/components/FinancialSimulator";
import { VisitForm } from "@/components/forms/VisitForm";
import { FinancingForm } from "@/components/forms/FinancingForm";
import { UserProfileModal } from "@/components/UserProfileModal";
import { Inversores } from "@/pages/Inversores";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Heart, Calendar, Search, Filter, Crown, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProperties } from "@/hooks/useProperties";
import { User as UserType } from "@/types";

// Mock current user - In real app, this would come from auth context
const mockCurrentUser: UserType = {
  id: "user1",
  name: "Juan Pérez",
  email: "juan@email.com",
  phone: "600123456",
  userType: "usuario", // Can be changed to test different user types
  isPremium: false,
  isVIP: false,
  favorites: ["1", "3"],
  visits: [],
  referidos: [],
  referralCode: "JUAN123",
  registrationDate: new Date("2024-01-15"),
  totalReferrals: 2
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showFinancingForm, setShowFinancingForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showInvestorsPage, setShowInvestorsPage] = useState(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<UserType>(mockCurrentUser);
  const { toast } = useToast();
  
  // Use properties hook for data management
  const { 
    filteredProperties: properties, 
    isLoading, 
    error, 
    filterPropertiesLocal 
  } = useProperties();

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Apply filters when search term or filters change
  useEffect(() => {
    filterPropertiesLocal(searchTerm, selectedFilters);
  }, [searchTerm, selectedFilters, filterPropertiesLocal]);

  const handleViewDetails = (id: string) => {
    toast({
      title: "Abriendo detalles",
      description: "Cargando información completa del inmueble..."
    });
  };

  const handleScheduleVisit = (id: string) => {
    setSelectedPropertyForVisit(id);
    setShowVisitForm(true);
  };

  const handleCalculateFinancing = () => {
    toast({
      title: "Simulador financiero",
      description: "Abriendo calculadora de hipotecas..."
    });
  };

  const handleContactFinanhogar = () => {
    setShowFinancingForm(true);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setCurrentUser(prev => ({
      ...prev,
      favorites: prev.favorites.includes(propertyId)
        ? prev.favorites.filter(id => id !== propertyId)
        : [...prev.favorites, propertyId]
    }));
    
    toast({
      title: currentUser.favorites.includes(propertyId) ? "Quitado de favoritos" : "Añadido a favoritos",
      description: "Se ha actualizado tu lista de favoritos"
    });
  };

  const handleUpgradeToVIP = () => {
    setCurrentUser(prev => ({ ...prev, userType: "vip", isVIP: true, isPremium: true }));
    toast({
      title: "¡Bienvenido al área VIP!",
      description: "Ahora tienes acceso a propiedades exclusivas"
    });
    setShowUserProfile(false);
  };

  const handleUpgradeToInvestor = () => {
    setCurrentUser(prev => ({ ...prev, userType: "inversor", isPremium: true }));
    toast({
      title: "¡Eres inversor premium!",
      description: "Acceso completo a oportunidades de inversión"
    });
    setShowUserProfile(false);
  };

  // Show investors page if selected
  if (showInvestorsPage) {
    return (
      <Inversores 
        currentUser={currentUser}
        onUpgradeToInvestor={handleUpgradeToInvestor}
        onBack={() => setShowInvestorsPage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Premium Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 btn-trust-gradient rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Hogares Connect</h1>
                <p className="text-sm text-accent font-medium">Premium Real Estate</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="relative"
              >
                <Heart className="h-5 w-5" />
                {currentUser.favorites.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {currentUser.favorites.length}
                  </div>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowUserProfile(true)}
                className="relative"
              >
                <User className="h-5 w-5" />
                {(currentUser.isVIP || currentUser.userType === 'inversor') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Smart Search Bar */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por zona, tipo o precio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-xl border-border/50"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 animate-fade-in">
              <SearchFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedFilters={selectedFilters}
                onFilterToggle={handleFilterToggle}
                onClearFilters={() => setSelectedFilters([])}
              />
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-foreground font-medium">{properties.length} propiedades</span>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Zona Sur Madrid
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSimulator(true)}
            className="text-accent hover:text-accent/80"
          >
            Simular Financiación
          </Button>
        </div>
      </div>

      {/* Financing CTA - Premium */}
      <div className="container mx-auto px-4 mb-6">
        <FinancingCTA
          onCalculateFinancing={() => setShowSimulator(true)}
          onContactFinanhogar={handleContactFinanhogar}
        />
      </div>

      {/* Properties Grid - Enhanced */}
      <div className="container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-muted-foreground">Cargando propiedades...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Reintentar
            </Button>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron propiedades que coincidan con tu búsqueda.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedFilters([]);
              }}
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onViewDetails={handleViewDetails}
                onScheduleVisit={handleScheduleVisit}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={currentUser.favorites.includes(property.id)}
                currentUser={currentUser}
                showInvestmentInfo={currentUser.userType === 'inversor'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Premium Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/30 shadow-elegant z-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-5 gap-1 p-3">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-3 text-primary">
              <div className="w-7 h-7 btn-primary-gradient rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white text-sm">🏠</span>
              </div>
              <span className="text-xs font-medium">Inicio</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex-col gap-1 h-auto py-3 relative"
            >
              <Heart className="h-6 w-6 text-muted-foreground" />
              {currentUser.favorites.length > 0 && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {currentUser.favorites.length}
                </div>
              )}
              <span className="text-xs text-muted-foreground">Favoritos</span>
            </Button>
            
            <Button variant="ghost" className="flex-col gap-1 h-auto py-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Visitas</span>
            </Button>

            {/* Conditional VIP/Investor access */}
            {(currentUser.userType === 'inversor' || currentUser.isPremium) ? (
              <Button 
                variant="ghost" 
                className="flex-col gap-1 h-auto py-3"
                onClick={() => setShowInvestorsPage(true)}
              >
                <TrendingUp className="h-6 w-6 text-accent" />
                <span className="text-xs text-accent font-medium">Inversión</span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="flex-col gap-1 h-auto py-3"
                onClick={handleUpgradeToInvestor}
              >
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Invertir</span>
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              className="flex-col gap-1 h-auto py-3 relative"
              onClick={() => setShowUserProfile(true)}
            >
              <User className="h-6 w-6 text-muted-foreground" />
              {(currentUser.isVIP || currentUser.userType === 'inversor') && (
                <Crown className="h-3 w-3 text-accent absolute -top-1 -right-1" />
              )}
              <span className="text-xs text-muted-foreground">Perfil</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Financial Simulator Modal */}
      {showSimulator && (
        <FinancialSimulator 
          onClose={() => setShowSimulator(false)}
          onContactFinanhogar={handleContactFinanhogar}
        />
      )}

      {/* Visit Form Modal */}
      {showVisitForm && selectedPropertyForVisit && (
        <VisitForm
          propertyId={selectedPropertyForVisit}
          propertyTitle={properties.find(p => p.id === selectedPropertyForVisit)?.title || ""}
          onClose={() => {
            setShowVisitForm(false);
            setSelectedPropertyForVisit("");
          }}
          onSuccess={() => {
            toast({
              title: "¡Visita programada!",
              description: "Te contactaremos para confirmar los detalles"
            });
          }}
        />
      )}

      {/* Enhanced ChatBot */}
      <ChatBot 
        onOpenSimulator={() => setShowSimulator(true)}
        onContactFinanhogar={handleContactFinanhogar}
        onNavigateToInvestors={() => setShowInvestorsPage(true)}
        onNavigateToVIP={handleUpgradeToVIP}
        onScheduleVisit={() => setShowVisitForm(true)}
      />

      {/* Financing Form Modal */}
      {showFinancingForm && (
        <FinancingForm
          onClose={() => setShowFinancingForm(false)}
          onSuccess={() => {
            toast({
              title: "¡Solicitud enviada!",
              description: "Un asesor de FinanHogar te contactará pronto"
            });
          }}
        />
      )}

      {/* User Profile Modal */}
      {showUserProfile && (
        <UserProfileModal
          user={currentUser}
          onClose={() => setShowUserProfile(false)}
          onUpgradeToVIP={handleUpgradeToVIP}
          onUpgradeToInvestor={handleUpgradeToInvestor}
        />
      )}
    </div>
  );
};

export default Index;
