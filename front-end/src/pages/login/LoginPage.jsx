import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import "./login-page.css";

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function login() {
    try {
      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;

      if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
        setError("Please enter a valid email");
        return;
      }

      await signInWithEmailAndPassword(getAuth(), emailValue, passwordValue);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <div className="centered-login-div">
        <div className="login-header-div">
          <h2>Welcome to Tanteta&nbsp;Health&nbsp;Center</h2>
          <p>Don't have an account? <Link to="/register">Register&nbsp;here</Link></p>
        </div>
        {error &&
          <div className="login-error-div">
            <p>{error}</p>
          </div>
        }
        <div className="login-inputs-div">
          <div className="login-input-div">
            <p>Email</p>
            <input
              type="email"
              placeholder="example@email.com"
              ref={emailRef}
            />
          </div>
          <div className="login-input-div">
            <p>Password</p>
            <input type="password" ref={passwordRef} />
          </div>
        </div>
        <div className="login-button-div">
          <button onClick={login} className="main-btn primary">Login</button>
        </div>
      </div>
    </>
  )
}

export default LoginPage