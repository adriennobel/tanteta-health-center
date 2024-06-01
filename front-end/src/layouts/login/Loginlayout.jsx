import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./login-layout.css";

function LoginLayout({ pageName, children }) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) navigate("/");
  }, [isLoading])

  return (
    <>
      {isLoading ?
        <div className="loading-page-body">
          <p>Loading...</p>
        </div> :
        <div className={pageName + " page-body-without-header"}>
          <main>
            <div className="page-main-max-width-div">
              {children}
            </div>
          </main>
        </div>
      }
    </>
  )
}

export default LoginLayout