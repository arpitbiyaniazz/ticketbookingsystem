# 🎟️ Ticket Booking System

A lightweight, modern cinema/theater ticket booking application built with **Node.js**, **Express**, and an interactive glassmorphic web interface.

---

## ✨ Features

- **Interactive Seating Grid**: Visual seat map featuring tiered seating:
  - **VIP**: Rows `A` & `B` ($50/seat)
  - **Standard**: Rows `C`, `D`, `E` ($25/seat)
- **Live Seat Availability**: Real-time summary badges showing total, available, and booked seats.
- **Conflict Prevention**: Concurrent booking protection preventing double-booking of any seat.
- **Booking Management**: Book tickets by selecting multiple seats, view confirmed tickets, and cancel tickets with instant seat release.
- **Dual Interface**:
  - **Web UI**: Sleek dark-mode glassmorphic interface at `http://localhost:3000`
  - **REST API**: Full JSON API for programmatic integration

---

## 📁 Project Structure

```
ticketbookingsystem/
├── app.js                      # Express app setup, middleware, and server listener
├── package.json                # Project dependencies and npm scripts
├── .gitignore                  # Git ignore rules for node_modules, logs, etc.
├── public/
│   └── index.html              # Interactive frontend UI (HTML5, CSS3, Vanilla JS)
├── routes/
│   ├── seat.routes.js          # Routes for seat availability and catalog
│   └── ticket.routes.js        # Routes for booking, listing, and canceling tickets
├── controllers/
│   ├── seat.control.js         # Seat query and filtering controller
│   └── ticket.control.js       # Ticket creation, retrieval, and deletion controller
└── services/
    ├── seat.service.js         # In-memory seat management and reservation state
    └── ticket.service.js       # Ticket validation, booking logic, and cancellations
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended; works seamlessly on Node v20/v22)
- npm (v9+)

### Installation

1. Navigate to the project directory:
   ```bash
   cd ticketbookingsystem
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode** (with automatic reload on file changes):
  ```bash
  npm run dev
  ```

- **Production / Standard Mode**:
  ```bash
  npm start
  ```

Open your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📡 REST API Reference

All endpoints can be accessed directly or with the `/api` prefix (e.g., `/seats` or `/api/seats`).

### 1. Health Check
- **Endpoint**: `GET /health`
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

### 2. Get Seats
- **Endpoint**: `GET /seats`
- **Query Parameters**:
  - `status` *(optional)*: Filter by `available` or `booked`
  - `category` *(optional)*: Filter by `VIP` or `Standard`
- **Example Request**:
  ```bash
  curl http://localhost:3000/seats?status=available
  ```
- **Example Response**:
  ```json
  {
    "summary": {
      "total": 40,
      "available": 40,
      "booked": 0
    },
    "seats": [
      {
        "seatNumber": "A1",
        "row": "A",
        "number": 1,
        "category": "VIP",
        "price": 50,
        "isBooked": false,
        "bookedBy": null
      }
    ]
  }
  ```

### 3. Book Tickets
- **Endpoint**: `POST /tickets`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "customerName": "Alice Smith",
    "customerEmail": "alice@example.com",
    "seatNumbers": ["A1", "A2"]
  }
  ```
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/tickets \
    -H "Content-Type: application/json" \
    -d '{"customerName":"Alice Smith","customerEmail":"alice@example.com","seatNumbers":["A1","A2"]}'
  ```
- **Example Response (201 Created)**:
  ```json
  {
    "message": "Ticket booked successfully",
    "ticket": {
      "id": "771e8470-3490-4c3e-9087-70e28e6c7eb2",
      "customerName": "Alice Smith",
      "customerEmail": "alice@example.com",
      "seatNumbers": ["A1", "A2"],
      "seats": [
        { "seatNumber": "A1", "category": "VIP", "price": 50 },
        { "seatNumber": "A2", "category": "VIP", "price": 50 }
      ],
      "totalPrice": 100,
      "status": "CONFIRMED",
      "createdAt": "2026-10-08T11:15:00.000Z"
    }
  }
  ```
- **Error Response (409 Conflict)** if seat is already booked:
  ```json
  {
    "error": "One or more requested seats are already booked"
  }
  ```

### 4. List Tickets
- **Endpoint**: `GET /tickets`
- **Query Parameters**:
  - `id` *(optional)*: Fetch specific ticket by UUID
  - `email` *(optional)*: Filter tickets by customer email
  - `name` *(optional)*: Filter tickets by customer name
- **Example Request**:
  ```bash
  curl http://localhost:3000/tickets
  ```

### 5. Cancel a Booking
- **Endpoint**: `DELETE /tickets/:id`
- **Description**: Cancels the ticket and automatically releases the reserved seats back into the available pool.
- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3000/tickets/771e8470-3490-4c3e-9087-70e28e6c7eb2
  ```
- **Example Response (200 OK)**:
  ```json
  {
    "message": "Ticket cancelled successfully",
    "cancelledTicket": {
      "id": "771e8470-3490-4c3e-9087-70e28e6c7eb2",
      "customerName": "Alice Smith",
      "seatNumbers": ["A1", "A2"],
      "totalPrice": 100
    },
    "releasedSeats": ["A1", "A2"]
  }
  ```

---

## 🛠️ Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Glassmorphism & Flexbox/Grid)
- **Fonts**: Outfit & Plus Jakarta Sans via Google Fonts

---

## 📄 License

ISC / MIT
