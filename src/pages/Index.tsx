import { useState, useEffect } from "react";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { FinancingCTA } from "@/components/FinancingCTA";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { FinancialSimulator } from "@/components/FinancialSimulator";
import { VisitForm } from "@/components/forms/VisitForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Heart, Calendar, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProperties } from "@/hooks/useProperties";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<string>("");
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
    toast({
      title: "Contacto FinanHogar",
      description: "Un asesor te contactará en breve"
    });
  };

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
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
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
              />
            ))}
          </div>
        )}
      </div>

      {/* Premium Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/30 shadow-elegant z-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-1 p-3">
            <Button variant="ghost" className="flex-col gap-1 h-auto py-3 text-primary">
              <div className="w-7 h-7 btn-primary-gradient rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white text-sm">🏠</span>
              </div>
              <span className="text-xs font-medium">Inicio</span>
            </Button>
            
            <Button variant="ghost" className="flex-col gap-1 h-auto py-3">
              <Heart className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Favoritos</span>
            </Button>
            
            <Button variant="ghost" className="flex-col gap-1 h-auto py-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Visitas</span>
            </Button>
            
            <Button variant="ghost" className="flex-col gap-1 h-auto py-3">
              <User className="h-6 w-6 text-muted-foreground" />
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
      />
    </div>
  );
};

export default Index;
