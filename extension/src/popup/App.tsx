import React from 'react';
import { Layout, Container, Header, Footer, Section } from './layout';
import { Card, EmptyState } from './components';

export const App: React.FC = () => {
  const handleOpenOptions = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open('../options.html');
    }
  };

  const handleActionPlaceholder = (actionName: string) => {
    console.log(`VisaKit action triggered: ${actionName}`);
  };

  const actions = [
    {
      title: 'Profile Settings',
      description: 'Manage personal and passport records',
      onClick: handleOpenOptions,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Form Autofill',
      description: 'Auto-populate Indian Visa portal fields',
      onClick: () => handleActionPlaceholder('Autofill'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Import Profile',
      description: 'Load details from a local JSON backup',
      onClick: () => handleActionPlaceholder('Import'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      ),
    },
    {
      title: 'Export Profile',
      description: 'Download records as a backup file',
      onClick: () => handleActionPlaceholder('Export'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      <Container>
        <Header />

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-0.5">
          {/* Dashboard Profile Status */}
          <Section title="Dashboard">
            <EmptyState onCreateProfile={handleOpenOptions} />
          </Section>

          {/* Quick Actions List */}
          <Section title="Quick Actions" className="pb-2">
            <div className="flex flex-col gap-3">
              {actions.map((act, index) => (
                <Card
                  key={index}
                  title={act.title}
                  description={act.description}
                  onClick={act.onClick}
                  icon={act.icon}
                />
              ))}
            </div>
          </Section>
        </div>

        <Footer />
      </Container>
    </Layout>
  );
};

export default App;
