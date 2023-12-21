"use client";
import React from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const TaskManagementForm = () => {
    const onFinish = (values:any) => {
        console.log('Form values:', values);
        // Handle form submission logic here
    };

    return (
        <Form onFinish={onFinish} layout="vertical">
            {/* Task Details Section */}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Task Name"
                        name="taskName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the task name',
                            },
                        ]}
                    >
                        <Input placeholder="Enter task name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Start Date"
                        name="taskStartDate"
                        rules={[
                            {
                                required: true,
                                message: 'Please select the start date',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            {/* Assignee Information Section */}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Assigner"
                        name="assignedBy"
                        rules={[
                            {
                                required: true,
                                message: 'Please select an assigner',
                            },
                        ]}
                    >
                        <Select placeholder="Select assigner">
                            {/* Options for assigner */}
                            <Option value="user1">User 1</Option>
                            <Option value="user2">User 2</Option>
                            {/* Add more options as needed */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Assignee(s)"
                        name="assignedTo"
                        rules={[
                            {
                                required: true,
                                message: 'Please select an assignee',
                            },
                        ]}
                    >
                        <Select mode="multiple" placeholder="Select assignee(s)">
                            {/* Options for assignees */}
                            <Option value="user1">User 1</Option>
                            <Option value="user2">User 2</Option>
                            {/* Add more options as needed */}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            {/* Task Status and Priority Section */}
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Task Status"
                        name="taskStatusId"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a task status',
                            },
                        ]}
                    >
                        <Select placeholder="Select Status">
                            {/* Options for task statuses */}
                            <Option value="pending">Pending</Option>
                            <Option value="inProgress">In Progress</Option>
                            <Option value="completed">Completed</Option>
                            {/* Add more options as needed */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Priority"
                        name="taskPriorityId"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a task priority',
                            },
                        ]}
                    >
                        <Select placeholder="Select Priority">
                            {/* Options for task priorities */}
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                            {/* Add more options as needed */}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            {/* Task Description Section */}
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        label="Description"
                        name="taskDescription"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the task description',
                            },
                        ]}
                    >
                        <TextArea rows={5} placeholder="Enter task description" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Additional Task Section */}
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="Additional Task" name="additionalTask">
                        <Input placeholder="Enter additional task" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Submit Button */}
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default TaskManagementForm;
