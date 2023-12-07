"use client";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useState } from "react";

const { Option } = Select;

const TaskUpdateForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (formData: any) => {
    try {
      setLoading(true);

      // Simulate form submission logic
      console.log("Form data submitted:", formData);

      // Simulate a successful submission
      message.success("Task update submitted successfully!");
    } catch (error) {
      console.error("Error submitting task update:", error);
      message.error(
        "An error occurred while submitting the task update. Please try again."
      );
    } finally {
      setLoading(false);
      // Reset the form fields after submission
      form.resetFields();
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="updateTitle"
          label="Update Title"
          rules={[{ required: true, message: "Please enter the update title" }]}
        >
          <Input placeholder="Enter update title" />
        </Form.Item>

        <Form.Item
          name="updateDescription"
          label="Update Description"
          rules={[
            { required: true, message: "Please enter the update description" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter update description" />
        </Form.Item>

        <Form.Item
          name="updateDate"
          label="Update Date"
          rules={[{ required: true, message: "Please select the update date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="updateStatus"
          label="Update Status"
          rules={[
            { required: true, message: "Please select the update status" },
          ]}
        >
          <Select placeholder="Select update status">
            <Option value="in-progress">In Progress</Option>
            <Option value="completed">Completed</Option>
            <Option value="on-hold">On Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskUpdateForm;
