import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

// import Styles
import './signup.css';
import{useState} from 'react';

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
    console.log(data);
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
        <section id="sign-up-section">
            <form id="signup-form" onSubmit={handleFormSubmit}>
                <div className="signup">
                    <label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <input
                        placeholder="Your username"
                        name="username"
                        type="username"
                        id="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Your email"
                        name="email"
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button id="signup-button" type="submit" value="signup">Sign up</button>
                </div>
            </form>
            {error && <div>Signup failed</div>}
        </section>
        </>
    );
};

export default Signup;