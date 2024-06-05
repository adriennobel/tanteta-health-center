import { Link, useNavigate } from "react-router-dom";
import "./footer-comp.css"

function FooterComp() {

  return(
    <footer className="page-footer">
      <div className="footer-max-width-div">
        <div className="footer-navigation-div">
          <Link to="/">Home</Link> |&nbsp;
          <Link to="/schedule-a-visit">Schedule a visit</Link> |&nbsp;
          <Link to="/reports">Reports</Link>
        </div>
        <div className="footer-copyright-div">
          &copy; Tanteta Health Center 2024
        </div>
      </div>
    </footer>
  )
}

export default FooterComp