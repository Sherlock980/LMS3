import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Homepage from "../Homepage/Homepage";
import TeamsPage from "../Teamspage/Teamspage";
import PlayersPage from "../PlayersPage/PlayersPage";
import NoMatch from "../../comp/Router/NoMatch";

import { getContext } from '../../services/ContextFactory';
import EditTeam from '../Teamspage/EditTeam'; 
import "./App.css";
import Layout from '../../comp/Layout/Layout';
import EditPlayer from '../PlayersPage/EditPlayer';
import { TeamsContext, PlayersContext } from '../../services/ContextFactory';
function App() {
  // Dynamically obtain the TeamsContext and PlayersContext
  const TeamsContext = getContext("teams");
  const PlayersContext = getContext("players");

  return (
    // You don't directly access .api or .viewModel here. Instead, you pass the context object itself to the provider
    <TeamsContext.Provider value={{ api: TeamsContext.api, viewModel: TeamsContext.viewModel }}>
      <PlayersContext.Provider value={{ api: PlayersContext.api, viewModel: PlayersContext.viewModel }}>
        <Routes>
          <Route path="/" element={<Layout title="Blizzard Snowboarding League" />}>
            <Route index element={<Homepage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="players" element={<PlayersPage />} />
            <Route path="add-team" element={<EditTeam isCreate={true} />} />
            <Route path="edit-team/:id" element={<EditTeam isCreate={false} />} />
            <Route path="add-player" element={<EditPlayer isCreate={true} />} /> {/* Added route for adding a player */}
            <Route path="edit-player/:id" element={<EditPlayer isCreate={false} />} /> {/* Added route for editing a player */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </PlayersContext.Provider>
    </TeamsContext.Provider>
  );
}

export default App;

