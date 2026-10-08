import express from "express";
import Ticketroute from "./routes/ticket.routes.js";
import Seatsroute from "./routes/seat.routes.js";

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get("/api", (req, res) => {
    return res.json({
        name: "Ticket Booking System API",
        status: "running",
        endpoints: {
            health: "GET /health",
            seats: "GET /seats or GET /api/seats (query: ?status=available|booked&category=VIP|Standard)",
            createTicket: "POST /tickets or POST /api/tickets (body: { customerName, customerEmail, seatNumbers: ['A1'] })",
            getTickets: "GET /tickets or GET /api/tickets (query: ?id=...&email=...)",
            cancelTicket: "DELETE /tickets/:id or DELETE /api/tickets/:id"
        }
    });
});

app.use("/health", (req, res) => {
    return res.json({ status: "ok" });
});

// Support both root routes and prefixed /api routes
app.use(Ticketroute);
app.use(Seatsroute);
app.use("/api", Ticketroute);
app.use("/api", Seatsroute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;