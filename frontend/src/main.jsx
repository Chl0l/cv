import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ExperienceProvider } from "./contexts/ExperienceContext";
import { TaskProvider } from "./contexts/TaskContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <UserProvider>
      <ExperienceProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ExperienceProvider>
    </UserProvider>
  </BrowserRouter>
);
