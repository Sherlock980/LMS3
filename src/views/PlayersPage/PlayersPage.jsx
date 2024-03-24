import PlayersAside from './PlayersAside';
import ListView from '../../comp/ListView/ListView';
import React, { useContext, useEffect, useState } from 'react';
import { PlayersContext, TeamsContext } from '../../services/contexts';

function PlayersPage() {
  const { api: playersApi, viewModel: playersViewModel } = useContext(PlayersContext);
  const { api: teamsApi } = useContext(TeamsContext);

  return (
    <div className="container mt-5 pt-5">
      <div className="tab-pane" id="players" role="tabpanel" aria-labelledby="players-tab"></div>
      <div className="row">
        <PlayersAside />
        <div className="col-md-9 order-md-2">
          <ListView entityType="players" />
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;