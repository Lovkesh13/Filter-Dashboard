import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import DataTable from './DataTable';
import FilterDropdown from './FilterDropdown';
import { useFilters } from '../contexts/FilterContext';
import ErrorBoundary from './ErrorBoundary';

export interface NumberRow {
  number: number;
  mod350: number;
  mod8000: number;
  mod20002: number;
}

const moduloColumns = [
  { key: 'mod350', label: 'Modulo 350', values: [0, 1, 2] as number[] },
  { key: 'mod8000', label: 'Modulo 8000', values: [0, 1, 2, 3] as number[] },
  { key: 'mod20002', label: 'Modulo 20002', values: [0, 1, 2, 3, 4] as number[] },
] as const;

export type ModKey = typeof moduloColumns[number]['key'];

export type FilterState = {
  [K in ModKey]: number[];
};

export const initialFilters: FilterState = {
  mod350: [],
  mod8000: [],
  mod20002: [],
};

const Dashboard: React.FC = () => {
  const { filters, setFilters } = useFilters();
  const [data, setData] = useState<NumberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    console.log('Attempting to load dataset...');
    fetch('/data/dataset_large.csv')
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((csvText) => {
        console.log('CSV text length:', csvText.length);
        console.log('First 100 characters:', csvText.substring(0, 100));
        
        Papa.parse<NumberRow>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('Parse results:', {
              dataLength: results.data.length,
              errors: results.errors,
              meta: results.meta
            });
            
            if (results.errors.length > 0) {
              console.error('CSV parsing errors:', results.errors);
              setError('Error parsing CSV data');
              return;
            }
            
            const validData = results.data.filter(row => 
              !isNaN(row.number) && 
              !isNaN(row.mod350) && 
              !isNaN(row.mod8000) && 
              !isNaN(row.mod20002)
            ) as NumberRow[];
            
            console.log(`Loaded ${validData.length} valid rows`);
            if (validData.length === 0) {
              console.log('Sample of invalid data:', results.data.slice(0, 5));
            }
            setData(validData);
            setLoading(false);
          },
          error: (error: Error) => {
            console.error('CSV parsing error:', error);
            setError('Error parsing CSV data');
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setError('Error loading data file');
        setLoading(false);
      });
  }, []);

  // Compute filtered data based on all filters
  const filteredData = useMemo(() =>
    data.filter((row) =>
      moduloColumns.every((col) =>
        filters[col.key].length === 0 || filters[col.key].includes(row[col.key])
      )
    ),
    [data, filters]
  );

  // For each filter, compute the available options based on other filters
  const filterOptions: Record<ModKey, number[]> = useMemo(() => {
    const options: Record<ModKey, number[]> = {
      mod350: [],
      mod8000: [],
      mod20002: [],
    };
    
    moduloColumns.forEach((col) => {
      // Get all unique values for this column from the entire dataset
      const uniqueValues = Array.from(new Set(data.map((row) => row[col.key])))
        .filter((val): val is number => typeof val === 'number' && !isNaN(val))
        .sort((a, b) => a - b);
      
      options[col.key] = uniqueValues;
    });
    
    return options;
  }, [data]);

  if (loading) return <div className="loading-message">Loading data...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (data.length === 0) return <div className="no-data-message">No data available</div>;

  return (
    <div className="dashboard-container">
      <h1>Number Modulo Dashboard</h1>
      <div className="filters-row">
        {moduloColumns.map((col) => (
          <ErrorBoundary key={col.key} fallback={<div>Error loading filter {col.label}</div>}>
            <FilterDropdown
              label={col.label}
              options={filterOptions[col.key]}
              selected={filters[col.key]}
              onChange={(selected) => setFilters((f: FilterState) => ({ ...f, [col.key]: selected }))}
            />
          </ErrorBoundary>
        ))}
      </div>
      <ErrorBoundary fallback={<div>Error loading data table</div>}>
        <DataTable data={filteredData} />
      </ErrorBoundary>
    </div>
  );
};

export default Dashboard;