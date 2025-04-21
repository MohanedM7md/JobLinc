import { connectsInterface } from "interfaces/networkInterfaces";
import { invitationInterface } from "interfaces/networkInterfaces";
import { http, HttpResponse } from "msw";
import { connectsResponse } from "./connectsDB";
import { invitationsResponse } from "./invitationsDB";
import { ConnectionInterface } from "interfaces/networkInterfaces";
import { connectionresponse } from "./connectionsDB";
import { API_URL } from "@services/api/config";
interface ConnectionRequestParams {}

interface ConnectionRequestResponse {
  requestId: string;
  targetId: string;
  userId: string;
  requestedAt: Date;
  status: "pending" | "accepted" | "rejected";
}
interface ConnectionRequestBody {
  targetId: string; 
  userId: string;   
  requestedAt: string; 
  status: "pending" | "accepted" | "rejected"; 
}
const connectionRequests: ConnectionRequestResponse[] = [];

export const connectsHandler = [
    http.get(`${API_URL}connection/feed`, async ({ params }) => {
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
  
  http.get(`${API_URL}connection/connected`, async ({ params }) => {
    return HttpResponse.json<ConnectionInterface[]>(connectionresponse, {
      status: 200,
      statusText: 'OK',
    });
  }),

    // http.get(`${API_URL}connection/:userId/all`, async ({ params }) => {
  //   return HttpResponse.json<ConnectionInterface[]>(connectionresponse, {
  //     status: 200,
  //     statusText: 'OK',
  //   });
  // }),
  
  
  http.post<{}, ConnectionRequestBody>(
    `${API_URL}connections/add`,
    async ({ request }) => {
      try {
        const { targetId, userId, requestedAt, status } = await request.json();
  
        const connectionRequest: ConnectionRequestResponse = {
          requestId: connectionRequests.length.toString(),
          targetId,
          userId,
          requestedAt: new Date(requestedAt),
          status,
        };
  
        console.log("Received Connection Request:", connectionRequest);
  
        connectionRequests.push(connectionRequest);
  
        return HttpResponse.json({
          status: 200,
          statusText: "Connection request successfully added.",
          data: connectionRequest,
        });
      } catch (error) {
        console.error("Error handling connection request:", error);
  
        return HttpResponse.json({
          status: 500,
          statusText: "Internal server error while processing the request.",
        });
      }
    }
  ),
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