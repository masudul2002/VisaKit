import { useState, useEffect, useCallback } from 'react';
import { UserSettings } from '../types/settings';
import { settingsService } from '../services/settings.service';
import { themeService } from '../services/theme.service';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
      themeService.applyTheme(data.appearance.theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (!settings || settings.appearance.theme !== 'system') return;

    const unwatch = themeService.watchSystemTheme(() => {
      themeService.applyTheme('system');
    });
    return unwatch;
  }, [settings]);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    setError(null);
    try {
      const updated = await settingsService.updateSettings(updates);
      setSettings(updated);
      themeService.applyTheme(updated.appearance.theme);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      throw err;
    }
  };

  const resetSettings = async () => {
    setError(null);
    try {
      const updated = await settingsService.resetSettings();
      setSettings(updated);
      themeService.applyTheme(updated.appearance.theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset settings');
      throw err;
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    resetSettings,
    reloadSettings: loadSettings,
  };
};
