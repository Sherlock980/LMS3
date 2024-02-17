import React, { useState, useEffect } from 'react';
import TeamsTable from './TeamsTable';
import AlertList from '../../comp/Layout/AlertList';


function TeamListView({ viewModel, model }) {
  const [teams, setTeams] = useState([]);
  const [alertList, setAlertList] = useState([]);

  const sortCol = model.model.list.options.sortCol;
  const sortDir = model.model.list.options.sortDir;

  function addAlert(title, type) {
    const newAlert = { id: Date.now(), title, type };
    setAlertList(alertList => [...alertList, newAlert]);
  }
  
  const dismissAlert = (alertId) => {
    setAlertList(currentAlerts => currentAlerts.filter(alert => alert.id !== alertId));
  };
  
  const handleDelete = async (teamId) => {
    const teamToDelete = teams.find(team => team.id === teamId);
    const teamName = teamToDelete ? teamToDelete.name : 'The team';
  
    try {
      await model.delete(teamId);
      const updatedTeams = await model.list();
      setTeams(updatedTeams);
      addAlert(`${teamName} successfully deleted.`, 'success');
    } catch (error) {
      console.error(`Failed to delete ${teamName}:`, error);
      addAlert(`Failed to delete ${teamName}.`, 'error');
    }
  };
  

  const handleReset = async () => {
    try {
      await model.reset();
      const updatedTeams = await model.list();
      setTeams(updatedTeams);
 
    } catch (error) {
      console.error('Failed to reset the teams data:', error);
      addAlert('Failed to reset the teams data.', 'error');
    }
  };

  const handleSort = async (newSortCol) => {
    let newSortDir = 'asc';
    if (model.model.list.options.sortCol === newSortCol) {
      newSortDir = model.model.list.options.sortDir === 'asc' ? 'desc' : 'asc';
    }

    model.model.list.options.sortCol = newSortCol;
    model.model.list.options.sortDir = newSortDir;

    try {
      const sortedTeams = await model.list();
      setTeams(sortedTeams);

    } catch (error) {
      console.error(`Failed to sort teams by ${newSortCol}:`, error);
      addAlert(`Failed to sort teams by ${newSortCol}.`, 'error');
    }
  };


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await model.list();
        setTeams(teamsData);
      } catch (error) {
        addAlert('Failed to fetch teams.', 'error');
      }
    };

    fetchTeams();
  }, [model]);

  return (
    <div className="col-12">
      <AlertList alerts={alertList} onDismiss={dismissAlert} />

      <TeamsTable
        teams={teams}
        sortCol={sortCol}
        sortDir={sortDir}
        viewModel={viewModel}
        onHandleDelete={handleDelete}
        onHandleSort={handleSort}
        handleReset={handleReset}
      />
    </div>
  );
}

export default TeamListView;


