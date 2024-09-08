import React from "react";

interface SearchBoxProps {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    handleSearchChange: () => void,
}

const SearchBox: React.FC<SearchBoxProps> = ({
    searchQuery, 
    setSearchQuery, 
    handleSearchChange
}) => {
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
          event.preventDefault();
          handleSearchChange();
        }
    }

    return (
        <div className='flex w-full'>
            <input
                className='max-w-[75%] px-4 pt-2 pb-3 border-l border-t border-b border-solid rounded-l-lg border-neutral-300 focus-visible:outline-blue-800'
                id="search-input"
                value={searchQuery}
                type="text"
                onChange={(event) => {setSearchQuery(event.target.value)}} 
                onKeyDown={handleKeyPress}
                placeholder='Search by location' 
                aria-label='Search' 
                aria-describedby='search-addon'
            />
            <button onClick={handleSearchChange} 
                className='bg-white hover:bg-neutral-200 pt-2 pb-3 px-3 border-t border-b border-r border-solid rounded-r-lg h-full' 
                id='search-addon' 
                style={{border: '0.8px solid rgb(222, 226, 230)'}}
                type="button"
            >
                <i className='fas fa-search'></i>
            </button>
        </div>
    )
};

export default SearchBox;