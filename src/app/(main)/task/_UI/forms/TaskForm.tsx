'use client';
import {
    Button,
    Select,
    Textarea,
    TextInput,
    Datepicker,
  } from "flowbite-react";

import GenericTokenEdit from "../components/TokenEdit";

const formFields = [
    {
      name: "start_date",
      type: "Datepicker",
      label: "Starts:",
      required: true,
    },
    {
      name: "end_date",
      type: "Datepicker",
      label: "Ends:",
      required: true,
    },
    {
      name: "task_name",
      type: "TextTextInput",
      label: "Task Name:",
      required: true,
    },
    {
      name: "assigned_by",
      type: "Select",
      label: "Assigner:",
      placeholder: "",
      endpoint: "users",
      required: true,
    },
    {
      name: "assigned_to",
      type: "Select",
      label: "Assignee(s):",
      placeholder: "",
      endpoint: "users",
      required: true,
    },
    {
      name: "task_status",
      type: "Select",
      label: "Status:",
      placeholder: "Select task status...",
      endpoint: "task-status",
      required: true,
    },
    {
      name: "task_priority",
      type: "Select",
      label: "Priority:",
      placeholder: "Select task priority",
      endpoint: "task-priority",
      required: true,
    },
    {
      name: "task_description",
      type: "Textarea",
      label: "Description:",
      required: true,
    },
  ]
  

export default function TaskForm(){

    return(
        // <GeneralForm FormFields={formFields} FormTitle="Task Form" />
        <div className="p-1 bg-white shadow-md rounded-md   dark:bg-black dark:text-white dark:border-[1px]">
        <form>
        <table className="mt-3 mb-1 dark:text-white">
          <tbody>
            <tr>
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label className=" align-middle text-sm font-medium ">
                  Starts:
                </label>
              </td>

              <td>
                
                  <Datepicker style={{ width: "100%" }} />
                
              </td>
              <td className="flex float-right items-center justify-center">
                <label className="block text-sm font-medium">Ends:</label>
              </td>
              <td>
                
                  <Datepicker style={{ width: "100%" }} />
                
              </td>
            </tr>
            <tr>
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label htmlFor="taskName" className="block text-sm font-medium">
                  Task Name:
                </label>
              </td>
              <td colSpan={3}>
                
                
                  <TextInput placeholder="Enter task name" />
              </td>
            </tr>
            <tr className="mt-2">
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label className="items-center justify-center  text-sm font-medium">
                  Assigner:
                </label>
              </td>
              <td colSpan={3}>
                
                  <Select placeholder=""/>
              </td>
            </tr>
            <tr className="mt-2 ">
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Assignee(s):
                </label>
              </td>
              <td colSpan={4}>
                <GenericTokenEdit  dataAlias="" endpoint="" idKey="" name="" otherKey="" selectText="" textKey="" token=""/>
              </td>
            </tr>
            <tr className="mt-2 ">
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Status:
                </label>
              </td>
              <td>
                
                  <Select
                    placeholder="Select task status..."
                  />
                
              </td>
              <td className="flex float-right  items-center justify-center mt-2 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Priority:
                </label>
              </td>
              <td>
                
                  <Select
                    placeholder="Select task priority"
                  />
                  {/* <Select options={[{label:"Kirk",value:"kirk"},{label:"bernard",value:"bernard"}]} mode="multiple"  optionLabelProp="label"/> */}
                
              </td>
            </tr>
            <tr>
              <td className="flex float-right mt-2">
                {" "}
                <label
                  htmlFor="taskDescription"
                  className="block items-center justify-center  text-sm font-medium"
                >
                  Description:
                </label>
              </td>
              <td colSpan={4}>
                
                  <Textarea
                    rows={5}
                    cols={60}
                    className="mt-2 p-1 w-full border rounded-md"
                  />
                
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div className="flex mr-2 mt-2 grid-cols-3 gap-4 float-right">
                  <Button title="Approved" pill>Approved</Button>
                  <Button title="Save" pill>Save</Button>
                  <Button title="New" pill>New</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </form>
        </div>
    )
}