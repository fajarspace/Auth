import express from "express";
import { getJadwals, getJadwalById, createJadwal, updateJadwal, deleteJadwal } from "../controllers/Jadwals.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/jadwals', verifyUser, getJadwals);
router.get('/jadwals/:id', verifyUser, getJadwalById);
router.post('/jadwals', verifyUser, createJadwal);
router.patch('/jadwals/:id', verifyUser, updateJadwal);
router.delete('/jadwals/:id', verifyUser, deleteJadwal);

export default router;