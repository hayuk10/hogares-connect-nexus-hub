
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  TrendingUp, 
  Crown,
  MessageCircle,
  Calculator
} from "lucide-react";
import { User as UserType } from "@/types";

interface MobileNavigationProps {
  currentUser?: UserType;
  onNavigate: (section: string) => void;
  activeSection: string;
  favoriteCount: number;
}

export const MobileNavigation = ({ 
  currentUser, 
  onNavigate, 
  activeSection,
  favoriteCount = 0
}: MobileNavigationProps) => {
  const navigationItems = [
    {
      key: "home",
      icon: Home,
      label: "Inicio",
      showFor: "all"
    },
    {
      key: "search",
      icon: Search,
      label: "Buscar",
      showFor: "all"
    },
    {
      key: "favorites",
      icon: Heart,
      label: "Favoritos",
      showFor: "all",
      badge: favoriteCount > 0 ? favoriteCount : undefined
    },
    {
      key: "calculator",
      icon: Calculator,
      label: "Calculadora",
      showFor: "all"
    },
    {
      key: "chat",
      icon: MessageCircle,
      label: "Chat",
      showFor: "all"
    },
    {
      key: "profile",
      icon: User,
      label: "Perfil",
      showFor: "all"
    }
  ];

  // Add investment section for investors
  if (currentUser?.userType === 'inversor') {
    navigationItems.splice(3, 0, {
      key: "investors",
      icon: TrendingUp,
      label: "Inversiones",
      showFor: "inversor"
    });
  }

  // Add VIP section for VIP users
  if (currentUser?.userType === 'vip' || currentUser?.isVIP) {
    navigationItems.splice(3, 0, {
      key: "vip",
      icon: Crown,
      label: "VIP",
      showFor: "vip"
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-glow z-40 md:hidden">
      <div className="grid grid-cols-5 gap-1 p-2 max-w-screen-sm mx-auto">
        {navigationItems.slice(0, 5).map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.key;
          
          return (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.key)}
              className={`relative flex flex-col items-center gap-1 h-auto py-2 px-1 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <IconComponent className="h-5 w-5" />
                {item.badge && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-accent text-white"
                    variant="destructive"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
