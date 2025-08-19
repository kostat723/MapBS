import React, { useState } from 'react';

const SearchPanel = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("1001")


  return (
    <div className="searchBS">
         <p>
            <label>Name or number of BS: </label> 
            <input type="text" defaultValue={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} /> 
        </p>
        <button onClick={() => onSearch(searchValue)}>Поиск</button>
        <button onClick={() => setSearchValue("")}>Очистить</button>        
    </div>
  );
};

export default SearchPanel;