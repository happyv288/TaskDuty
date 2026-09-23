import { useNavigate } from "react-router-dom";
import type { TaskFormValues } from "../types/task";
import TaskForm from "../components/TaskForm";
import useTasks from "../hooks/useTasks";

function NewTaskPage() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  function handleCreate(values: TaskFormValues) {
    addTask(values);
    navigate("/tasks");
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate("/tasks")}
        className="flex items-center gap-2 mb-6 text-gray-900 group"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-gray-500 group-hover:text-gray-900"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-2xl font-bold">New Task</h1>
      </button>

      <TaskForm
        submitLabel="Done"
        onSubmit={handleCreate}
        onCancel={() => navigate("/tasks")}
      />
    </main>
  );
}

export default NewTaskPage;
