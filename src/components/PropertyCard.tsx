import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";

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
    <Card className="overflow-hidden shadow-primary hover:shadow-accent transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 btn-accent-gradient">
            NUEVO
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
          
          <div className="text-2xl font-bold text-primary">
            {price}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {bedrooms}
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {bathrooms}
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              {area}
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(id)}
              className="flex-1"
            >
              Ver detalles
            </Button>
            <Button
              size="sm"
              onClick={() => onScheduleVisit(id)}
              className="flex-1 btn-primary-gradient"
            >
              Agendar visita
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};