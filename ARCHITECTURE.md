# Architecture Overview – Realtime Collaborative Canvas

This document describes the architecture and design decisions behind the Realtime Collaborative Canvas project. The goal of the architecture is to enable multiple users to draw together in real time while keeping the system simple, efficient, and easy to reason about.

---

## High-Level Architecture

The application follows a **client–server architecture** with real-time communication enabled through **WebSockets**.

- The **client** is responsible for rendering the canvas and handling user interactions.
- The **server** is responsible for managing connections and broadcasting drawing events.
- The **canvas itself is not shared** between users. Only drawing events are shared.

This separation ensures better performance and avoids synchronization issues.

---

## Components

### Client (Frontend)

The client is built using HTML, CSS, and JavaScript and consists of the following responsibilities:

- Capturing mouse events (mousedown, mousemove, mouseup)
- Rendering drawings using the HTML Canvas API
- Sending drawing events to the server via WebSocket
- Receiving drawing events from other users and rendering them locally
- Handling UI features such as color selection, pen thickness, and light/dark mode

Each client maintains its own canvas and redraws content based on incoming events.

---

### Server (Backend)

The backend is built using Node.js, Express, and the `ws` WebSocket library.

The server:
- Accepts WebSocket connections from multiple clients
- Receives drawing events from clients
- Broadcasts those events to all connected clients
- Does not perform any drawing or rendering itself

The server acts as a **message relay**, not as a renderer or storage engine.

---

## Communication Model

The application uses **WebSockets** for bidirectional, low-latency communication.

### Why WebSockets?

- Persistent connection
- Low latency
- Ideal for real-time collaboration
- More efficient than HTTP polling for continuous updates

---

## Event-Based Data Flow

The application uses an **event-based model** instead of sharing UI state.

### Drawing Events

Each drawing action is broken into events:

- `START`: Indicates the beginning of a stroke (mouse down)
- `DRAW`: Indicates continuous drawing points (mouse move)

Each event contains:
- X and Y coordinates
- Color
- Line thickness (sent at stroke start)

---

## Data Flow Sequence

1. User starts drawing on the canvas.
2. Mouse events are captured by the client.
3. Drawing events are sent to the server via WebSocket.
4. The server broadcasts events to all connected clients.
5. Each client renders the drawing locally on its canvas.


User Input
↓
Canvas (Client)
↓
WebSocket
↓
Server (Broadcast)
↓
All Connected Clients


## Collaboration Scope

- Collaboration works across multiple browser tabs on the same machine.
- Collaboration also works across multiple devices when the server is exposed over:
  - Local network (LAN)
  - Internet tunneling tools such as ngrok

---

## Non-Goals (Intentional Design Choices)

The following features are intentionally not implemented in the current version:

- Global undo/redo
- Persistent storage of drawings
- User authentication
