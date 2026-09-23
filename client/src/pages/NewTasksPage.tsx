import { useNavigate } from "react-router-dom";
import type { TaskFormValues } from "../types/task";
import TaskForm from "../components/TaskForm";

function NewTaskPage() {
  const navigate = useNavigate();

  function handleCreate(values: TaskFormValues) {
    // TODO: replace with a POST /tasks call once the server is ready.
    // TaskForm already validated `values` — this is the only spot that
    // needs to change.
    console.log("New task:", values);
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
