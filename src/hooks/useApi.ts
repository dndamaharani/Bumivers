import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApi = <T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): ApiState<T> => {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  }, [apiCall]);

  // Refetch function that can be called manually
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let isMounted = true;

    const executeApiCall = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await apiCall();
        
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'An error occurred'
          });
        }
      }
    };

    executeApiCall();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return {
    ...state,
    refetch
  };
};

// Custom hook for mutations (POST, PUT, DELETE)
export const useMutation = <TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>
) => {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null
  });

  const mutate = async (variables: TVariables): Promise<TData | null> => {
    try {
      setState({ loading: true, error: null });
      const data = await mutationFn(variables);
      setState({ loading: false, error: null });
      return data;
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
      return null;
    }
  };

  const reset = useCallback(() => {
    setState({ loading: false, error: null });
  }, []);

  return {
    mutate,
    reset,
    ...state
  };
};