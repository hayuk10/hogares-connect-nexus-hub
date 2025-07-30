import { Property, APIResponse, SearchFilters } from '@/types';
import { simulateApiDelay } from '@/utils';
import { MockDataService } from './mockDataService';

export class PropertiesService {
  static async getAllProperties(): Promise<APIResponse<Property[]>> {
    await simulateApiDelay();
    try {
      const properties = await MockDataService.getAllProperties();
      return {
        data: properties,
        success: true,
        message: 'Propiedades cargadas exitosamente'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: 'Error al cargar propiedades'
      };
    }
  }

  static async getFeaturedProperties(): Promise<APIResponse<Property[]>> {
    await simulateApiDelay();
    try {
      const properties = await MockDataService.getFeaturedProperties();
      return {
        data: properties,
        success: true,
        message: 'Propiedades destacadas cargadas exitosamente'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: 'Error al cargar propiedades destacadas'
      };
    }
  }

  static async searchProperties(filters: {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    neighborhood?: string;
  }): Promise<APIResponse<Property[]>> {
    await simulateApiDelay();
    try {
      const properties = await MockDataService.searchProperties(filters);
      return {
        data: properties,
        success: true,
        message: 'Búsqueda completada exitosamente'
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: 'Error en la búsqueda'
      };
    }
  }

  static async getPropertyById(id: string): Promise<APIResponse<Property | null>> {
    await simulateApiDelay();
    try {
      const property = await MockDataService.getPropertyById(id);
      return {
        data: property,
        success: true,
        message: property ? 'Propiedad encontrada' : 'Propiedad no encontrada'
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: 'Error al buscar la propiedad'
      };
    }
  }
}