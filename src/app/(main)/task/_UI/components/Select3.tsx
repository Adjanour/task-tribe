import { useEffect, useState, FC, ChangeEvent } from 'react';
import { Select, Spin } from 'antd';
import { Priority } from '@/lib/definitions';
const { Option } = Select;

interface TaskStatus extends Priority {
  
  // Add other properties based on your API response
}

interface TaskStatusSelectProps {
  onChange?: (value: number) => void;
  placeholder?: string;
  endpoint?: string;
}

const SelectComponent2: FC<TaskStatusSelectProps> = ({ onChange, placeholder ,endpoint}) => {
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchTaskStatuses = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${endpoint}/`); // Replace with your actual API endpoint
        const data = await response.json();
        setTaskStatuses(data.results); // Assuming the API returns an array of task statuses
      } catch (error) {
        console.error('Error fetching task statuses:', error);
      } finally {
        setFetching(false);
      }
    };

    fetchTaskStatuses();
  }, []);

  const handleStatusChange = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder={placeholder || 'Select Task Status'}
      optionFilterProp="children"
      onChange={handleStatusChange}
      // filterOption={(input, option) =>
      //   option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      // }
      notFoundContent={fetching ? <Spin size="small" /> : null}
    >
      {taskStatuses.map((status) => (
        <Option key={status.priorityId} value={status.priorityId}>
          {status.priorityName}
        </Option>
      ))}
    </Select>
  );
};

export default SelectComponent2;