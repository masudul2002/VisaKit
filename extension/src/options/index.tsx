import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ProfileDashboard } from '../features/profile/pages/ProfileDashboard';
import { SettingsPage } from '../features/settings/pages/SettingsPage';
import '../index.css';

export const OptionsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'settings'>('profiles');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950 p-6 flex flex-col gap-6 select-none shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base">
            VK
          </span>
          <h1 className="text-base font-extrabold text-white">VisaKit Settings</h1>
        </div>

        <nav className="flex flex-col gap-1.5 mt-4">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'profiles'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profiles Manager
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings & Preferences
          </button>
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-slate-955">
        {activeTab === 'profiles' ? <ProfileDashboard /> : <SettingsPage />}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>
);
