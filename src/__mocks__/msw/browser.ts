import { setupWorker } from "msw/browser";
import { postHandler } from "./PostMock/postHandlers";
import { msghandlers } from "./ChatMock/msgHandlers";
export const worker = setupWorker(...postHandler, ...msghandlers);
