'use client'
import React from 'react'
import TaskProgressUpdateForm from '../../_UI/forms/xTaskProgressUpdateForm'
import {useGetData} from "@/app/(main)/_UI/hooks/useGetData";
import {Task} from "@/app/(main)/task/_lib/definitions";


export default function TaskUpdatePage({ params }: { params: { id: number } }) {
    console.log(params.id)
  const{data}=useGetData({dataAlias:"taskdetails",endpoint:`http://localhost:8000/api/user/task/details/${params.id}`,token:""})
    console.log(data)
  return (
      <>
        <TaskProgressUpdateForm/>
        {data.taskName}

      </>

  )
}
