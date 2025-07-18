import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Phone, TrendingUp, Star, Shield, Clock } from "lucide-react";

interface FinancingCTAProps {
  onCalculateFinancing: () => void;
  onContactFinanhogar: () => void;
}

export const FinancingCTA = ({ onCalculateFinancing, onContactFinanhogar }: FinancingCTAProps) => {
  return (
    <Card className="bg-gradient-primary border-none shadow-glow overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
      </div>
      
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white mb-1">
                Financiación Premium
              </h3>
              <p className="text-white/80 text-sm">
                Las mejores condiciones del mercado
              </p>
            </div>
          </div>
          <Badge className="bg-accent text-accent-foreground font-semibold">
            EXCLUSIVO
          </Badge>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Star className="h-4 w-4 text-white" />
            </div>
            <p className="text-xs text-white/80 font-medium">Desde 2.9% TIN</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <p className="text-xs text-white/80 font-medium">Aprobación 24h</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <p className="text-xs text-white/80 font-medium">Sin comisiones</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={onCalculateFinancing}
            variant="secondary"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 transition-all"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Simular
          </Button>
          <Button 
            onClick={onContactFinanhogar}
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-md"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contactar
          </Button>
        </div>

        <p className="text-xs text-white/60 text-center mt-3">
          *Condiciones sujetas a estudio de viabilidad crediticia
        </p>
      </CardContent>
    </Card>
  );
};