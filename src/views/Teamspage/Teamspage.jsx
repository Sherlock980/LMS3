
import TeamsAside from './TeamsAside';
import TeamsBottom from './TeamsBottom';
import TeamListView from './TeamListView';
import React, { useContext } from 'react';
import { TeamsContext } from '../../services/TeamsContext';


function TeamsPage() {
  const { api, viewModel } = useContext(TeamsContext);
  return (
    <div className="container mt-5 pt-5">
      <div className="tab-pane" id="teams" role="tabpanel" aria-labelledby="teams-tab"></div>
        <div className="row">
          <TeamsAside />
          <div className="col-md-9 order-md-2">
          <TeamListView viewModel={viewModel} api={api} />
          <TeamsBottom />
          </div>
          </div>

    </div>
  );
}

export default TeamsPage;




