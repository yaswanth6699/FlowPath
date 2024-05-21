import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChatFlowProvider } from "./hooks/useChatFlow.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ChatFlowProvider>
        <App />
      </ChatFlowProvider>
    </DndProvider>
  </React.StrictMode>
);
