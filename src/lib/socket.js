import io from "socket.io-client";
import { baseUrl } from '../utilities/config'

let socket = null;

const connectServer = (cb) => {
    socket = io(baseUrl);
    cb(socket);
}


export { socket, connectServer };



