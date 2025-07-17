import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Clock } from "lucide-react";

interface FinancingCTAProps {
  onCalculateFinancing: () => void;
  onContactFinanhogar: () => void;
}

export const FinancingCTA = ({ onCalculateFinancing, onContactFinanhogar }: FinancingCTAProps) => {
  return (
    <Card className="bg-gradient-to-r from-primary to-accent text-white shadow-elegant">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <TrendingUp className="h-12 w-12 mb-2" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">
              ¿Necesitas financiación?
            </h3>
            <p className="text-sm opacity-90">
              Simulamos tu hipoteca en segundos y te ayudamos a conseguir la mejor oferta
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <Calculator className="h-6 w-6 mx-auto mb-1" />
              <span className="text-xs">Simulador gratis</span>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-1" />
              <span className="text-xs">Respuesta 24h</span>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-1" />
              <span className="text-xs">Mejores tipos</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={onCalculateFinancing}
              className="w-full bg-white text-primary hover:bg-gray-100 font-semibold"
            >
              Calcular mi hipoteca
            </Button>
            <Button
              variant="outline"
              onClick={onContactFinanhogar}
              className="w-full border-white text-white hover:bg-white/10"
            >
              Hablar con FinanHogar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};