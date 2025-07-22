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
  defaultLocation = '',
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
      className="rounded-lg bg-white p-6 shadow-lg"
      data-testid="search-bar-container"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <Search
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            data-testid="search-icon"
          />
          <Input
            type="text"
            placeholder="Job title or keywords"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 w-full pl-10 pr-4"
          />
        </div>

        <div className="relative lg:col-span-4">
          <MapPin
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            data-testid="location-icon"
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 w-full pl-10 pr-4"
          />
        </div>

        <div className="lg:col-span-3">
          <Button onClick={handleSearch} className="h-12 w-full" size="lg">
            Search Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
