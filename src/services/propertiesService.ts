import { Property, SearchFilters, APIResponse } from '@/types';

// Mock data - In production this would come from API
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Piso moderno en Getafe Centro",
    price: "285.000€",
    location: "Getafe Centro",
    bedrooms: 3,
    bathrooms: 2,
    area: "95m²",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    isNew: true,
    description: "Moderno piso en el centro de Getafe con todas las comodidades",
    features: ["Aire acondicionado", "Parking", "Terraza", "Ascensor"],
    propertyType: "apartment",
    energyRating: "B",
    yearBuilt: 2020
  },
  {
    id: "2", 
    title: "Casa adosada con jardín",
    price: "345.000€",
    location: "Fuenlabrada",
    bedrooms: 4,
    bathrooms: 3,
    area: "120m²",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    description: "Espaciosa casa adosada con jardín privado",
    features: ["Jardín", "Parking", "Chimenea", "Trastero"],
    propertyType: "house",
    energyRating: "A",
    yearBuilt: 2018
  },
  {
    id: "3",
    title: "Ático con terraza panorámica",
    price: "420.000€", 
    location: "Leganés",
    bedrooms: 2,
    bathrooms: 2,
    area: "85m²",
    imageUrl: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
    description: "Exclusivo ático con vistas panorámicas de Madrid",
    features: ["Terraza", "Vistas", "Aire acondicionado", "Ascensor"],
    propertyType: "penthouse",
    energyRating: "A",
    yearBuilt: 2019
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PropertiesService {
  static async getAllProperties(): Promise<APIResponse<Property[]>> {
    await delay(800); // Simulate API call
    
    try {
      return {
        data: mockProperties,
        success: true,
        message: "Properties fetched successfully"
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: "Failed to fetch properties"
      };
    }
  }

  static async getPropertyById(id: string): Promise<APIResponse<Property | null>> {
    await delay(500);
    
    try {
      const property = mockProperties.find(p => p.id === id);
      return {
        data: property || null,
        success: true,
        message: property ? "Property found" : "Property not found"
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: "Failed to fetch property"
      };
    }
  }

  static async searchProperties(filters: SearchFilters): Promise<APIResponse<Property[]>> {
    await delay(600);
    
    try {
      let filtered = [...mockProperties];

      if (filters.location) {
        filtered = filtered.filter(p => 
          p.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.bedrooms) {
        filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
      }

      if (filters.bathrooms) {
        filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms!);
      }

      if (filters.propertyType) {
        filtered = filtered.filter(p => p.propertyType === filters.propertyType);
      }

      return {
        data: filtered,
        success: true,
        message: `Found ${filtered.length} properties`
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: "Search failed"
      };
    }
  }

  // Future API endpoints (ready for real implementation)
  static async getFeaturedProperties(): Promise<APIResponse<Property[]>> {
    await delay(400);
    
    const featured = mockProperties.filter(p => p.isNew || p.propertyType === 'penthouse');
    return {
      data: featured,
      success: true,
      message: "Featured properties fetched"
    };
  }

  static async getPropertiesByLocation(location: string): Promise<APIResponse<Property[]>> {
    await delay(500);
    
    const byLocation = mockProperties.filter(p => 
      p.location.toLowerCase().includes(location.toLowerCase())
    );
    
    return {
      data: byLocation,
      success: true,
      message: `Properties in ${location} fetched`
    };
  }
}