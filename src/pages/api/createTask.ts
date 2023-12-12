import type { NextApiRequest, NextApiResponse } from 'next';
import {SelectComponentData} from "@/app/(main)/task/_lib/definitions";

interface TaskData {
  task_name: string;
  start_date: string;
  end_date:string;
  assignedBy: SelectComponentData;
  assignedTo: number[];
  taskStatus: SelectComponentData;
  taskPriority: SelectComponentData;
  taskDescription: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
console.log(req.body)
  try {
    const { data }: { data: TaskData } = req.body;
    console.log(req.body)
    console.log(data)
    // Destructure data
    const {
      task_name,
      start_date,
      end_date,
      assignedBy,
      assignedTo,
      taskStatus,
      taskPriority,
      taskDescription,
    } = data;

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
          taskStatusId: taskStatus.value,
          taskPriorityId: taskPriority.value,
          taskDescription: taskDescription,
        }),
      });
      console.log(1)
      const taskData = await taskResponse.json();
      console.log(taskData)

      // Loop through assigned_to and create task assignments
      for (const assigneeName of assignedTo) {
        // Fetch the user ID based on the assigneeName, replace with actual logic
        const assigneeId = assigneeName
        const data2 = JSON.stringify({
            tkaTask: taskData.taskId,
            tkaAssignee: +assigneeId,
            tkaAssigner: +assignedBy.value,
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
            tkaAssigner: +assignedBy.value,
          }),
        });
        console.log(response)
        if (response.status == 201){
        res.status(200).json({ success: true });
        }else{
          res.status(500).json({ error: 'Internal Server Error' });
        }

    }
  } catch (error)
{
  console.error('Error creating task:', error);
  res.status(500).json({error: 'Internal Server Error'});
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
