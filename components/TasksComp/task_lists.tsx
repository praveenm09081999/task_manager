import {
  CheckIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Task } from "../Home/home";

interface TaskListsProps {
  tasks: Task[];
  setShowEditModal: (show: boolean) => void;
  setEditTask: React.Dispatch<React.SetStateAction<Task>>;
  deleteTask: (taskId: string) => void;
}

const TaskLists = ({
  tasks,
  setShowEditModal,
  setEditTask,
  deleteTask,
}: TaskListsProps) => {


  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 ml-4 dark:text-gray-200">
        List of Tasks
      </h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 p-8">
            No tasks found. Start by adding a new task.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-white ml-8 mr-8 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {task.status === "completed" ? (
                    <CheckIcon className="w-6 h-6 text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <span className="text-xs font-medium text-gray-500">
                    ID: {task.id}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setEditTask(task);
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  aria-label={`Edit task ${task.title}`}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  aria-label={`Delete task ${task.title}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default TaskLists;