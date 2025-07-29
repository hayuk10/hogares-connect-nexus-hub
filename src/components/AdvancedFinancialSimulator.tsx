import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, Shield, Users, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AdvancedFinancialSimulatorProps {
  onClose: () => void;
  onContactFinanhogar: () => void;
}

export const AdvancedFinancialSimulator = ({ onClose, onContactFinanhogar }: AdvancedFinancialSimulatorProps) => {
  const [propertyValue, setPropertyValue] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestType, setInterestType] = useState<'fixed' | 'mixed'>('fixed');
  const [clientProfile, setClientProfile] = useState<'funcionario' | 'extranjero' | 'general'>('general');

  // Interest rates based on type
  const getInterestRate = () => {
    if (interestType === 'fixed') {
      return clientProfile === 'funcionario' ? 1.8 : 2.2; // 1.8%-2.4%
    } else {
      return clientProfile === 'funcionario' ? 1.4 : 1.6; // 1.4%-1.7%
    }
  };

  const interestRate = getInterestRate();
  const loanAmount = propertyValue - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalCost = monthlyPayment * numberOfPayments + downPayment;
  const totalInterest = monthlyPayment * numberOfPayments - loanAmount;

  // Additional costs calculation
  const itp = propertyValue * (propertyValue > 400000 ? 0.08 : 0.06); // ITP 6%-8%
  const notaryFees = Math.min(propertyValue * 0.005, 3000); // 0.5% max 3000€
  const registryFees = Math.min(propertyValue * 0.002, 1500); // 0.2% max 1500€
  const appraisalFee = 300;
  const managementFees = 1200;
  
  const totalAdditionalCosts = itp + notaryFees + registryFees + appraisalFee + managementFees;
  const totalInitialCost = downPayment + totalAdditionalCosts;

  const handleGetQuote = () => {
    onContactFinanhogar();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Simulador Financiero Avanzado
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Calcula tu hipoteca con diferentes tipos de interés y perfiles
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="simulator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simulator">Simulador</TabsTrigger>
              <TabsTrigger value="breakdown">Desglose Completo</TabsTrigger>
            </TabsList>

            <TabsContent value="simulator" className="space-y-6">
              {/* Profile Selection */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Interés</label>
                  <Select value={interestType} onValueChange={(value: 'fixed' | 'mixed') => setInterestType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <div>
                            <div>Tipo Fijo</div>
                            <div className="text-xs text-muted-foreground">1.8% - 2.4%</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="mixed">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <div>
                            <div>Tipo Mixto</div>
                            <div className="text-xs text-muted-foreground">1.4% - 1.7%</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Perfil del Cliente</label>
                  <Select value={clientProfile} onValueChange={(value: 'funcionario' | 'extranjero' | 'general') => setClientProfile(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funcionario">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <div>
                            <div>Funcionario</div>
                            <div className="text-xs text-muted-foreground">Mejores condiciones</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="general">Cliente General</SelectItem>
                      <SelectItem value="extranjero">Cliente Extranjero</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Valor del Inmueble</label>
                    <Badge variant="secondary">€{propertyValue.toLocaleString()}</Badge>
                  </div>
                  <Slider
                    value={[propertyValue]}
                    onValueChange={(value) => {
                      setPropertyValue(value[0]);
                      setDownPayment(Math.min(downPayment, value[0] * 0.8));
                    }}
                    max={1000000}
                    min={100000}
                    step={10000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Entrada</label>
                    <Badge variant="secondary">
                      €{downPayment.toLocaleString()} ({((downPayment / propertyValue) * 100).toFixed(0)}%)
                    </Badge>
                  </div>
                  <Slider
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    max={propertyValue * 0.8}
                    min={propertyValue * 0.2}
                    step={5000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Plazo</label>
                    <Badge variant="secondary">{loanTerm} años</Badge>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    max={40}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Tipo de Interés</label>
                    <Badge variant="outline">{interestRate.toFixed(2)}% {interestType === 'mixed' ? 'inicial' : 'fijo'}</Badge>
                  </div>
                  <div className="h-6 bg-gradient-to-r from-green-200 to-red-200 rounded-full relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full"
                      style={{ width: `${((interestRate - 1.4) / (2.4 - 1.4)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">€{monthlyPayment.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">Cuota mensual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">€{totalInitialCost.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">Coste inicial total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">€{totalCost.toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground">Coste total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Costes Iniciales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Entrada</span>
                      <span className="font-medium">€{downPayment.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>ITP ({propertyValue > 400000 ? '8%' : '6%'})</span>
                      <span className="font-medium">€{itp.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Notaría</span>
                      <span className="font-medium">€{notaryFees.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registro</span>
                      <span className="font-medium">€{registryFees.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tasación</span>
                      <span className="font-medium">€{appraisalFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gestión</span>
                      <span className="font-medium">€{managementFees}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Inicial</span>
                      <span className="text-primary">€{totalInitialCost.toFixed(0)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumen Hipoteca</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Capital prestado</span>
                      <span className="font-medium">€{loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intereses totales</span>
                      <span className="font-medium">€{totalInterest.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cuota mensual</span>
                      <span className="font-medium text-primary">€{monthlyPayment.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plazo</span>
                      <span className="font-medium">{loanTerm} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tipo de interés</span>
                      <span className="font-medium">{interestRate.toFixed(2)}%</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total a pagar</span>
                      <span className="text-primary">€{totalCost.toFixed(0)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {interestType === 'mixed' && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Hipoteca Mixta</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Los primeros 3-5 años a tipo fijo del {interestRate}%, después variable según Euríbor + diferencial.
                          La cuota puede variar en función de la evolución de los tipos de interés.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleGetQuote} className="flex-1">
              Solicitar Estudio Personalizado
            </Button>
            <Button variant="outline" onClick={onClose}>
              Seguir Explorando
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            * Simulación orientativa. Las condiciones finales pueden variar según el análisis de viabilidad del banco.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};