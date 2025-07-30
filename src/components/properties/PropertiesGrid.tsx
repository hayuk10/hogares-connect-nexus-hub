import React from 'react';
import { Property, User } from '@/types';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter } from 'lucide-react';

interface PropertiesGridProps {
  properties: Property[];
  loading: boolean;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  onScheduleVisit: (propertyId: string) => void;
  currentUser: User | null;
  title: string;
}

export const PropertiesGrid: React.FC<PropertiesGridProps> = ({
  properties,
  loading,
  favorites,
  onToggleFavorite,
  onScheduleVisit,
  currentUser,
  title
}) => {
  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="overflow-hidden">
                <div className="aspect-[16/10] bg-muted" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted rounded flex-1" />
                    <div className="h-8 bg-muted rounded flex-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filtros
          </Button>
          <Badge variant="outline" className="bg-card/50">
            {properties.length} propiedades
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onViewDetails={() => {
              console.log('View details:', property.id);
            }}
            onScheduleVisit={onScheduleVisit}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(property.id)}
            currentUser={currentUser}
            showInvestmentInfo={currentUser?.userType === 'inversor'}
          />
        ))}
      </div>
    </section>
  );
};