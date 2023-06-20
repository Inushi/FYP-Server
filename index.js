const { cluster } = require("./services/cluster")

const http = require("http")
const server = http.createServer()
const { Server } = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

const signalLvel = -150;

const dataArray = [];


io.on("connection", (socket) => {
    socket.on("data-retrieve", (data) => {

        dataArray.push(JSON.parse(data));
        io.emit("data-retrieve", data);

        if (dataArray.length && dataArray.length%5 == 0) {
            cluster(dataArray)
        } else {
            console.log("Pass");
        }
    });

    socket.on("disconnect", () => {

    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

