// TaskDetailsModal.tsx
import React from 'react';
import { Modal } from 'antd';
import {useGetData} from "@/app/(main)/_UI/hooks/useGetData";
import GenericTaskForm from "@/app/(main)/task/_UI/forms/GenericTaskForm";

interface TaskDetailsModalProps {
    isVisible: boolean;
    taskId: string;
    onClose: () => void;
    // Add other props as needed
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isVisible, taskId, onClose }) => {
    const{data}=useGetData({dataAlias:"taskdetails",endpoint:`http://localhost:8000/api/user/task/details/${taskId}`,token:""})
    return (
        <Modal className="w-fit" width={600} title="Task Details" open={isVisible} onCancel={onClose} footer={null}>
            <GenericTaskForm initialValues={data}/>
        </Modal>
    );
};

export default TaskDetailsModal;
