import React from 'react';
import Scanner from '../components/Scanner';

const ReaderApp: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 px-4 pb-12 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-white mb-2">Scan Your Book</h2>
        <p className="text-slate-400">
          Point your camera at the LuminaPage identifier inside the front cover.
        </p>
      </div>
      
      <Scanner onScanComplete={() => console.log('Scan complete')} />

      <div className="max-w-md mx-auto mt-12">
        <h3 className="text-sm uppercase text-slate-500 font-bold mb-4 tracking-wider">Your Collection</h3>
        <div className="space-y-3">
            {[
                { title: 'Dune', author: 'Frank Herbert', date: '2 days ago' },
                { title: 'Neuromancer', author: 'William Gibson', date: '1 week ago' }
            ].map((book, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-indigo-900/30 rounded flex items-center justify-center text-indigo-400 font-serif font-bold">
                        {book.title[0]}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{book.title}</h4>
                        <p className="text-slate-500 text-xs">{book.author}</p>
                    </div>
                    <span className="text-xs text-slate-600">{book.date}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReaderApp;