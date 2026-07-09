import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../hooks/useSettings';
import { profileService } from '../../profile/services/profile.service';
import { exportService } from '../../profile/services/export.service';
import { importService } from '../../profile/services/import.service';
import { backupService } from '../../profile/services/backup.service';

export const SettingsPage: React.FC = () => {
  const { settings, isLoading, error, updateSettings, resetSettings } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeConfirm, setPasscodeConfirm] = useState<string>('');
  const [cryptoError, setCryptoError] = useState<string | null>(null);
  const [cryptoSuccess, setCryptoSuccess] = useState<string | null>(null);

  useEffect(() => {
    const checkEncryption = async () => {
      const enc = await profileService.isEncrypted();
      setIsEncrypted(enc);
    };
    checkEncryption();
  }, []);

  const handleEnableEncryption = async (e: React.FormEvent) => {
    e.preventDefault();
    setCryptoError(null);
    setCryptoSuccess(null);
    if (!passcode.trim()) {
      setCryptoError('Passcode cannot be empty.');
      return;
    }
    if (passcode !== passcodeConfirm) {
      setCryptoError('Passcodes do not match.');
      return;
    }
    try {
      await profileService.setupEncryption(passcode);
      setIsEncrypted(true);
      setPasscode('');
      setPasscodeConfirm('');
      setCryptoSuccess('Profiles successfully encrypted with Master Passcode!');
    } catch {
      setCryptoError('Failed to encrypt storage database.');
    }
  };

  const handleDisableEncryption = async (e: React.FormEvent) => {
    e.preventDefault();
    setCryptoError(null);
    setCryptoSuccess(null);
    const success = await profileService.unlock(passcode);
    if (!success) {
      setCryptoError('Incorrect passcode.');
      return;
    }
    try {
      await profileService.removeEncryption();
      setIsEncrypted(false);
      setPasscode('');
      setCryptoSuccess('Storage successfully decrypted to plain JSON.');
    } catch {
      setCryptoError('Failed to decrypt storage database.');
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 text-slate-400">
        <span className="font-bold text-sm">Loading settings...</span>
      </div>
    );
  }

  const handleToggle = async (section: keyof typeof settings, key: string) => {
    const sectionData = settings[section] as Record<string, boolean>;
    const updatedSection = {
      ...sectionData,
      [key]: !sectionData[key],
    };
    await updateSettings({ [section]: updatedSection });
  };

  const handleSelectChange = async (
    section: keyof typeof settings,
    key: string,
    val: string
  ) => {
    const sectionData = settings[section] as Record<string, string>;
    const updatedSection = {
      ...sectionData,
      [key]: val,
    };
    await updateSettings({ [section]: updatedSection });
  };

  const handleClearProfiles = async () => {
    if (
      confirm('Are you sure you want to clear all applicant profiles? This action is irreversible.')
    ) {
      await profileService.saveProfiles([]);
      alert('All profiles cleared.');
    }
  };

  const handleFactoryReset = async () => {
    if (
      confirm(
        'Are you absolutely sure you want to factory reset VisaKit? This will wipe all local settings AND delete all profiles.'
      )
    ) {
      await profileService.saveProfiles([]);
      await resetSettings();
      alert('VisaKit has been factory reset.');
      window.location.reload();
    }
  };

  const handleExportData = async () => {
    try {
      const all = await profileService.getAllProfiles();
      exportService.exportProfiles(all);
    } catch {
      alert('Failed to export profiles.');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const validated = importService.parseAndValidate(text);
        await backupService.replaceBackup(validated);
        alert('Backup profiles successfully imported!');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Import failed.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-4xl px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-3.5 border-b border-slate-900 pb-5 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
          S
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">
            Settings & Preferences
          </h1>
          <span className="text-[11px] text-slate-500 font-bold tracking-wide mt-1.5 uppercase">
            Configure Autofill parameters and Local Storage backups
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">
          {error}
        </div>
      )}

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4">
          <h3 className="font-extrabold text-sm text-white select-none">General Settings</h3>
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Language</span>
              <select
                value={settings.general.language}
                onChange={(e) => handleSelectChange('general', 'language', e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="system">System Default</option>
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-300 font-medium">Auto Load Default Profile</span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Loads active profile on start
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.general.autoLoadLastActiveProfile}
                onChange={() => handleToggle('general', 'autoLoadLastActiveProfile')}
                className="w-4 h-4 rounded border-slate-800 bg-slate-955 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4">
          <h3 className="font-extrabold text-sm text-white select-none">Appearance Settings</h3>
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Theme</span>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleSelectChange('appearance', 'theme', e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="system">System</option>
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Enable Animations</span>
              <input
                type="checkbox"
                checked={settings.appearance.enableAnimations}
                onChange={() => handleToggle('appearance', 'enableAnimations')}
                className="w-4 h-4 rounded border-slate-800 bg-slate-955 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Autofill Preferences */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4 col-span-1 md:col-span-2">
          <h3 className="font-extrabold text-sm text-white select-none">Autofill Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between items-center p-3 bg-slate-950/20 border border-slate-900 rounded-xl">
              <span className="text-slate-300 font-medium">Smart Fields Matching</span>
              <input
                type="checkbox"
                checked={settings.autofill.enableSmartMatching}
                onChange={() => handleToggle('autofill', 'enableSmartMatching')}
                className="w-4 h-4 rounded border-slate-800 bg-slate-955 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/20 border border-slate-900 rounded-xl">
              <span className="text-slate-300 font-medium">Highlight Filled Fields</span>
              <input
                type="checkbox"
                checked={settings.autofill.highlightFilledFields}
                onChange={() => handleToggle('autofill', 'highlightFilledFields')}
                className="w-4 h-4 rounded border-slate-800 bg-slate-955 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/20 border border-slate-900 rounded-xl">
              <span className="text-slate-300 font-medium">Scroll to First Field</span>
              <input
                type="checkbox"
                checked={settings.autofill.scrollToFirstField}
                onChange={() => handleToggle('autofill', 'scrollToFirstField')}
                className="w-4 h-4 rounded border-slate-800 bg-slate-955 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/20 border border-slate-900 rounded-xl">
              <span className="text-slate-300 font-medium">Show Summary Report</span>
              <input
                type="checkbox"
                checked={settings.autofill.showSummary}
                onChange={() => handleToggle('autofill', 'showSummary')}
                className="w-4 h-4 rounded border-slate-800 bg-slate-955 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4">
          <h3 className="font-extrabold text-sm text-white select-none">
            Vault Security (Encryption)
          </h3>
          <div className="flex flex-col gap-3 text-xs">
            {cryptoError && (
              <span className="text-[10px] font-bold text-red-500">{cryptoError}</span>
            )}
            {cryptoSuccess && (
              <span className="text-[10px] font-bold text-emerald-500">{cryptoSuccess}</span>
            )}

            {isEncrypted ? (
              <form onSubmit={handleDisableEncryption} className="flex flex-col gap-2">
                <span className="text-slate-400 leading-normal">
                  Your profiles database is currently encrypted. Enter your passcode below to decrypt
                  and disable security.
                </span>
                <input
                  type="password"
                  placeholder="Master passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-blue-500/50"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-xs transition-colors cursor-pointer border border-transparent"
                >
                  Disable Encryption
                </button>
              </form>
            ) : (
              <form onSubmit={handleEnableEncryption} className="flex flex-col gap-2">
                <span className="text-slate-400 leading-normal">
                  Lock your passport numbers and personal data. Setting a passcode encrypts storage
                  using AES-GCM.
                </span>
                <input
                  type="password"
                  placeholder="New master passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-blue-500/50"
                />
                <input
                  type="password"
                  placeholder="Confirm passcode..."
                  value={passcodeConfirm}
                  onChange={(e) => setPasscodeConfirm(e.target.value)}
                  className="bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-blue-500/50"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Enable Storage Encryption
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Local Storage & Reset */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4">
          <h3 className="font-extrabold text-sm text-white select-none">Storage & Resets</h3>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Profiles Backup</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleImportClick}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Import
                </button>
                <button
                  onClick={handleExportData}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-900/80 pt-3">
              <span className="text-slate-300 font-medium">Clear All Profiles</span>
              <button
                onClick={handleClearProfiles}
                className="px-3 py-1.5 bg-red-600/10 hover:bg-red-655/20 border border-red-500/20 text-red-400 rounded-lg font-bold transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Factory Reset VisaKit</span>
              <button
                onClick={handleFactoryReset}
                className="px-3 py-1.5 bg-red-650 hover:bg-red-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* About Card */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4">
          <h3 className="font-extrabold text-sm text-white select-none">About Application</h3>
          <div className="flex flex-col gap-3 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>App Name</span>
              <span className="font-bold text-slate-200">VisaKit</span>
            </div>
            <div className="flex justify-between">
              <span>Current Version</span>
              <span className="font-bold text-slate-200">v1.1.0</span>
            </div>
            <div className="flex justify-between">
              <span>License</span>
              <span className="font-bold text-slate-200">MIT</span>
            </div>
            <div className="flex justify-between">
              <span>Repository</span>
              <a
                href="https://github.com/masudul2002/VisaKit"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub Link
              </a>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};
