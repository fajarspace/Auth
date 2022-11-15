import express from "express";
import { getJadwals, getJadwalById, createJadwal, updateJadwal, deleteJadwal } from "../controllers/Jadwals.js";

const router = express.Router();

router.get('/jadwals', getJadwals);
router.get('/jadwals/:id', getJadwalById);
router.post('/jadwals', createJadwal);
router.patch('/jadwals/:id', updateJadwal);
router.delete('/jadwals/:id', deleteJadwal);

export default router;