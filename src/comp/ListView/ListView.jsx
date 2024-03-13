import React, { useContext, useState, useEffect } from 'react';
import DataTable from '../DataTable/DataTable';
import AlertList from '../Layout/AlertList';
import { TeamsContext } from '../../services/TeamsContext';

function ListView() {
  const { api, viewModel } = useContext(TeamsContext);
  const [data, setData] = useState([]);
  const [sortCol, setSortCol] = useState(viewModel.list.options.sortCol);
  const [sortDir, setSortDir] = useState(viewModel.list.options.sortDir);
  const [filterStr, setFilterStr] = useState('');
  const [filterText, setFilterText] = useState('');
  const [alertList, setAlertList] = useState([]);
  const [isReset, setIsReset] = useState(false);

  const addAlert = (title, type = 'info') => {
    setAlertList(current => [...current, { id: Date.now(), title, type }]);
  };

  const dismissAlert = (alertId) => {
    setAlertList(current => current.filter(alert => alert.id !== alertId));
  };

  const handleDelete = async (itemId) => {
    const item = data.find(item => item.id === itemId);
    const itemName = item[viewModel.nameCol];

    try {
      await api.delete(itemId);
      setData(data.filter(dataItem => dataItem.id !== itemId));
      addAlert(`${itemName} successfully deleted.`, 'success');
    } catch (error) {
      addAlert(`Failed to delete ${itemName}.`, 'error');
    }
  };

  const handleSort = (colName) => {
    setSortCol(colName);
    setSortDir(sortCol === colName && sortDir === 'asc' ? 'desc' : 'asc');
  };

  const handleReset = async () => {
    try {
      await api.reset();
      setSortCol(viewModel.defaultSortCol);
      setSortDir(viewModel.defaultSortDir);
      setFilterStr('');
      setFilterText('');
      const updatedData = await api.list();
      setData(updatedData);
      setIsReset(false);
      addAlert(viewModel.resetSuccessMessage || "Data has been reset.", 'success');
    } catch (error) {
      addAlert(viewModel.resetErrorMessage || "Failed to reset data.", 'error');
    }
  };
  
  const onSearchHandler = (searchTerm) => {
    setFilterText(searchTerm);
  
    if (searchTerm.length > 2 || searchTerm === '') {
      setFilterStr(searchTerm);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        api.sortCol = sortCol;
        api.sortDir = sortDir;

        const allData = await api.list();
        let filteredData = allData;
    
        if (filterStr.trim()) {
          const searchTermLower = filterStr.toLowerCase();
          const searchableFields = viewModel.list.columns.map(column => column.name);
          
          filteredData = allData.filter(item =>
            searchableFields.some(field => 
              item[field] && item[field].toString().toLowerCase().includes(searchTermLower)
            )
          );
        }
    
        setData(filteredData);
      } catch (error) {
      }
    };
    
    fetchData();
  }, [api, sortCol, sortDir, filterStr, isReset, viewModel]);
  
  return (
    data && (
      <div>
        <AlertList alerts={alertList} onDismiss={dismissAlert} />
        <DataTable
          data={data}
          sortCol={sortCol}
          sortDir={sortDir}
          columns={viewModel.list.columns}
          onHandleSort={handleSort}
          onHandleDelete={handleDelete}
          handleReset={handleReset}
          viewModel={viewModel}
          filterText={filterText}
          onSearchHandler={onSearchHandler}
          setFilterText={setFilterText}
        />
      </div>
    )
  );
}

export default ListView;
