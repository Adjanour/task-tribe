'use client'
import {Form, Select, Input, Radio, Button, Upload, InputNumber, Slider, Progress} from 'antd';
import GenericTokenEdit from '../components/TokenEdit';
import GenericSelect from '../components/Select';
import ProgressComponents from '../components/Progress';
import {Status, Task} from '../../_lib/definitions';
import React, {useState} from "react";
const { TextArea } = Input;
const { Option } = Select;

export default function TaskProgressUpdateForm () {
  const[percent,setPercent]=useState<number|null>(0)
  const onFinish = (values:any) => {
    // Handle form submission
    console.log('Form submitted with values:', values);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <div  className="bg-white shadow-md mt-2 p-2 w-fit rounded-md">
        <div className="bg-gray-100 rounded-md mb-1  dark:bg-white dark:text-black p-1">
        <p className=" text-2xl">Task Progress Update</p>
      </div>
      
      <Form onFinish={onFinish}>
        <table>
          <tbody>
          <tr className="mb-0">
            <td className="flex float-right  items-center justify-center mt-1 ">
              <label className=" align-middle text-sm font-medium ">
                Task:
              </label>
            </td>
            <td>
              <Form.Item  name="taskName" rules={[{ required: true, message: 'Please select a task' }]} className='mb-1'>
                <GenericSelect<Task>
                    placeholder="Select a task"
                    endpoint="http://localhost:8000/api/user/tasks/"
                    token={null}
                    dataAlias="tasks"
                    name="task"
                    onChange={(value) => console.log(value)}
                    selectText="Select Task..."
                    idKey="taskId"
                    textKey="taskName"
                />
              </Form.Item>
            </td>
            <td className="flex float-right  items-center justify-center mt-1 ">
              <label className=" align-middle text-sm font-medium ">
                Status:
              </label>
            </td>
            <td>
              <Form.Item className="mb-1"  name="currentStatus" rules={[{ required: true, message: 'Please select current status' }]}>
                <GenericSelect<Status>
                    placeholder="Select task status..."
                    endpoint="http://localhost:8000/api/user/task-status/"
                    dataAlias="taskStatuses"
                    token={null}
                    onChange={(value) => console.log(value)}
                    name="task_status"
                    selectText="Select task status..."
                    idKey="statusId"
                    textKey="statusName"
                />
              </Form.Item>
            </td>
          </tr>
          <tr className="mb-0">
            <td className="flex float-right  items-center justify-center mt-1 ">
            <label className=" align-middle text-sm font-medium ">
              Title:
            </label>
          </td>
            <td colSpan={3}>
              <Form.Item className="mb-1"  name="taskUpdateTitle" rules={[{ required: true, message: 'Please enter update title' }]}>
                <Input className="w-full" placeholder="Enter update title" />
              </Form.Item>
            </td>
          </tr>
          <tr className="mb-0"> <td className="flex float-right  items-center justify-center mt-1 ">
            <label className=" align-middle text-sm font-medium ">
              Details:
            </label>
          </td>
            <td colSpan={3}>
              <Form.Item className="mb-1"  name="taskUpdateDescription" rules={[{ required: true, message: 'Please enter task update details' }]}>
                <TextArea rows={4} cols={60}  placeholder="Enter task update details" />
              </Form.Item>
            </td>
          </tr>
          <tr className="mb-0">
            <td className="flex float-right  items-center justify-center mt-1 ">
              <label className=" align-middle text-sm font-medium ">
                Progress:
              </label>
            </td>
            <td>
              <Form.Item className="mb-1"  name="progressPercentage">
                  <InputNumber<number> className="w-full" placeholder="Progress percentage" onChange={(value)=>{setPercent(value)}}/>
              </Form.Item>
            </td>
            <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" align-middle text-sm font-medium ">
                  Type:
                </label>
            </td>
            <td>
              <Form.Item className="mb-1" name="progressType">
                <Select
                    showSearch
                    className="w-full"
                    placeholder="Select update type"
                    options={[{label:'Percentage',value:'percentage'},{label:'Hours',value:'hours'},{label:'Days',value:'days'}]}
                >
                </Select>
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={3}>
              <Form.Item name="progressPercentage2" className="mb-0">
                <Progress percent={percent? percent : 1} />
              </Form.Item>
            </td>
          </tr>
          <tr className="mb-0"> <td className="flex float-right  items-center justify-center mt-1 ">
            <label className=" align-middle text-sm font-medium ">
              Challenge(s):
            </label>
          </td>
            <td colSpan={3}>
              <Form.Item className="mb-1"  name="progressDetails">
                <TextArea rows={4} cols={60} maxLength={6}   placeholder="Describe your progress and any challenges" />
              </Form.Item>
            </td>
          </tr>

          <tr className="mb-0">
            <td colSpan={4}>
              <div className="float-right">
                <Form.Item className="mb-1">
                  <Button type="default" htmlType="submit" className='rounded-md'>Submit</Button>
                </Form.Item>
              </div>
            </td>
          </tr>

          </tbody>
        </table>


      </Form>
    </div>
  );
};

