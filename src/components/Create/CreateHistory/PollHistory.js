import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { TfiInfoAlt } from 'react-icons/tfi';
import axios from 'axios';
import './PollHistory.css';

const TableHeader = ({ headers, changeSort, pagination }) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th key={header.value} onClick={() => changeSort(header.value)}>
          {header.text}
          {pagination.sortBy !== header.value && (
            <span className='iconn'>{<FaAngleDown style={{ display: 'inline' }} />}</span>
          )}
          {pagination.sortBy === header.value && (
            <span className='iconn'>
              {pagination.descending ? (
                <FaAngleDown style={{ display: 'inline' }} />
              ) : (
                <FaAngleUp style={{ display: 'inline' }} />
              )}
            </span>
          )}
        </th>
      ))}
    </tr>
  </thead>
);

const Checkview = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/read/${id}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '5px',
          margin: '5px',
          width: '30px',
          borderRadius: '8px',
        }}
        onClick={handleClick}
      >
        <AiOutlineEye size={20} />
      </div>
      <div
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '5px',
          margin: '5px',
          width: '30px',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
        onClick={() => handleDelete(id)}
      >
        <MdDeleteOutline size={20} />
      </div>
    </div>
  );
};

const TableRow = ({ dessert, handleDelete }) => (
  <tr key={dessert._id}>
    <td>
      <div className={dessert.status === 'Active' ? 'status-active' : 'status-inactive'} name='a'>
        {dessert.status}
      </div>
    </td>
    <td>
      <div className={dessert.type === 'Poll' ? 'type-poll' : 'type-vote'} name='a'>
        {dessert.type}
      </div>
    </td>
    <td style={{ textAlign: 'center' }}>{dessert._id}</td>
    <td>{dessert.title}</td>
    <td>
      <div>{new Date(dessert.starttime).toLocaleDateString()}</div>
      <div>{new Date(dessert.starttime).toLocaleTimeString()}</div>
    </td>
    <td>
      <div>{new Date(dessert.endtime).toLocaleDateString()}</div>
      <div>{new Date(dessert.endtime).toLocaleTimeString()}</div>
    </td>
    <td>{dessert.questions.length}</td>
    <td>
      <Checkview id={dessert._id} handleDelete={handleDelete} />
    </td>
  </tr>
);

const Table = ({ headers, desserts, pagination, changeSort, handleDelete }) => (
  <table>
    <TableHeader headers={headers} changeSort={changeSort} pagination={pagination} />
    <tbody>
      {desserts.map((dessert) => (
        <TableRow key={dessert._id} dessert={dessert} handleDelete={handleDelete} />
      ))}
    </tbody>
  </table>
);

const DessertTable = () => {
  const [desserts, setDesserts] = useState([]);
  const [pagination, setPagination] = useState({ sortBy: '_id', descending: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem('user'))?.email;

//     axios.get("http://localhost:3001/history", {
//   data: { email: user }, // Send user email in request body
// })
//     .then((res) => {
//       // Flatten the nested arrays
//       const flattenedDesserts = res.data.flat();
//       setDesserts(flattenedDesserts);
//     })
//     .catch((err) => console.log(err));
//   }, []);
useEffect(() => {
  const user = JSON.parse(sessionStorage.getItem('user'))?.email;

  axios.get(`https://votify-back.vercel.app/history?email=${user}`)
    .then((res) => {
      // Flatten the nested arrays
      const flattenedDesserts = res.data.flat();
      setDesserts(flattenedDesserts);
    })
    .catch((err) => console.log(err));
}, []);

  const navigate = useNavigate();

  const headers = [
    { text: 'Status', align: 'left', value: 'status' },
    { text: 'Type', align: 'left', value: 'type' },
    { text: 'ElectionID', value: '_id' },
    { text: 'Election Name', value: 'title' },
    { text: 'Start Date', value: 'starttime' },
    { text: 'End Date', value: 'endtime' },
    { text: 'Questions', value: 'questions' },
    { text: 'Action', value: 'action' },
  ];

  const calculateStatus = (endtime) => {
    const currentTime = new Date();
    const end = new Date(endtime);
    return end > currentTime ? 'Active' : 'Finished';
  };

  const changeSort = (column) => {
    setPagination((prevPagination) => ({
      sortBy: column,
      descending: column === prevPagination.sortBy ? !prevPagination.descending : false,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`https://votify-back.vercel.app/polls/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const filteredDesserts = desserts
    .filter((d) => d.title && d.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((d) => typeFilter === '' || d.type === typeFilter)
    .filter((d) => statusFilter === '' || calculateStatus(d.endtime) === statusFilter)
    .map((d) => ({ ...d, status: calculateStatus(d.endtime) }));

  const sortedDesserts = filteredDesserts.sort((a, b) => {
    const valueA = a[pagination.sortBy];
    const valueB = b[pagination.sortBy];

    if (pagination.sortBy === '_id') {
      return pagination.descending ? valueB - valueA : valueA - valueB;
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      return pagination.descending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    } else {
      return pagination.descending ? valueB - valueA : valueA - valueB;
    }
  });

  return (
    <div id="app">
      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: '50px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'inline', borderRadius: '10px' }}>
            <input
              type="text"
              placeholder="Search by Election Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className='sen'
            />
          </div>
          <div style={{ display: 'inline', marginLeft: '50px' }}>
            <div className="custom-select">
              <select value={statusFilter} onChange={handleStatusChange} className='sen'>
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'inline', marginLeft: '50px' }}>
            <div className="custom-select">
              <select value={typeFilter} onChange={handleTypeChange} className='sen'>
                <option value="">All</option>
                <option value="Vote">Vote</option>
                <option value="Poll">Poll</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="inspire">
        <Table headers={headers} desserts={sortedDesserts} pagination={pagination} changeSort={changeSort} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default DessertTable;