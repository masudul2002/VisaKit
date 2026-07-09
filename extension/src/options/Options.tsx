import React, { useState } from 'react';

type TabId = 'personal' | 'passport' | 'contact' | 'settings';

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

export const Options: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Form states (mockup for Sprint 00 foundation validation)
  const [profile, setProfile] = useState({
    surname: '',
    givenNames: '',
    gender: 'MALE',
    dob: '',
    birthCity: '',
    birthCountry: 'BGD',
    nationalId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate local storage save
    setTimeout(() => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ visaProfile: profile }, () => {
          setIsSaving(false);
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        });
      } else {
        localStorage.setItem('visaProfile', JSON.stringify(profile));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    }, 800);
  };

  const tabs: TabItem[] = [
    {
      id: 'personal',
      label: 'Personal Details',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'passport',
      label: 'Passport Info',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact & Address',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-3xl -z-10" />

      {/* Top Navbar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md">
              <span className="font-extrabold text-white text-base">V</span>
            </div>
            <div>
              <span className="font-bold text-lg text-white">VisaKit</span>
              <span className="text-[10px] text-slate-500 ml-2 font-semibold bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Profile Manager
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 rounded-full text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Everything Saved Locally
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-md shadow-indigo-600/5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}

          {/* Local Security Tip Card */}
          <div className="mt-8 p-4 bg-slate-900/40 border border-slate-900 rounded-2xl backdrop-blur-md">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure & Encrypted
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              VisaKit saves profile inputs strictly inside your browser's local sandbox storage using Chrome extension security scopes.
            </p>
          </div>
        </aside>

        {/* Form Content Area */}
        <section className="flex-1 bg-slate-900/30 border border-slate-900 rounded-2xl p-6 md:p-8 backdrop-blur-md min-h-[480px]">
          {activeTab === 'personal' && (
            <form onSubmit={handleSave} className="flex flex-col h-full justify-between">
              <div>
                <div className="border-b border-slate-900 pb-5 mb-6">
                  <h2 className="text-xl font-bold text-white">Personal Details</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Provide the personal information exactly as it appears in your official passport.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Surname */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="surname" className="text-xs font-semibold text-slate-300">
                      Surname (as in Passport)
                    </label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={profile.surname}
                      onChange={handleInputChange}
                      placeholder="e.g., SMITH"
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      required
                    />
                  </div>

                  {/* Given Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="givenNames" className="text-xs font-semibold text-slate-300">
                      Given Name(s) (as in Passport)
                    </label>
                    <input
                      type="text"
                      id="givenNames"
                      name="givenNames"
                      value={profile.givenNames}
                      onChange={handleInputChange}
                      placeholder="e.g., JOHN DAVID"
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="gender" className="text-xs font-semibold text-slate-300">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="TRANSGENDER">Transgender</option>
                    </select>
                  </div>

                  {/* DOB */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="dob" className="text-xs font-semibold text-slate-300">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={profile.dob}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      required
                    />
                  </div>

                  {/* City of Birth */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="birthCity" className="text-xs font-semibold text-slate-300">
                      Town/City of Birth
                    </label>
                    <input
                      type="text"
                      id="birthCity"
                      name="birthCity"
                      value={profile.birthCity}
                      onChange={handleInputChange}
                      placeholder="e.g., DHAKA"
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      required
                    />
                  </div>

                  {/* Country of Birth */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="birthCountry" className="text-xs font-semibold text-slate-300">
                      Country of Birth
                    </label>
                    <select
                      id="birthCountry"
                      name="birthCountry"
                      value={profile.birthCountry}
                      onChange={handleInputChange}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    >
                      <option value="BGD">Bangladesh</option>
                      <option value="IND">India</option>
                      <option value="USA">United States</option>
                      <option value="GBR">United Kingdom</option>
                      <option value="CAN">Canada</option>
                    </select>
                  </div>

                  {/* National ID */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="nationalId" className="text-xs font-semibold text-slate-300">
                      National Id / Citizens No (if any)
                    </label>
                    <input
                      type="text"
                      id="nationalId"
                      name="nationalId"
                      value={profile.nationalId}
                      onChange={handleInputChange}
                      placeholder="e.g., 1992938173618"
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-900 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Saving will write directly to Chrome Local Extension Storage.
                </p>

                <div className="flex items-center gap-3">
                  {saveSuccess && (
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 animate-fade-in">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Saved successfully!
                    </span>
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="py-2.5 px-6 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Profile</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab !== 'personal' && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-indigo-400 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Under Construction</h3>
              <p className="text-sm text-slate-400 mt-2 max-w-sm">
                This tab structure is established for the profile schema. Form inputs for this section will be implemented in future sprints.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
