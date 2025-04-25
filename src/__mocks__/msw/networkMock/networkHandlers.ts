import { connectsInterface } from "interfaces/networkInterfaces";
import { invitationInterface } from "interfaces/networkInterfaces";
import { http, HttpResponse } from "msw";
import { connectsResponse } from "./connectsDB";
import { invitationsResponse } from "./invitationsDB";
import { ConnectionInterface } from "interfaces/networkInterfaces";
import { connectionresponse } from "./connectionsDB";
import { API_URL } from "@services/api/config";
import { Params } from "react-router-dom";
// import { rest } from 'msw'; // Removed as 'rest' is not exported from 'msw'

// interface ConnectionRequestParams {}

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
interface AcceptConnectionRequestResponse {
  status: "pending" | "accepted" | "rejected";
}
interface AcceptConnectionRequestBody {
  userId: string;
  status: "pending" | "accepted" | "rejected"; 
}
interface acceptParams{
  userId: string;
}
interface RejectConnectionRequestResponse {
  status: "pending" | "accepted" | "rejected";
}
interface RejectConnectionRequestBody {
  userId: string;
  status: "pending" | "accepted" | "rejected"; 
}
interface RejectParams{
  userId: string;
}
const connectionRequests: ConnectionRequestResponse[] = [];

export const connectsHandler = [
    http.get(`${API_URL}connection/feed`, async () => {
      return HttpResponse.json<connectsInterface[]>(connectsResponse, {
        status: 200,
        statusText: "OK",
      });
    }),

  http.get(`${API_URL}connection/received`, async () => {
    return HttpResponse.json<invitationInterface[]>(invitationsResponse, {
      status: 200,
      statusText: 'OK',
    });
  }),
  
  http.get(`${API_URL}connection/connected`, async () => {
    return HttpResponse.json<ConnectionInterface[]>(connectionresponse, {
      status: 200,
      statusText: 'OK',
    });
  }),
  // firstname : "User" lastname : "one" mutualConnections : 0 profilePicture : "/placeholder/profile.png" time : "2025-04-20T00:21:17.247Z" userId : "68043cca6ac43f891c864f2e"


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
  http.post<{}, AcceptConnectionRequestBody>(
    `${API_URL}connection/:userId/respond`,
    async ({ request, params }) => {
      try {
        // Extract userId from the URL parameters
        const { userId } = params as acceptParams;
  
        // Extract status from the request body
        const { status } = await request.json();
  
        // Create the accept connection response object
        const acceptConnectionResponse: AcceptConnectionRequestResponse = {
          status,
        };
  
        console.log("Processed Connection Request:", { userId, status });
  
        // Return a successful response
        return HttpResponse.json({
          status: 200,
          statusText: `Connection request for user ${userId} ${status} successfully.`,
          data: acceptConnectionResponse,
        });
      } catch (error) {
        console.error("Error processing connection request:", error);
  
        // Handle any internal errors
        return HttpResponse.json({
          status: 500,
          statusText: "Internal server error while processing the request.",
        });
      }
    }
  ),
  http.post<{}, RejectConnectionRequestBody>(
    `${API_URL}connection/:userId/respond`,
    async ({ request, params }) => {
      try {
        const { userId } = params as RejectParams;
  
        const { status } = await request.json();
  
        const rejectConnectionResponse: RejectConnectionRequestResponse = {
          status,
        };
  
        console.log("Processed Connection Request:", { userId, status });
  
        return HttpResponse.json({
          status: 200,
          statusText: `Connection request for user ${userId} ${status} successfully.`,
          data: rejectConnectionResponse,
        });
      } catch (error) {
        console.error("Error processing connection request:", error);
  
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