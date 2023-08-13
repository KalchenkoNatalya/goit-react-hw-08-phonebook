import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { selecAuthentificated } from 'redux/authReducer';
import { registerUserThunk } from 'redux/operations';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isauthentificated = useSelector(state => state.auth.authentificated);
  const authentificated = useSelector(selecAuthentificated)
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.userName.value;
    const email = form.elements.userEmail.value;
    const password = form.elements.userPassword.value;

    const finalUserData = {
      name,
      email,
      password,
    };
    dispatch(registerUserThunk(finalUserData));
  };
  console.log(isauthentificated);
  if (isauthentificated) {
    alert('Your account has been successfully registered');
  }
  if (authentificated) return <Navigate to="/contacts"/>
  return (
    <div>
      <h1>Register your account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input name="userName" type="text" required minLength={2}></input>
        </label>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        If you alredy have account, sign in{' '}
        <span>
          <NavLink to="/login">here</NavLink>
        </span>
      </p>
    </div>
  );
};
export default RegisterPage;
