// In-memory seat state
const ROWS = ['A', 'B', 'C', 'D', 'E'];
const SEATS_PER_ROW = 8;

const initializeSeats = () => {
    const seats = [];
    for (const row of ROWS) {
        for (let num = 1; num <= SEATS_PER_ROW; num++) {
            const seatNumber = `${row}${num}`;
            const isVip = row === 'A' || row === 'B';
            seats.push({
                seatNumber,
                row,
                number: num,
                category: isVip ? 'VIP' : 'Standard',
                price: isVip ? 50 : 25,
                isBooked: false,
                bookedBy: null
            });
        }
    }
    return seats;
};

const seats = initializeSeats();

export const getAllSeats = () => {
    return seats;
};

export const getSeatByNumber = (seatNumber) => {
    return seats.find(s => s.seatNumber.toUpperCase() === seatNumber.toUpperCase());
};

export const areSeatsAvailable = (seatNumbers) => {
    for (const seatNumber of seatNumbers) {
        const seat = getSeatByNumber(seatNumber);
        if (!seat || seat.isBooked) {
            return false;
        }
    }
    return true;
};

export const bookSeats = (seatNumbers, ticketId) => {
    const booked = [];
    for (const seatNumber of seatNumbers) {
        const seat = getSeatByNumber(seatNumber);
        if (seat) {
            seat.isBooked = true;
            seat.bookedBy = ticketId;
            booked.push(seat);
        }
    }
    return booked;
};

export const releaseSeats = (ticketId) => {
    const released = [];
    for (const seat of seats) {
        if (seat.bookedBy === ticketId) {
            seat.isBooked = false;
            seat.bookedBy = null;
            released.push(seat.seatNumber);
        }
    }
    return released;
};
