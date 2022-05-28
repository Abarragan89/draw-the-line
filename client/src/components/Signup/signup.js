import './signup.css';
import{useState} from 'react';

function Signup() {

    const[form, setForm]= useState('login')

    return (
        
        <>
        {(form === 'signup' )? (
            <section className="sign-up-section">
                <form className="signup-form">
                    <div className="signup">
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <div>
                        <input type="text" id="username" name="txt" placeholder="Username" required="" />
                        </div>
                        <div>
                        <input type="email" id="email-signup" name="email" placeholder="Email" required="" />
                        </div>
                        <div>
                        <input type="password" id="password-signup" name="pswd" placeholder="Password" required="" />
                        </div>
                        <button id="signup-button" type="submit" value="signup">Sign up</button>
                    </div>
                </form>
                <a href="#" onClick={()=> setForm('login')}>Login instead</a>
            </section>
           
        ) : (
       
                <section className="sign-up-section">
                    <form className="signup-form" >
                        <div>
                            <label htmlFor="chk" aria-hidden="true">Login</label>
                            <input id="email-login" type="email" name="email" placeholder="Email" required="" />
                        </div>
                        <div>
                            <input id="password-login" type="password" name="pswd" placeholder="Password" required="" />
                        </div>
                        <div>
                            <button id="loginSubmit" type="submit">Login</button>
                        </div>
                    </form>
                    <a href="#" onClick={()=> setForm('signup')}>Signup instead</a>
                </section>

                )}
                </>
            

    );
};

export default Signup;