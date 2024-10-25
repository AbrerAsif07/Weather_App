import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (lat: number, lon: number) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        onSearch(Number(data[0].lat), Number(data[0].lon));
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
    setSearching(false);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button 
          type="submit" 
          className="absolute right-3 top-3 text-white disabled:opacity-50"
          disabled={searching}
        >
          <Search className={`w-6 h-6 ${searching ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </form>
  );
}