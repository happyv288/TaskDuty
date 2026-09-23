import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { TASK_CATEGORIES } from "../types/task";
import type { TaskCategory, TaskFormValues } from "../types/task";

interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;

const emptyValues: TaskFormValues = {
  title: "",
  description: "",
  dueDate: "",
  category: "Work",
};

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
}

function validateTask(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim())
    errors.description = "Description is required.";
  if (!values.dueDate) {
    errors.dueDate = "Due date is required.";
  } else if (values.dueDate < todayISO()) {
    errors.dueDate = "Due date cannot be in the past.";
  }
  if (!values.category) errors.category = "Category is required.";
  return errors;
}

// Notches the label into the top border, matching the Figma field style.
function FieldFrame({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`relative rounded-xl border px-4 pb-3 pt-4 ${
          error ? "border-[#D3455B]" : "border-gray-200"
        }`}
      >
        <label
          htmlFor={htmlFor}
          className="absolute -top-2.5 left-3 bg-[#FAF9FB] px-1.5 text-xs font-medium text-gray-500"
        >
          {label}
        </label>
        {children}
      </div>
      {error && <p className="text-xs text-[#D3455B] pl-1">{error}</p>}
    </div>
  );
}

// TaskForm owns its own *draft* state (what the person is currently
// typing) and validation — that's UI concern, not data concern. It
// never decides what happens on save; it just hands the parent page a
// validated TaskFormValues object via onSubmit. The page decides
// whether that means updating local state, calling POST /tasks, or
// calling PUT /tasks/:id later.
export default function TaskForm({
  initialValues = emptyValues,
  submitLabel,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  function handleChange<K extends keyof TaskFormValues>(
    field: K,
    value: TaskFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateTask(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FieldFrame label="Task Title" htmlFor="title" error={errors.title}>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="E.g Project Defense, Assignment ..."
          className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          autoFocus
        />
      </FieldFrame>

      <FieldFrame
        label="Description"
        htmlFor="description"
        error={errors.description}
      >
        <textarea
          id="description"
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Briefly describe your task..."
          rows={4}
          className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none resize-y"
        />
      </FieldFrame>

      <FieldFrame label="Due Date" htmlFor="dueDate" error={errors.dueDate}>
        <input
          id="dueDate"
          type="date"
          min={todayISO()}
          value={values.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
        />
      </FieldFrame>

      <FieldFrame label="Category" htmlFor="category" error={errors.category}>
        <div
          id="category"
          role="radiogroup"
          aria-label="Category"
          className="flex flex-wrap gap-2 pt-1"
        >
          {TASK_CATEGORIES.map((cat) => {
            const selected = values.category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("category", cat as TaskCategory)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                  selected
                    ? "bg-[#6C4FF3] border-[#6C4FF3] text-white"
                    : "bg-white border-gray-200 text-gray-500 hover:border-[#6C4FF3] hover:text-[#6C4FF3]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </FieldFrame>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 text-sm font-semibold text-gray-500 hover:text-gray-900 rounded-xl border border-gray-200 py-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] text-sm font-semibold text-white bg-[#6C4FF3] hover:bg-[#5A3FE0] rounded-xl py-3"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
