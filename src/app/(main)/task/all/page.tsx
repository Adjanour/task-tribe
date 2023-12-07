'use client';
import React from 'react';
import {useGetData} from "@/app/(main)/_UI/hooks/useGetData";
import TaskTable from "@/app/(main)/task/_UI/components/TaskTable";

export default function Page() {
    const { data, refetchData, isLoading, error } = useGetData({
        dataAlias:"task",
        endpoint:"http://localhost:8000/api/user/tasks",
        token: "",
    });
    // const{
    //    taskId:key,
    //     taskId,
    //     taskName,
    //     taskDescription,
    //     taskPriority,
    //     taskStatus,
    //     tkaAssignerId,
    //     taskStartDate,
    //     taskCreatedDate,
    //     taskEndDate,
    //     assignerFullName,
    //     tkaAssigneeId,
    //     tkaId,
    //     tkaTaskId,
    //     fullName,
    //     taskDuration,
    //     taskProgress,
    //     taskSlug,
    // }=data
    // const data2 ={
    //     key,
    //     taskId,
    //     taskName,
    //     taskDescription,
    //     taskPriority,
    //     taskStatus,
    //     tkaAssignerId,
    //     taskStartDate,
    //     taskCreatedDate,
    //     taskEndDate,
    //     assignerFullName,
    //     tkaAssigneeId,
    //     tkaId,
    //     tkaTaskId,
    //     fullName,
    //     taskDuration,
    //     taskProgress,
    //     taskSlug,
    // }
    return (
        <div><TaskTable tasks={data}/></div>
    );
}
