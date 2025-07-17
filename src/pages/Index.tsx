import { useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilters } from "@/components/SearchFilters";
import { FinancingCTA } from "@/components/FinancingCTA";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Heart, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock data - En producción vendría de una API
  const properties = [
    {
      id: "1",
      title: "Piso moderno en Getafe Centro",
      price: "285.000€",
      location: "Getafe Centro",
      bedrooms: 3,
      bathrooms: 2,
      area: "95m²",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      isNew: true
    },
    {
      id: "2", 
      title: "Casa adosada con jardín",
      price: "345.000€",
      location: "Fuenlabrada",
      bedrooms: 4,
      bathrooms: 3,
      area: "120m²",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      id: "3",
      title: "Ático con terraza panorámica",
      price: "420.000€", 
      location: "Leganés",
      bedrooms: 2,
      bathrooms: 2,
      area: "85m²",
      imageUrl: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a"
    }
  ];

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: "Abriendo detalles",
      description: "Cargando información completa del inmueble..."
    });
  };

  const handleScheduleVisit = (id: string) => {
    toast({
      title: "Agendando visita",
      description: "Te contactaremos para coordinar la visita"
    });
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 btn-trust-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Hogares Connect</h1>
                <p className="text-xs text-muted-foreground">Tu hogar ideal te espera</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
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

      {/* Search & Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedFilters={selectedFilters}
        onFilterToggle={handleFilterToggle}
        onClearFilters={() => setSelectedFilters([])}
      />

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{properties.length} inmuebles disponibles</span>
          <Badge variant="outline" className="text-accent">
            Zona Sur Madrid
          </Badge>
        </div>
      </div>

      {/* Financing CTA */}
      <div className="container mx-auto px-4 mb-6">
        <FinancingCTA
          onCalculateFinancing={handleCalculateFinancing}
          onContactFinanhogar={handleContactFinanhogar}
        />
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid gap-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              onViewDetails={handleViewDetails}
              onScheduleVisit={handleScheduleVisit}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-elegant z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
            <div className="w-6 h-6 btn-primary-gradient rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🏠</span>
            </div>
            <span className="text-xs text-primary font-medium">Inicio</span>
          </Button>
          
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Favoritos</span>
          </Button>
          
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Visitas</span>
          </Button>
          
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Perfil</span>
          </Button>
        </div>
      </nav>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Index;
