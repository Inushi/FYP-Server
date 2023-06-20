const http = require("http")
const server = http.createServer()
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

const signalLvel = -150;

const dataArray = [];


io.on("connection", (socket) => {
    socket.on("data-retrieve", (data) => {
        dataArray.push(data.signal);
        
        io.emit("data-retrieve", data);

        setTimeout(()=>{
            console.log(dataArray);
        }, 20000)
    });

    socket.on("disconnect", () => {

    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

