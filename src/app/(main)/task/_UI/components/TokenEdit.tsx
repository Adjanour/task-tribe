
'use client';
// import { User } from '../../_lib/definitions';
import { useEffect, useState, FC } from 'react';
import {Select,  Spin } from 'antd';

// const { Option } = Select;

// interface UsersSelectProps {
//   onChange?: (value: number) => void;
//   placeholder?: string;
//   endpoint?: string;
// }

// const TokenEdit: FC<UsersSelectProps> = ({ onChange, placeholder, endpoint }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/user/${endpoint}/`);
//         const data = await response.json();
//         setUsers(data.results);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchUsers();
//   }, [endpoint]);

//   const handleStatusChange = (value: number) => {
//     if (onChange) {
//       onChange(value);
//     }
//   };

//   return (
//     <Select
//     mode='multiple'
//       showSearch
//       style={{ width: '100%' }}
//       placeholder={placeholder || 'Select users'}
//       notFoundContent={fetching ? <Spin size="small" /> : null}
//       onChange={handleStatusChange}
//     >
//       {users?.map((user) => (
//         <Option key={user.id} value={user.id}>
//           {`${user.first_name} ${user.last_name}`}
//         </Option>
//       ))}
//     </Select>
//   );
// };

// export default TokenEdit;

import { useGetData } from '../../../_UI/hooks/useGetData';
const {Option} = Select;

interface GenericSelectProps<T> {
  dataAlias: string;
  endpoint: string;
  token: string | null;
  placeholder?: string;
  onChange?: (value: number) => void;
  name:string;
  selectText: string;
  idKey: string; // Key for the option's ID
  textKey: string; // Key for the option's text
  otherKey:string ;
}

const GenericTokenEdit = <T extends Record<string,any>> ({
  dataAlias,
  endpoint,
  token,
  placeholder = 'Select',
  idKey,
  textKey,
  otherKey ='',
  onChange,
}: GenericSelectProps<T>) => {
  const { data, refetchData, isLoading, error } = useGetData({
    dataAlias,
    endpoint,
    token: token,
  });
  const [fetching, setFetching] = useState(true);
  const handleSelectChange = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      mode='multiple'
      showSearch
      style={{ width: '100%' }}
      placeholder={placeholder || 'Select users'}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      loading={isLoading}
      onChange={handleSelectChange}
      onDropdownVisibleChange={(open) => open && refetchData()}
    >
      {data?.map((item: T,key:string) => (
        <Option key={key} value={item[idKey]}>
          {item[textKey]} {item[otherKey]}
        </Option>
      ))}
    </Select>
  );
};

export default GenericTokenEdit;
