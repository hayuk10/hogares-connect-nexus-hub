
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
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
import { Property, User } from "@/types";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { VisitForm } from "@/components/forms/VisitForm";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { UserProfileModal } from "@/components/UserProfileModal";
import { ReferralPanel } from "@/components/ReferralPanel";
import { FinancialSimulator } from "@/components/FinancialSimulator";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Inversores } from "@/pages/Inversores";
import { PropertiesService } from "@/services/propertiesService";
import { useToast } from "@/hooks/use-toast";

// Mock current user - in production this would come from authentication
const mockCurrentUser: User = {
  id: "user123",
  name: "Juan Pérez",
  email: "juan.perez@email.com",
  phone: "+34 600 123 456",
  userType: "vip", // Change to test different user types: "usuario" | "asesor" | "referido" | "vip" | "inversor"
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
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showInvestors, setShowInvestors] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [favorites, setFavorites] = useState<string[]>(mockCurrentUser.favorites);
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
        setFilteredProperties(response.data);
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(term.toLowerCase()) ||
          property.location.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProperties(filtered);
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

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    
    switch (section) {
      case "home":
        setShowChat(false);
        setShowProfile(false);
        setShowReferrals(false);
        setShowCalculator(false);
        setShowInvestors(false);
        break;
      case "search":
        // Focus on search input
        document.getElementById('search-input')?.focus();
        break;
      case "favorites":
        setFilteredProperties(properties.filter(p => favorites.includes(p.id)));
        break;
      case "calculator":
        setShowCalculator(true);
        break;
      case "chat":
        setShowChat(true);
        break;
      case "profile":
        setShowProfile(true);
        break;
      case "investors":
        setShowInvestors(true);
        break;
      case "vip":
        toast({
          title: "Área VIP",
          description: "Bienvenido al área exclusiva para miembros VIP"
        });
        break;
    }
  };

  const handleUpgradeToVIP = () => {
    toast({
      title: "Upgrade a VIP",
      description: "Serás redirigido a la página de suscripción VIP"
    });
  };

  const handleUpgradeToInvestor = () => {
    toast({
      title: "Ser Inversor",
      description: "Serás redirigido a la página de inversores premium"
    });
  };

  const handleContactFinanhogar = () => {
    toast({
      title: "Contacto FinanHogar",
      description: "Te pondremos en contacto con un asesor financiero especializado"
    });
  };

  // Show investor page if selected
  if (showInvestors) {
    return (
      <Inversores 
        currentUser={mockCurrentUser}
        onUpgradeToInvestor={handleUpgradeToInvestor}
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
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                {mockCurrentUser.userType === 'inversor' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInvestors(true)}
                    className="text-primary hover:text-primary/80"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Inversiones
                  </Button>
                )}
                
                {(mockCurrentUser.userType === 'vip' || mockCurrentUser.isVIP) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation("vip")}
                    className="text-accent hover:text-accent/80"
                  >
                    <Crown className="h-4 w-4 mr-1" />
                    VIP
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCalculator(true)}
                >
                  <Calculator className="h-4 w-4 mr-1" />
                  Calculadora
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </div>
              
              {/* User Profile */}
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
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-center bg-card/50 backdrop-blur-sm border-border/50 shadow-glow"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCalculator(true)}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <Calculator className="h-4 w-4 mr-1" />
                Calculadora
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChat(true)}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Consultar
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation("favorites")}
                className="bg-card/50 backdrop-blur-sm border-border/50 relative"
              >
                <Heart className="h-4 w-4 mr-1" />
                Favoritos
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-accent text-white">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReferrals(true)}
                className="bg-card/50 backdrop-blur-sm border-border/50"
              >
                <Gift className="h-4 w-4 mr-1" />
                Referir
              </Button>
            </div>
          </div>
        </section>

        {/* User Type Benefits */}
        {mockCurrentUser.userType === 'vip' && (
          <section className="mb-8">
            <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Crown className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">Miembro VIP</h3>
                    <p className="text-sm text-muted-foreground">
                      Acceso exclusivo a propiedades premium y asesoría personalizada
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Beneficios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Properties Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">
              {activeSection === "favorites" ? "Tus Favoritos" : "Propiedades Disponibles"}
            </h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
              <Badge variant="outline" className="bg-card/50">
                {filteredProperties.length} propiedades
              </Badge>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="overflow-hidden">
                    <div className="aspect-[16/10] bg-muted" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="flex gap-2">
                        <div className="h-8 bg-muted rounded flex-1" />
                        <div className="h-8 bg-muted rounded flex-1" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onViewDetails={() => {
                    toast({
                      title: "Ver detalles",
                      description: `Mostrando detalles de ${property.title}`
                    });
                  }}
                  onScheduleVisit={handleScheduleVisit}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(property.id)}
                  currentUser={mockCurrentUser}
                  showInvestmentInfo={mockCurrentUser.userType === 'inversor'}
                />
              ))}
            </div>
          )}
          
          {filteredProperties.length === 0 && !loading && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No se encontraron propiedades
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta con otros términos de búsqueda o ajusta los filtros
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilteredProperties(properties);
                  setActiveSection("home");
                }}
                variant="outline"
              >
                Ver todas las propiedades
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation
        currentUser={mockCurrentUser}
        onNavigate={handleNavigation}
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

      {showChat && (
        <ChatBot
          onClose={() => setShowChat(false)}
          currentUser={mockCurrentUser}
          onOpenCalculator={() => {
            setShowChat(false);
            setShowCalculator(true);
          }}
          onOpenInvestors={() => {
            setShowChat(false);
            setShowInvestors(true);
          }}
        />
      )}

      {showProfile && (
        <UserProfileModal
          user={mockCurrentUser}
          onClose={() => setShowProfile(false)}
          onUpgradeToVIP={handleUpgradeToVIP}
          onUpgradeToInvestor={handleUpgradeToInvestor}
        />
      )}

      {showReferrals && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sistema de Referidos</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReferrals(false)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ReferralPanel
                currentUser={mockCurrentUser}
                onClose={() => setShowReferrals(false)}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {showCalculator && (
        <FinancialSimulator
          onClose={() => setShowCalculator(false)}
          onContactFinanhogar={handleContactFinanhogar}
        />
      )}
    </div>
  );
};

export default Index;
