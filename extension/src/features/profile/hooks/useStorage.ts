import { useCallback } from 'react';
import { storageService } from '../services/storage.service';

export const useStorage = () => {
  const get = useCallback(<T>(key: string): Promise<T | null> => {
    return storageService.get<T>(key);
  }, []);

  const set = useCallback(<T>(key: string, value: T): Promise<void> => {
    return storageService.set(key, value);
  }, []);

  const remove = useCallback((key: string): Promise<void> => {
    return storageService.remove(key);
  }, []);

  return { get, set, remove };
};
