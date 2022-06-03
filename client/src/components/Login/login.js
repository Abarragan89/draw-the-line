import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import "./login.css"

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <section>
      <h2 className="section-heading">Log In</h2>
       <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="login-elements">
              <input
                placeholder="Email"
                className="login-input"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                name="password"
                 className="login-input"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              {error && <div className="error">Log in failed</div>}
              <button className="login-button" type="submit">Log in</button>
          <p className="login-text">Don't have an account? <br></br><Link to="/signup" className="login-link"> Sign up here.</Link></p>
          </div>
       </form>
    </section>
  );
};

export default Login;