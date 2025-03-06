import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ChatSideBar } from "./components/chat/ChatSidebar";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider>
              <Home />
            </ThemeProvider>
          }
        />
      </Routes>
      <ChatSideBar />
    </>
  );
}

export default App;
