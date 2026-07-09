import { VisaProfile } from '../types/profile';

export interface ExportData {
  version: string;
  type: 'visakit_profiles';
  timestamp: string;
  data: VisaProfile[];
}

export const exportService = {
  triggerDownload: (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  exportProfiles: (profiles: VisaProfile[]) => {
    const payload: ExportData = {
      version: '1.0.0',
      type: 'visakit_profiles',
      timestamp: new Date().toISOString(),
      data: profiles,
    };
    const content = JSON.stringify(payload, null, 2);
    const dateStr = new Date().toISOString().split('T')[0];
    exportService.triggerDownload(`visakit_backup_${dateStr}.json`, content);
  },

  exportSingleProfile: (profile: VisaProfile) => {
    const payload: ExportData = {
      version: '1.0.0',
      type: 'visakit_profiles',
      timestamp: new Date().toISOString(),
      data: [profile],
    };
    const content = JSON.stringify(payload, null, 2);
    const cleanName = `${profile.givenName || 'profile'}_${profile.surname || ''}`
      .replace(/\s+/g, '_')
      .toLowerCase();
    exportService.triggerDownload(`visakit_${cleanName}.json`, content);
  },
};
