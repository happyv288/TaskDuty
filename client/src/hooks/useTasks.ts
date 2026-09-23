import { useEffect, useState } from "react";
import type { Task, TaskFormValues } from "../types/task";

const STORAGE_KEY = "taskduty_tasks";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "FinTech Website Update",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna.",
    dueDate: "2026-10-05",
    category: "Urgent",
    completed: false,
  },
  {
    id: "2",
    title: "Agro Website Update",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna.",
    dueDate: "2026-10-12",
    category: "Work",
    completed: false,
  },
];

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks) {
      return JSON.parse(savedTasks) as Task[];
    }

    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(values: TaskFormValues) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...values,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function updateTask(id: string, values: TaskFormValues) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...values,
            }
          : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  }

  function getTask(id: string) {
    return tasks.find((task) => task.id === id);
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTask,
  };
}

export default useTasks;
