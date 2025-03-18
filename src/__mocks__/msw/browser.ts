import { setupWorker } from "msw/browser";
import { handler } from "./handlers";
import { msghandlers } from "./ChatMock/msgHandlers";
export const worker = setupWorker(...handler, ...msghandlers);
