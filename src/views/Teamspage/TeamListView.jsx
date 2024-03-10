import React, { useContext, useState, useEffect } from 'react';
import TeamsTable from './TeamsTable';
import AlertList from '../../comp/Layout/AlertList';
import { TeamsContext } from '../../services/TeamsContext';
import SearchBar from '../../comp/SearchBar/SearchBar'


function TeamListView({ viewModel, api }) {

  const [data, setData] = useState([]);

  const [sortCol, setSortCol] = useState(api.sortCol);
  const [sortDir, setSortDir] = useState(api.sortDir);
  const [filterStr, setFilterStr] = useState('');
  const [filterText, setFilterText] = useState('');
  const [alertList, setAlertList] = useState([]);
  const [isReset, setIsReset] = useState(false);

  const addAlert = (title, type) => {
    setAlertList(current => [...current, { id: Date.now(), title, type }]);
  };

  const dismissAlert = (alertId) => {
    setAlertList(current => current.filter(alert => alert.id !== alertId));
  };

  const handleDelete = async (teamId) => {
    try {
      await api.delete(teamId);
      setData(data.filter(team => team.id !== teamId));
      addAlert('Team successfully deleted.', 'success');
    } catch (error) {
      addAlert('Failed to delete team.', 'error');
    }
  };

  const handleSort = (colName) => {
    setSortCol(colName);
    setSortDir(sortCol === colName && sortDir === 'asc' ? 'desc' : 'asc');
  };

  const handleReset = async () => {
    // Ensure this resets to viewModel defaults and re-fetches the initial data set from the api
    try {
      await api.reset(); // Reset the storage to initial state
      const updatedTeams = await api.list();
      setData(updatedTeams);
      setIsReset(false); // Ensure state is properly reset
      addAlert(viewModel.resetSuccessMessage, 'success');
    } catch (error) {
      console.error(viewModel.resetErrorMessage, error);
      addAlert(viewModel.resetErrorMessage, 'error');
    }
  };
  

  const onSearchHandler = (searchTerm) => {
    console.log('Search term:', searchTerm);
    setFilterText(searchTerm);
  
    if (searchTerm.length > 2 || searchTerm === '') {
      setFilterStr(searchTerm);
      console.log('Filter string set:', searchTerm);
    }
  };
  

  useEffect(() => {
    console.log('useEffect triggered', { sortCol, sortDir, filterStr, isReset });
  
    api.sortCol = sortCol;
    api.sortDir = sortDir;
    api.filterStr = filterStr;
  
    api.list().then((teams) => {
      setData(teams);
      setIsReset(false); // Ensure this is correctly resetting
      console.log('Data fetched and set', teams);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  
  }, [api, sortCol, sortDir, filterStr, isReset, alertList]);
  
  return (
    data && (
      <div>
        <AlertList alerts={alertList} onDismiss={dismissAlert} />
        <SearchBar 
          onSearchHandler={onSearchHandler} 
          filterText={filterText} 
          setFilterText={setFilterText}
        />
        <TeamsTable
          teams={data}
          sortCol={sortCol}
          sortDir={sortDir}
          columns={viewModel.list.columns}
          onHandleSort={handleSort}
          onHandleDelete={handleDelete}
          handleReset={handleReset}
        />
      </div>
    )
  );
}

export default TeamListView;
