export type TaskCategory = "Work" | "Personal" | "Urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string, e.g. "2026-10-05"
  category: TaskCategory;
  completed: boolean;
}

export type TaskFormValues = Omit<Task, "id" | "completed">;

export const TASK_CATEGORIES: TaskCategory[] = ["Work", "Personal", "Urgent"];