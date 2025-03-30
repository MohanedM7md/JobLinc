import PageChatSystem from "@chatComponent/PageChat/PageChatSystem";

import { ChatIdProvider } from "@context/ChatIdProvider";
import { NetworkUserIdProvider } from "@context/NetworkUserIdProvider";

export function Messaging() {
  return (
    <>
      <div className="h-[100vh] overflow-hidden">
        <ChatIdProvider>
          <NetworkUserIdProvider>
            <PageChatSystem />
          </NetworkUserIdProvider>
        </ChatIdProvider>
      </div>
    </>
  );
}

export default Messaging;
