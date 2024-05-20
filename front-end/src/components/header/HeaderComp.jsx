import { Link } from "react-router-dom";
import "./header-comp.css";

function HeaderComp() {

  return (
    <header className="page-header">
      <div className="page-header-max-width-div">
        <div className="page-header-logo-div">
          <Link to="/">THC Logo</Link>
        </div>
        <div className="page-header-navigation-div">
          <Link to="/schedule-a-visit" className="main-btn primary full-width">
            Schedule a visit
          </Link>
          <div>Reports | Profile | Logout</div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComp;