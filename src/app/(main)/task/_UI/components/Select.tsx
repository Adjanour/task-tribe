import React from 'react';
import { Select, Spin } from 'antd';
import { useGetData } from '../../../_UI/hooks/useGetData';

const { Option } = Select;

interface GenericSelectProps<T> {
  dataAlias: string;
  endpoint: string;
  token: string | null;
  placeholder?: string;
  onChange?: (value: string) => void;
  name:string;
  selectText: string;
  idKey: string; // Key for the option's ID
  textKey: string; // Key for the option's text
}

const GenericSelect = <T extends Record<string,any>> ({
  dataAlias,
  endpoint,
  token,
  placeholder = 'Select',
  idKey,
  textKey,
  onChange,
}: GenericSelectProps<T>) => {
  const { data, refetchData, isLoading, error } = useGetData({
    dataAlias,
    endpoint,
    token: token,
  });

  const handleSelectChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      showSearch
      className="w-full"
      placeholder={placeholder}
      loading={isLoading}
      onChange={handleSelectChange}
      onDropdownVisibleChange={(open) => open && refetchData()}
    >
      {data?.map((item: T,key:string) => (
        <Option key={key} value={item[idKey]}>
          {item[textKey]} 
        </Option>
      ))}
    </Select>
  );
};

export default GenericSelect;
