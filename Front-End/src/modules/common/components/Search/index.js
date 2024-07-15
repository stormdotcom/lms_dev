import React from "react";
import { SearchIcon } from "../../../../common/components/Icons";

const Search = () => {
  return (
    <div className="flex items-center space-x-2 xs:space-x-0 border border-gray-300 rounded-full p-2 xs:p-1 bg-white shadow-sm cursor-pointer ">
      <SearchIcon className="h-6 w-6 text-gray-500 xs:h-4 xs:w-4" />
      <input
        type="text"
        placeholder="Search anything"
        className="outline-none flex-grow px-2 text-gray-700 xs:h-4 xs:px-0 sm:text-sm"
      />
    </div>
  );
};

export default Search;
