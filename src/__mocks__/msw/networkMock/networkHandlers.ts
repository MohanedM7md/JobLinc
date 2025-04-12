import { connectsInterface } from "interfaces/networkInterfaces";
import { invitationInterface } from "interfaces/networkInterfaces";
import { http, HttpResponse } from "msw";
import { connectsResponse } from "./connectsDB";
import { invitationsResponse } from "./invitationsDB";
import { API_URL } from "@services/api/config";

export const connectsHandler = [
    http.get(`${API_URL}MyNetwork`, async ({ params }) => {
      return HttpResponse.json<connectsInterface[]>(connectsResponse, {
        status: 200,
        statusText: "OK",
      });
    }),
    http.get(`${API_URL}pendinginvitations`, async ({ params }) => {
    return HttpResponse.json<invitationInterface[]>(invitationsResponse, {
      status: 200,
      statusText: 'OK',
    });
  }),
];
// export const invitationsHandler = [
//   http.get(`${baseURL}MyNetwork`, async ({ params, signal }) => {
//     try {
//       const { count = 10 } = params; 
//       const invitations = await getPendingInvitations(count, signal);

//       return HttpResponse.json(invitations, {
//         status: 200,
//         statusText: 'OK',
//       });
//     } catch (error) {
//       console.error('Error handling invitations request:', error);

//       return HttpResponse.json(
//         { message: 'Failed to fetch pending invitations' },
//         {
//           status: 500,
//           statusText: 'Internal Server Error',
//         }
//       );
//     }
//   }),
// ];