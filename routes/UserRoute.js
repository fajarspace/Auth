import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser, AdminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, AdminOnly, getUsers);
router.get('/users/:id', verifyUser, AdminOnly, getUserById);
router.post('/users', verifyUser, AdminOnly, createUser);
router.patch('/users/:id', verifyUser, AdminOnly, updateUser);
router.delete('/users/:id', verifyUser, AdminOnly, deleteUser);

export default router;