import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  TrendingUp, 
  Crown, 
  Calculator, 
  MessageCircle, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { UserProfileModal } from '@/components/UserProfileModal';
import { useToast } from '@/hooks/use-toast';

export const Header: React.FC = () => {
  const { profile, signOut } = useAuthContext();
  const [showProfile, setShowProfile] = useState(false);
  const { toast } = useToast();

  const handleVIPAccess = () => {
    toast({
      title: "Área VIP",
      description: "Bienvenido al área exclusiva para miembros VIP"
    });
  };

  const handleInvestorAccess = () => {
    toast({
      title: "Panel de Inversiones",
      description: "Accediendo a tu cartera de inversiones"
    });
  };

  const handleUpgradeToVIP = () => {
    toast({
      title: "Upgrade a VIP",
      description: "Serás redirigido a la página de suscripción VIP"
    });
  };

  const handleUpgradeToInvestor = () => {
    toast({
      title: "Ser Inversor",
      description: "Serás redirigido a la página de inversores premium"
    });
  };

  if (!profile) return null;

  return (
    <>
      <header className="bg-card/90 backdrop-blur-lg border-b border-border/50 shadow-glow sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 btn-primary-gradient rounded-xl flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Hogares Connect</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Tu hogar ideal te está esperando
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                {profile.user_type === 'inversor' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleInvestorAccess}
                    className="text-primary hover:text-primary/80"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Inversiones
                  </Button>
                )}
                
                {(profile.user_type === 'vip' || profile.is_vip) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVIPAccess}
                    className="text-accent hover:text-accent/80"
                  >
                    <Crown className="h-4 w-4 mr-1" />
                    VIP
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary"
                >
                  <Calculator className="h-4 w-4 mr-1" />
                  Calculadora
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
              </div>
              
              {/* User Profile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(true)}
                className="relative"
              >
                <UserIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{profile.name || 'Usuario'}</span>
                {profile.is_premium && (
                  <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 bg-accent" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {showProfile && (
        <UserProfileModal
          user={{
            id: profile.user_id,
            name: profile.name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            userType: profile.user_type,
            isPremium: profile.is_premium,
            isVIP: profile.is_vip,
            favorites: [],
            visits: [],
            referidos: [],
            referralCode: profile.referral_code,
            registrationDate: new Date(profile.registration_date),
            totalReferrals: profile.total_referrals,
            premiumExpiry: profile.premium_expiry ? new Date(profile.premium_expiry) : undefined
          }}
          onClose={() => setShowProfile(false)}
          onUpgradeToVIP={handleUpgradeToVIP}
          onUpgradeToInvestor={handleUpgradeToInvestor}
        />
      )}
    </>
  );
};