import { NavLink } from "react-router-dom";
import image from "../images/beershopLogo.png";
import "../styles/border.css";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = ({ login, handlerLogOut, cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-orange">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img src={image} alt="Logo" width="40" height="40" /></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className={"nav-link"} to="/">Top-Sellers</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/form">Add Product</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/esp">Spain</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/bel">Belgium</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/ger">Germany</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/jpn">Japan</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/scot">Scotland</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/noalcohol">Non-Alcohol</NavLink></li>
            <li className="nav-item"><NavLink className={"nav-link"} to="/nogluten">Non-Gluten</NavLink></li>
          </ul>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div className="nav-item">
            <NavLink className={"nav-link"} to="/cart">
              <FaShoppingCart size={20} />
              <span className="badge bg-primary ms-1">{cartCount}</span>
            </NavLink>
          </div>
          <span className="nav-item nav-link text-primary mx-3">
            {login.user?.username}
          </span>
          <button
            onClick={handlerLogOut}
            className="btn btn-outline-success"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
