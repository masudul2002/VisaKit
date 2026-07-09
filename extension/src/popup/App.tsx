import React, { useState, useEffect } from 'react';
import { Layout, Container, Header, Footer, Section } from './layout';
import { Card, EmptyState } from './components';
import { profileService } from '../features/profile/services/profile.service';
import { VisaProfile } from '../features/profile/types/profile';
import { AutofillResultModal } from '../features/autofill/components/AutofillResultModal';
import { AutofillReport } from '../features/autofill/types/types';

export const App: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<VisaProfile | null>(null);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [report, setReport] = useState<AutofillReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActiveProfile = async () => {
      try {
        const all = await profileService.getAllProfiles();
        const active = all.find((p) => p.isDefault) || null;
        setActiveProfile(active);
      } catch (err) {
        console.error('Failed to load profiles inside popup context:', err);
      }
    };
    loadActiveProfile();
  }, []);

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

    if (!activeProfile) {
      setError('Please create and select an active profile in settings first.');
      setIsResultOpen(true);
      return;
    }

    if (typeof chrome === 'undefined' || !chrome.tabs) {
      setError('Autofill can only be executed inside the Chrome Extension context.');
      setIsResultOpen(true);
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) {
        setError('No active browser tab found.');
        setIsResultOpen(true);
        return;
      }

      const url = tab.url || '';
      if (!url.includes('indianvisaonline.gov.in')) {
        setError(
          'Autofill is only supported on the official Indian Visa website (indianvisaonline.gov.in).'
        );
        setIsResultOpen(true);
        return;
      }

      chrome.tabs.sendMessage(
        tab.id,
        { action: 'AUTOFILL', profile: activeProfile },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error('Messaging error:', chrome.runtime.lastError);
            setError(
              'Autofill script is not loaded on this tab. Please refresh the page and try again.'
            );
            setIsResultOpen(true);
            return;
          }

          if (response) {
            setReport(response);
          } else {
            setError('Autofill engine returned an empty response.');
          }
          setIsResultOpen(true);
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setIsResultOpen(true);
    }
  };

  const handleActionPlaceholder = (actionName: string) => {
    console.log(`VisaKit action triggered: ${actionName}`);
  };

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
                <button
                  onClick={handleOpenOptions}
                  className="w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Manage Profiles
                </button>
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

      <AutofillResultModal
        isOpen={isResultOpen}
        report={report}
        error={error}
        onClose={() => setIsResultOpen(false)}
      />
    </Layout>
  );
};

export default App;
