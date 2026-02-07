import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-96 gap-4">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-700 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="text-slate-400 text-lg animate-pulse">در حال دریافت اطلاعات...</p>
  </div>
);