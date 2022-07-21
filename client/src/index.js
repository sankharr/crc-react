import React from "react";
import "./index.css";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

//Route imports
import TestPage from "./pages/testPage";
import ReservationCalendar from "./pages/reservations/reservationCalendar";
import CurrentReservations from "./pages/reservations/currentReservations";
import PastReservations from "./pages/reservations/pastReservations";
import Settings from "./pages/settings";
import CreateReservation from "./pages/reservations/CreateReservation";
import DeviceBrowser from "./pages/devices/deviceBrowser";
import AddDevice from "./pages/devices/addDevice";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <Routes>
          <Route path="/" element={<App />}>
            <Route path="testPage" element={<TestPage />} />
            <Route
              path="reservationCalendar"
              element={<ReservationCalendar />}
            />
            <Route
              path="currentReservations"
              element={<CurrentReservations />}
            />
            <Route path="pastReservations" element={<PastReservations />} />
            <Route path="deviceBrowser" element={<DeviceBrowser />} />
            <Route path="settings" element={<Settings />} />
            <Route path="createReservation" element={<CreateReservation />} />
            <Route path="addDevice" element={<AddDevice />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
