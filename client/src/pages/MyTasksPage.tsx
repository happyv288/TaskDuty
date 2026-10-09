import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Task, TaskCategory } from "../types/task";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import type { CompletionFilter } from "../components/FilterBar";
import useTasks from "../hooks/useTasks";

function MyTasksPage() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">(
    "all",
  );

  const [completionFilter, setCompletionFilter] =
    useState<CompletionFilter>("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;

      const matchesCompletion =
        completionFilter === "all" ||
        (completionFilter === "completed" ? task.completed : !task.completed);

      return matchesSearch && matchesCategory && matchesCompletion;
    });
  }, [tasks, searchTerm, categoryFilter, completionFilter]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>

        <Link
          to="/tasks/new"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#6C4FF3] hover:text-[#5A3FE0]"
        >
          <span className="text-lg leading-none">+</span>
          Add New Task
        </Link>
      </div>

      {/* Search input */}
      <div className="mb-5">
        <label
          htmlFor="task-search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search tasks
        </label>

        <input
          id="task-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by task title or description..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#6C4FF3] focus:ring-2 focus:ring-[#6C4FF3]/20"
        />
      </div>

      <FilterBar
        category={categoryFilter}
        completion={completionFilter}
        onCategoryChange={setCategoryFilter}
        onCompletionChange={setCompletionFilter}
      />

      {tasks.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-gray-200 rounded-2xl text-gray-500">
          <p className="text-lg font-semibold text-gray-900 mb-1">
            Your list is clear.
          </p>
          <span>Add a task to get started.</span>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-gray-200 rounded-2xl text-gray-500">
          <p className="text-lg font-semibold text-gray-900 mb-1">
            No matching tasks found.
          </p>
          <span>Try another search term or change your filters.</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default MyTasksPage;
