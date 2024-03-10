import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Homepage from "../Homepage/Homepage";
import TeamsPage from "../Teamspage/Teamspage";

import NoMatch from "../../comp/Router/NoMatch";


import appViewModel from '../../services/appViewModel.meta';

import { TeamsContext } from '../../services/TeamsContext';
import EditTeam from '../Teamspage/EditTeam'; 
import "./App.css";
import Layout from '../../comp/Layout/Layout';

function App() {
  const api = appViewModel.getApi("teams");
  const viewModel = appViewModel.entities["teams"];
  return (
    <TeamsContext.Provider value={{ api, viewModel }}>
      <Routes>
        <Route path="/" element={<Layout title="Blizzard Snowboarding League" />}>
          <Route index element={<Homepage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="add-team" element={<EditTeam isCreate={true} />} />
          <Route path="edit-team/:id" element={<EditTeam isCreate={false} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </TeamsContext.Provider>
  );
}


export default App;

