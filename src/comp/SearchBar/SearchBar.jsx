
import React from 'react';


function SearchBar({ onSearchHandler, filterText, setFilterText }) {
    const handleChange = (e) => {
      const { value } = e.target;
      setFilterText(value);
      onSearchHandler(value);
    };
  
    const handleClear = () => {
      setFilterText('');
      onSearchHandler('');
    };
  
    return (
      <div className='searchbar'>
        <input 
          type="text" 
          value={filterText} 
          onChange={handleChange} 
          placeholder="Search..."
        />
        <button className='btn' onClick={handleClear}>Clear</button>
      </div>
    );
  }

export default SearchBar;

