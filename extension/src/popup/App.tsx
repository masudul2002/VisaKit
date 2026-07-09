import React, { useState, useEffect } from 'react';
import { Layout, Container, Header, Footer, Section } from './layout';
import { Card, EmptyState } from './components';
import { profileService } from '../features/profile/services/profile.service';
import { VisaProfile } from '../features/profile/types/profile';
import { AutofillReport } from '../features/autofill/types/types';
import { ExecutionController, ExecutionSummary } from '../features/autofill/execution';

export const App: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<VisaProfile | null>(null);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [report, setReport] = useState<AutofillReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAutofilling, setIsAutofilling] = useState<boolean>(false);

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const loadActiveProfile = async () => {
    try {
      const all = await profileService.getAllProfiles();
      const active = all.find((p) => p.isDefault) || null;
      setActiveProfile(active);
    } catch (err) {
      console.error('Failed to load profiles inside popup context:', err);
    }
  };

  const checkLockStatus = async () => {
    const isEnc = await profileService.isEncrypted();
    const sessionKey = profileService.getSessionPasscode();
    if (isEnc && !sessionKey) {
      setIsLocked(true);
    } else {
      setIsLocked(false);
      loadActiveProfile();
    }
  };

  useEffect(() => {
    checkLockStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError(null);
    const success = await profileService.unlock(passcode);
    if (success) {
      setIsLocked(false);
      loadActiveProfile();
    } else {
      setUnlockError('Incorrect passcode. Please try again.');
    }
  };

  const handleOpenOptions = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open('../options.html');
    }
  };

  const handleAutofill = async () => {
    setError(null);
    setReport(null);
    setIsAutofilling(true);

    try {
      const response = await ExecutionController.triggerAutofill();
      setReport(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsAutofilling(false);
      setIsResultOpen(true);
    }
  };

  const handleActionPlaceholder = (actionName: string) => {
    console.log(`VisaKit action triggered: ${actionName}`);
  };

  if (isLocked) {
    return (
      <Layout>
        <Container>
          <Header />
          <form
            onSubmit={handleUnlock}
            className="flex-1 flex flex-col justify-center px-6 py-8 gap-4 text-center select-none"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-2xl mb-1">🔒</span>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                Storage Encrypted
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                Enter your master passcode to unlock your saved visa profiles database.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                type="password"
                placeholder="Passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-center outline-none focus:border-blue-500/50"
                autoFocus
              />
              {unlockError && (
                <span className="text-[9px] font-bold text-red-500">{unlockError}</span>
              )}
            </div>

            <button
              type="submit"
              className="py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs shadow-md shadow-blue-500/10 transition-all cursor-pointer"
            >
              Unlock Vault
            </button>
          </form>
          <Footer />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Header />

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-0.5">
          {/* Dashboard Profile Status */}
          <Section title="Dashboard">
            {activeProfile ? (
              <div className="p-4 bg-white dark:bg-slate-900 border border-blue-500/20 dark:border-blue-500/10 rounded-[16px] flex flex-col gap-3 shadow-sm select-none">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Active Profile
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 mt-1">
                      {activeProfile.surname}, {activeProfile.givenName}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Passport: {activeProfile.passportNumber}
                    </p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex shrink-0" />
                </div>
                <div className="flex gap-2.5 mt-1">
                  <button
                    onClick={handleOpenOptions}
                    className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Manage
                  </button>
                  <button
                    onClick={handleAutofill}
                    disabled={isAutofilling}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl text-xs shadow-md shadow-blue-500/10 transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAutofilling ? (
                      <>
                        <svg
                          className="animate-spin h-3.5 w-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Filling...
                      </>
                    ) : (
                      'Autofill Now'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <EmptyState onCreateProfile={handleOpenOptions} />
            )}
          </Section>

          {/* Quick Actions List */}
          <Section title="Quick Actions" className="pb-2">
            <div className="flex flex-col gap-3">
              <Card
                title="Form Autofill"
                description="Auto-populate Indian Visa portal fields"
                onClick={handleAutofill}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
              />
              <Card
                title="Profile Settings"
                description="Manage personal and passport records"
                onClick={handleOpenOptions}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
              />
              <Card
                title="Import Profile"
                description="Load details from a local JSON backup"
                onClick={() => handleActionPlaceholder('Import')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                }
              />
              <Card
                title="Export Profile"
                description="Download records as a backup file"
                onClick={() => handleActionPlaceholder('Export')}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                }
              />
            </div>
          </Section>
        </div>

        <Footer />
      </Container>

      {isResultOpen && (
        <ExecutionSummary report={report} error={error} onClose={() => setIsResultOpen(false)} />
      )}
    </Layout>
  );
};

export default App;
