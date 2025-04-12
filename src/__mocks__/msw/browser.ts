import { setupWorker } from "msw/browser";
import { postHandler } from "./PostMock/postHandlers";
import { msghandlers } from "./ChatMock/msgHandlers";
import { connectsHandler } from "./networkMock/networkHandlers";
export const worker = setupWorker(...postHandler, ...msghandlers, ...connectsHandler);