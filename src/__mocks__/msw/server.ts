import { setupServer } from "msw/node";
import { msghandlers } from "./ChatMock/msgHandlers";
import { postHandler } from "./PostMock/postHandlers";
import { connectsHandler } from "./networkMock/networkHandlers";
export const server = setupServer(...msghandlers, ...postHandler,...connectsHandler);
