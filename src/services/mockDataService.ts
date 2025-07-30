import { faker } from '@faker-js/faker';
import { Property, User } from '@/types';

// Configure faker for Spanish data

export class MockDataService {
  private static properties: Property[] = [];
  private static users: User[] = [];

  static generateProperties(count: number = 20): Property[] {
    if (this.properties.length > 0) return this.properties;

    const propertyTypes = ['apartment', 'house', 'penthouse', 'studio', 'villa', 'townhouse'];
    const madridSurNeighborhoods = [
      'Getafe', 'Leganés', 'Fuenlabrada', 'Móstoles', 'Alcorcón',
      'Parla', 'Pinto', 'Valdemoro', 'Humanes', 'Griñón'
    ];

    for (let i = 0; i < count; i++) {
      const propertyType = faker.helpers.arrayElement(propertyTypes) as Property['propertyType'];
      const neighborhood = faker.helpers.arrayElement(madridSurNeighborhoods);
      const isNew = faker.datatype.boolean(0.3);
      const isExclusive = faker.datatype.boolean(0.2);
      const bedrooms = faker.number.int({ min: 1, max: 5 });
      const bathrooms = faker.number.int({ min: 1, max: bedrooms });
      const area = faker.number.int({ min: 50, max: 300 });
      const basePrice = area * faker.number.int({ min: 2000, max: 5000 });
      const price = isNew ? basePrice * 1.2 : basePrice;

      // Generate realistic features
      const allFeatures = [
        'Garaje', 'Terraza', 'Ascensor', 'Calefacción', 'Aire acondicionado',
        'Piscina comunitaria', 'Jardín', 'Trastero', 'Portero automático',
        'Cocina equipada', 'Armarios empotrados', 'Suelos de parquet',
        'Ventanas de aluminio', 'Portal adaptado', 'Gimnasio comunitario'
      ];
      const features = faker.helpers.arrayElements(allFeatures, { min: 3, max: 8 });

      // Generate luxury features for expensive properties
      const luxuryFeatures = price > 400000 ? [
        'Spa privado', 'Bodega climatizada', 'Domótica', 'Suelos radiantes',
        'Sistema de seguridad 24h', 'Conserje', 'Jacuzzi', 'Sauna'
      ] : [];

      // Generate investment data
      const monthlyRent = faker.number.int({ min: 800, max: 2500 });
      const annualRent = monthlyRent * 12;
      const roi = (annualRent / price) * 100;
      const rentalYield = roi;

      const property: Property = {
        id: faker.string.uuid(),
        title: `${propertyType === 'apartment' ? 'Apartamento' : 
                propertyType === 'house' ? 'Casa' :
                propertyType === 'penthouse' ? 'Ático' :
                propertyType === 'studio' ? 'Estudio' :
                propertyType === 'villa' ? 'Villa' : 'Casa adosada'} en ${neighborhood}`,
        description: faker.lorem.paragraphs(2),
        price,
        priceDisplay: new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price),
        location: `${neighborhood}, Madrid Sur`,
        area,
        areaDisplay: `${area} m²`,
        bedrooms,
        bathrooms,
        imageUrl: `https://picsum.photos/600/400?random=${i}`,
        images: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, (_, idx) => 
          `https://picsum.photos/800/600?random=${i}_${idx}`
        ),
        propertyType,
        isNew,
        isReserved: faker.datatype.boolean(0.1),
        isExclusive,
        features,
        luxuryFeatures,
        yearBuilt: isNew ? 2024 : faker.number.int({ min: 1990, max: 2023 }),
        energyRating: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
        monthlyRent,
        roi: parseFloat(roi.toFixed(2)),
        rentalYield: parseFloat(rentalYield.toFixed(2)),
        investmentRisk: roi > 6 ? 'low' : roi > 4 ? 'medium' : 'high',
        exclusiveAccess: isExclusive,
        personalAgent: isExclusive ? faker.person.fullName() : undefined,
        coordinates: {
          lat: faker.location.latitude({ min: 40.25, max: 40.45 }),
          lng: faker.location.longitude({ min: -3.95, max: -3.65 })
        },
        neighborhood,
        city: 'Madrid',
        province: 'Madrid',
        postalCode: faker.location.zipCode('28###')
      };

      this.properties.push(property);
    }

    return this.properties;
  }

  static generateUsers(count: number = 10): User[] {
    if (this.users.length > 0) return this.users;

    const userTypes: User['userType'][] = ['usuario', 'asesor', 'referido', 'vip', 'inversor'];

    for (let i = 0; i < count; i++) {
      const userType = faker.helpers.arrayElement(userTypes);
      const isPremium = userType === 'vip' || faker.datatype.boolean(0.3);
      const isVIP = userType === 'vip' || faker.datatype.boolean(0.1);

      const user: User = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: `+34 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(3)}`,
        userType,
        isPremium,
        isVIP,
        favorites: faker.helpers.arrayElements(
          this.properties.slice(0, 5).map(p => p.id), 
          { min: 0, max: 3 }
        ),
        visits: [],
        referidos: faker.helpers.arrayElements(
          Array.from({ length: 5 }, () => faker.string.uuid()),
          { min: 0, max: 3 }
        ),
        referralCode: faker.string.alphanumeric(6).toUpperCase(),
        registrationDate: faker.date.past({ years: 2 }),
        totalReferrals: faker.number.int({ min: 0, max: 10 }),
        premiumExpiry: isPremium ? faker.date.future({ years: 1 }) : undefined
      };

      this.users.push(user);
    }

    return this.users;
  }

  static async getAllProperties(): Promise<Property[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, faker.number.int({ min: 500, max: 1500 })));
    return this.generateProperties();
  }

  static async getFeaturedProperties(): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, faker.number.int({ min: 300, max: 800 })));
    const properties = this.generateProperties();
    return faker.helpers.arrayElements(properties, { min: 3, max: 6 });
  }

  static async searchProperties(filters: {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    neighborhood?: string;
  }): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, faker.number.int({ min: 300, max: 800 })));
    
    let properties = this.generateProperties();

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.neighborhood?.toLowerCase().includes(term)
      );
    }

    if (filters.minPrice) {
      properties = properties.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      properties = properties.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.propertyType) {
      properties = properties.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.neighborhood) {
      properties = properties.filter(p => p.neighborhood === filters.neighborhood);
    }

    return properties;
  }

  static async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, faker.number.int({ min: 200, max: 500 })));
    const properties = this.generateProperties();
    return properties.find(p => p.id === id) || null;
  }

  static getCurrentUser(): User {
    if (this.users.length === 0) {
      this.generateUsers();
    }
    // Return first VIP user or create one
    const vipUser = this.users.find(u => u.userType === 'vip');
    if (vipUser) return vipUser;

    // Create a mock VIP user
    return {
      id: "current_user_123",
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+34 600 123 456",
      userType: "vip",
      isPremium: true,
      isVIP: true,
      favorites: ["1", "3", "7"],
      visits: [],
      referidos: ["user456", "user789", "user101"],
      referralCode: "MARIA123",
      registrationDate: new Date('2023-06-15'),
      totalReferrals: 3,
      premiumExpiry: new Date('2024-12-31')
    };
  }

  static clearCache(): void {
    this.properties = [];
    this.users = [];
  }
}