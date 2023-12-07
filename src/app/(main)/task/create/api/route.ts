import type { NextApiResponse } from 'next';
import { zfd } from "zod-form-data";

const schema = zfd.formData({
    task_name: zfd.text(),
    start_date:zfd.text(),
    end_date:zfd.text(),
    assigned_by:zfd.repeatableOfType(zfd.numeric()),
    assigned_to:zfd.repeatableOfType(zfd.numeric()),
    task_status:zfd.numeric(),
    task_priority:zfd.numeric(),
    task_description:zfd.text(),
});
export async function POST(request: Request, {status}: NextApiResponse) {

    try {
        if (request.method !== 'POST') {
            return status(405).json({ error: 'Method Not Allowed' });
        }

        const {
            task_name,
            start_date,
            end_date,
            assigned_by,
            assigned_to,
            task_status,
            task_priority,
            task_description,
        } = schema.parse(await request.formData());

        // Convert Day.js date objects to standard JavaScript Date objects
        const originalStartDate = new Date(start_date);
        const originalEndDate = new Date(end_date);
        const dateWithoutTime2 = new Date(originalStartDate.getFullYear(), originalStartDate.getMonth(), originalStartDate.getDate(), 0, 0, 0, 0);
        const dateWithoutTime = new Date(originalEndDate.getFullYear(), originalEndDate.getMonth(), originalEndDate.getDate(), 0, 0, 0, 0);
        const dateString = start_date.split('T')[0];
        const dateString2 = end_date.split('T')[0];
        console.log(dateWithoutTime)
        const jsStartDate = dateString2
        const jsEndDate = dateString
        console.log(jsStartDate)
        console.log(jsEndDate)
        console.log('hi')

        // Check if it's a multiple task assignment
        if (Array.isArray(assigned_to) && assigned_to.length > 1) {
            // Create a new task
            const taskResponse = await fetch('http://127.0.0.1:8000/api/user/task/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: task_name,
                    taskStartDate: jsStartDate,
                    taskEndDate: jsEndDate,
                    taskStatusId: task_status,
                    taskPriorityId: task_priority,
                    taskDescription: task_description,
                }),
            });

            const taskData = await taskResponse.json();
            console.log(taskData)

            // Loop through assigned_to and create task assignments
            for (const assigneeName of assigned_to) {
                // Fetch the user ID based on the assigneeName, replace with actual logic
                const assigneeId = assigneeName
                const data2 = JSON.stringify({
                    tkaTask: taskData.taskId,
                    tkaAssignee: +assigneeId,
                    tkaAssigner: +assigned_by[0],
                });
                console.log(`datais ${data2}`);
                const response = await fetch('http://127.0.0.1:8000/api/user/tasks/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tkaTask: taskData.taskId,
                        tkaAssignee: +assigneeId,
                        tkaAssigner: +assigned_by[0],
                    }),
                });
                console.log(response)
                if (response.status == 201){
                    status(200).json({ success: true });
                }else{
                    status(500).json({ error: 'Internal Server Error' });
                }
            }


        } else {
            // Handle single task assignment logic here
            // ...
            status(200).json({ success: true });
        }
    } catch (error) {
        console.error('Error creating task:', error);
        status(500).json({ error: 'Internal Server Error' });
    }

}


// // Replace this with actual logic to fetch user ID based on the assigneeName
// async function fetchUserId(assigneeName: string): Promise<number> {
//   // Simulated logic, replace with actual logic to fetch user ID
//   if (assigneeName === 'bernard') {
//     return 1; // Replace with the actual user ID
//   } else {
//     return 2; // Replace with the actual user ID
//   }
// }
