import { useState, useRef } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
import Nav from '../../components/Nav/nav'
import emailjs from '@emailjs/browser';
import './contact.css';

export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

const Contact = () => {
    const [ formState, setFormState] = useState({name: '', email: '', message: ''})
    const { name, email, message } = formState
    const [errorMessage, setErrorMessage] = useState('');

// handle change & errpr 

function handleChange(e) {
    console.log(e.target.name)
    if(e.target.name === 'email') {
        const isValid = validateEmail(e.target.value);
        if(!isValid) {
            setErrorMessage('Invalid email address')
        } else {
            setErrorMessage('');
        }
    } else {
        if(!e.target.value.length) {
            setErrorMessage(`${e.target.name} required`)
        } else {
            setErrorMessage('');
        }
    }
    console.log(formState)
    console.log(e.target.value)
    setFormState({...formState, [e.target.name]: e.target.value})
    if (!errorMessage) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }
}

const form = useRef();

const sendEmail = (e) => {
  e.preventDefault();
//emailjs forms 
  emailjs.sendForm('service_obu37fi', 'template_9v3o9z7', form.current, 'OFqkAcGwGtBp0gQAD')
    .then((result) => {
          console.log(result);
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    console.log("hello")
    e.target.reset()
    setFormState({name: '', email: '', message: ''})
};

return (
  <>
   <Nav />
  <div className="contactForm">
        <form ref={form} onSubmit={sendEmail} className="contactForm">
          <input type="text" name="name" defaultValue={name} className="contactName" id="contact-name"  onBlur={handleChange} placeholder="YOUR NAME"/>
          <input type="text"  name="email" defaultValue={email} className="contactEmail" id="contact-Email" onBlur={handleChange} placeholder="EMAIL ADDRESS"/>
          <textarea name="message" id="contact-message" defaultValue={message} className="contactMessage" onChange={handleChange} placeholder="MESSAGE"></textarea>
          <button className="submitButton" type="submit">SUBMIT</button>

          {errorMessage && (
                  <div>
                      <p className="errorMessage">{errorMessage}</p>
                  </div>
              )} 
        </form>
      </div>
  </>
)
}

export default Contact