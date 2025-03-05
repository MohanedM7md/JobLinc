import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./context/ThemeProvider";
import { ThemeProvider } from "./context/ThemeProvider";

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
    </>
  );
}

export default App;
