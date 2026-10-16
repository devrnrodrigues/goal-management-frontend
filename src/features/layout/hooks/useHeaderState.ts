import { useState } from 'react';
import type { ChangeEvent } from 'react';

export const useHeaderState = (initialSearch = '') => {
  const [searchValue, setSearchValue] = useState(initialSearch);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return {
    searchValue,
    handleSearchChange,
    handleClearSearch,
  };
};
