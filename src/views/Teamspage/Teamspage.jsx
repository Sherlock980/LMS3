import React from 'react';
import TeamsAside from './TeamsAside';
import TeamsBottom from './TeamsBottom';
import TeamListView from './TeamListView';
import AppViewModel from '../../services/appViewModel.meta';

function TeamsPage() {
  const localStorage = AppViewModel.getApi('teams');

  return (
    <div className="container mt-5 pt-5">
      <div className="tab-pane" id="teams" role="tabpanel" aria-labelledby="teams-tab"></div>
        <div className="row">
          <TeamsAside />
          <div className="col-md-9 order-md-2">
          <TeamListView  viewModel={AppViewModel} model={localStorage} ></TeamListView>
          <TeamsBottom />
          </div>
          </div>
    </div>
  );
}

export default TeamsPage;




