import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
    allSockets.push(socket);

    socket.on("message", (message) => {
        console.log(`message recieved: ${message.toString()}`);
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s.send(`${message.toString()}: sent from the server`);
        }
    });

    socket.on("disconnect", () => {
        allSockets = allSockets.filter(x => x != socket);
    });

});