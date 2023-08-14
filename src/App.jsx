import css from './App.module.css';
import PropTypes from 'prop-types';
import { Suspense, lazy, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selecAuthentificated, selectToken, selectUserData } from 'redux/authReducer';
import { logoutUserThunk, refreshUserThunk } from 'redux/operations';
import PrivateRoute from 'components/privatRoute/privatRoute';
import UseMenu from 'components/UseMenu/UseMenu';

const RegisterPage = lazy(() => import('pages/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authentificated = useSelector(selecAuthentificated);
  const userData = useSelector(selectUserData)
  console.log(userData)

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
                <p>{userData.email}</p>
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
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo='/login'>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
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
  token: PropTypes.string,
  authentificated: PropTypes.bool,
  handleLogout: PropTypes.func,
 
};
