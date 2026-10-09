import { Router } from "express";
import Task from "../models/Task";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// GET all tasks or search tasks for logged-in user
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const search = String(req.query.search || "").trim();

    const filter: Record<string, unknown> = {
      user: req.userId,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

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
