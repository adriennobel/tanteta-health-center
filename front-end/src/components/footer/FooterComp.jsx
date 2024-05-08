import "./footer-comp.css"

function FooterComp() {

  return(
    <footer className="page-footer">
      <div className="footer-max-width-div">
        <div className="footer-navigation-div">
          Reports | Profile | Logout
        </div>
        <div className="footer-copyright-div">
          &copy; Tanteta Health Center 2024
        </div>
      </div>
    </footer>
  )
}

export default FooterComp