import { createContext, useContext, useState } from "react";

const FilterTypeContext = createContext();

export function FilterTypeContextProvider({ children }) {
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <FilterTypeContext.Provider value={{ typeFilter, setTypeFilter }}>
      {children}
    </FilterTypeContext.Provider>
  );
}

export function useFilterType() {
  return useContext(FilterTypeContext);
}
