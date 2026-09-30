import { Router } from "express";
import Task from "../models/Task";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// GET all tasks for logged-in user
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const tasks = await Task.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// GET one task belonging to logged-in user
router.get("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
});

// CREATE task for logged-in user
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create task",
    });
  }
});

// UPDATE task belonging to logged-in user
router.put("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { user, ...updates } = req.body;

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      updates,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update task",
    });
  }
});

// DELETE task belonging to logged-in user
router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;
