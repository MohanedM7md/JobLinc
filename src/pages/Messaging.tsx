import { useEffect, useState } from "react";
import PageChatSystem from "@chatComponent/PageChat/PageChatSystem";
import { UserProvider } from "@chatComponent/mockUse"; // Adjust the import path as necessary
import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";
import { useAppSelector } from "@store/hooks";

export function MessagingPage() {
  const [userId, setUserId] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const user = useAppSelector((state) => state.user);
  console.log("Redux store in messaginh", user);
  return (
    <>
      {userId ? (
        <div className="h-[100vh] overflow-hidden">
          <UserProvider userId={userId}>
            <ChatIdProvider>
              <NetworkUserIdProvider>
                <PageChatSystem />
              </NetworkUserIdProvider>
            </ChatIdProvider>
          </UserProvider>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h2>Please Enter Your User ID</h2>
          <input
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
              textAlign: "center",
              marginBottom: "10px",
            }}
            type="text"
            value={userId}
            onChange={handleInputChange}
            placeholder="Enter User ID"
          />
        </div>
      )}
    </>
  );
}

export default MessagingPage;
