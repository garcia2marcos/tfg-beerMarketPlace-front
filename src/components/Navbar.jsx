import { NavLink } from "react-router-dom"
import image from  '../images/beer_931949.png'
import '../styles/border.css'

export const Navbar = () => {



    return (

        <nav className="navbar navbar-expand-lg navbar-orange">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                <img src={image} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                    Beer Shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={'nav-link'} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className={'nav-link'} to="/form">Add Product</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className={'nav-link'} to="/cart">Shopping Cart</NavLink>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Importaciones
                            </a>
                            <ul className="dropdown-menu navbar-orange">
                                <li><a className="dropdown-item text-dark" href="/">España</a></li>
                                <li><a className="dropdown-item text-dark" href="/">Belgica</a></li>
                                <li><a className="dropdown-item text-dark" href="">Alemania</a></li>
                                <li><hr className="dropdown-divider text-dark"/></li>
                                <li><a className="dropdown-item text-dark" href="#">Resto del mundo</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}