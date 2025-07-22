'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (params: { query: string; location: string }) => void;
  defaultQuery?: string;
  defaultLocation?: string;
}

export function SearchBar({ 
  onSearch, 
  defaultQuery = '', 
  defaultLocation = '' 
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);

  const handleSearch = () => {
    onSearch({ query, location });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6"
      data-testid="search-bar-container"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
            data-testid="search-icon"
          />
          <Input
            type="text"
            placeholder="Job title or keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-12 pl-10 pr-4"
          />
        </div>
        
        <div className="lg:col-span-4 relative">
          <MapPin 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
            data-testid="location-icon"
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-12 pl-10 pr-4"
          />
        </div>
        
        <div className="lg:col-span-3">
          <Button 
            onClick={handleSearch}
            className="w-full h-12"
            size="lg"
          >
            Search Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}