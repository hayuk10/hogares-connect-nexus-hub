// Core types for Hogares Connect application
export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  imageUrl: string;
  isNew?: boolean;
  description?: string;
  features?: string[];
  propertyType?: 'apartment' | 'house' | 'penthouse' | 'studio';
  energyRating?: string;
  yearBuilt?: number;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: Property['propertyType'];
  features?: string[];
}

export interface Visit {
  id: string;
  propertyId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface FinancingCalculation {
  propertyValue: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  favorites: string[];
  visits: Visit[];
}

// API Response types
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Future expansion types (commented for scalability)
/*
export interface VIPProperty extends Property {
  exclusiveAccess: boolean;
  personalAgent: string;
  luxuryFeatures: string[];
}

export interface InvestmentProperty extends Property {
  roi: number;
  rentalYield: number;
  investmentType: 'flip' | 'rental' | 'commercial';
}

export interface HomeService {
  id: string;
  name: string;
  category: 'cleaning' | 'maintenance' | 'security' | 'utilities';
  price: string;
  provider: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  refereeEmail: string;
  status: 'pending' | 'completed';
  reward: number;
}
*/