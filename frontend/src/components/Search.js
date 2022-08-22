import React from 'react';
import { Input } from 'antd';

const { Search: AntdSearch } = Input;
const Search = ({ placeholder, onSearch, style }) => {
  return (
    <AntdSearch
      placeholder={placeholder}
      onSearch={onSearch}
      style={{ width: 400, ...style }}
    />
  );
};

export default Search;
