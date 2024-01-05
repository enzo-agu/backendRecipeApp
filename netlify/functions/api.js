import serverless from "serverless-http";
import { Server } from "../../models/server.js";

const server= new Server()
// server.listen()

const fn = serverless(server.getApp(), { provider: 'aws'});
export const handler = async(event, context) => {
    const result = await fn(event, context);
    return result;
}