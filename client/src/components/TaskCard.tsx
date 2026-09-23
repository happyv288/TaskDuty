import type { Task } from "../types/task";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const EditIcon = Pencil;
const DeleteIcon = Trash2;

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryClasses: Record<Task["category"], string> = {
  Work: "text-[#6C4FF3]",
  Personal: "text-[#1E9E6B]",
  Urgent: "text-[#D3455B]",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TaskCard({
  task,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <button
            onClick={() => onToggleComplete(task.id)}
            aria-label={
              task.completed ? "Mark as not completed" : "Mark as completed"
            }
            className={`mt-1 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
              task.completed
                ? "bg-[#1E9E6B] border-[#1E9E6B]"
                : "bg-white border-gray-200"
            }`}
          >
            {task.completed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6.5L4.5 9L10 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <div className="min-w-0">
            <span
              className={`text-xs font-semibold ${categoryClasses[task.category]}`}
            >
              {task.category}
            </span>
            <h3
              className={`text-lg font-semibold mt-0.5 ${
                task.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Link
            to={`/tasks/edit/${task.id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#6C4FF3] hover:bg-[#5A3FE0] rounded-full px-4 py-1.5"
          >
            <EditIcon className="text-white" />
            Edit
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 border border-gray-200 hover:border-[#D3455B] hover:text-[#D3455B] rounded-full px-4 py-1.5"
          >
            <DeleteIcon />
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2 pl-8">
          {task.description}
        </p>
      )}

      <div className="flex gap-4 mt-3 pl-8 text-xs text-gray-500">
        <span>{task.completed ? "Completed" : "Not completed"}</span>
        {task.dueDate && <span>Due {formatDate(task.dueDate)}</span>}
      </div>
    </div>
  );
}
