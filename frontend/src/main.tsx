// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import RouterSetup from "./components/RouterSetup";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterSetup /> {/* Folosește RouterSetup aici */}
  </React.StrictMode>
);
