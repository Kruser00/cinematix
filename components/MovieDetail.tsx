import React from 'react';
import { MovieDetails } from '../types';

interface MovieDetailProps {
  movie: MovieDetails;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  // Use a deterministic generic image based on ID if real poster not available
  const posterId = movie.posterId || 100;
  const heroImage = `https://picsum.photos/seed/${posterId}/1920/1080`;
  const posterImage = `https://picsum.photos/seed/${posterId}/500/750`;

  return (
    <div className="relative w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Background Hero with Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0">
        <img 
          src={heroImage} 
          alt="Backdrop" 
          className="w-full h-full object-cover opacity-30 blur-sm mask-image-gradient"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-900/80 to-slate-900"></div>
      </div>

      <div className="relative z-10 px-6 py-8 md:px-10 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Poster Section (Sticks on Desktop) */}
          <div className="flex-shrink-0 w-full md:w-[300px] mx-auto md:mx-0">
            <div className="group relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-[2/3]">
              <img 
                src={posterImage} 
                alt={movie.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <button className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                  تماشا کنید
                </button>
              </div>
            </div>
            
            {/* Quick Stats Grid under poster on mobile, sidebar on desktop */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-center md:text-right">
               <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                 <span className="block text-slate-400 text-xs mb-1">امتیاز IMDb</span>
                 <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 font-bold text-xl">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                   <span>{movie.rating}</span>
                 </div>
               </div>
               <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                 <span className="block text-slate-400 text-xs mb-1">سال انتشار</span>
                 <span className="block text-slate-100 font-bold text-xl">{movie.year}</span>
               </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-grow text-slate-200">
            {/* Title Header */}
            <div className="mb-6 border-b border-slate-800 pb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight tracking-tight drop-shadow-lg">
                {movie.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-400 font-light dir-ltr text-right font-sans">
                {movie.originalTitle}
              </h2>
            </div>

            {/* Tags & Meta */}
            <div className="flex flex-wrap gap-3 mb-8">
              {movie.genres.map((genre, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-full border border-slate-700 transition-colors cursor-default">
                  {genre}
                </span>
              ))}
              <span className="px-3 py-1 flex items-center gap-2 text-slate-400 text-sm border border-transparent">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {movie.runtime}
              </span>
            </div>

            {/* Plot */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-yellow-500 mb-3 border-r-4 border-yellow-500 pr-3">خلاصه داستان</h3>
              <p className="text-lg leading-loose text-slate-300 text-justify">
                {movie.plot}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  کارگردان
                </h3>
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-lg font-medium">{movie.director}</span>
                </div>
              </div>
              
              {movie.awards && (
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    جوایز
                  </h3>
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                    <p className="text-sm text-slate-300 leading-relaxed">{movie.awards}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Cast List */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 border-r-4 border-yellow-500 pr-3">بازیگران</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movie.cast.map((actor, idx) => (
                  <div key={idx} className="bg-slate-800/30 hover:bg-slate-800/80 p-3 rounded-xl transition-all duration-300 border border-slate-700/30 hover:border-slate-600 group">
                     <div className="mb-2 w-full aspect-square bg-slate-700 rounded-lg overflow-hidden relative">
                         <img 
                            src={`https://picsum.photos/seed/${posterId + idx + 10}/200/200`} 
                            alt={actor.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                         />
                     </div>
                    <div className="text-sm font-bold text-slate-200 truncate">{actor.name}</div>
                    <div className="text-xs text-slate-400 truncate">{actor.role}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};