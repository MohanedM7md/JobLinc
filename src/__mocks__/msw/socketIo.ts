const socket = new WebSocket("wss://chat.example.com");
socket.onopen = () => {
  console.log("Connected to WebSocket server");
  socket.send("Hello from client");
};
