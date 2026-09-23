import { useNavigate, useParams } from "react-router-dom";
import type { TaskFormValues } from "../types/task";
import TaskForm from "../components/TaskForm";


const placeholderTasks: Record<string, TaskFormValues> = {
  "1": {
    title: "FinTech Website Update",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna.",
    dueDate: "2026-10-05",
    category: "Urgent",
  },
  "2": {
    title: "Agro Website Update",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna.",
    dueDate: "2026-10-12",
    category: "Work",
  },
};

function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const existingTask = (id && placeholderTasks[id]) || {
    title: "",
    description: "",
    dueDate: "",
    category: "Work" as const,
  };

  function handleSave(values: TaskFormValues) {
    // TODO: replace with a PUT/PATCH /tasks/:id call once the server is
    // ready. TaskForm already validated `values` — this is the only
    // spot that needs to change.
    console.log("Updated task:", id, values);
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
        <h1 className="text-2xl font-bold">Edit Task</h1>
      </button>

      <TaskForm
        initialValues={existingTask}
        submitLabel="Done"
        onSubmit={handleSave}
        onCancel={() => navigate("/tasks")}
      />
    </main>
  );
}

export default EditTaskPage;
