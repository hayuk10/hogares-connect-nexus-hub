import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { X, Calculator, TrendingUp, Clock, Euro } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinancialSimulatorProps {
  onClose: () => void;
  onContactFinanhogar: () => void;
}

export const FinancialSimulator = ({ onClose, onContactFinanhogar }: FinancialSimulatorProps) => {
  const [propertyValue, setPropertyValue] = useState([300000]);
  const [downPayment, setDownPayment] = useState([20]);
  const [loanTerm, setLoanTerm] = useState([25]);
  const [interestRate] = useState(3.5);
  const { toast } = useToast();

  const loanAmount = propertyValue[0] * (1 - downPayment[0] / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm[0] * 12;
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalCost = monthlyPayment * numberOfPayments + (propertyValue[0] * downPayment[0] / 100);
  const totalInterest = totalCost - propertyValue[0];

  const handleGetQuote = () => {
    toast({
      title: "Solicitud enviada",
      description: "Un especialista de FinanHogar te contactará en 24h"
    });
    onContactFinanhogar();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-lg border border-border/50 shadow-glow">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 btn-trust-gradient rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Simulador Hipotecario</CardTitle>
              <p className="text-muted-foreground">Calcula tu cuota mensual personalizada</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Property Value */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Valor del inmueble</label>
              <Badge variant="outline" className="text-accent">
                {propertyValue[0].toLocaleString()}€
              </Badge>
            </div>
            <Slider
              value={propertyValue}
              onValueChange={setPropertyValue}
              max={800000}
              min={100000}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100.000€</span>
              <span>800.000€</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Entrada inicial</label>
              <Badge variant="outline" className="text-accent">
                {downPayment[0]}% - {(propertyValue[0] * downPayment[0] / 100).toLocaleString()}€
              </Badge>
            </div>
            <Slider
              value={downPayment}
              onValueChange={setDownPayment}
              max={40}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10%</span>
              <span>40%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Plazo del préstamo</label>
              <Badge variant="outline" className="text-accent">
                {loanTerm[0]} años
              </Badge>
            </div>
            <Slider
              value={loanTerm}
              onValueChange={setLoanTerm}
              max={40}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10 años</span>
              <span>40 años</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Euro className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Cuota Mensual</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {monthlyPayment.toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Intereses Totales</span>
              </div>
              <div className="text-xl font-semibold text-muted-foreground">
                {totalInterest.toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Coste Total</span>
              </div>
              <div className="text-xl font-semibold text-muted-foreground">
                {totalCost.toLocaleString('es-ES', { maximumFractionDigits: 0 })}€
              </div>
            </div>
          </div>

          {/* Interest Rate Info */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm font-medium">Tipo de interés estimado: {interestRate}% TIN</span>
            </div>
            <p className="text-xs text-muted-foreground">
              *Simulación orientativa. Condiciones definitivas sujetas a estudio de viabilidad.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleGetQuote}
              className="w-full btn-primary-gradient shadow-lg hover:shadow-xl transition-shadow"
              size="lg"
            >
              Solicitar Estudio Personalizado
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-border/50"
              >
                Seguir buscando
              </Button>
              <Button 
                variant="ghost"
                onClick={onContactFinanhogar}
                className="text-accent hover:text-accent/80"
              >
                Hablar con experto
              </Button>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="text-center space-y-2 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              ✓ Aprobación en 24-48h &nbsp;•&nbsp; ✓ Sin comisiones ocultas &nbsp;•&nbsp; ✓ Mejor tipo garantizado
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-accent font-medium">Powered by FinanHogar</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};