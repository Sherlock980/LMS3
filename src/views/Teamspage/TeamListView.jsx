import React, { useContext, useState, useEffect } from 'react';
import TeamsTable from './TeamsTable';
import AlertList from '../../comp/Layout/AlertList';
import { TeamsContext } from '../../services/TeamsContext';
import SearchBar from '../../comp/SearchBar/SearchBar'

function TeamListView() {
  const { api, viewModel } = useContext(TeamsContext);
  const [teams, setTeams] = useState([]);
  const [alertList, setAlertList] = useState([]);

  const [sortCol, setSortCol] = useState(viewModel.list.options.sortCol);
  const [sortDir, setSortDir] = useState(viewModel.list.options.sortDir);
  
  const [filterStr, setFilterStr] = useState('');
  const [filterText, setFilterText] = useState('');

  const addAlert = (title, type) => {
    setAlertList(current => [...current, { id: Date.now(), title, type }]);
  };

  const dismissAlert = (alertId) => {
    setAlertList(current => current.filter(alert => alert.id !== alertId));
  };

  const handleDelete = async (teamId) => {
    try {
      await api.delete(teamId);
      setTeams(teams.filter(team => team.id !== teamId));
      addAlert('Team successfully deleted.', 'success');
    } catch (error) {
      addAlert('Failed to delete team.', 'error');
    }
  };

  const handleReset = async () => {
    try {
      await api.reset();
      const updatedTeams = await api.list();
      setTeams(updatedTeams);
      addAlert('Teams data has been reset.', 'success');
    } catch (error) {
      console.error('Failed to reset the teams data:', error);
      addAlert('Failed to reset the teams data.', 'error');
    }
  };

  const handleSort = async (colName) => {
    console.log(`Current sorting parameters:`, { sortCol, sortDir });
    const newSortDir = sortCol === colName && sortDir === 'asc' ? 'desc' : 'asc';
    
    setSortCol(colName);
    setSortDir(newSortDir);

    console.log(`Updated sorting parameters to:`, { colName, newSortDir });

    const sortedTeams = await api.list({ sortCol: colName, sortDir: newSortDir });
    console.log("Sorted Teams:", sortedTeams);
    setTeams(sortedTeams);
};


  const onSearchHandler = (searchTerm) => {
    console.log("Search term updated:", searchTerm);
    setFilterStr(searchTerm);
  };


useEffect(() => {
  
  api.sortCol=sortCol;
  api.sortDir=sortDir;
  api.filterStr=filterStr;
  const fetchTeams = async () => {
    try {
      const teamsData = await api.list({ sortCol, sortDir, filterStr });
      setTeams(teamsData);
    } catch (error) {
      addAlert('Failed to fetch teams.', 'error');
    }
  };

  if (filterStr.length > 2 || filterStr === '') {
    fetchTeams();
  }
}, [api, sortCol, sortDir, filterStr]);

  

  return (
    <div>
      <AlertList alerts={alertList} onDismiss={dismissAlert} />
      <SearchBar 
        onSearchHandler={onSearchHandler} 
        filterText={filterText} 
        setFilterText={setFilterText}
      />
      <TeamsTable
        teams={teams}
        sortCol={sortCol}
        sortDir={sortDir}
        columns={viewModel.list.columns}
        onHandleDelete={handleDelete}
        onHandleSort={handleSort}
        handleReset={handleReset}
      />
    </div>
  );
}

export default TeamListView;


