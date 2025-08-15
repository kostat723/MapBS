import React, { useState } from 'react';
import { Search, MapPin, Radio } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SearchPanelProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch, onClearSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClearSearch();
  };

  return (
    <Card className="absolute top-4 left-4 z-10 p-4 bg-search-bg backdrop-blur-sm border-border/50 shadow-elevated min-w-80">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Radio className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Поиск базовых станций</h2>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Адрес или номер БС..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-all duration-200"
              disabled={!query.trim()}
            >
              <Search className="h-4 w-4 mr-2" />
              Найти
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClear}
              className="border-border/50 hover:bg-accent/50"
            >
              Очистить
            </Button>
          </div>
        </form>
        
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4" />
            <span>Примеры поиска:</span>
          </div>
          <ul className="space-y-1 ml-6 text-xs">
            <li>• БС001, БС002</li>
            <li>• Москва, Красная площадь</li>
            <li>• ул. Тверская, 1</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default SearchPanel;