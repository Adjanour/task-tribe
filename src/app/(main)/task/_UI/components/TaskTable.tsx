import React, {useState} from 'react';
import {Modal, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {TableRowSelection} from "antd/es/table/interface";
import Link from "next/link";
import TaskDetailsModal from "@/app/(main)/task/_UI/components/TaskDetailsModal";

export type Task = {
    key:React.Key;
    taskId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: string;
    taskStatus: string;
    tkaAssignerId: number;
    taskStartDate: string;
    taskCreatedDate: string;
    taskEndDate: string;
    assignerFullName: string;
    tkaAssigneeId: number;
    tkaId: number;
    tkaTaskId: number;
    fullName: string;
    taskDuration: number;
    taskProgress: string;
    taskSlug: string | null;
}
interface TaskTableProps {
    tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string>(''); // Track the selected task ID
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const handleTaskClick = (taskId: string) => {
        setSelectedTaskId(taskId);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedTaskId('');
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {

        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection: TableRowSelection<Task> = {
        selectedRowKeys,
        onChange: onSelectChange,

        // onSelect: (record:Task)=>{handleTaskClick(record.taskId.toString())},
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'select odd rows',
                onSelect: (changeableRowkeys) => {
                    let newRowKeys = []
                    newRowKeys = changeableRowkeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false
                        }
                        return true
                    });
                    setSelectedRowKeys(newRowKeys)
                }
            },
            {
                key: 'even',
                text: 'select even rows',
                onSelect: (changeableRowkeys) => {
                    let newRowKeys = []
                    newRowKeys = changeableRowkeys.filter((_, index) => {
                        if (index % 2 === 0) {
                            return false
                        }
                        return true
                    });
                    setSelectedRowKeys(newRowKeys)
                }
            }
        ],
    };
    const columns: ColumnsType<Task> = [
        {
            title: 'ID',
            dataIndex: 'taskId',
            render: (text: string) => <a onClick={() => handleTaskClick(text)}>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'taskName',
        },
        {

            title: 'Description',
            dataIndex: 'taskDescription',
        },
        {
            title: 'Status',
            dataIndex: 'taskStatus',

        },
        {
            title: 'Assigned To',
            dataIndex: 'fullName',
        },
        {
            title: 'Assigned By',
            dataIndex: 'AssignerFullName',
        }

    ];

    return (
        <div>
            <Table key={1} rowSelection={rowSelection} dataSource={tasks} columns={columns}/>
            <TaskDetailsModal key={5}
                isVisible={isModalVisible}
                taskId={selectedTaskId}
                onClose={handleModalCancel}
            />
        </div>
    )

};

export default TaskTable;
