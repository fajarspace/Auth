import express from "express";
import { Login, logOut, HaloBang } from "../controllers/Auth.js";

const router = express.Router();

router.get('/halo', HaloBang);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;