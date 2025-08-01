import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, SlidersHorizontal } from "lucide-react";
import { AdvancedSearchFilters } from "@/types";

interface AdvancedSearchFiltersProps {
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export const AdvancedSearchFiltersPanel: React.FC<AdvancedSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  onClose
}) => {
  const updateFilter = (key: keyof AdvancedSearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg overflow-y-auto">
      <CardHeader className="border-b bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            <CardTitle>Filtros Avanzados</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {activeFiltersCount} activos
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Limpiar todo
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Rango de Precio</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm text-muted-foreground">Precio mínimo</Label>
              <Input
                type="number"
                placeholder="€ Min"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Precio máximo</Label>
              <Input
                type="number"
                placeholder="€ Max"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Tipo de Propiedad</Label>
          <Select value={filters.propertyType || ''} onValueChange={(value) => updateFilter('propertyType', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos los tipos</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="penthouse">Ático</SelectItem>
              <SelectItem value="studio">Estudio</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Casa adosada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms and Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Habitaciones</Label>
            <Select value={filters.bedrooms?.toString() || ''} onValueChange={(value) => updateFilter('bedrooms', value ? Number(value) : undefined)}>
              <SelectTrigger>
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Cualquiera</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-base font-medium">Baños</Label>
            <Select value={filters.bathrooms?.toString() || ''} onValueChange={(value) => updateFilter('bathrooms', value ? Number(value) : undefined)}>
              <SelectTrigger>
                <SelectValue placeholder="Cualquiera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Cualquiera</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Ubicación</Label>
          <Input
            placeholder="Zona, dirección..."
            value={filters.location || ''}
            onChange={(e) => updateFilter('location', e.target.value || undefined)}
          />
        </div>

        {/* Features */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Características</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'hasParking', label: 'Garaje' },
              { key: 'hasTerrace', label: 'Terraza' },
              { key: 'hasGarden', label: 'Jardín' },
              { key: 'hasPool', label: 'Piscina' },
              { key: 'hasElevator', label: 'Ascensor' },
              { key: 'nearMetro', label: 'Cerca del metro' },
              { key: 'nearSchools', label: 'Cerca de colegios' },
              { key: 'nearShops', label: 'Cerca de comercios' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={Boolean(filters[key as keyof AdvancedSearchFilters]) || false}
                  onCheckedChange={(checked) => updateFilter(key as keyof AdvancedSearchFilters, checked)}
                />
                <Label htmlFor={key} className="text-sm font-normal">{label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Special Filters */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Filtros Especiales</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="investmentOnly"
                checked={filters.investmentOnly || false}
                onCheckedChange={(checked) => updateFilter('investmentOnly', checked)}
              />
              <Label htmlFor="investmentOnly" className="text-sm font-normal">Solo oportunidades de inversión</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vipOnly"
                checked={filters.vipOnly || false}
                onCheckedChange={(checked) => updateFilter('vipOnly', checked)}
              />
              <Label htmlFor="vipOnly" className="text-sm font-normal">Solo propiedades VIP</Label>
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="pt-4 border-t">
          <Button onClick={onClose} className="w-full">
            Aplicar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};