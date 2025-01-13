import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(cors({
    origin: "*", // Allow requests from all origins
}));

// HTTP endpoint for checking password breach
app.post("/check-breach", async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).send("Password is required.");
    }

    const sha1Hash = crypto.createHash("sha1").update(password).digest("hex").toUpperCase();
    const prefix = sha1Hash.slice(0, 5);
    const suffix = sha1Hash.slice(5);

    try {
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();
        const breaches = data.split("\n").map(line => line.split(":"));
        const match = breaches.find(([hashSuffix]) => hashSuffix === suffix);

        if (match) {
            return res.send(`Your password has been exposed ${match[1]} times in data breaches!`);
        } else {
            return res.send("Your password is safe and has not been found in any known data breaches.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error checking password breach.");
    }
});

// Create the HTTP server and WebSocket server on the same port
const server = app.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
});

// Create a WebSocket server on the same HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket");

    // Send a message to the client
    ws.send("Hello, WebSocket client!");

    // Listen for messages from the client
    ws.on("message", (message) => {
        console.log("Received:", message);
    });
});
