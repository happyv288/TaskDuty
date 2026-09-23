import type { TaskCategory } from "../types/task";
import { TASK_CATEGORIES } from "../types/task";

export type CompletionFilter = "all" | "completed" | "incomplete";

interface FilterBarProps {
  category: TaskCategory | "all";
  completion: CompletionFilter;
  onCategoryChange: (value: TaskCategory | "all") => void;
  onCompletionChange: (value: CompletionFilter) => void;
}

const selectClasses =
  "text-sm text-gray-900 px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#6C4FF3]";

// Fully "controlled": the current filter values and the handlers that
// change them are passed in as props. FilterBar holds no state of its
// own — the parent page decides what "category" and "completion" mean
// and what to do when they change (filter a local array today, refetch
// from an API with query params later).
export default function FilterBar({
  category,
  completion,
  onCategoryChange,
  onCompletionChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <select
        aria-label="Filter by category"
        value={category}
        onChange={(e) =>
          onCategoryChange(e.target.value as TaskCategory | "all")
        }
        className={selectClasses}
      >
        <option value="all">All categories</option>
        {TASK_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by completion status"
        value={completion}
        onChange={(e) => onCompletionChange(e.target.value as CompletionFilter)}
        className={selectClasses}
      >
        <option value="all">All statuses</option>
        <option value="incomplete">Not completed</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
