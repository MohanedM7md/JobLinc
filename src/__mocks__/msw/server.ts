import { setupServer } from "msw/node";
import { msghandlers } from "./ChatMock/msgHandlers";
export const server = setupServer(...msghandlers);
