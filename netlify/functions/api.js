import serverless from "serverless-http";
import { Server } from "../../models/server.js";

const server= new Server()
// server.listen()

export const handler = serverless(server.getApp());
