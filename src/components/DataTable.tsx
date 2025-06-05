import React, { useState } from 'react';
import type { NumberRow } from './Dashboard';

interface DataTableProps {
  data: NumberRow[];
}

const ROWS_PER_PAGE = 100;
const VISIBLE_ROWS = 20;

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / ROWS_PER_PAGE));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const paginatedData = data.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ maxHeight: 500, overflowY: 'auto', boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'inherit' }}>
          <thead>
            <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
              <th>Value</th>
              <th>mod 350</th>
              <th>mod 8000</th>
              <th>mod 20002</th>
            </tr>
          </thead>
          <tbody style={{ display: 'table', maxHeight: 400, overflowY: 'auto' }}>
            {paginatedData.slice(0, VISIBLE_ROWS).map((row) => (
              <tr key={row.number} style={{ display: 'table', width: '100%', tableLayout: 'fixed'}}>
                <td>{row.number}</td>
                <td>{row.mod350}</td>
                <td>{row.mod8000}</td>
                <td>{row.mod20002}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 8 }}>
        <button 
          onClick={() => setPage((p) => Math.max(1, p - 1))} 
          disabled={page === 1}
          style={{ padding: '5px 10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages} ({data.length} total rows)
        </span>
        <button 
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))} 
          disabled={page === totalPages}
          style={{ padding: '5px 10px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable; 