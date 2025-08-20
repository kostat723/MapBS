import React, { useState } from 'react';
import './searchPanel.css';
import { Search, X } from 'lucide-react';

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
        <input 
          className={`search-input ${findedBS}`}
          type="text" 
          placeholder="Название или номер БС..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      
      <div className='search-buttons'>
        <button className="search-btn" onClick={handleSearch}>
          <Search size={16} />
          Найти
        </button>
        <button className="clear-btn" onClick={handleClear}>
          <X size={16} />
          Очистить
        </button>   
      </div>             
    </div>
  );
};

export default SearchPanel;