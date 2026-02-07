import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from './services/gemini';
import { MovieDetails } from './types';
import { SearchBar } from './components/SearchBar';
import { MovieDetail } from './components/MovieDetail';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchMovieDetails(query);
      setData(result);
    } catch (err) {
      setError("متاسفانه در دریافت اطلاعات خطایی رخ داد. لطفا دوباره تلاش کنید.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load with a popular movie to show off the UI
  useEffect(() => {
    handleSearch("Inception");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pb-20 selection:bg-yellow-500 selection:text-slate-900">
      
      {/* Navbar / Header */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-yellow-500 rounded-lg transform rotate-3 flex items-center justify-center">
               <span className="font-black text-slate-900 text-lg">C</span>
             </div>
             <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
               سینماتیکس
             </span>
          </div>
          <div className="flex gap-4 text-sm text-slate-400">
             <button className="hover:text-yellow-400 transition-colors">فیلم‌ها</button>
             <button className="hover:text-yellow-400 transition-colors">سریال‌ها</button>
             <button className="hover:text-yellow-400 transition-colors">بازیگران</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        <div className="text-center mb-10 mt-4">
           <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
             دنیای سینما در دستان شما
           </h2>
           <p className="text-slate-400 max-w-lg mx-auto">
             جستجو کنید، اطلاعات کسب کنید و از جزئیات دقیق فیلم‌های مورد علاقه خود به زبان فارسی لذت ببرید.
           </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="max-w-3xl mx-auto bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-xl text-center mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : data ? (
          <div className="animate-fade-in-up">
            <MovieDetail movie={data} />
          </div>
        ) : null}

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-900 mt-12 py-8 text-center text-slate-600 text-sm">
        <p>&copy; ۲۰۲۴ سینماتیکس. تمامی حقوق محفوظ است.</p>
        <p className="mt-2 text-xs opacity-50">Designed with Gemini & React</p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;