import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../../comp/Header/Header";
import Homepage from "../Homepage/Homepage";
import Teamspage from "../Teamspage/Teamspage";
import Footer from "../../comp/Footer/Footer";
import NoMatch from "../../comp/Router/NoMatch";

const App = () => {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/teams" element={<Teamspage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
