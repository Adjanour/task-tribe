import React, { useState} from 'react';
import {DatePicker, Form, Input, message, Popover} from "antd";
import {useGetHolidays} from "@/app/(main)/_UI/hooks/useGetHolidays";
import GenericTokenEdit from "@/app/(main)/task/_UI/components/TokenEdit";
import {Priority, Status,  User} from "@/app/(main)/task/_lib/definitions";
import GenericSelect from "@/app/(main)/task/_UI/components/Select";
import ButtonComponent from "@/app/(main)/task/_UI/components/Button";
import TextArea from "antd/es/input/TextArea";
import ModalComponent from "@/app/(main)/_UI/components/ModalComponent";
import {HolidayComponent} from "@/app/(main)/_UI/components/Holiday";

export type Task = {
    taskId: number;
    taskName: string;
    taskDescription: string;
    taskPriority: string;
    taskStatus: string;
    taskStartDate: string;
    taskCreatedDate: string;
    taskEndDate: string;
    taskSlug: string | null;
}
GenericTaskForm.propTypes = {
};

function GenericTaskForm({initialValues}:{initialValues:Task|null}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const initialData = {
        task_name: "Initial Task",
        assigned_by: [3],
        assigned_to: [4],
        task_status: 2,
        task_priority: 2,
        task_description: "This is a task description",
    }

    // Set initial values in the form
    form.setFieldsValue(initialData);
    // Call the function to fetch initial data

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
                        message.success("Tasks created and assigned successfully");
                    } else {
                        message.warning("An error occurred. Please try again.");
                    }
                } else {
                    console.error("Error creating task:", data.error);
                    message.warning("An error occurred. Please try again.");
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

    const [startDate,setStartDate] = useState<String>('12');
    const [endDate,setEndDate] = useState<String>('12');
    const holidays = useGetHolidays(startDate,endDate);
    return (
        <div className="w-fit justify-center align-middle">
            <Form form={form} onFinish={onFinish} className=" dark:text-white">
                <table className="mt-3 mb-1 dark:text-white">
                    <tbody>
                    {holidays.length > 0 && (
                        <tr>
                            <td colSpan={4}>
                                <div className="flex flex-row float-right">
                                    <p className="mt-1">There {holidays.length===1?'is':'are'} {holidays.length} {holidays.length===1?'Holiday':'Holidays'}</p>
                                    <ModalComponent title="Holidays">
                                        <HolidayComponent holidays={holidays}/>
                                    </ModalComponent>
                                </div>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td className="flex float-right  items-center justify-center mt-1 ">
                            <label className=" align-middle text-sm font-medium ">
                                Starts:
                            </label>
                        </td>

                        <td>
                            <Form.Item name="start_date" className="mb-0">
                                <DatePicker style={{ width: "100%" }} onChange={(date,value)=>(setStartDate(value.split('-')[1]))} />
                            </Form.Item>
                        </td>
                        <td className="flex float-right items-center justify-center">
                            {" "}
                            <label className="block text-sm font-medium">Ends:</label>
                        </td>
                        <td>
                            <Form.Item name="end_date" className="mb-0">
                                <DatePicker style={{ width: "100%" }} onChange={(value,date)=>{setEndDate(date)}} />
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
                                <GenericTokenEdit<User>
                                    placeholder=""
                                    endpoint="http://localhost:8000/api/user/users/"
                                    dataAlias="taskStatuses"
                                    token={null}
                                    onChange={(value) => console.log(value)}
                                    name="task_status"
                                    selectText="Select Assigner..."
                                    idKey="id"
                                    textKey="first_name"
                                    otherKey="last_name"/>
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
                                <GenericTokenEdit<User>
                                    placeholder=""
                                    endpoint="http://localhost:8000/api/user/users/"
                                    dataAlias="taskStatuses"
                                    token={null}
                                    onChange={(value) => console.log(value)}
                                    name="task_status"
                                    selectText="Select Assignee(s)..."
                                    idKey="id"
                                    textKey="first_name"
                                    otherKey="last_name"/>
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
                                name="taskStatus"
                                className="mb-0"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a task status",
                                    },
                                ]}
                            >
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
                        <td className="flex float-right  items-center justify-center mt-1 ">
                            <label className=" items-center justify-center block text-sm font-medium">
                                Priority:
                            </label>
                        </td>
                        <td>
                            <Form.Item
                                name="taskPriority"
                                className="mb-0"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a task priority",
                                    },
                                ]}
                            >
                                <GenericSelect<Priority>
                                    placeholder="Select task priority"
                                    endpoint="http://localhost:8000/api/user/task-priority/"
                                    dataAlias="taskPriorities"
                                    token={null}
                                    onChange={(value) => console.log(value)}
                                    name="task_priority"
                                    selectText="Select task priority..."
                                    idKey="priorityId"
                                    textKey="priorityName"
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
                                name="taskD

                                escription"
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
}

export default GenericTaskForm;