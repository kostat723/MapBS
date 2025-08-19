import React, { useState } from 'react';
import './searchPanel.css'

function SearchPanel ({ onSearch }) {
  const [searchValue, setSearchValue] = useState("")


  return (
    <div className="searchBS">
        <h3>Поисковик по БС</h3>
         <input type="text" placeholder={"Name or number of BS:"} value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} /> 
        <div className='buttons'>
            <button onClick={() => onSearch(searchValue)}>Поиск</button>
            <button onClick={() => setSearchValue("")}>Очистить</button>   
        </div>             
    </div>
  );
};

export default SearchPanel;