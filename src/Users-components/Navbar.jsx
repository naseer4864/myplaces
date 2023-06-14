import { Link, Outlet, useNavigate } from "react-router-dom";
import { Fragment, useState, useContext } from "react";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {  Logout, userId, token } = useContext(UserContext);
  const [isMobile, setIsmobile] = useState(false);

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  return (
    <Fragment>
      <div className="navbar-container">
        <div
          className="menu-icon"
          onClick={() => setIsmobile(!isMobile)}
        >
          {isMobile ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </div>
        <Link to="/" className="logo">
          <h2>YourPlaces</h2>
        </Link>
        <div
          className={isMobile ? "mobile-link" : "nav-links"}
          onClick={() => setIsmobile(false)}
        >
          <Link to="/" className="link">
            ALL USERS
          </Link>
          {token && (
            <>
              <Link to={`/${userId}/places`} className="link">
                MY PLACES
              </Link>
              <Link to="/places/new" className="link">
                ADD PLACE
              </Link>
            </>
          )}
          {!token&& (
            <Link to="/Auth" className="link">
              AUTHENTICATION
            </Link>
          )}
          {token && <button onClick={handleLogout}>LOGOUT</button>}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
