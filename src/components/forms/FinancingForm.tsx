import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Phone, Mail, DollarSign, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail, isValidPhone } from "@/utils";

interface FinancingFormProps {
  onClose: () => void;
  onSuccess: () => void;
  propertyValue?: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  monthlyIncome: string;
  availableSavings: string;
  employmentType: string;
  propertyValue: string;
  requestedLoanAmount: string;
  comments: string;
}

export const FinancingForm = ({ onClose, onSuccess, propertyValue }: FinancingFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    monthlyIncome: '',
    availableSavings: '',
    employmentType: '',
    propertyValue: propertyValue?.toString() || '',
    requestedLoanAmount: '',
    comments: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Teléfono no válido';
    }

    if (!formData.monthlyIncome.trim()) {
      newErrors.monthlyIncome = 'Los ingresos mensuales son obligatorios';
    }

    if (!formData.availableSavings.trim()) {
      newErrors.availableSavings = 'El ahorro disponible es obligatorio';
    }

    if (!formData.employmentType) {
      newErrors.employmentType = 'Tipo de empleo es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Solicitud enviada con éxito!",
        description: "Un asesor de FinanHogar te contactará en las próximas 24 horas"
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: "Error al enviar solicitud",
        description: "Por favor, inténtalo de nuevo más tarde",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Solicitud de Financiación</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Conectamos con FinanHogar para conseguir las mejores condiciones
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">2.9%</div>
              <div className="text-xs text-muted-foreground">TIN desde</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">24h</div>
              <div className="text-xs text-muted-foreground">Respuesta</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">95%</div>
              <div className="text-xs text-muted-foreground">Aprobación</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Juan Pérez García"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="juan@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="600 123 456"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="employmentType">Situación laboral *</Label>
                  <Select 
                    value={formData.employmentType} 
                    onValueChange={(value) => handleInputChange('employmentType', value)}
                  >
                    <SelectTrigger className={errors.employmentType ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="empleado">Empleado por cuenta ajena</SelectItem>
                      <SelectItem value="autonomo">Autónomo</SelectItem>
                      <SelectItem value="funcionario">Funcionario</SelectItem>
                      <SelectItem value="pensionista">Pensionista</SelectItem>
                      <SelectItem value="empresario">Empresario</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employmentType && (
                    <p className="text-xs text-destructive mt-1">{errors.employmentType}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Información Financiera
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyIncome">Ingresos mensuales netos *</Label>
                  <Input
                    id="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                    placeholder="3.500 €"
                    className={errors.monthlyIncome ? 'border-destructive' : ''}
                  />
                  {errors.monthlyIncome && (
                    <p className="text-xs text-destructive mt-1">{errors.monthlyIncome}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="availableSavings">Ahorro disponible *</Label>
                  <Input
                    id="availableSavings"
                    value={formData.availableSavings}
                    onChange={(e) => handleInputChange('availableSavings', e.target.value)}
                    placeholder="80.000 €"
                    className={errors.availableSavings ? 'border-destructive' : ''}
                  />
                  {errors.availableSavings && (
                    <p className="text-xs text-destructive mt-1">{errors.availableSavings}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="propertyValue">Valor de la propiedad</Label>
                  <Input
                    id="propertyValue"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                    placeholder="350.000 €"
                  />
                </div>

                <div>
                  <Label htmlFor="requestedLoanAmount">Importe solicitado</Label>
                  <Input
                    id="requestedLoanAmount"
                    value={formData.requestedLoanAmount}
                    onChange={(e) => handleInputChange('requestedLoanAmount', e.target.value)}
                    placeholder="270.000 €"
                  />
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <Label htmlFor="comments">Comentarios adicionales</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                placeholder="Cuéntanos más detalles sobre tu situación o necesidades específicas..."
                rows={3}
              />
            </div>

            {/* Submit buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                className="flex-1 btn-primary-gradient"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2" />
                    Solicitar Financiación
                  </>
                )}
              </Button>
            </div>

            {/* Privacy notice */}
            <div className="text-xs text-muted-foreground text-center pt-2">
              <CheckCircle className="h-3 w-3 inline mr-1" />
              Tus datos están protegidos según la LOPD y se compartirán únicamente con FinanHogar
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};