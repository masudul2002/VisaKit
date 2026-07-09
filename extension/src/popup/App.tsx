import React from 'react';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans antialiased text-center select-none min-h-[150px] w-[200px]">
      <h1 className="text-lg font-bold text-indigo-400">VisaKit</h1>
      <p className="text-xs text-slate-400 mt-1">Version 1.0</p>
      <p className="text-xs font-semibold text-emerald-400 mt-2 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
        Ready
      </p>
    </div>
  );
};

export default App;
