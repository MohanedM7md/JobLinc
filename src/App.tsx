import { Route, Routes } from "react-router-dom";
import PlayGround from "./pages/PlayGround";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" />

        <Route
          path="/playground"
          element={
            <ThemeProvider>
              <PlayGround />
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
