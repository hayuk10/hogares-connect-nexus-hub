import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize, Heart, Share2, Calendar } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  imageUrl: string;
  isNew?: boolean;
  onViewDetails: (id: string) => void;
  onScheduleVisit: (id: string) => void;
}

export const PropertyCard = ({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  isNew = false,
  onViewDetails,
  onScheduleVisit
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-[1.01] bg-card/80 backdrop-blur-sm border border-border/50">
      <div className="relative group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex gap-2">
            {isNew && (
              <Badge className="btn-accent-gradient text-white font-semibold shadow-md">
                NUEVO
              </Badge>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm"
            onClick={() => onScheduleVisit(id)}
            className="btn-primary-gradient shadow-lg"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Agendar
          </Button>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Title & Location */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-foreground line-clamp-2 leading-tight">
              {title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1 text-accent" />
              {location}
            </div>
          </div>
          
          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            {price}
          </div>
          
          {/* Features */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Bed className="h-4 w-4 text-accent" />
                </div>
                <span>{bedrooms}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Bath className="h-4 w-4 text-accent" />
                </div>
                <span>{bathrooms}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Maximize className="h-4 w-4 text-accent" />
                </div>
                <span>{area}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onViewDetails(id)}
              className="flex-1 border-border/50 hover:border-primary/50 transition-colors"
            >
              Ver detalles
            </Button>
            <Button
              onClick={() => onScheduleVisit(id)}
              className="flex-1 btn-primary-gradient shadow-md hover:shadow-lg transition-shadow"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agendar visita
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};