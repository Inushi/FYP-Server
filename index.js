const http = require("http")
const server = http.createServer()
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

io.on("connection", (socket) => {
    socket.on("data-retrieve", (data) => {
        console.log(data);
        io.emit("data-retrieve", data);
    });

    socket.on("disconnect", () => {

    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})