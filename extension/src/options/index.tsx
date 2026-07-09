import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProfileDashboard } from '../features/profile/pages/ProfileDashboard';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfileDashboard />
  </React.StrictMode>
);
