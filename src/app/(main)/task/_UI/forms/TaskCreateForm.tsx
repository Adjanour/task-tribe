"use client";
import ButtonComponent from "@/app/(main)/task/_UI/components/Button";
import {useGetHolidays} from "@/app/(main)/_UI/hooks/useGetHolidays"
import React, { useState } from "react";
import {Form, Input, DatePicker, message, Popover} from "antd";
const {TextArea} = Input;

import SelectEdit from "@/app/(main)/task/_UI/components/SimplifiedGenericTextEdit";

import {HolidayComponent} from "@/app/(main)/_UI/components/Holiday";
import {fetchTaskPriorities, fetchTaskStatuses, fetchUsers} from "@/app/(main)/task/_lib/dataFetchers";
import {useTaskAPI} from "@/app/(main)/_UI/hooks/useTaskAPI";
import {TaskPostData} from "@/app/(main)/task/_lib/definitions";



const re = () => {

}

export const TaskCreateForm = ({refetchData = re}: {refetchData: any} ) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const {createAndAssignTask}=useTaskAPI()
  const onFinish = async (formData: any) => {
    try {
      setLoading(true);

      console.log(formData);

      const response = await createAndAssignTask(formData);
      console.log(response)
      if (response) {
        message.success("Form submitted successfully!");
        if (response === "201") {
          message.success("Tasks created and assigned successfully");
        } else {
          message.warning("An error occurred. Please try again.");
        }
      } else {
        console.error("Error creating task ");
        message.warning("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error creating task :", error);
    } finally {
      refetchData();
      setLoading(false);
    }
  };
  const handleClearForm = () => {
    // Reset form fields to their initial state
    form.resetFields();
  };

  const [startDate,setStartDate] = useState<string>('12');
  const [endDate,setEndDate] = useState<string>('12');
  const holidays = useGetHolidays(startDate,endDate);
  return (
      <Form form={form} onFinish={onFinish} className="m-auto dark:text-white w-full">
        <table className=" mb-1 dark:text-white w-full">
          <tbody>
          {
              <tr>
                <td colSpan={4}>
                  <div className="flex flex-row float-right">
                    <Popover content={<HolidayComponent holidays={holidays}/>}>
                     <a> <p className="mt-1 text-blue-300">There {holidays.length===1?'is':'are'} {holidays.length} {holidays.length===1?'Holiday':'Holidays'}</p></a>
                    </Popover>
                  </div>
                </td>
              </tr>
          }
            <tr>
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" align-middle text-sm font-medium ">
                  Starts:
                </label>
              </td>

              <td className="w-full">
                <Form.Item name="taskStartDate" className="mb-0">
                  <DatePicker className="w-full" format="dddd,MMMM YYYY hh:mm a" onChange={(date,value)=>(setStartDate(value.split('-')[1]))} />
                </Form.Item>
              </td>
              <td className="flex float-right items-center justify-center">
                {" "}
                <label className="block text-sm font-medium">Ends:</label>
              </td>
              <td>
                <Form.Item name="taskEndDate" className="mb-0 w-full">
                  <DatePicker className="w-full" format="dddd,MMMM YYYY" onChange={(value,date)=>{setEndDate(date)}} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label htmlFor="taskName" className="block text-sm font-medium">
                  Task Name:
                </label>
              </td>
              <td colSpan={3}>
                <Form.Item
                  name="taskName"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the task name",
                    },
                  ]}
                >
                  <Input placeholder="Enter task name" />
                </Form.Item>
              </td>
            </tr>
            <tr className="mt-2">
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className="items-center justify-center  text-sm font-medium">
                  Assigner:
                </label>
              </td>
              <td colSpan={3}>
                <Form.Item
                  name="assignedBy"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select an assigner",
                    },
                  ]}
                >
                  {/*<DebounceSelect<UserValue>*/}
                  {/*    mode="multiple"*/}
                  {/*    value={value}*/}
                  {/*    placeholder="Select users"*/}
                  {/*    fetchOptions={fetchUsers}*/}
                  {/*    onChange={(newValue) => {*/}
                  {/*      setValue(newValue as UserValue[]);*/}
                  {/*    }}*/}
                  {/*    style={{ width: '100%' }}*/}
                  {/*/>*/}
                  <SelectEdit mode="single"  placeholder="Select assigner" fetchOptions={fetchUsers}/>
                </Form.Item>
              </td>
            </tr>
            <tr className="mt-2 ">
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Assignee(s):
                </label>
              </td>
              <td colSpan={4}>
                <Form.Item
                  name="assignedTo"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select an assignee",
                    },
                  ]}
                >
                  <SelectEdit mode="multiple" placeholder="Select assignee(s)" fetchOptions={fetchUsers}/>
                </Form.Item>
              </td>
            </tr>
            <tr className="mt-2 ">
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Status:
                </label>
              </td>
              <td>
                <Form.Item
                  name="taskStatusId"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select a task status",
                    },
                  ]}
                >
                  <SelectEdit placeholder="Select Status" fetchOptions={fetchTaskStatuses}/>
                </Form.Item>
              </td>
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Priority:
                </label>
              </td>
              <td>
                <Form.Item
                  name="taskPriorityId"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select a task priority",
                    },
                  ]}
                >
                  <SelectEdit  placeholder="Select Priority" fetchOptions={fetchTaskPriorities}/>

                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className="flex float-right mt-2">
                <label
                  htmlFor="taskDescription"
                  className="block items-center justify-center  text-sm font-medium"
                >
                  Description:
                </label>
              </td>
              <td colSpan={4}>
                <Form.Item
                  name="taskDescription"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the task description",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    cols={40}
                    className="mt-1 p-1  border rounded-md"
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div className="flex mr-2 mt-2 grid-cols-3 gap-4 float-right">
                  <ButtonComponent text="Approved" formAction="" />
                  <Form.Item>
                    <ButtonComponent text="Save" loading={loading} />
                  </Form.Item>
                  <ButtonComponent text="New" onClick={handleClearForm} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
  );
};
