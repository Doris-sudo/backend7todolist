import express from 'express';

import { authenticate } from '../middleware/authMiddleware.js';

import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", authenticate, createTodo);
router.get("/", authenticate, getTodos);
router.get("/:id", authenticate, getTodoById);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

export default router;