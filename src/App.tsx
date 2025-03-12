import React from "react";
import { Route, Routes } from "react-router-dom";
import PlayGround from "./pages/PlayGround";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ChatSideBar } from "./components/chat/ChatSidebar";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" />

        <Route
          path="/playground"
          element={
            <ThemeProvider>
              <Provider store={store}>
                <PlayGround />
                {/* <ChatSideBar /> */}
              </Provider>
            </ThemeProvider>
          }
        />

        <Route
          path="/*"
          element={<div className="text-red-500">Erorr 404</div>}
        />
      </Routes>
    </>
  );
}

export default App;
