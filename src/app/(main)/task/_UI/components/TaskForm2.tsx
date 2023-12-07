"use client";
import TokenEdit from "@/components/TokenEdit";
import { useState, useEffect } from "react";
import { Form, Input, DatePicker, message } from "antd";
import SelectComponent from "@/components/Select";
import SelectComponent2 from "@/components/Select3";
import ButtonComponent from "@/components/Button";
import { TextArea } from "@/components/TextArea";

export const TaskForm2 = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulating fetching initial data (e.g., from an API)
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Simulating an asynchronous operation (e.g., fetching initial data from a server)
        const initialData = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              task_name: "Initial Task",
              task_description: "This is a task description",
            });
          }, 1000);
        });

        // Set initial values in the form
        form.setFieldsValue(initialData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        message.error(
          "An error occurred while fetching initial data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch initial data
    fetchInitialData();
  }, [form]);
  const onFinish = async (formData: any) => {
    try {
      setLoading(true);

      // Simulating an error for demonstration purposes
      if (formData.task_name === "invalid") {
        message.error("Invalid task name. Please enter a valid name.");
        return;
      }
      console.log(formData);
      // Actual form submission logic
      try {
        const response = await fetch("/api/createTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        });

        const data = await response.json();

        if (response.ok) {
          message.success("Form submitted successfully!");
          if (data.success === true) {
            message.success("Taks created and assigned successfully");
          } else {
            message.warning("An error occured. Please try again.");
          }
        } else {
          console.error("Error creating task:", data.error);
          message.warning("An error occured. Please try again.");
        }
      } catch (error) {
        console.error("Error creating task:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleClearForm = () => {
    // Reset form fields to their initial state
    form.resetFields();
  };

  return (
    <div className="  p-1 bg-white shadow-md rounded-md w-fit  dark:bg-black dark:text-white dark:border-[1px]">
      <div className="bg-gray-200 rounded-md mb-1  dark:bg-white dark:text-black">
        <p className=" text-2xl">TaskDetails</p>
      </div>
      <Form form={form} onFinish={onFinish} className="m-auto dark:text-white">
        <table className="mt-3 mb-1 dark:text-white">
          <tbody>
            <tr>
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" align-middle text-sm font-medium ">
                  Starts:
                </label>
              </td>

              <td>
                <Form.Item name="start_date" className="mb-0">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </td>
              <td className="flex float-right items-center justify-center">
                {" "}
                <label className="block text-sm font-medium">Ends:</label>
              </td>
              <td>
                <Form.Item name="end_date" className="mb-0">
                  <DatePicker style={{ width: "100%" }} />
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
                  name="task_name"
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
                  name="assigned_by"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select an assigner",
                    },
                  ]}
                >
                  <TokenEdit placeholder="" endpoint="users" />
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
                  name="assigned_to"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select an assignee",
                    },
                  ]}
                >
                  <TokenEdit placeholder="" endpoint="users" />
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
                  name="task_status"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select a task status",
                    },
                  ]}
                >
                  <SelectComponent
                    placeholder="Select task status..."
                    endpoint="task-status"
                  />
                </Form.Item>
              </td>
              <td className="flex float-right  items-center justify-center mt-1 ">
                <label className=" items-center justify-center block text-sm font-medium">
                  Priority:
                </label>
              </td>
              <td>
                <Form.Item
                  name="task_priority"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Please select a task priority",
                    },
                  ]}
                >
                  <SelectComponent2
                    placeholder="Select task priority"
                    endpoint="task-priority"
                  />
                  {/* <Select options={[{label:"Kirk",value:"kirk"},{label:"bernard",value:"bernard"}]} mode="multiple"  optionLabelProp="label"/> */}
                </Form.Item>
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
                <Form.Item
                  name="task_description"
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
                    cols={60}
                    className="mt-1 p-1 w-full border rounded-md"
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
    </div>
  );
};
