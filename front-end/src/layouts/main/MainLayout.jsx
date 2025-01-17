import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeaderComp from "../../components/header/HeaderComp";
import FooterComp from "../../components/footer/FooterComp";
import "./main-layout.css";

function MainLayout({ pageName, children }) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [isLoading])

  return (
    <>
      {isLoading && !user ?
        <div className="loading-page-body">
          <p>Loading...</p>
        </div> :
        <div className={pageName + " page-body-with-header"}>
          <HeaderComp />
          <main>
            <div className="page-main-max-width-div">
              {children}
            </div>
          </main>
          <FooterComp />
        </div>
      }
    </>
  )
}

export default MainLayout