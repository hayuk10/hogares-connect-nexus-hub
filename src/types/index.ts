// Core types for Hogares Connect application

// User types and authentication
export type UserType = 'usuario' | 'asesor' | 'referido' | 'vip' | 'inversor';

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  userType: UserType;
  isPremium: boolean;
  isVIP: boolean;
  favorites: string[];
  visits: Visit[];
  referidos: string[]; // Array of user IDs referred by this user
  referralCode: string; // Unique code for this user
  registrationDate: Date;
  totalReferrals: number;
  premiumExpiry?: Date;
}

// Enhanced Property interface
export interface Property {
  id: string;
  title: string;
  price: number; // Changed from string to number for calculations
  priceDisplay: string; // Formatted price for display
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // Changed from string to number
  areaDisplay: string; // Formatted area for display
  imageUrl: string;
  images?: string[]; // Multiple images
  isNew?: boolean;
  isReserved?: boolean;
  isExclusive?: boolean;
  description?: string;
  features?: string[];
  propertyType: 'apartment' | 'house' | 'penthouse' | 'studio' | 'villa' | 'townhouse';
  energyRating?: string;
  yearBuilt?: number;
  
  // Investment-specific fields
  monthlyRent?: number;
  roi?: number; // Return on investment percentage
  rentalYield?: number;
  investmentRisk?: 'low' | 'medium' | 'high';
  
  // VIP-specific fields
  exclusiveAccess?: boolean;
  personalAgent?: string;
  luxuryFeatures?: string[];
  
  // Location details
  coordinates?: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
  city: string;
  province: string;
  postalCode?: string;
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

// Referral system
export interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalEarnings: number;
  currentMonthReferrals: number;
}

export interface ReferralReward {
  id: string;
  referrerId: string;
  referredUserId: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Date;
  paidAt?: Date;
}

// API Response types
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Investment properties
export interface InvestmentProperty extends Property {
  investmentType: 'flip' | 'rental' | 'commercial';
  expectedROI: number;
  minimumInvestment: number;
  totalUnits: number;
  soldUnits: number;
  projectCompletion: number; // Percentage
  developerId: string;
  developerName: string;
}

// Home services (future expansion)
export interface HomeService {
  id: string;
  name: string;
  category: 'cleaning' | 'maintenance' | 'security' | 'utilities' | 'moving' | 'insurance';
  price: number;
  priceDisplay: string;
  provider: string;
  rating: number;
  reviews: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  coverage: string[]; // Areas where service is available
}

// Notification system
export interface Notification {
  id: string;
  userId: string;
  type: 'visit_confirmed' | 'new_property' | 'price_drop' | 'referral_reward' | 'financing_approved';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  imageUrl?: string;
}

// Advanced search filters
export interface AdvancedSearchFilters extends SearchFilters {
  pricePerM2Range?: [number, number];
  yearBuiltRange?: [number, number];
  hasParking?: boolean;
  hasTerrace?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  hasElevator?: boolean;
  energyRatingMin?: string;
  nearMetro?: boolean;
  nearSchools?: boolean;
  nearShops?: boolean;
  investmentOnly?: boolean;
  vipOnly?: boolean;
}