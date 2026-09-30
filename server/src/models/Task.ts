import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: string;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Work", "Personal", "Urgent"],
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWJjMmFmMmJjMzYzZjdlZDNjMTU5NjIiLCJpYXQiOjE3OTA3MjAwNjYsImV4cCI6MTc5MTMyNDg2Nn0.7KqwgMxAaKjRMJe4bIZS1zMjg9rwl48xqvm5GNB9gEY