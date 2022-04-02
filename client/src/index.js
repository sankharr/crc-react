import React from "react";
import "./index.css";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./routes/testPage";
import ReservationCalendar from "./routes/reservationCalendar";
import CurrentReservations from "./routes/currentReservations";
import PastReservations from "./routes/pastReservations";
import Inventory from "./routes/inventory"
import Settings from "./routes/settings"

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="testPage" element={<TestPage />} />
          <Route path="reservationCalendar" element={<ReservationCalendar />} />
          <Route path="currentReservations" element={<CurrentReservations />} />
          <Route path="pastReservations" element={<PastReservations />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      {/* <App /> */}
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
