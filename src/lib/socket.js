import io from "socket.io-client";
import { baseUrl } from '../utilities/config'

let socket = null;

const connectServer = (userId, cb) => {
    socket = io(
        baseUrl,
        {
            // reconnection: true,
            // reconnectionDelay: 1000,
            // reconnectionDelayMax: 5000,
            // reconnectionAttempts: Infinity,
            auth: {
                userId: userId,
            },
            // query: {
            //     "my-key": userId
            //
            // }
        }
    );
    cb(socket);
}


export { socket, connectServer };



