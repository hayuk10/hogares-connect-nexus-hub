import { useState, useEffect, useCallback } from 'react';
import { Property, SearchFilters } from '@/types';
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
    getFeaturedProperties
  };
};