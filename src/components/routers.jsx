import React from "react";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Profilcli from "./profilcli";
import Profilpres from "./profilpres";
import Register from "./register";
import Home from "./home";
import Homecli from "./homecli";
import ServiceList from "./ServiceList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profilcli" element={<Profilcli />} />
      <Route path="/profilpres" element={<Profilpres />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/homecli" element={<Homecli/>}/>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/services" element={<ServiceList />} />
      </Routes>
  );
};

export default Routers;
