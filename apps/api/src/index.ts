import { createServer } from "./Server.js";
import { Logger } from "./Logger.js";

const port = process.env.PORT || 3001;
const server = await createServer();

server.listen(port, () => {
  Logger.info(`api running on ${port}`);
});
