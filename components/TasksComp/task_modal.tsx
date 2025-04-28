import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Task = {
  title: string;
  dueDate: string;
  status: "pending" | "completed";
  id: string;
};

interface TaskModalProps {
  title: string;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  task: Task;
  handleTask: (event: React.FormEvent<HTMLFormElement>) => void;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  label: string;
}

const TaskModal = ({
  title,
  showModal,
  setShowModal,
  task,
  handleTask,
  setTask,
  label,
}: TaskModalProps) => {
  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-lg p-6">
          <DialogTitle className="text-xl font-semibold mb-4 text-gray-900">
            {title}
          </DialogTitle>

          <form onSubmit={handleTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                required
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                required
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={task.status}
                onChange={(e) =>
                  setTask({
                    ...task,
                    status: e.target.value as "pending" | "completed",
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {label}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
