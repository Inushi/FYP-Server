const http = require("http")
const server = http.createServer()
const {Server} = require("socket.io")
const io = new Server(server)

const PORT = process.env.PORT || 3700;

const signalLvel = -150;

io.on("connection", (socket) => {
    socket.on("data-retrieve", (data) => {
        console.log(data);
        io.emit("data-retrieve", data);

        if(signalLvel < -120){
            let obj = JSON.parse(data)
            // if()
        }
        
    });

    socket.on("disconnect", () => {

    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})