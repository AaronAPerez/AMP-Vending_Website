
// /lib/hooks/useReviewGeneration.ts
import { useState, useCallback } from 'react';
import { ReviewCustomer, ReviewRequest, ReviewMetrics } from '../types/review';

export function useReviewGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [metrics, setMetrics] = useState<ReviewMetrics | null>(null);

  const createReviewRequest = useCallback(async (customerData: Partial<ReviewCustomer>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerData,
          sendImmediately: false
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create review request');
      }

      // Update local state
      setReviewRequests(prev => [result.data, ...prev]);

      return { success: true, data: result.data };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendReviewRequest = useCallback(async (requestId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reviews/send/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send review request');
      }

      // Update local state
      setReviewRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'sent', sentDate: new Date() }
            : req
        )
      );

      return { success: true, data: result.data };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews/metrics');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load metrics');
      }

      setMetrics(result.data.metrics);
      return { success: true, data: result.data };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadReviewRequests = useCallback(async (filters?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams(filters || {});
      const response = await fetch(`/api/reviews/track?${queryParams}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load review requests');
      }

      setReviewRequests(result.data.requests);
      return { success: true, data: result.data };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    reviewRequests,
    metrics,
    createReviewRequest,
    sendReviewRequest,
    loadMetrics,
    loadReviewRequests,
    clearError: () => setError(null)
  };
}