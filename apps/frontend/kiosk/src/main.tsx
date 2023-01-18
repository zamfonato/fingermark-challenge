import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";

import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
