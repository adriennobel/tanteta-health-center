import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import axios from 'axios';
import Patient from "../../models/Patient";
import "./sign-up-page.css";

function SignUpPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

  async function createAccount() {
    setLoading(true);
    try {
      const fnameValue = fnameRef.current.value;
      const lnameValue = lnameRef.current.value;
      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;
      const password2Value = password2Ref.current.value;

      if (!fnameValue) {
        setError("First name is required.");
        setLoading(false);
        return;
      }

      if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      if (!passwordValue) {
        setError("Password can not be empty.");
        setLoading(false);
        return;
      }

      if (passwordValue != password2Value) {
        setError("Confirm password does not match");
        setLoading(false);
        return;
      }

      const firebaseUser = await createUserWithEmailAndPassword(getAuth(), emailValue, passwordValue);

      // Save user details to MongoDB
      const patient = {
        uid: firebaseUser.user.uid,
        email: emailValue,
        firstName: fnameValue,
        lastName: lnameValue,
        phone: "",
        profileImageURL: "",
        role: "PATIENT",
        enrolmentDate: "",
        notes: []
      }
      const response = await axios.post("/api/v1/patients/create", { patient });

      if (response.status === 200) {
        alert("Account created successfully");
        navigate("/");
      } else {
        // TO DO: DELETE FIREBASE CREATION IF MONGODB FAILS
        alert("Failed to create user:\nOur engineers are working to restore the connection. Please try again later.");
      }
    } catch (e) {
      setError(e.message);
      alert("An error occured:\nPlease try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="centered-login-div">
        <div className="login-header-div">
          <h2>Create an account with Tanteta&nbsp;Health&nbsp;Center</h2>
          <p>Already have an account? <Link to="/login">Login&nbsp;here</Link></p>
        </div>
        <div className="login-inputs-div">
          <div className="login-input-div">
            <p>First name</p>
            <input type="text" ref={fnameRef} />
          </div>
          <div className="login-input-div">
            <p>Last name</p>
            <input type="text" ref={lnameRef} />
          </div>
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
          <div className="login-input-div">
            <p>Confirm password</p>
            <input type="password" ref={password2Ref} />
          </div>
          {error &&
            <div className="login-error-div">
              <p>{error}</p>
            </div>
          }
        </div>
        <div className="login-button-div">
          <button
            onClick={createAccount}
            className="main-btn primary"
            disabled={loading}
          >Sign Up</button>
        </div>
      </div>
    </>
  )
}

export default SignUpPage