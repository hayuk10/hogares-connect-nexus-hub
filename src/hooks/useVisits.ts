import { useState, useCallback } from 'react';
import { Visit } from '@/types';
import { VisitsService } from '@/services/visitsService';

export const useVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Schedule a new visit
  const scheduleVisit = useCallback(async (
    propertyId: string,
    date: string,
    time: string,
    notes?: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await VisitsService.scheduleVisit(propertyId, date, time, notes);
      if (response.success) {
        setVisits(prev => [...prev, response.data]);
        return response.data;
      } else {
        setError(response.error || 'Error scheduling visit');
        return null;
      }
    } catch (err) {
      setError('Error scheduling visit');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get user visits
  const getUserVisits = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await VisitsService.getUserVisits(userId);
      if (response.success) {
        setVisits(response.data);
        return response.data;
      } else {
        setError(response.error || 'Error loading visits');
        return [];
      }
    } catch (err) {
      setError('Error loading visits');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update visit status
  const updateVisitStatus = useCallback(async (visitId: string, status: Visit['status']) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await VisitsService.updateVisitStatus(visitId, status);
      if (response.success) {
        setVisits(prev => prev.map(visit => 
          visit.id === visitId ? { ...visit, status } : visit
        ));
        return response.data;
      } else {
        setError(response.error || 'Error updating visit');
        return null;
      }
    } catch (err) {
      setError('Error updating visit');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cancel visit
  const cancelVisit = useCallback(async (visitId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await VisitsService.cancelVisit(visitId);
      if (response.success) {
        setVisits(prev => prev.map(visit => 
          visit.id === visitId ? { ...visit, status: 'cancelled' } : visit
        ));
        return true;
      } else {
        setError(response.error || 'Error cancelling visit');
        return false;
      }
    } catch (err) {
      setError('Error cancelling visit');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get available time slots
  const getAvailableSlots = useCallback(async (propertyId: string, date: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await VisitsService.getAvailableSlots(propertyId, date);
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Error loading available slots');
        return [];
      }
    } catch (err) {
      setError('Error loading available slots');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    visits,
    isLoading,
    error,
    scheduleVisit,
    getUserVisits,
    updateVisitStatus,
    cancelVisit,
    getAvailableSlots
  };
};