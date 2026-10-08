import express from 'express';
import { getseats } from '../controllers/seat.control.js';

const router = express.Router();

router.get("/seats", getseats);

export default router;