import PropTypes from 'prop-types';
import '../styles/border.css'
import { useNavigate } from "react-router-dom"

export const BeerCard = ({ id, beerName, alcoholGrade, type, price, importation, description, image, handlerDeleteBeerTypes, handlerAddProductCart }) => {

    const navigate = useNavigate();

    const addProduct=(product)=>{
        console.log(product)
        handlerAddProductCart(product)
        navigate('/cart')

    }

    return (
        <>
            <div className="card rounded-card">
                <img className='rounded-card' src={image}  />
                <div className="card-body">
                    <h4 className="card-title">{beerName}</h4>
                    <p className="card-text">Importacion: {importation}</p>
                    <p className="card-text">Grados de alcohol: {alcoholGrade}%</p>
                    <p className="card-text">Tipo de cerveza: {type}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center border-0" >
                        <button className="btn btn-outline-warning mb-2 rounded-pill " onClick={()=>addProduct({id,beerName,description,price})}>Añadir al carrito </button>
                        <button className="btn btn-outline-secondary mb-2 rounded-pill" onClick={() => handlerDeleteBeerTypes(id)}>Eliminar</button>
                        
                    </div>
            </div>
        </>
    )
}

BeerCard.propTypes={
    beerName: PropTypes.string.isRequired,
    alcoholGrade: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    importation: PropTypes.string.isRequired
    
}
