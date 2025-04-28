"use client";
import { useCallback, useEffect, useState } from "react";
import TaskModal from "@/components/TasksComp/task_modal";
import TaskLists from "../TasksComp/task_lists";
export interface Task {
  id: string;
  title: string;
  status: "pending" | "completed";
  dueDate: string;
}
const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState({
    id: "",
    title: "",
    dueDate: "",
    status: "pending" as "pending" | "completed",
  });
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    dueDate: "",
    status: "pending" as "pending" | "completed",
  });

  const getAllTasks = useCallback(
    () =>
      fetch("/api/tasks/getAll")
        .then((res) => res.json())
        .then((resJson) => setTasks(resJson))
        .catch((err) => console.log(err)),
    []
  );

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("/api/tasks/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTask }),
    })
      .then((res) => res.json)
      .then((resJson) => {
        getAllTasks();
        setShowAddModal(false);
        setNewTask({ title: "", dueDate: "", status: "pending", id: "" });
      });
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/tasks/updateTask", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editTask }),
    })
      .then((res) => res.json)
      .then((resJson) => {
        getAllTasks();
        setShowEditModal(false);
      });
  };

  const deleteTask = (taskId: string) => {
    fetch("/api/tasks/deleteTask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: taskId,
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        getAllTasks();
      });
  };

  return (
    <div>
      <section>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 m-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add New Task
        </button>
      </section>

      {/* Add Task Modal */}
      <TaskModal
        title={"Add new Task"}
        showModal={showAddModal}
        task={newTask}
        setShowModal={setShowAddModal}
        handleTask={handleAddTask}
        setTask={setNewTask}
        label={"Add Task"}
      />

      {/* Edit Task Modal */}
      {showEditModal && (
        <TaskModal
          title={"Edit Task"}
          showModal={showEditModal}
          task={editTask}
          setShowModal={setShowEditModal}
          handleTask={handleEditTask}
          setTask={setEditTask}
          label={"Save Changes"}
        />
      )}

      {/* Tasks List */}
      <TaskLists
        tasks={tasks}
        setShowEditModal={setShowEditModal}
        setEditTask={setEditTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Home;
