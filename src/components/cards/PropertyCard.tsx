import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Calendar, Eye, Star, TrendingUp, Lock } from "lucide-react";
import { Property, User } from "@/types";
import { formatPrice, formatPercentage } from "@/utils";

interface PropertyCardProps extends Property {
  onViewDetails: (id: string) => void;
  onScheduleVisit: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
  currentUser?: User;
  showInvestmentInfo?: boolean;
}

export const PropertyCard = ({ 
  id,
  title,
  price,
  priceDisplay,
  location,
  bedrooms,
  bathrooms,
  area,
  areaDisplay,
  imageUrl,
  isNew,
  isReserved,
  isExclusive,
  description,
  features,
  propertyType,
  energyRating,
  roi,
  investmentRisk,
  onViewDetails,
  onScheduleVisit,
  onToggleFavorite,
  isFavorite = false,
  currentUser,
  showInvestmentInfo = false
}: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
    onToggleFavorite?.(id);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(id);
  };

  const handleScheduleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onScheduleVisit(id);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-glow transition-all duration-300 bg-card/90 backdrop-blur-sm border border-border/50 cursor-pointer"
      onClick={handleViewDetails}
      role="article"
      aria-label={`Propiedad: ${title}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="aspect-[16/10] relative bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleViewDetails}
                className="bg-white/90 text-gray-900 hover:bg-white transition-colors"
                aria-label={`Ver detalles de ${title}`}
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver detalles
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteToggle}
              className={`rounded-full p-2 transition-colors ${
                isFav 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white/90 text-gray-900 hover:bg-white'
              }`}
              aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isNew && (
            <Badge className="bg-accent text-white font-medium">
              Nuevo
            </Badge>
          )}
          {isReserved && (
            <Badge className="bg-destructive text-white font-medium">
              Reservado
            </Badge>
          )}
          {isExclusive && (
            <Badge className="bg-gradient-to-r from-accent to-accent-light text-white font-medium">
              <Lock className="h-3 w-3 mr-1" />
              Exclusivo
            </Badge>
          )}
          {energyRating && (
            <Badge variant="outline" className="bg-white/90 text-gray-900 border-white/50">
              Energía {energyRating}
            </Badge>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-white font-bold text-sm px-3 py-1">
            {priceDisplay || formatPrice(price)}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Title and location */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Property details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{areaDisplay || `${area} m²`}</span>
          </div>
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs bg-muted/50 text-muted-foreground border-border/50"
              >
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-border/50">
                +{features.length - 3} más
              </Badge>
            )}
          </div>
        )}

        {/* Investment info for investors */}
        {showInvestmentInfo && currentUser?.userType === 'inversor' && roi && (
          <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                ROI: {formatPercentage(roi)}
              </span>
            </div>
            {investmentRisk && (
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  investmentRisk === 'low' ? 'border-green-500 text-green-700' :
                  investmentRisk === 'medium' ? 'border-yellow-500 text-yellow-700' :
                  'border-red-500 text-red-700'
                }`}
              >
                {investmentRisk === 'low' ? 'Bajo riesgo' :
                 investmentRisk === 'medium' ? 'Riesgo medio' : 'Alto riesgo'}
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleScheduleVisit}
            className="border-border/50 hover:border-primary hover:text-primary transition-colors"
            aria-label={`Agendar visita para ${title}`}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Agendar visita
          </Button>
          
          <Button
            size="sm"
            onClick={handleViewDetails}
            className="btn-primary-gradient shadow-sm hover:shadow-md transition-shadow"
            aria-label={`Ver más información de ${title}`}
          >
            <Star className="h-4 w-4 mr-1" />
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};