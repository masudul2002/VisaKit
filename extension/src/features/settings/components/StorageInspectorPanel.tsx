import React, { useState, useEffect } from 'react';
import { inspectorService, StorageUtilization } from '../services/inspector.service';
import { notificationsService, NotificationItem } from '../services/notifications.service';

export const StorageInspectorPanel: React.FC = () => {
  const [utilization, setUtilization] = useState<StorageUtilization | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    const utilData = await inspectorService.getStorageUtilization();
    const notifData = await notificationsService.getNotifications();
    setUtilization(utilData);
    setNotifications(notifData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await notificationsService.markAsRead(id);
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
  };

  const handleClearNotifs = async () => {
    await notificationsService.clearNotifications();
    setNotifications([]);
  };

  if (isLoading || !utilization) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 text-slate-400">
        <span className="font-bold text-sm">Loading storage details...</span>
      </div>
    );
  }

  const kbUsed = (utilization.bytesUsed / 1024).toFixed(2);
  const kbTotal = (utilization.capacityLimitBytes / 1024).toFixed(2);

  return (
    <div className="max-w-4xl px-8 py-10 flex flex-col gap-8">
      <div className="flex justify-between items-center border-b border-slate-900 pb-5 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            I
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">
              Storage Inspector & Notifications
            </h1>
            <span className="text-[11px] text-slate-500 font-bold tracking-wide mt-1.5 uppercase">
              Monitor extension local sandbox bytes utilization and alerts
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-5">
          <h3 className="font-extrabold text-sm text-white">Sandbox Storage Inspector</h3>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-slate-400 font-bold">
              <span>{kbUsed} KB used</span>
              <span>{kbTotal} KB limit</span>
            </div>

            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  utilization.footprintPercentage > 80 ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{ width: `${utilization.footprintPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div className="p-3 bg-slate-950/20 border border-slate-900 rounded-xl flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total Profiles</span>
              <span className="text-base font-extrabold text-white mt-1">
                {utilization.profileCount}
              </span>
            </div>
            <div className="p-3 bg-slate-950/20 border border-slate-900 rounded-xl flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Capacities Footprint
              </span>
              <span className="text-base font-extrabold text-white mt-1">
                {utilization.footprintPercentage}%
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col gap-4">
          <div className="flex justify-between items-center select-none">
            <h3 className="font-extrabold text-sm text-white">Notifications Center</h3>
            {notifications.length > 0 && (
              <button
                onClick={handleClearNotifs}
                className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[220px] pr-0.5">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500 font-bold">
                No alerts or notifications.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 border rounded-xl flex flex-col gap-1 transition-all ${
                    n.read
                      ? 'bg-slate-955/10 border-slate-900 text-slate-500'
                      : 'bg-blue-600/[0.02] border-blue-500/20 text-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <span className="font-extrabold text-xs leading-none">{n.title}</span>
                    {!n.read && (
                      <button
                        onClick={() => handleMarkAsRead(n.id)}
                        className="text-[9px] font-bold text-blue-400 hover:underline shrink-0"
                      >
                        Read
                      </button>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 leading-normal">{n.message}</span>
                  <span className="text-[9px] text-slate-500 mt-0.5">
                    {new Date(n.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
