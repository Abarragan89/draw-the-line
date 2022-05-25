import './signup.css';

function signup() {
    return (
        <>
            <section id="sign-up-section">
                <form id="signup-form">
                    <div class="signup">
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="text" id="username" name="txt" placeholder="Username" required="" />
                        <input type="email" id="email-signup" name="email" placeholder="Email" required="" />
                        <input type="password" id="password-signup" name="pswd" placeholder="Password" required="" />
                        <button type="submit" value="signup">Sign up</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default signup;