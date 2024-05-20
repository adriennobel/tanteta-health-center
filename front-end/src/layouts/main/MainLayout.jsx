import HeaderComp from "../../components/header/HeaderComp";
import FooterComp from "../../components/footer/FooterComp";
import "./main-layout.css";

function MainLayout({ pageName, children }) {

  return (
    <div className={pageName + " page-body-with-header"}>
      <HeaderComp />
      <main>
        <div className="page-main-max-width-div">
          {children}
        </div>
      </main>
      <FooterComp />
    </div>
  )
}

export default MainLayout