import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"
import "./header-comp.css";

function HeaderComp() {
  const navigate = useNavigate();

  async function logOut() {
    try {
      await signOut(getAuth());
      navigate("/login");
    } catch (e) {
      console.error(e);
      alert("Error signing out.\nOur engineers are working to fix this.");
    }
  }

  return (
    <header className="page-header">
      <div className="page-header-max-width-div">
        <div className="page-header-logo-div">
          <Link to="/">THC</Link>
        </div>
        <nav>
          <div className="page-header-navigation-div">
            <Link to="/schedule-a-visit" className="main-btn primary full-width">
              Schedule a visit
            </Link>
            <Link to="/reports" className="main-btn secondary full-width">
              Reports
            </Link>
            <button onClick={logOut} className="main-btn fire full-width">
              Sign out
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default HeaderComp;