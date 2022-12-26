import { Server } from "socket.io";
import { Server as HttpServerType } from "http";

export const socketIoInstance = (server: HttpServerType): Server => {
     return new Server(server, {
        cors: {
            origin: process.env.DEV_ORIGIN,
            methods: ["GET"],
        }
    })
};