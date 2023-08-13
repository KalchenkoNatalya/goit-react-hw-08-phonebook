// import { FormAddContacts } from './FormAddContacts/FormAddContacts';
// import { Filter } from './Filter/Filter';
// import { ContactList } from './ContactList/ContactList';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectVisibleContacts } from 'redux/selectors';

import css from './App.module.css';
import PropTypes from 'prop-types';
import { Suspense, lazy, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selecAuthentificated, selectToken } from 'redux/authReducer';
import { logoutUserThunk, refreshUserThunk } from 'redux/operations';

const RegisterPage = lazy(() => import('pages/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authentificated = useSelector(selecAuthentificated);
  useEffect(() => {
    if (!token || authentificated) return;
    dispatch(refreshUserThunk());
  }, [token, dispatch, authentificated]);
  
  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };
  return (
    <div>
      <header className={css.header}>
        <nav>
          {authentificated ? (
            <>
              <ul className={css.nav_list}>
                <li>
                  {' '}
                  <NavLink to="/contacts" className={css.nav_link}>
                    Contacts
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className={css.nav_list}>
                {' '}
                <li>
                  <NavLink to="/register" className={css.nav_link}>
                    Register
                  </NavLink>
                </li>
                <li>
                  {' '}
                  <NavLink to="/login" className={css.nav_link}>
                    Login
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactsPage/>} />
            <Route
              path="*"
              element={
                <p>
                  welcome to the application, choose register if you are just
                  going to register or login if you already have a registered
                  account
                </p>
              }
            />
          </Routes>
        </Suspense>
      </main>
 
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  filterChange: PropTypes.func,
  addContacts: PropTypes.func,
  onRemoveContacts: PropTypes.func,
};
