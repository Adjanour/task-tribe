import React, {useState} from 'react';
import {Modal, Table, Badge, Tooltip, Progress} from 'antd';
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
    yScroll:number;
    pageSize:number;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks,yScroll,pageSize }) => {
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
            render: (text: string, record: Task) => (
                <a onClick={() => handleTaskClick(record.taskId.toString())}>{text}</a>
            ),
            fixed: 'left',
            width: 100,
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'taskUpdateTitle',
            fixed: 'left',
            width: 120,
            align: 'left',
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'taskStatus',
        //     render: (text) => (
        //         <Badge status={text === 'Not Started' ? 'warning' : 'success'} text={text} />
        //     ),
        //     width: 100,
        //     fixed:'left',
        //     align: 'left',
        // },
        {
            title: 'Progress',
            dataIndex: 'taskUpdateProgress',
            width: 150,
            align: 'left',
            key: 'taskProgress',
            render: (progress) => (
                <Progress percent={progress} style={{width:'75%'}} size={[150,25]} format={() => `${progress}%`} showInfo status={getStatus(progress)} />
            ),
        },

        {
            title: 'Created Date',
            dataIndex: 'taskCreatedDate',
            width: 150,
            align: 'left',
            render: (date) => formatDate(date),
        },
        {
            title: 'Updated Date',
            dataIndex: 'taskUpdatedDate',
            width: 150,
            align: 'left',
            render: (date) => formatDate(date),
        },
        {
            title: 'Details',
            dataIndex: 'taskUpdateDescription',
            width: 200,
            ellipsis: true,
            render: (text) => (
                <Tooltip  className="bg-white-500 text-black dark:text-white dark:bg-black" title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },

    ];
    const getStatus = (progress:string) => {
        if (+progress === 100) {
            return 'success';
        } else if (+progress > 70) {
            return 'active';
        } else {
            return 'exception';
        }
    };
    const formatDate = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <>
            <Table<Task>
                onRow={(record) => {
                    return {
                        onClick: () => handleTaskClick(record.taskId.toString()),
                        onChange: () => {
                            setSelectedRowKeys([record.taskId.toString()]);
                        }
                    };
                }}
                className="mb-0"
                key={1}
                size='middle'
                rowSelection={rowSelection}
                dataSource={tasks}
                columns={columns}
                bordered
                pagination={{ pageSize: pageSize }}
                scroll={{ x: '1300',y:yScroll }} />
            <TaskDetailsModal key={5}
                              isVisible={isModalVisible}
                              taskId={selectedTaskId}
                              onClose={handleModalCancel}
            />
        </>
    )

};

export default TaskTable;
