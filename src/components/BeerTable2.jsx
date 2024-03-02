import PropTypes from 'prop-types';

export const BeerTable2 = ({ id, beerName, alcoholGrade, type, price, importation, description, image, handlerDeleteBeerTypes }) => {

    return (
        <>
            <div className="card" style={{ maxWidth: '370px' }}>
                <img src={image} style={{ maxWidth: '100%', height: '350px' }} />
                <div className="card-body">
                    <h4 className="card-title">{beerName}</h4>
                    <p className="card-text">Importacion: {importation}</p>
                    <p className="card-text">Grados de alcohol: {alcoholGrade}%</p>
                    <p className="card-text">Tipo de cerveza: {type}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center border-0" >
                        <button className="btn btn-secondary mb-3 rounded-pill">Añadir al carrito </button>
                        <button className="btn btn-outline-secondary mb-3 rounded-pill" onClick={() => handlerDeleteBeerTypes(id)}>Eliminar</button>
                    </div>
            </div>
        </>
    )
}

BeerTable2.propTypes={
    beerName: PropTypes.string.isRequired,
    alcoholGrade: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    importation: PropTypes.string.isRequired
    
}
