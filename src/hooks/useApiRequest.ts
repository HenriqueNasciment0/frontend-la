// src/hooks/useApiRequest.ts
import { useState } from "react";

const useApiRequest = <T>(
  apiCall: () => Promise<T>,
  options?: {
    initialData?: T;
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
  }
) => {
  const [data, setData] = useState<T | null>(options?.initialData ?? null);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async () => {
    setIsLoading(true);
    try {
      const response = await apiCall();
      setData(response);
      options?.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, makeRequest };
};

export default useApiRequest;
