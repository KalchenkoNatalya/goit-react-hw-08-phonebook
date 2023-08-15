import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selecAuthentificated } from 'redux/authReducer';
import { loginUserThunk } from 'redux/operations';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const authentificated = useSelector(selecAuthentificated);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.userEmail.value;
    const password = form.elements.userPassword.value;

    const userData = {
      email,
      password,
    };
    dispatch(loginUserThunk(userData));
  };

  if (authentificated) return <Navigate to="/contacts" />;
  return (
    <section>
      <form className={css.loginForm} onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input name="userEmail" type="email" required></input>
        </label>
        <label>
          <p>Password</p>
          <input
            name="userPassword"
            type="password"
            required
            minLength={8}
          ></input>
        </label>
        <button className={css.btnSignIn} type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
