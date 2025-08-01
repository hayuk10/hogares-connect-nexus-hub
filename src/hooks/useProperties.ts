import { useState, useEffect, useCallback } from 'react';
import { Property, SearchFilters, AdvancedSearchFilters } from '@/types';
import { PropertiesService } from '@/services/propertiesService';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all properties
  const loadProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await PropertiesService.getAllProperties();
      if (response.success) {
        setProperties(response.data);
        setFilteredProperties(response.data);
      } else {
        setError(response.error || 'Error loading properties');
      }
    } catch (err) {
      setError('Error loading properties');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search properties
  const searchProperties = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await PropertiesService.searchProperties(filters);
      if (response.success) {
        setFilteredProperties(response.data);
      } else {
        setError(response.error || 'Error searching properties');
      }
    } catch (err) {
      setError('Error searching properties');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get single property
  const getProperty = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await PropertiesService.getPropertyById(id);
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Property not found');
        return null;
      }
    } catch (err) {
      setError('Error loading property');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter properties locally (for quick filtering)
  const filterPropertiesLocal = useCallback((searchTerm: string, selectedFilters: string[]) => {
    let filtered = [...properties];

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply selected filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(property => {
        return selectedFilters.every(filter => {
          switch (filter) {
            case 'new':
              return property.isNew;
            case 'apartment':
              return property.propertyType === 'apartment';
            case 'house':
              return property.propertyType === 'house';
            case 'penthouse':
              return property.propertyType === 'penthouse';
            case 'parking':
              return property.features?.includes('Parking');
            case 'terrace':
              return property.features?.includes('Terraza');
            case 'garden':
              return property.features?.includes('Jardín');
            case 'elevator':
              return property.features?.includes('Ascensor');
            default:
              return true;
          }
        });
      });
    }

    setFilteredProperties(filtered);
  }, [properties]);

  // Advanced filter properties
  const filterPropertiesAdvanced = useCallback((filters: AdvancedSearchFilters) => {
    setIsLoading(true);
    
    let filtered = properties;

    // Location filter
    if (filters.location?.trim()) {
      const term = filters.location.toLowerCase();
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(term) ||
        property.neighborhood?.toLowerCase().includes(term)
      );
    }

    // Price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }

    // Property type
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }

    // Bedrooms and bathrooms
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
    }
    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms!);
    }

    // Features
    if (filters.hasParking) {
      filtered = filtered.filter(property => 
        property.features?.some(f => f.toLowerCase().includes('garaje'))
      );
    }
    if (filters.hasTerrace) {
      filtered = filtered.filter(property => 
        property.features?.some(f => f.toLowerCase().includes('terraza'))
      );
    }
    if (filters.hasGarden) {
      filtered = filtered.filter(property => 
        property.features?.some(f => f.toLowerCase().includes('jardín'))
      );
    }
    if (filters.hasPool) {
      filtered = filtered.filter(property => 
        property.features?.some(f => f.toLowerCase().includes('piscina'))
      );
    }
    if (filters.hasElevator) {
      filtered = filtered.filter(property => 
        property.features?.some(f => f.toLowerCase().includes('ascensor'))
      );
    }
    if (filters.nearMetro) {
      filtered = filtered.filter(property => 
        property.features?.some(f => f.toLowerCase().includes('metro'))
      );
    }

    // Special filters
    if (filters.investmentOnly) {
      filtered = filtered.filter(property => property.monthlyRent && property.roi);
    }
    if (filters.vipOnly) {
      filtered = filtered.filter(property => property.exclusiveAccess || property.isExclusive);
    }

    setFilteredProperties(filtered);
    setIsLoading(false);
  }, [properties]);

  // Get featured properties
  const getFeaturedProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await PropertiesService.getFeaturedProperties();
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Error loading featured properties');
        return [];
      }
    } catch (err) {
      setError('Error loading featured properties');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load properties on mount
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return {
    properties,
    filteredProperties,
    isLoading,
    error,
    loadProperties,
    searchProperties,
    getProperty,
    filterPropertiesLocal,
    filterPropertiesAdvanced,
    getFeaturedProperties
  };
};