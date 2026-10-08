import { getAllSeats } from "../services/seat.service.js";

export const getseats = (req, res) => {
    try {
        const { status, category } = req.query;
        let seats = getAllSeats();

        if (status === 'available') {
            seats = seats.filter(s => !s.isBooked);
        } else if (status === 'booked') {
            seats = seats.filter(s => s.isBooked);
        }

        if (category) {
            seats = seats.filter(s => s.category.toLowerCase() === category.toLowerCase());
        }

        const totalSeats = seats.length;
        const availableCount = seats.filter(s => !s.isBooked).length;
        const bookedCount = totalSeats - availableCount;

        return res.status(200).json({
            summary: {
                total: totalSeats,
                available: availableCount,
                booked: bookedCount
            },
            seats
        });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Failed to retrieve seats" });
    }
};
