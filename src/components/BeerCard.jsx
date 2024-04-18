import PropTypes from 'prop-types';
import '../styles/border.css'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import { useState } from 'react';

export const BeerCard = ({ id, beerName, alcoholGrade, type, price,quality, importation, description, image, handlerDeleteBeerTypes, handlerAddProductCart }) => {

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(quality);
    const handleStarClick = (quality) => {
        // Manejar el clic en una estrella
        if (quality === 4) {
            // Si se hace clic en la quinta estrella, establecer todas las estrellas en amarillo (valor de rating: 5)
            setRating(5);
        } else {
            // Si se hace clic en una estrella diferente, establecer rating según el índice de la estrella + 1
            setRating(quality + 1);
        }
    };

    const addProduct = (product) => {
        console.log(product)
        handlerAddProductCart(product)
        navigate('/cart')
        Swal.fire({
            title: "Beer add to shopping cart!",
            text: "Beer added to shopping cart!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
        });

    }
    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>
            <div className="card rounded-card">
                <img className='rounded-card' src={image} />
                <div className="card-body">
                    <h4 className="card-title">{beerName}</h4>
                    {//<p className="card-text">Importacion: {importation}</p>
                        //<p className="card-text">Grados de alcohol: {alcoholGrade}%</p>
                        //<p className="card-text">Tipo de cerveza: {type}</p>
                    }<div className="rating-container">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={`star ${index < rating ? 'rated' : ''}`}
                                onClick={() => handleStarClick(index)}
                            >
                                &#9733;
                            </span>
                        ))}

                    </div>
                    <div className="product-counter">
                        <button className="counter-button" onClick={decrement}>-</button>
                        <span className="count-display">{quantity}</span>
                        <button className="counter-button" onClick={increment}>+</button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-0" >
                        <button className="btn btn-outline-primary mb-2 rounded-pill " onClick={() => addProduct({ id, beerName, description, price,quantity,image })}>Buy just for: {price}€ </button>
                        <button className="btn btn-outline-secondary mb-2 rounded-pill" onClick={() => handlerDeleteBeerTypes(id)}>Delete item</button>

                    </div>

                </div>
                
            </div>
        </>
    )
}

BeerCard.propTypes = {
    beerName: PropTypes.string.isRequired,
    alcoholGrade: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    importation: PropTypes.string.isRequired

}
