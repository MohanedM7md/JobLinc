import { BlockedUserInterface, connectsInterface } from "interfaces/networkInterfaces";
import { invitationInterface } from "interfaces/networkInterfaces";
import { http, HttpResponse } from "msw";
import { connectsResponse } from "./connectsDB";
import { invitationsResponse } from "./invitationsDB";
import { ConnectionInterface } from "interfaces/networkInterfaces";
import { connectionresponse } from "./connectionsDB";
import { userconnectionresponse } from "./userConnectionsDB";
import { blockedUsersResponse } from "./blockedDB";
import { API_URL } from "@services/api/config";

interface ConnectionRequestResponse {
  userId: string;
}
interface ConnectionRequestBody {
  userId: string;   
}
interface changeConnectionStatusRequestBody {
  userId: string;
  status: "Blocked" | "Unblocked" | "Canceled";
}
interface changeConnectionStatusResponse {
  status: "Blocked" | "Unblocked" | "Canceled";

}
interface changeConnectionStatusParams{
  userId: string;
  status: "Blocked" | "Unblocked" | "Canceled";
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
  http.get(`${API_URL}connection/blocked`, async () => {
    return HttpResponse.json<BlockedUserInterface[]>(blockedUsersResponse, {
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

  http.get(`${API_URL}connection/:userId/all`, async () => {
    return HttpResponse.json<ConnectionInterface[]>(userconnectionresponse, {
      status: 200,
      statusText: 'OK',
    });
  }),
  http.get(`${API_URL}connection/:userId/mutual`, async () => {
    return HttpResponse.json<ConnectionInterface[]>(userconnectionresponse, {
      status: 200,
      statusText: 'OK',
    });
  }),
  
  
  http.post<{}, ConnectionRequestBody>(
    `${API_URL}connections/:userId`,
    async ({ params }) => {
      try {
        const userId = (params as { userId: string })?.userId;
  
        if (!userId) {
          throw new Error("Missing userId in route parameters.");
        }
  
        const connectionRequest: ConnectionRequestResponse = {
          userId,
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
        const { userId } = params as acceptParams;
  
        const { status } = await request.json();
  
        const acceptConnectionResponse: AcceptConnectionRequestResponse = {
          status,
        };
  
        console.log("Processed Connection Request:", { userId, status });
  
        return HttpResponse.json({
          status: 200,
          statusText: `Connection request for user ${userId} ${status} successfully.`,
          data: acceptConnectionResponse,
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
  http.post<{}, changeConnectionStatusRequestBody>(
    `${API_URL}connection/:userId/change`,
    async ({ request, params }) => {
      try {
        const { userId } = params as changeConnectionStatusParams;
  
        const { status } = (await request.json()) as changeConnectionStatusRequestBody;
  
        const changeConnectionStatusResponse: changeConnectionStatusResponse = {
          status,
        };
  
        console.log("Processed Connection Request:", { userId, status });
  
        return HttpResponse.json({
          status: 200,
          statusText: `Connection request for user ${userId} ${status} successfully.`,
          data: changeConnectionStatusResponse,
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