import "module-alias/register";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieSession from "cookie-session";

import { socketIoInstance } from "./socket";
import { authRoutes } from "./router";
import { dbInit } from "./Services";

config();
const app = express();

//Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: process.env.COOKIE_SESSION,
    httpOnly: true,
  })
);

app.use("/user", authRoutes);
const Server = createServer(app);

//socket io instances
const io = socketIoInstance(Server);
dbInit();

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
});

try {
  Server.listen(process.env.DEV_PORT || 4000, () => {
    console.log(process.env.DEV_BASE_URL || "http://localhost:4000");
  });
} catch (e) {
  console.log("An error occured: " + e);
}
