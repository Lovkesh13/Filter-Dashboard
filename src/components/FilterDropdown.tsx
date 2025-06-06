import React, { useMemo } from 'react';
import type { MenuListProps } from 'react-select';
import type { GroupBase } from 'react-select';
import Select from 'react-select';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';

interface FilterDropdownProps {
  label: string;
  options: number[];
  selected: number[];
  onChange: (selected: number[]) => void;
}

// Custom MenuList component using react-window for virtualization
const MenuList = (props: MenuListProps<any, true, GroupBase<any>>) => {
  const { children, maxHeight } = props;

  const optionHeight = 35;
  const childrenArray = React.Children.toArray(children);

  return (
    <List
      height={maxHeight}
      itemCount={childrenArray.length}
      itemSize={optionHeight}
      width="100%"
    >
      {({ index, style }: ListChildComponentProps<any>) => {
        const child = childrenArray[index] as React.ReactElement<any>;
        return React.cloneElement(child, {
          innerProps: {
            ...(child.props.innerProps as object),
            style: { ...child.props.innerProps?.style, ...style },
          },
        });
      }}
    </List>
  );
};

// The main FilterDropdown component
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
        maxMenuHeight={300}
        menuPlacement="auto"
        getOptionValue={(option) => String(option.value)}
        getOptionLabel={(option) => option.label}
        styles={{
          control: (base) => ({
            ...base,
            border: '1px solid #ddd',
            borderRadius: 4,
            boxShadow: 'none',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: '300px', 
          }),
        }}
        components={{
          MenuList: MenuList,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default React.memo(FilterDropdown); 