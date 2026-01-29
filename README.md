# collaborative-canvas

# Realtime Collaborative Canvas

A real-time collaborative drawing application where multiple users can draw together on a shared canvas and see updates instantly.  
Built using HTML Canvas, JavaScript, Node.js, and WebSockets.

---

## Features

- Real-time drawing synchronization
- Smooth line drawing
- Individual pen color selection
- Adjustable pen thickness
- Light and Dark mode toggle
- Works across multiple browser tabs and devices

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript (Canvas API)
- Backend: Node.js, Express
- Realtime Communication: WebSockets (`ws`)

---

## Project Structure

collaborative-canvas/
├── server/
│ └── server.js
├── client/
│ ├── index.html
│ ├── style.css
│ ├── canvas.js
│ └── websocket.js
├── package.json
└── README.md


---

## How to Run the Project

To run the project locally, make sure Node.js is installed on your system. After cloning or downloading the repository, open a terminal inside the project directory and install the required dependencies using npm. Once the dependencies are installed, start the server. The application will be available on port 3000.



You can open this URL in multiple browser tabs to see real-time collaboration in action.

---

## Using the Application on Other Devices

By default, the application runs on localhost, which means it is accessible only from the same machine. To allow collaboration on other devices, all devices must be able to reach the same server.

If the devices are connected to the same Wi-Fi network, find the local IP address of the machine running the server using the `ipconfig` command on Windows. Replace `localhost` in the WebSocket URL with this IP address. After restarting the server, other devices on the same network can open the application using the IP address and port 3000.

For collaboration over the internet, the server can be exposed using tunneling tools such as ngrok. Once the tunnel is created, the generated public URL can be used as the WebSocket endpoint, allowing users from different networks to collaborate in real time.

---

## How the Application Works

When a user starts drawing on the canvas, mouse events are captured and converted into drawing actions. Each stroke begins with a start event that initializes the drawing path with the selected color and thickness. As the user moves the mouse, draw events are continuously sent to the server through a WebSocket connection.

The server receives these drawing events and immediately broadcasts them to all connected clients. Each client receives the events and renders the drawing locally on its own canvas. The canvas itself is never shared or transferred; only the drawing instructions are shared, which makes the application efficient and scalable.

The light and dark mode toggle only affects the local user interface and does not impact other connected users, while drawing actions such as color and thickness are synchronized across all clients.

---

## Limitations and Future Improvements

Currently, the application does not support user authentication, multiple drawing rooms, or persistence of drawings after a page refresh. These features can be added in the future to make the application more robust and production-ready. Possible improvements include adding undo and redo functionality, displaying user cursors and names, saving drawings as images, and deploying the server to a cloud platform.

---

## Conclusion

This project demonstrates the fundamentals of building a real-time collaborative application using WebSockets and the HTML Canvas API. It highlights the importance of event-based communication, clean separation between frontend and backend responsibilities, and efficient real-time data sharing. The project is suitable for learning purposes, academic submissions, and as a portfolio project to showcase real-time system design skills.
