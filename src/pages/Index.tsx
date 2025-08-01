import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  TrendingUp,
  Crown,
  Heart,
  Calculator,
  MessageCircle,
  User as UserIcon,
  Building,
  Home,
  Gift,
  Sparkles
} from "lucide-react";
import { Property, User, AdvancedSearchFilters } from "@/types";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { VisitForm } from "@/components/forms/VisitForm";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { UserProfileModal } from "@/components/UserProfileModal";
import { ReferralPanel } from "@/components/ReferralPanel";
import { FinancialSimulator } from "@/components/FinancialSimulator";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Inversores } from "@/pages/Inversores";
import { AdvancedSearchFiltersPanel } from "@/components/AdvancedSearchFilters";
import { PropertyModal } from "@/components/PropertyModal";
import { NotificationSystem } from "@/components/NotificationSystem";
import { useProperties } from "@/hooks/useProperties";
import { useVisits } from "@/hooks/useVisits";
import { PropertiesService } from "@/services/propertiesService";
import { useToast } from "@/hooks/use-toast";

// Mock current user - in production this would come from authentication
const mockCurrentUser: User = {
  id: "user123",
  name: "Juan Pérez",
  email: "juan.perez@email.com",
  phone: "+34 600 123 456",
  userType: "vip",
  isPremium: true,
  isVIP: true,
  favorites: ["1", "3"],
  visits: [],
  referidos: ["user456", "user789"],
  referralCode: "JUAN123",
  registrationDate: new Date('2023-01-15'),
  totalReferrals: 3,
  premiumExpiry: new Date('2024-12-31')
};

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showInvestors, setShowInvestors] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedSearchFilters>({});
  const [activeSection, setActiveSection] = useState("home");
  const [favorites, setFavorites] = useState<string[]>(mockCurrentUser.favorites);
  
  // Use hooks
  const { filteredProperties, isLoading, filterPropertiesLocal, filterPropertiesAdvanced } = useProperties();
  const { scheduleVisit } = useVisits();
  const { toast } = useToast();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await PropertiesService.getAllProperties();
      if (response.success) {
        setProperties(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cargar las propiedades",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleVisit = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      
      toast({
        title: newFavorites.includes(propertyId) ? "Añadido a favoritos" : "Eliminado de favoritos",
        description: newFavorites.includes(propertyId) 
          ? "La propiedad se ha añadido a tus favoritos" 
          : "La propiedad se ha eliminado de tus favoritos"
      });
      
      return newFavorites;
    });
  };

  if (showInvestors) {
    return (
      <Inversores 
        currentUser={mockCurrentUser}
        onUpgradeToInvestor={() => {}}
        onBack={() => setShowInvestors(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-lg border-b border-border/50 shadow-glow sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 btn-primary-gradient rounded-xl flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Hogares Connect</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Tu hogar ideal te está esperando
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(true)}
                className="relative"
              >
                <UserIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{mockCurrentUser.name}</span>
                {mockCurrentUser.isPremium && (
                  <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 bg-accent" />
                )}
              </Button>
              
              <NotificationSystem />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Encuentra tu hogar ideal
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Más de 1.000 propiedades verificadas en Madrid Sur
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-input"
                placeholder="Buscar por ubicación o tipo..."
                value={searchTerm}
                onChange={(e) => filterPropertiesLocal(e.target.value, [])}
                className="pl-10 pr-4 py-3 text-center bg-card/50 backdrop-blur-sm border-border/50 shadow-glow"
              />
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Propiedades Disponibles</h3>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAdvancedFilters(true)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
              <Badge variant="outline" className="bg-card/50">
                {filteredProperties.length} propiedades
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onViewDetails={() => setSelectedProperty(property)}
                onScheduleVisit={handleScheduleVisit}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(property.id)}
                currentUser={mockCurrentUser}
                showInvestmentInfo={mockCurrentUser.userType === 'inversor'}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation
        currentUser={mockCurrentUser}
        onNavigate={() => {}}
        activeSection={activeSection}
        favoriteCount={favorites.length}
      />

      {/* Modals */}
      {selectedPropertyId && (
        <VisitForm
          propertyId={selectedPropertyId}
          propertyTitle={properties.find(p => p.id === selectedPropertyId)?.title || ""}
          onClose={() => setSelectedPropertyId(null)}
          onSuccess={() => {
            toast({
              title: "¡Visita programada!",
              description: "Te contactaremos para confirmar los detalles"
            });
          }}
        />
      )}

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onScheduleVisit={handleScheduleVisit}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(selectedProperty.id)}
          currentUser={mockCurrentUser}
        />
      )}

      {showAdvancedFilters && (
        <AdvancedSearchFiltersPanel
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          onClearFilters={() => setAdvancedFilters({})}
          onClose={() => setShowAdvancedFilters(false)}
        />
      )}

      {showCalculator && (
        <FinancialSimulator
          onClose={() => setShowCalculator(false)}
          onContactFinanhogar={() => {}}
        />
      )}
    </div>
  );
};

export default Index;