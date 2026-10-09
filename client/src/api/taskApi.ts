import type { Task } from "../types/task";

const API_URL = "http://localhost:5000/api/tasks";

interface BackendTask {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: Task["category"];
  completed: boolean;
}

export async function searchTasks(search: string): Promise<Task[]> {
  const token = localStorage.getItem("taskduty_token");

  if (!token) {
    throw new Error("Please log in to search your tasks.");
  }

  const response = await fetch(
    `${API_URL}?search=${encodeURIComponent(search)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to search tasks.");
  }

  const data: BackendTask[] = await response.json();

  return data.map((task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    category: task.category,
    completed: task.completed,
  }));
}
