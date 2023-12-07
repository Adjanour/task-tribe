'use client';
import { JSXElementConstructor, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { TaskForm } from "./TaskModalForm";

function TaskModal() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <button  onClick={() => setOpenModal(true)} className="bg-blue-400 rounded-md shadow-md align-middle justify-center p-1  h-fit text-sm p-0">Task Update</button>
      <Modal title="Task Update" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Task Update</Modal.Header>
        <Modal.Body><TaskForm /></Modal.Body>
      </Modal>
    </>
  );
}

export default TaskModal;
