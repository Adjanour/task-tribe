export type Status = {
    statusId: number;
    statusName:string;
    statusIsActive:boolean;
}

export type Priority = {
    priorityId: number;
    priorityName:string;
    priorityIsActive:boolean;
}

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

export type Task = {
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
  