import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, X, User, Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VisitsService } from "@/services/visitsService";

interface VisitFormProps {
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const VisitForm = ({ 
  propertyId, 
  propertyTitle, 
  onClose, 
  onSuccess 
}: VisitFormProps) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const { toast } = useToast();

  const handleDateChange = async (date: string) => {
    setFormData(prev => ({ ...prev, date, time: "" }));
    
    if (date) {
      setIsLoadingSlots(true);
      try {
        const response = await VisitsService.getAvailableSlots(propertyId, date);
        if (response.success) {
          setAvailableSlots(response.data);
        } else {
          toast({
            title: "Error",
            description: "No se pudieron cargar los horarios disponibles",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar horarios",
          variant: "destructive"
        });
      } finally {
        setIsLoadingSlots(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !formData.firstName || !formData.email || !formData.phone) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await VisitsService.scheduleVisit(
        propertyId,
        formData.date,
        formData.time,
        formData.notes || `Contacto: ${formData.firstName} ${formData.lastName} - ${formData.email} - ${formData.phone}`
      );

      if (response.success) {
        toast({
          title: "¡Visita programada!",
          description: "Te contactaremos para confirmar los detalles"
        });
        onSuccess?.();
        onClose();
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo programar la visita",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al programar la visita. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-lg border border-border/50 shadow-glow">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
            aria-label="Cerrar formulario"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 btn-primary-gradient rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Agendar Visita</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-1">{propertyTitle}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Fecha preferida *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10"
                  required
                  aria-describedby="date-help"
                />
              </div>
              <p id="date-help" className="text-xs text-muted-foreground">
                Selecciona una fecha a partir de hoy
              </p>
            </div>

            {/* Time Selection */}
            {formData.date && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Horario disponible *
                </Label>
                {isLoadingSlots ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={formData.time === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                        className="text-sm"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                )}
                {!isLoadingSlots && availableSlots.length === 0 && formData.date && (
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    No hay horarios disponibles para esta fecha. Por favor, selecciona otra fecha.
                  </p>
                )}
              </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  Nombre *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="pl-10"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Apellidos
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Apellidos"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Teléfono *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                  placeholder="600 123 456"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Comentarios adicionales
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="pl-10 min-h-[80px]"
                  placeholder="Cualquier pregunta o preferencia especial..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.date || !formData.time}
                className="w-full btn-primary-gradient shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Programando...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Confirmar Visita
                  </>
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                * Te contactaremos para confirmar la visita
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};