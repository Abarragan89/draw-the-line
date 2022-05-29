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
    <section id="login-section">
       <form id="login-form" onSubmit={handleFormSubmit}>
          <div className="login">
            {/* <label htmlFor="chk" aria-hidden="true" className="loginLabel"></label> */}
              <input
                placeholder="Email"
                className="loginEmail"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                className="loginPassword"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              {error && <div className="error">Log in failed</div>}
              <button className="login-button" type="submit">Log in</button>
          <p className="signupLinkText">Don't have an account? <br></br><Link to="/signup" className="link"> Sign up here.</Link></p>
          </div>
       </form>
    </section>
  );
};

export default Login;