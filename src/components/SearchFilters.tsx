import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onClearFilters: () => void;
}

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedFilters,
  onFilterToggle,
  onClearFilters
}: SearchFiltersProps) => {
  const quickFilters = [
    "Obra nueva",
    "Con terraza",
    "Con garaje",
    "Ascensor",
    "Piscina",
    "Cerca metro"
  ];

  return (
    <div className="space-y-4 p-4 bg-card border-b">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por zona, dirección..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Property Type & Price Range */}
      <div className="grid grid-cols-2 gap-3">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="piso">Piso</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="chalet">Chalet</SelectItem>
            <SelectItem value="duplex">Dúplex</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-200000">Hasta 200.000€</SelectItem>
            <SelectItem value="200000-300000">200.000€ - 300.000€</SelectItem>
            <SelectItem value="300000-500000">300.000€ - 500.000€</SelectItem>
            <SelectItem value="500000+">Más de 500.000€</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Filters */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Filtros rápidos</span>
          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              className={`cursor-pointer transition-smooth ${
                selectedFilters.includes(filter) 
                  ? "btn-primary-gradient" 
                  : "hover:bg-muted"
              }`}
              onClick={() => onFilterToggle(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Advanced Filters Button */}
      <Button variant="outline" className="w-full">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filtros avanzados
      </Button>
    </div>
  );
};