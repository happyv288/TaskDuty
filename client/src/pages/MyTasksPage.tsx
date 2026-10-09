import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Task, TaskCategory } from "../types/task";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import type { CompletionFilter } from "../components/FilterBar";
import useTasks from "../hooks/useTasks";
import { searchTasks } from "../api/taskApi";

function MyTasksPage() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">(
    "all",
  );

  const [completionFilter, setCompletionFilter] =
    useState<CompletionFilter>("all");

  // Backend search states
  const [backendTasks, setBackendTasks] = useState<Task[]>([]);
  const [backendLoading, setBackendLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  // Search tasks in MongoDB through the backend API
  useEffect(() => {
    const search = searchTerm.trim();

    if (!search) {
      setBackendTasks([]);
      setBackendError("");
      setBackendLoading(false);
      return;
    }

    const token = localStorage.getItem("taskduty_token");

    if (!token) {
      setBackendTasks([]);
      setBackendLoading(false);
      setBackendError("Please log in to search tasks saved to your account.");
      return;
    }

    let isActive = true;

    setBackendLoading(true);
    setBackendError("");

    // Wait briefly after typing before making the API request
    const timer = setTimeout(async () => {
      try {
        const results = await searchTasks(search);

        if (isActive) {
          setBackendTasks(results);
        }
      } catch (error) {
        if (isActive) {
          setBackendTasks([]);
          setBackendError(
            error instanceof Error
              ? error.message
              : "Unable to search your account tasks.",
          );
        }
      } finally {
        if (isActive) {
          setBackendLoading(false);
        }
      }
    }, 350);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Filter tasks stored in localStorage
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

      {/* Backend search results */}
      {searchTerm.trim() && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Search results from your account
          </h2>

          {backendLoading ? (
            <p className="text-sm text-gray-500 py-4">
              Searching your account tasks...
            </p>
          ) : backendError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{backendError}</p>

              {!localStorage.getItem("taskduty_token") && (
                <Link
                  to="/login"
                  className="inline-block mt-2 text-sm font-semibold text-[#6C4FF3] hover:underline"
                >
                  Go to Login
                </Link>
              )}
            </div>
          ) : backendTasks.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">
              No matching tasks found in your account.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {backendTasks.map((task) => (
                <article
                  key={task.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {task.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        {task.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>Category: {task.category}</span>

                        <span>Due date: {task.dueDate}</span>

                        <span>
                          Status: {task.completed ? "Completed" : "Incomplete"}
                        </span>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-[#6C4FF3]">
                      MongoDB
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <FilterBar
        category={categoryFilter}
        completion={completionFilter}
        onCategoryChange={setCategoryFilter}
        onCompletionChange={setCompletionFilter}
      />

      {/* Existing localStorage task list */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Tasks on this device
        </h2>

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
      </section>
    </main>
  );
}

export default MyTasksPage;
