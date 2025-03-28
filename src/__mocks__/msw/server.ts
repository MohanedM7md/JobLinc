import { setupServer } from "msw/node";
import { msghandlers } from "./ChatMock/msgHandlers";
import { postHandler } from "./PostMock/postHandlers";
export const server = setupServer(...msghandlers, ...postHandler);
