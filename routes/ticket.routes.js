import express from 'express';
import { createTicket, getTicket, deleteTicket } from '../controllers/ticket.control.js';

const router = express.Router();

router.post("/tickets", createTicket);
router.get("/tickets", getTicket);
router.delete("/tickets/:id", deleteTicket);

export default router;