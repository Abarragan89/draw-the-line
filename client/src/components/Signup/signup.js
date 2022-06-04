import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './signup.css';
// import{useState} from 'react';

function Signup() {
    // set up state variables
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
    });
    Auth.login(data.addUser.token);

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
        
        <>
      <main> 
        <section>
        <h2 className="section-heading">Sign Up</h2>
            <form className="login-form-signup" onSubmit={handleFormSubmit}>
                <div className="login-elements">
                    <input
                        placeholder="Username"
                        className="login-input"                        
                        name="username"
                        type="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
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
                        className="login-input"                        
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button className="login-button" type="submit" value="signup">Sign up</button>
                    {error && <div className="error">Signup failed</div>}
                    <p className="login-text">Have an account? <br></br><Link to="/login" className="login-link">Login here.</Link></p>
                </div>
            </form>
        </section>
        </main>
        </>
    );
};

export default Signup;