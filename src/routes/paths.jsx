import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import RouteGuard from "../components/RouteGuard";
import { ForgotPassword } from "../pages/ForgotPassword";
import { NotFound } from "../pages/NotFound";
import UserInfo from "../components/UserInfo";
import CreateContact from "../pages/CreateContact";

const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/info/:id" element={<UserInfo />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;
