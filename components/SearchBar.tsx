import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 relative z-20">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg className={`w-5 h-5 text-slate-400 group-focus-within:text-yellow-400 transition-colors ${isLoading ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="w-full p-4 pr-12 text-slate-100 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all shadow-lg placeholder-slate-500"
          placeholder="جستجوی نام فیلم (مثلاً: میان‌ستاره‌ای)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute left-2 top-2 bottom-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          جستجو
        </button>
      </form>
    </div>
  );
};