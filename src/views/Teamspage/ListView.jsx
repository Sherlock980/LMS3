import React, { useContext, useState, useEffect } from 'react';
import DataTable from './DataTable';
import AlertList from '../../comp/Layout/AlertList';
import { TeamsContext } from '../../services/TeamsContext';
import SearchBar from '../../comp/SearchBar/SearchBar'


function ListView() {
  const { api, viewModel } = useContext(TeamsContext); // Using useContext hook to access api and viewModel
  const [data, setData] = useState([]);
  const [sortCol, setSortCol] = useState(viewModel.list.options.sortCol); // Updated to use viewModel
  const [sortDir, setSortDir] = useState(viewModel.list.options.sortDir); // Updated to use viewModel
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

  const handleDelete = async (dataId) => {
    const item = data.find(item => item.id === dataId);

    try {
      await api.delete(dataId);
      setData(data.filter(team => team.id !== dataId));
      addAlert(`${item[viewModel.nameCol]} successfully deleted.`, 'success'); // Specific item name in alert
    } catch (error) {
      addAlert(`Failed to delete ${item[viewModel.nameCol]}.`, 'error'); // Specific item name in error
    }
  };

  const handleSort = (colName) => {
    setSortCol(colName);
    setSortDir(sortCol === colName && sortDir === 'asc' ? 'desc' : 'asc');
  };

  const handleReset = async () => {
    try {
      await api.reset(); // Reset the storage to initial state
      setSortCol(viewModel.defaultSortCol);
      setSortDir(viewModel.defaultSortDir);
      setFilterStr('');
      setFilterText('');
      const updatedData = await api.list(); // Fetch updated list
      setData(updatedData);
      setIsReset(false); // Resetting the isReset state
      addAlert(viewModel.resetSuccessMessage || "Data has been reset.", 'success'); // Fallback message
    } catch (error) {
      addAlert(viewModel.resetErrorMessage || "Failed to reset data.", 'error'); // Fallback error message
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
    const fetchData = async () => {
      try {
        // Ensure api properties are set to current state before fetching
        api.sortCol = sortCol;
        api.sortDir = sortDir;
        api.filterStr = filterStr;
        const updatedData = await api.list();
        console.log("Fetched data:", updatedData);
        setData(updatedData);
        setIsReset(false); // Reset state after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., add to alertList)
      }
    };

    fetchData();
  }, [api, sortCol, sortDir, filterStr, isReset, alertList]);
  console.log("Data to be rendered:", data);
  return (
    data && (
      <div>
        <AlertList alerts={alertList} onDismiss={dismissAlert} />
        <SearchBar 
          onSearchHandler={onSearchHandler} 
          filterText={filterText} 
          setFilterText={setFilterText}
        />
        <DataTable
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

export default ListView;
