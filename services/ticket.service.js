import { randomUUID } from "crypto";
import { areSeatsAvailable, bookSeats, releaseSeats, getSeatByNumber } from "./seat.service.js";

const tickets = [];

export const createBooking = ({ customerName, customerEmail, seatNumbers }) => {
    if (!customerName || !customerEmail) {
        throw { status: 400, message: "customerName and customerEmail are required" };
    }

    if (!Array.isArray(seatNumbers) || seatNumbers.length === 0) {
        throw { status: 400, message: "seatNumbers must be a non-empty array of seat identifiers (e.g. ['A1', 'A2'])" };
    }

    // Normalize seat numbers
    const normalizedSeatNumbers = seatNumbers.map(s => String(s).trim().toUpperCase());

    // Validate existence of all requested seats
    for (const seatNumber of normalizedSeatNumbers) {
        const seat = getSeatByNumber(seatNumber);
        if (!seat) {
            throw { status: 404, message: `Seat ${seatNumber} does not exist` };
        }
    }

    // Check availability
    if (!areSeatsAvailable(normalizedSeatNumbers)) {
        throw { status: 409, message: "One or more requested seats are already booked" };
    }

    const ticketId = randomUUID();
    const bookedSeats = bookSeats(normalizedSeatNumbers, ticketId);
    const totalPrice = bookedSeats.reduce((sum, s) => sum + s.price, 0);

    const newTicket = {
        id: ticketId,
        customerName,
        customerEmail,
        seatNumbers: normalizedSeatNumbers,
        seats: bookedSeats.map(s => ({
            seatNumber: s.seatNumber,
            category: s.category,
            price: s.price
        })),
        totalPrice,
        status: "CONFIRMED",
        createdAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    return newTicket;
};

export const getAllBookings = (query = {}) => {
    let result = [...tickets];

    if (query.email) {
        result = result.filter(t => t.customerEmail.toLowerCase() === query.email.toLowerCase());
    }
    if (query.name) {
        result = result.filter(t => t.customerName.toLowerCase().includes(query.name.toLowerCase()));
    }
    if (query.id) {
        result = result.filter(t => t.id === query.id);
    }

    return result;
};

export const getBookingById = (id) => {
    return tickets.find(t => t.id === id);
};

export const cancelBooking = (id) => {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) {
        throw { status: 404, message: `Ticket with ID ${id} not found` };
    }

    const [cancelledTicket] = tickets.splice(index, 1);
    const releasedSeats = releaseSeats(id);

    return {
        message: "Ticket cancelled successfully",
        cancelledTicket,
        releasedSeats
    };
};
