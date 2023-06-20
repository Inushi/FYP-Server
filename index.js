const http = require("http")
const server = http.createServer()
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

const signalLvel = -150;

const dataArray = [];


io.on("connection", (socket) => {
    socket.on("data-retrieve", (data) => {
        dataArray.push(data);
        
        io.emit("data-retrieve", data);

        setTimeout(()=>{

        }, 20000)
        console.log(dataArray);

    });

    socket.on("disconnect", () => {

    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

