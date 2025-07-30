import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calculator, 
  MessageCircle, 
  Heart,
  Gift
} from 'lucide-react';

interface SearchHeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onQuickAction: (action: 'calculator' | 'chat' | 'favorites' | 'referrals') => void;
  favoriteCount: number;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchTerm,
  onSearchChange,
  onQuickAction,
  favoriteCount
}) => {
  return (
    <section className="text-center mb-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Encuentra tu hogar ideal
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Más de 1.000 propiedades verificadas en Madrid Sur
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-input"
            placeholder="Buscar por ubicación o tipo..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-3 text-center bg-card/50 backdrop-blur-sm border-border/50 shadow-glow"
          />
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickAction('calculator')}
            className="bg-card/50 backdrop-blur-sm border-border/50"
          >
            <Calculator className="h-4 w-4 mr-1" />
            Calculadora
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickAction('chat')}
            className="bg-card/50 backdrop-blur-sm border-border/50"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Consultar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickAction('favorites')}
            className="bg-card/50 backdrop-blur-sm border-border/50 relative"
          >
            <Heart className="h-4 w-4 mr-1" />
            Favoritos
            {favoriteCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-accent text-white">
                {favoriteCount}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickAction('referrals')}
            className="bg-card/50 backdrop-blur-sm border-border/50"
          >
            <Gift className="h-4 w-4 mr-1" />
            Referir
          </Button>
        </div>
      </div>
    </section>
  );
};