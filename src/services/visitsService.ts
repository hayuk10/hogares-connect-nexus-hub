import { Visit, APIResponse } from '@/types';

// Mock visits data
const mockVisits: Visit[] = [
  {
    id: "v1",
    propertyId: "1",
    userId: "user1",
    date: "2024-01-15",
    time: "10:00",
    status: "confirmed",
    notes: "Interesado en financiación"
  },
  {
    id: "v2",
    propertyId: "2",
    userId: "user1",
    date: "2024-01-18",
    time: "16:30",
    status: "pending"
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class VisitsService {
  static async scheduleVisit(
    propertyId: string, 
    date: string, 
    time: string, 
    notes?: string
  ): Promise<APIResponse<Visit>> {
    await delay(600);
    
    try {
      const newVisit: Visit = {
        id: `v${Date.now()}`,
        propertyId,
        userId: "current_user", // In real app, get from auth context
        date,
        time,
        status: "pending",
        notes
      };

      mockVisits.push(newVisit);

      return {
        data: newVisit,
        success: true,
        message: "Visit scheduled successfully"
      };
    } catch (error) {
      return {
        data: {} as Visit,
        success: false,
        error: "Failed to schedule visit"
      };
    }
  }

  static async getUserVisits(userId: string): Promise<APIResponse<Visit[]>> {
    await delay(400);
    
    try {
      const userVisits = mockVisits.filter(v => v.userId === userId);
      return {
        data: userVisits,
        success: true,
        message: "User visits fetched"
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: "Failed to fetch visits"
      };
    }
  }

  static async updateVisitStatus(
    visitId: string, 
    status: Visit['status']
  ): Promise<APIResponse<Visit>> {
    await delay(500);
    
    try {
      const visitIndex = mockVisits.findIndex(v => v.id === visitId);
      if (visitIndex === -1) {
        return {
          data: {} as Visit,
          success: false,
          error: "Visit not found"
        };
      }

      mockVisits[visitIndex].status = status;

      return {
        data: mockVisits[visitIndex],
        success: true,
        message: "Visit status updated"
      };
    } catch (error) {
      return {
        data: {} as Visit,
        success: false,
        error: "Failed to update visit"
      };
    }
  }

  static async cancelVisit(visitId: string): Promise<APIResponse<boolean>> {
    await delay(400);
    
    try {
      const visitIndex = mockVisits.findIndex(v => v.id === visitId);
      if (visitIndex === -1) {
        return {
          data: false,
          success: false,
          error: "Visit not found"
        };
      }

      mockVisits[visitIndex].status = "cancelled";

      return {
        data: true,
        success: true,
        message: "Visit cancelled successfully"
      };
    } catch (error) {
      return {
        data: false,
        success: false,
        error: "Failed to cancel visit"
      };
    }
  }

  // Available time slots (mock data)
  static async getAvailableSlots(propertyId: string, date: string): Promise<APIResponse<string[]>> {
    await delay(300);
    
    try {
      // Mock available slots - in real app this would check agent availability
      const allSlots = [
        "09:00", "10:00", "11:00", "12:00",
        "15:00", "16:00", "17:00", "18:00"
      ];

      // Remove already booked slots for the date
      const bookedSlots = mockVisits
        .filter(v => v.propertyId === propertyId && v.date === date && v.status !== "cancelled")
        .map(v => v.time);

      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

      return {
        data: availableSlots,
        success: true,
        message: "Available slots fetched"
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: "Failed to fetch available slots"
      };
    }
  }
}