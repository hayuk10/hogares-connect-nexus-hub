import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  User, 
  Star, 
  Heart, 
  Calendar, 
  TrendingUp, 
  Gift,
  Settings,
  LogOut,
  Crown,
  Shield
} from "lucide-react";
import { User as UserType } from "@/types";
import { getUserTypeBadgeColor, formatDate } from "@/utils";
import { ReferralPanel } from "./ReferralPanel";
import { useToast } from "@/hooks/use-toast";

interface UserProfileModalProps {
  user: UserType;
  onClose: () => void;
  onUpgradeToVIP?: () => void;
  onUpgradeToInvestor?: () => void;
}

export const UserProfileModal = ({ 
  user, 
  onClose, 
  onUpgradeToVIP,
  onUpgradeToInvestor 
}: UserProfileModalProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'vip': return 'VIP Premium';
      case 'inversor': return 'Inversor Premium';
      case 'asesor': return 'Asesor Inmobiliario';
      case 'referido': return 'Usuario Referido';
      default: return 'Usuario Estándar';
    }
  };

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{user.name || "Usuario"}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className={getUserTypeBadgeColor(user.userType)}>
                  {getUserTypeLabel(user.userType)}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
              <TabsTrigger value="referrals">Referidos</TabsTrigger>
              <TabsTrigger value="settings">Ajustes</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <div className="text-lg font-bold">{user.favorites.length}</div>
                    <div className="text-sm text-muted-foreground">Favoritos</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-lg font-bold">{user.visits.length}</div>
                    <div className="text-sm text-muted-foreground">Visitas</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Gift className="h-6 w-6 text-accent mx-auto mb-2" />
                    <div className="text-lg font-bold">{user.totalReferrals}</div>
                    <div className="text-sm text-muted-foreground">Referidos</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-lg font-bold">
                      {user.userType === 'vip' || user.isPremium ? 'VIP' : 'Básico'}
                    </div>
                    <div className="text-sm text-muted-foreground">Nivel</div>
                  </CardContent>
                </Card>
              </div>

              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información de la Cuenta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                      <p className="text-foreground">{user.name || "No especificado"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{user.email || "No especificado"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                      <p className="text-foreground">{user.phone || "No especificado"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Miembro desde</label>
                      <p className="text-foreground">{formatDate(user.registrationDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upgrade Options */}
              {user.userType === 'usuario' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-accent/20">
                    <CardContent className="p-6 text-center">
                      <Crown className="h-12 w-12 text-accent mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Hacerse VIP</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Acceso a propiedades exclusivas y asesoría personalizada
                      </p>
                      <Button 
                        onClick={onUpgradeToVIP}
                        className="w-full btn-accent-gradient"
                      >
                        Upgrade a VIP
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary/20">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-bold text-lg mb-2">Ser Inversor</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Oportunidades de inversión con ROI del 8-15% anual
                      </p>
                      <Button 
                        onClick={onUpgradeToInvestor}
                        className="w-full btn-primary-gradient"
                      >
                        Ser Inversor
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Actividad Reciente</h3>
                <p className="text-muted-foreground">
                  Aquí aparecerán tus visitas programadas, propiedades favoritas y actividad reciente.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="referrals">
              <ReferralPanel currentUser={user} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuración
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacidad y Seguridad
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};