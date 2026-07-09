import { storageService } from '../../profile/services/storage.service';

export interface ActivityLogEntry {
  timestamp: string;
  profileName: string;
  url: string;
  matched: number;
  filled: number;
  failed: number;
  timeMs: number;
}

const STORAGE_KEY = 'visakit_activity_logs';
const MAX_LOGS = 50;

export const activityService = {
  getLogs: async (): Promise<ActivityLogEntry[]> => {
    const logs = await storageService.get<ActivityLogEntry[]>(STORAGE_KEY);
    return logs || [];
  },

  addLog: async (logData: Omit<ActivityLogEntry, 'timestamp'>): Promise<void> => {
    const logs = await activityService.getLogs();
    const newEntry: ActivityLogEntry = {
      ...logData,
      timestamp: new Date().toISOString(),
    };
    
    // Cap log entries size to prevent bloating storage
    const updated = [newEntry, ...logs].slice(0, MAX_LOGS);
    await storageService.set(STORAGE_KEY, updated);
  },

  clearLogs: async (): Promise<void> => {
    await storageService.remove(STORAGE_KEY);
  },
};
