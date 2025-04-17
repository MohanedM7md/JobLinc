import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css";
import store from "@store/store.ts";
export type AppStore = typeof store;
import { Provider } from "react-redux";
import App from "./App.tsx";

//async function enableMocking() {
//  if (process.env.NODE_ENV !== "development") {
//    return;
//  }
//
//  const { worker } = await import("./__mocks__/msw/browser.ts");
//
//  return worker.start();
//}
/* enableMocking().then(() => { */
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
/* }); */
