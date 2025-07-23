import { useState, useCallback } from 'react';
import { FinancingCalculation } from '@/types';
import { FinancingService } from '@/services/financingService';

export const useFinancing = () => {
  const [calculation, setCalculation] = useState<FinancingCalculation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate mortgage
  const calculateMortgage = useCallback(async (
    propertyValue: number,
    downPaymentPercentage: number,
    loanTermYears: number,
    interestRate?: number
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await FinancingService.calculateMortgage({
        propertyValue,
        downPaymentPercentage,
        loanTermYears,
        interestRate
      });
      
      if (response.success) {
        setCalculation(response.data);
        return response.data;
      } else {
        setError(response.error || 'Error calculating mortgage');
        return null;
      }
    } catch (err) {
      setError('Error calculating mortgage');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get current interest rates
  const getCurrentRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await FinancingService.getCurrentRates();
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Error loading rates');
        return null;
      }
    } catch (err) {
      setError('Error loading rates');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Request financing quote
  const requestFinancingQuote = useCallback(async (quoteData: {
    propertyValue: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    downPayment: number;
    preferredTerm: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await FinancingService.requestFinancingQuote(quoteData);
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Error requesting quote');
        return false;
      }
    } catch (err) {
      setError('Error requesting quote');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check affordability
  const checkAffordability = useCallback(async (
    monthlyIncome: number,
    monthlyExpenses: number,
    monthlyPayment: number
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await FinancingService.checkAffordability(
        monthlyIncome,
        monthlyExpenses,
        monthlyPayment
      );
      
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Error checking affordability');
        return null;
      }
    } catch (err) {
      setError('Error checking affordability');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get financing options
  const getFinancingOptions = useCallback(async (propertyValue: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await FinancingService.getFinancingOptions(propertyValue);
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Error loading financing options');
        return [];
      }
    } catch (err) {
      setError('Error loading financing options');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    calculation,
    isLoading,
    error,
    calculateMortgage,
    getCurrentRates,
    requestFinancingQuote,
    checkAffordability,
    getFinancingOptions
  };
};