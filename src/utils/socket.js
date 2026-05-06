// lib/socket.js
import { io } from "socket.io-client";

export const socket = io("http://192.168.31.42:4040", {
  autoConnect: false,
});

export const connectWS = () => {
  return io("http://192.168.31.42:4040")
}