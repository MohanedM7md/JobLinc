import { connectsInterface } from "interfaces/networkInterfaces";
import { http, HttpResponse } from "msw";
import { connectsResponse } from "./connectsDB";
const baseURL = "/api/";
export const connectsHandler = [
    http.get(`${baseURL}MyNetwork`, async ({ params }) => {
      return HttpResponse.json<connectsInterface[]>(connectsResponse, {
        status: 200,
        statusText: "OK",
      });
    }),
]