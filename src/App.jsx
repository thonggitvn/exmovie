import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import MovieDetailPage from "./pages/movie-detail";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomeTemplate from "./templates/HomeTemplate";
import AuthTemplate from "./templates/AuthTemplate";
import { renderRoutes } from "./routers";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            {/* ---------
            <Route path="" element={<HomeTemplate/>}>
                <Route path="" element={<HomePage/>} />
                <Route path="/detail" element={<MovieDetailPage/>} />
            </Route>
            ---------
            <Route path="" element={<AuthTemplate/>}>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
            </Route>
            --------- */}
            {renderRoutes()}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
