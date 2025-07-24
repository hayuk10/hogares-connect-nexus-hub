// Utility functions for Hogares Connect
// Price formatting, validations, and other reusable helpers

/**
 * Format price to Spanish currency format
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format price range for display
 */
export const formatPriceRange = (min: number, max: number): string => {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

/**
 * Format area with m² symbol
 */
export const formatArea = (area: number): string => {
  return `${area} m²`;
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Generate referral link
 */
export const generateReferralLink = (userId: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hogares-connect.com';
  return `${baseUrl}/invita?ref=${userId}`;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Spanish format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Calculate monthly payment for mortgage
 */
export const calculateMonthlyPayment = (
  propertyValue: number,
  downPayment: number,
  interestRate: number,
  loanTerm: number
): number => {
  const principal = propertyValue - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
  return monthlyPayment;
};

/**
 * Calculate ROI for investment properties
 */
export const calculateROI = (
  purchasePrice: number,
  monthlyRent: number,
  monthlyExpenses: number = 0
): number => {
  const annualNetIncome = (monthlyRent - monthlyExpenses) * 12;
  return (annualNetIncome / purchasePrice) * 100;
};

/**
 * Get user type badge color
 */
export const getUserTypeBadgeColor = (userType: string): string => {
  switch (userType) {
    case 'vip':
      return 'bg-gradient-to-r from-accent to-accent-light text-white';
    case 'inversor':
      return 'bg-gradient-to-r from-primary to-primary-glow text-white';
    case 'referido':
      return 'bg-secondary text-secondary-foreground';
    case 'asesor':
      return 'bg-muted text-muted-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

/**
 * Generate random ID for mock data
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Simulate API delay
 */
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Format date to Spanish format
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

/**
 * Format date and time
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Get property type label in Spanish
 */
export const getPropertyTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    apartment: 'Apartamento',
    house: 'Casa',
    penthouse: 'Ático',
    studio: 'Estudio',
    villa: 'Villa',
    townhouse: 'Casa adosada',
  };
  return labels[type] || type;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Debounce function for search
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};