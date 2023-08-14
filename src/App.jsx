import css from './App.module.css';
import PropTypes from 'prop-types';
import { Suspense, lazy, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selecAuthentificated,
  selectToken,
  selectUserData,
} from 'redux/authReducer';
import { logoutUserThunk, refreshUserThunk } from 'redux/operations';
import PrivateRoute from 'components/privatRoute/privatRoute';

const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authentificated = useSelector(selecAuthentificated);
  const userData = useSelector(selectUserData);
  console.log(userData);

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
        <nav className={css.headerContent}>
          {authentificated ? (
            <>
              <ul className={css.nav_list_contact_logout}>
                <li>
                  {' '}
                  <NavLink to="/contacts" className={css.nav_link}>
                    Contacts
                  </NavLink>
                </li>
                <li className={css.userData}>
                  <p>{userData.email}</p>
                  <button className={css.btnLogout} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className={css.nav_list_register}>
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
      <main className={css.mainSection}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                !authentificated ? (
                  <p className={css.welcomeText}>
                    Welcome to the application, choose{' '}
                    <span>
                      <NavLink to="/register">register</NavLink>
                    </span>{' '}
                    if you are just going to register or <NavLink to="/login">login</NavLink>  if you already
                    have a registered account
                  </p>
                ) : (
                  <PrivateRoute redirectTo="/login">
                    <ContactsPage />
                  </PrivateRoute>
                )
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

App.propTypes = {
  token: PropTypes.string,
  authentificated: PropTypes.bool,
  handleLogout: PropTypes.func,
};
