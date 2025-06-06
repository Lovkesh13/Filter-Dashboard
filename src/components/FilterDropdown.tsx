import React, { useMemo } from 'react';
import Select from 'react-select';

interface FilterDropdownProps {
  label: string;
  options: number[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, selected, onChange }) => {
  const selectOptions = useMemo(() => 
    options.map((opt) => ({ value: opt, label: String(opt) })),
    [options]
  );

  const selectedOptions = useMemo(() => 
    selectOptions.filter((opt) => selected.includes(opt.value)),
    [selectOptions, selected]
  );

  const handleChange = useMemo(() => 
    (vals: any) => onChange(vals.map((v: any) => v.value)),
    [onChange]
  );

  return (
    <div style={{ minWidth: 150, margin: '10px' }}>
      <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>{label}</label>
      <Select
        isMulti
        options={selectOptions}
        value={selectedOptions}
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder={`Select ${label}`}
        styles={{
          control: (base) => ({
            ...base,
            border: '1px solid #ddd',
            borderRadius: 4,
            boxShadow: 'none',
          }),
        }}
      />
    </div>
  );
};

export default React.memo(FilterDropdown); 