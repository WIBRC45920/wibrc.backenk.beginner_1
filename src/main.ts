import { socketIoInstance } from "./socket";
import { createServer } from "http";
import { Routes } from "./router";
import { config } from "dotenv";
import { dbInit } from "./services";

config();

const Server = createServer(Routes);

//socket io instances
const io = socketIoInstance(Server);
dbInit();

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
});

try {
  Server.listen(process.env.DEV_PORT, () => {
    console.log(process.env.DEV_BASE_URL);
  });
} catch (e) {
  console.log("An error occured: " + e);
}
