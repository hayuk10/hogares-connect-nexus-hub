import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, TrendingUp, Users } from 'lucide-react';

interface UserBenefitsProps {
  userType: 'usuario' | 'asesor' | 'referido' | 'vip' | 'inversor';
  isPremium: boolean;
}

export const UserBenefits: React.FC<UserBenefitsProps> = ({ userType, isPremium }) => {
  if (userType === 'vip' || isPremium) {
    return (
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Crown className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Miembro VIP</h3>
                <p className="text-sm text-muted-foreground">
                  Acceso exclusivo a propiedades premium y asesoría personalizada
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Beneficios
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (userType === 'inversor') {
    return (
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Panel de Inversión</h3>
                <p className="text-sm text-muted-foreground">
                  Análisis avanzado de ROI y oportunidades de inversión exclusivas
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Ver Cartera
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (userType === 'referido') {
    return (
      <section className="mb-8">
        <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Usuario Referido</h3>
                <p className="text-sm text-muted-foreground">
                  Descuentos especiales y beneficios por ser parte de nuestra comunidad
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-secondary/30 text-secondary-foreground hover:bg-secondary/10"
              >
                <Users className="h-4 w-4 mr-1" />
                Mi Red
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return null;
};