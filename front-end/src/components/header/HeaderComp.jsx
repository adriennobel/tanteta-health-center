import "./header-comp.css";

function HeaderComp() {

  return (
    <header className="page-header">
      <div className="page-header-max-width-div">
        <div className="page-header-logo-div">
          THC Logo
        </div>
        <div className="page-header-navigation-div">
          <button className="main-btn full-width">Schedule a visit</button>
          <div>Reports | Profile | Logout</div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComp