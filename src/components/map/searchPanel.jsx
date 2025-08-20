import React, { useState } from 'react';
import './searchPanel.css';
import { Search, X } from 'lucide-react';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';


function SearchPanel({ onSearch, findedBS }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchBS">
      <div className="search-header">
        <Search size={18} />
        <h3>Поиск БС</h3>
      </div>
      
      <div className="search-input-container">
        <Input 
          className={`search-input ${findedBS}`}
          type="text" 
          placeholder="Название или номер БС..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      
      <div className='search-buttons'>
        <Button className="search-btn" icon={Search} onClick={handleSearch}>
          Найти
        </Button>
        <Button className="clear-btn" icon={X} onClick={handleClear}>
          Очистить
        </Button>   
      </div>           
    </div>
  );
};

export default SearchPanel;