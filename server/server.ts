import http from "http";
import { handleRequest } from "./router.ts";

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(3000, () => {
  console.log("server is running");
});
