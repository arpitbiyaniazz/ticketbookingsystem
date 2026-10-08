import { createBooking, getAllBookings, getBookingById, cancelBooking } from "../services/ticket.service.js";

export const createTicket = (req, res) => {
    try {
        const { customerName, customerEmail, seatNumbers } = req.body;
        const ticket = createBooking({ customerName, customerEmail, seatNumbers });
        return res.status(201).json({
            message: "Ticket booked successfully",
            ticket
        });
    } catch (error) {
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || "Failed to create ticket" });
    }
};

export const getTicket = (req, res) => {
    try {
        const { id, email, name } = req.query;
        if (id) {
            const ticket = getBookingById(id);
            if (!ticket) {
                return res.status(404).json({ error: `Ticket with ID ${id} not found` });
            }
            return res.status(200).json({ ticket });
        }

        const tickets = getAllBookings({ email, name });
        return res.status(200).json({
            count: tickets.length,
            tickets
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Failed to retrieve tickets" });
    }
};

export const deleteTicket = (req, res) => {
    try {
        const { id } = req.params;
        const result = cancelBooking(id);
        return res.status(200).json(result);
    } catch (error) {
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || "Failed to cancel ticket" });
    }
};
