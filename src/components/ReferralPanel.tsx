import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Share2, 
  Gift, 
  Users, 
  TrendingUp, 
  DollarSign,
  Check,
  Mail,
  MessageSquare
} from "lucide-react";
import { User } from "@/types";
import { generateReferralLink, formatPrice } from "@/utils";
import { useToast } from "@/hooks/use-toast";

interface ReferralPanelProps {
  currentUser: User;
  onClose?: () => void;
}

export const ReferralPanel = ({ currentUser, onClose }: ReferralPanelProps) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const referralLink = generateReferralLink(currentUser.referralCode);
  const totalEarnings = currentUser.totalReferrals * 150; // €150 per referral

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "¡Enlace copiado!",
        description: "Ya puedes compartir tu enlace de invitación"
      });
    } catch (error) {
      toast({
        title: "Error al copiar",
        description: "Por favor, copia el enlace manualmente",
        variant: "destructive"
      });
    }
  };

  const handleShareEmail = () => {
    if (!email.trim()) {
      toast({
        title: "Email requerido",
        description: "Introduce el email de la persona que quieres invitar",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending invitation
    toast({
      title: "¡Invitación enviada!",
      description: `Se ha enviado la invitación a ${email}`
    });
    setEmail("");
  };

  const handleShareWhatsApp = () => {
    const message = `¡Hola! Te invito a descubrir Hogares Connect, la mejor plataforma para encontrar tu hogar ideal. Regístrate con mi enlace y ambos obtendremos beneficios exclusivos: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Programa de Referidos
        </h2>
        <p className="text-muted-foreground mb-4">
          Gana €150 por cada amigo que se registre y compre una propiedad
        </p>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{currentUser.totalReferrals}</div>
              <div className="text-sm text-muted-foreground">Referidos</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{formatPrice(totalEarnings)}</div>
              <div className="text-sm text-muted-foreground">Ganados</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-accent" />
            ¿Cómo funciona?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">1. Comparte</h3>
              <p className="text-sm text-muted-foreground">
                Envía tu enlace personalizado a amigos y familiares
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">2. Se registran</h3>
              <p className="text-sm text-muted-foreground">
                Tus amigos se registran usando tu enlace
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">3. Ganas</h3>
              <p className="text-sm text-muted-foreground">
                Recibes €150 cuando compran una propiedad
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Tu Enlace de Invitación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="flex-1 bg-muted"
            />
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className={copied ? 'text-green-600' : ''}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={handleShareWhatsApp}
              variant="outline"
              className="w-full"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Compartir por WhatsApp
            </Button>
            
            <div className="flex gap-2">
              <Input
                placeholder="email@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleShareEmail}
                size="sm"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current tier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
              {currentUser.isPremium ? 'Premium' : 'Básico'}
            </Badge>
            Estado Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Referidos realizados</span>
              <span className="font-semibold">{currentUser.totalReferrals}/10</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((currentUser.totalReferrals / 10) * 100, 100)}%` }}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              {currentUser.totalReferrals >= 10 
                ? "¡Felicidades! Has alcanzado el máximo nivel de referidos"
                : `Invita a ${10 - currentUser.totalReferrals} amigos más para desbloquear beneficios VIP`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>
          * Recibirás €150 por cada referido que complete una compra
        </p>
        <p>
          * Los pagos se procesan mensualmente
        </p>
        <p>
          * Aplican términos y condiciones
        </p>
      </div>
    </div>
  );
};