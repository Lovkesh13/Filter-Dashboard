import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FilterState } from '../components/Dashboard'; // Import only FilterState type
import { initialFilters } from '../components/Dashboard'; // Import value normally

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Load filters from localStorage on initial load
    const savedFilters = localStorage.getItem('dashboardFilters');
    return savedFilters ? JSON.parse(savedFilters) : initialFilters;
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  }, [filters]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}; 