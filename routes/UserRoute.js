import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser, InstrukturOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, InstrukturOnly, getUsers);
router.get('/users/:id', verifyUser, InstrukturOnly, getUserById);
router.post('/users', verifyUser, InstrukturOnly, createUser);
router.patch('/users/:id', verifyUser, InstrukturOnly, updateUser);
router.delete('/users/:id', verifyUser, InstrukturOnly, deleteUser);

export default router;