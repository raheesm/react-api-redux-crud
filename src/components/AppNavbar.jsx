import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../features/userDetailsSlice';
import { Link } from 'react-router-dom';


const AppNavbar = ({ setTheme, theme }) => {

  const dispatch = useDispatch();
  const totalUsers = useSelector(state => state.app.users);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchInput));
  }, [searchInput])

// console.log(searchInput);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary align-items-center">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          CRUDApP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create New User
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2 border-0 rounded-pill" type="search" placeholder="Search" value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)} />
          </form>&nbsp;

          <small className='border rounded-pill p-1 mb-0 ms-2 bg-warning text-dark fw-bold'>{totalUsers.length}</small>&nbsp;
        </div>
        <button onClick={() => setTheme(!theme)} className={theme ? 'btn btn-dark' : 'btn btn-secondary'}>{theme ? 'Dark' : 'Light'}</button>
      </div>
    </nav>
  );
};

export default AppNavbar;
