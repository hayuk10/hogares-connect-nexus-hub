import React, { useState } from 'react';
import { Property, User, FinancingCalculation } from '@/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Heart, 
  Calculator,
  Euro,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react';
import { useFinancing } from '@/hooks/useFinancing';
import { useToast } from '@/hooks/use-toast';

interface PropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onScheduleVisit: (propertyId: string) => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: boolean;
  currentUser: User | null;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  isOpen,
  onClose,
  onScheduleVisit,
  onToggleFavorite,
  isFavorite,
  currentUser
}) => {
  const [financingData, setFinancingData] = useState({
    downPaymentPercentage: 20,
    loanTermYears: 30,
    monthlyIncome: 3000,
    monthlyExpenses: 1200
  });
  const [calculation, setCalculation] = useState<FinancingCalculation | null>(null);
  const [calculating, setCalculating] = useState(false);

  const { calculateMortgage, checkAffordability, getFinancingOptions } = useFinancing();
  const { toast } = useToast();

  const handleCalculateFinancing = async () => {
    setCalculating(true);
    try {
      const result = await calculateMortgage(
        property.price,
        financingData.downPaymentPercentage,
        financingData.loanTermYears
      );
      
      if (result) {
        setCalculation(result);
        
        // Check affordability
        const affordability = await checkAffordability(
          financingData.monthlyIncome,
          financingData.monthlyExpenses,
          result.monthlyPayment
        );
        
        if (affordability && !affordability.affordable) {
          toast({
            title: "Atención",
            description: affordability.recommendation,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo calcular la financiación",
        variant: "destructive"
      });
    } finally {
      setCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{property.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(property.id)}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Property Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.bedrooms} hab.</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.bathrooms} baños</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{property.areaDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">{property.priceDisplay}</span>
            </div>
          </div>

          {/* Price and Special Badges */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">{property.priceDisplay}</div>
            <div className="flex gap-2">
              {property.isNew && <Badge variant="default">Obra nueva</Badge>}
              {property.isExclusive && <Badge variant="secondary">Exclusiva</Badge>}
              {property.exclusiveAccess && <Badge className="bg-accent">VIP</Badge>}
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="financing">Financiación</TabsTrigger>
              <TabsTrigger value="investment">Inversión</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              {/* Description */}
              {property.description && (
                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Características</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Luxury Features */}
              {property.luxuryFeatures && property.luxuryFeatures.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    Características Premium
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.luxuryFeatures.map((feature, index) => (
                      <Badge key={index} className="bg-accent/10 text-accent border-accent/20">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="financing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Simulador de Financiación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="downPayment">Entrada (%)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={financingData.downPaymentPercentage}
                        onChange={(e) => setFinancingData(prev => ({
                          ...prev,
                          downPaymentPercentage: Number(e.target.value)
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTerm">Plazo (años)</Label>
                      <Input
                        id="loanTerm"
                        type="number"
                        value={financingData.loanTermYears}
                        onChange={(e) => setFinancingData(prev => ({
                          ...prev,
                          loanTermYears: Number(e.target.value)
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyIncome">Ingresos mensuales</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={financingData.monthlyIncome}
                        onChange={(e) => setFinancingData(prev => ({
                          ...prev,
                          monthlyIncome: Number(e.target.value)
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyExpenses">Gastos mensuales</Label>
                      <Input
                        id="monthlyExpenses"
                        type="number"
                        value={financingData.monthlyExpenses}
                        onChange={(e) => setFinancingData(prev => ({
                          ...prev,
                          monthlyExpenses: Number(e.target.value)
                        }))}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCalculateFinancing} 
                    disabled={calculating}
                    className="w-full"
                  >
                    {calculating ? "Calculando..." : "Calcular Financiación"}
                  </Button>

                  {calculation && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Cuota mensual:</span>
                        <span className="font-semibold">{formatCurrency(calculation.monthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Entrada:</span>
                        <span>{formatCurrency(calculation.downPayment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coste total:</span>
                        <span>{formatCurrency(calculation.totalCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Intereses totales:</span>
                        <span>{formatCurrency(calculation.totalInterest)}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investment" className="space-y-4">
              {(property.monthlyRent || property.roi) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Información de Inversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {property.monthlyRent && (
                      <div className="flex justify-between">
                        <span>Renta mensual estimada:</span>
                        <span className="font-semibold">{formatCurrency(property.monthlyRent)}</span>
                      </div>
                    )}
                    {property.roi && (
                      <div className="flex justify-between">
                        <span>ROI estimado:</span>
                        <span className="font-semibold text-green-600">{property.roi}%</span>
                      </div>
                    )}
                    {property.investmentRisk && (
                      <div className="flex justify-between items-center">
                        <span>Riesgo de inversión:</span>
                        <Badge variant={
                          property.investmentRisk === 'low' ? 'default' :
                          property.investmentRisk === 'medium' ? 'secondary' : 'destructive'
                        }>
                          <Shield className="h-3 w-3 mr-1" />
                          {property.investmentRisk === 'low' ? 'Bajo' :
                           property.investmentRisk === 'medium' ? 'Medio' : 'Alto'}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => onScheduleVisit(property.id)}
              className="flex-1"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Visita
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onToggleFavorite(property.id)}
              className={isFavorite ? "text-red-500 border-red-200" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};