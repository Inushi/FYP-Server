// const { execute } = require("./services/ransac")

const http = require("http")
const server = http.createServer()
const { Server } = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

const signalLvel = -150;

const dataArray = [];


io.on("connection", (socket) => {
    socket.on("data-retrieve", (data) => {
        console.log(data);
        dataArray.push(JSON.parse(data).signal);
        io.emit("data-retrieve", data);

        if (dataArray.length >= 10) {
            // execute(dataArray)
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

