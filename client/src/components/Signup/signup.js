import './signup.css';

function Signup() {
    return (
        <>
            <section id="sign-up-section">
                <form id="signup-form">
                    <div class="signup">
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="text" id="username" name="txt" placeholder="Username" required="" />
                        <input type="email" id="email-signup" name="email" placeholder="Email" required="" />
                        <input type="password" id="password-signup" name="pswd" placeholder="Password" required="" />
                        <button id="signup-button" type="submit" value="signup">Sign up</button>
                    </div>
                </form>

                <div class="login">
                    <form class="login-form">
                        <div>
                            <label for="chk" aria-hidden="true">Login</label>
                            <input id="email-login" type="email" name="email" placeholder="Email" required="" />
                        </div>
                        <div>
                            <input id="password-login" type="password" name="pswd" placeholder="Password" required="" />
                        </div>
                        <div>
                            <button id="loginSubmit" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Signup;