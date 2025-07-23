import { FinancingCalculation, APIResponse } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface FinancingRequest {
  propertyValue: number;
  downPaymentPercentage: number;
  loanTermYears: number;
  interestRate?: number;
}

interface FinancingQuoteRequest {
  propertyValue: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  downPayment: number;
  preferredTerm: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class FinancingService {
  // Calculate mortgage with detailed breakdown
  static async calculateMortgage(request: FinancingRequest): Promise<APIResponse<FinancingCalculation>> {
    await delay(400);
    
    try {
      const {
        propertyValue,
        downPaymentPercentage,
        loanTermYears,
        interestRate = 3.5 // Default rate, in real app would come from API
      } = request;

      const downPaymentAmount = propertyValue * (downPaymentPercentage / 100);
      const loanAmount = propertyValue - downPaymentAmount;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTermYears * 12;
      
      const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalCost = monthlyPayment * numberOfPayments + downPaymentAmount;
      const totalInterest = totalCost - propertyValue;

      const calculation: FinancingCalculation = {
        propertyValue,
        downPayment: downPaymentAmount,
        loanTerm: loanTermYears,
        interestRate,
        monthlyPayment,
        totalCost,
        totalInterest
      };

      return {
        data: calculation,
        success: true,
        message: "Calculation completed successfully"
      };
    } catch (error) {
      return {
        data: {} as FinancingCalculation,
        success: false,
        error: "Failed to calculate mortgage"
      };
    }
  }

  // Get current interest rates
  static async getCurrentRates(): Promise<APIResponse<{ fixed: number; variable: number }>> {
    await delay(300);
    
    try {
      // Mock rates - in real app would come from financial API
      const rates = {
        fixed: 3.45,
        variable: 2.95
      };

      return {
        data: rates,
        success: true,
        message: "Current rates fetched"
      };
    } catch (error) {
      return {
        data: { fixed: 0, variable: 0 },
        success: false,
        error: "Failed to fetch rates"
      };
    }
  }

  // Request personalized financing quote
  static async requestFinancingQuote(request: FinancingQuoteRequest): Promise<APIResponse<boolean>> {
    await delay(800);
    
    try {
      // In real app, this would send data to FinanHogar API
      console.log('Financing quote request:', request);
      
      // Mock success - would return quote ID in real implementation
      return {
        data: true,
        success: true,
        message: "Quote request submitted successfully. A FinanHogar specialist will contact you within 24 hours."
      };
    } catch (error) {
      return {
        data: false,
        success: false,
        error: "Failed to submit quote request"
      };
    }
  }

  // Check affordability
  static async checkAffordability(
    monthlyIncome: number, 
    monthlyExpenses: number, 
    monthlyPayment: number
  ): Promise<APIResponse<{ affordable: boolean; ratio: number; recommendation: string }>> {
    await delay(200);
    
    try {
      const netIncome = monthlyIncome - monthlyExpenses;
      const ratio = monthlyPayment / netIncome;
      const affordable = ratio <= 0.35; // Standard 35% rule
      
      let recommendation = "";
      if (ratio <= 0.25) {
        recommendation = "Excelente capacidad de pago";
      } else if (ratio <= 0.35) {
        recommendation = "Buena capacidad de pago";
      } else if (ratio <= 0.45) {
        recommendation = "Capacidad límite - considera reducir el importe";
      } else {
        recommendation = "Supera la capacidad recomendada";
      }

      return {
        data: { affordable, ratio, recommendation },
        success: true,
        message: "Affordability check completed"
      };
    } catch (error) {
      return {
        data: { affordable: false, ratio: 0, recommendation: "" },
        success: false,
        error: "Failed to check affordability"
      };
    }
  }

  // Get financing options for a property
  static async getFinancingOptions(propertyValue: number): Promise<APIResponse<any[]>> {
    await delay(500);
    
    try {
      // Mock financing options
      const options = [
        {
          id: "option1",
          name: "Hipoteca Fija Clásica",
          interestRate: 3.45,
          type: "fixed",
          minDownPayment: 20,
          maxTerm: 30,
          features: ["Cuota fija", "Sin sorpresas", "Ideal para planificación"]
        },
        {
          id: "option2", 
          name: "Hipoteca Variable Plus",
          interestRate: 2.95,
          type: "variable",
          minDownPayment: 15,
          maxTerm: 40,
          features: ["Cuota inicial menor", "Revisión anual", "Flexibilidad"]
        },
        {
          id: "option3",
          name: "Hipoteca Joven",
          interestRate: 3.25,
          type: "mixed",
          minDownPayment: 10,
          maxTerm: 35,
          features: ["Entrada reducida", "Condiciones especiales", "Hasta 35 años"]
        }
      ];

      return {
        data: options,
        success: true,
        message: "Financing options fetched"
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: "Failed to fetch financing options"
      };
    }
  }
}