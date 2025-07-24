import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Shield, 
  Building, 
  DollarSign, 
  BarChart3, 
  Lock, 
  Star,
  ArrowLeft 
} from "lucide-react";
import { InvestmentProperty, User } from "@/types";
import { formatPrice, formatPercentage } from "@/utils";
import { useToast } from "@/hooks/use-toast";

// Mock investment properties
const mockInvestmentProperties: InvestmentProperty[] = [
  {
    id: "inv1",
    title: "Residencial Torres del Sol - Fase 2",
    price: 280000,
    priceDisplay: "280.000€",
    location: "Boadilla del Monte",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    areaDisplay: "95 m²",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    propertyType: "apartment",
    city: "Boadilla del Monte",
    province: "Madrid",
    investmentType: "rental",
    expectedROI: 8.5,
    minimumInvestment: 50000,
    totalUnits: 120,
    soldUnits: 78,
    projectCompletion: 65,
    developerId: "dev1",
    developerName: "Grupo Inmobiliario Premium",
    monthlyRent: 1800,
    roi: 8.5,
    rentalYield: 7.7,
    investmentRisk: "low",
    features: ["Parking incluido", "Trastero", "Piscina comunitaria", "Jardines"]
  },
  {
    id: "inv2", 
    title: "Complejo Comercial Las Rozas Plaza",
    price: 450000,
    priceDisplay: "450.000€",
    location: "Las Rozas",
    bedrooms: 0,
    bathrooms: 2,
    area: 180,
    areaDisplay: "180 m²",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    propertyType: "apartment",
    city: "Las Rozas",
    province: "Madrid",
    investmentType: "commercial",
    expectedROI: 12.3,
    minimumInvestment: 100000,
    totalUnits: 24,
    soldUnits: 18,
    projectCompletion: 90,
    developerId: "dev2",
    developerName: "Capital Retail Partners",
    monthlyRent: 3200,
    roi: 12.3,
    rentalYield: 8.5,
    investmentRisk: "medium",
    features: ["Local comercial", "Zona premium", "Alto tránsito", "Parking"]
  },
  {
    id: "inv3",
    title: "Villas de Lujo - Urbanización Monteclaro",
    price: 850000,
    priceDisplay: "850.000€", 
    location: "Pozuelo de Alarcón",
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    areaDisplay: "320 m²",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
    propertyType: "villa",
    city: "Pozuelo de Alarcón",
    province: "Madrid",
    investmentType: "flip",
    expectedROI: 15.2,
    minimumInvestment: 200000,
    totalUnits: 12,
    soldUnits: 3,
    projectCompletion: 45,
    developerId: "dev3",
    developerName: "Luxury Homes Development",
    roi: 15.2,
    investmentRisk: "high",
    luxuryFeatures: ["Piscina privada", "Jardín 500m²", "Bodega", "Smart Home"],
    features: ["Villa independiente", "Garaje 3 coches", "Gimnasio", "Terraza 80m²"]
  }
];

interface InversoresProps {
  currentUser?: User;
  onUpgradeToInvestor?: () => void;
  onBack?: () => void;
}

export const Inversores = ({ 
  currentUser, 
  onUpgradeToInvestor,
  onBack 
}: InversoresProps) => {
  const [properties, setProperties] = useState<InvestmentProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const { toast } = useToast();

  const isInvestor = currentUser?.userType === 'inversor' || currentUser?.isPremium;

  useEffect(() => {
    // Simulate API call
    const loadInvestmentProperties = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockInvestmentProperties);
      setIsLoading(false);
    };

    loadInvestmentProperties();
  }, []);

  const handleReserveProperty = (propertyId: string) => {
    if (!isInvestor) {
      toast({
        title: "Acceso restringido",
        description: "Necesitas ser inversor premium para reservar propiedades",
        variant: "destructive"
      });
      return;
    }

    setSelectedProperty(propertyId);
    toast({
      title: "Reserva iniciada",
      description: "Un asesor especializado te contactará en las próximas 24 horas"
    });
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Bajo Riesgo';
      case 'medium': return 'Riesgo Medio';
      case 'high': return 'Alto Riesgo';
      default: return 'Sin clasificar';
    }
  };

  if (!isInvestor) {
    return (
      <div className="min-h-screen bg-gradient-subtle pt-20">
        <div className="container mx-auto px-4 py-8">
          {onBack && (
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          )}

          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Área de Inversores Premium
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Accede a oportunidades de inversión exclusivas con rentabilidades superiores al 8%
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Alta Rentabilidad</h3>
                <p className="text-sm text-muted-foreground">ROI entre 8% y 15% anual</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Inversión Segura</h3>
                <p className="text-sm text-muted-foreground">Propiedades verificadas y analizadas</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Asesoría Premium</h3>
                <p className="text-sm text-muted-foreground">Equipo especializado 24/7</p>
              </div>
            </div>

            <Alert className="mb-8 border-accent/20 bg-accent/5">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription className="text-left">
                <strong>Beneficios exclusivos:</strong> Acceso prioritario a nuevos proyectos, 
                análisis de rentabilidad detallados, y asesoría fiscal especializada.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Button 
                size="lg"
                onClick={onUpgradeToInvestor}
                className="btn-primary-gradient shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
              >
                <Building className="h-5 w-5 mr-2" />
                Hacerme Inversor Premium
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Sin permanencia • Cancela cuando quieras • Garantía de satisfacción
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20">
      <div className="container mx-auto px-4 py-8">
        {onBack && (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Oportunidades de Inversión
              </h1>
              <p className="text-muted-foreground">
                Propiedades seleccionadas con alta rentabilidad garantizada
              </p>
            </div>
            
            <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2">
              <Star className="h-4 w-4 mr-1" />
              Inversor Premium
            </Badge>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ROI Promedio</p>
                  <p className="text-2xl font-bold text-primary">12.1%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Propiedades</p>
                  <p className="text-2xl font-bold text-foreground">{properties.length}</p>
                </div>
                <Building className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inv. Mínima</p>
                  <p className="text-2xl font-bold text-foreground">50K€</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disponibles</p>
                  <p className="text-2xl font-bold text-foreground">78%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Properties */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-muted-foreground">Cargando oportunidades...</span>
            </div>
          ) : (
            properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {property.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">{property.location}</p>
                        <p className="text-sm text-muted-foreground">
                          Desarrollado por {property.developerName}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary mb-1">
                          {formatPrice(property.price)}
                        </p>
                        <Badge className={getRiskBadgeColor(property.investmentRisk)}>
                          {getRiskLabel(property.investmentRisk)}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <p className="text-lg font-bold text-primary">
                          {formatPercentage(property.expectedROI)}
                        </p>
                        <p className="text-xs text-muted-foreground">ROI Esperado</p>
                      </div>
                      
                      <div className="text-center p-3 bg-accent/5 rounded-lg">
                        <p className="text-lg font-bold text-accent">
                          {formatPrice(property.minimumInvestment)}
                        </p>
                        <p className="text-xs text-muted-foreground">Inv. Mínima</p>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-600">
                          {property.soldUnits}/{property.totalUnits}
                        </p>
                        <p className="text-xs text-muted-foreground">Unidades</p>
                      </div>
                      
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">
                          {property.projectCompletion}%
                        </p>
                        <p className="text-xs text-muted-foreground">Completado</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{property.investmentType}</Badge>
                      <Badge variant="outline">{property.areaDisplay}</Badge>
                      {property.bedrooms > 0 && (
                        <Badge variant="outline">{property.bedrooms} dorm.</Badge>
                      )}
                      <Badge variant="outline">{property.bathrooms} baños</Badge>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleReserveProperty(property.id)}
                        className={`flex-1 ${
                          selectedProperty === property.id 
                            ? 'btn-accent-gradient' 
                            : 'btn-primary-gradient'
                        }`}
                        disabled={selectedProperty === property.id}
                      >
                        {selectedProperty === property.id ? (
                          <>
                            <Star className="h-4 w-4 mr-2" />
                            Reservado
                          </>
                        ) : (
                          <>
                            <Building className="h-4 w-4 mr-2" />
                            Reservar Ahora
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Información detallada",
                            description: "Se enviará el dossier completo a tu email"
                          });
                        }}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Ver Análisis
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};