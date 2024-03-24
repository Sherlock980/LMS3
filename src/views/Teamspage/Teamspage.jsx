import TeamsAside from './TeamsAside';
import ListView from '../../comp/ListView/ListView';
import React, { useContext } from 'react';
import { TeamsContext } from '../../services/contexts';

function TeamsPage() {
  const { api, viewModel } = useContext(TeamsContext);
  return (
    <div className="container mt-5 pt-5">
      <div className="tab-pane" id="teams" role="tabpanel" aria-labelledby="teams-tab"></div>
      <div className="row">
        <TeamsAside />
        <div className="col-md-9 order-md-2">
        <ListView entityType="teams" />
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;




