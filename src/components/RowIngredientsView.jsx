import PropTypes from 'prop-types';


export const RowIngredientsView = ({id, product,measure,quantity,price, handlerDeleteItem}) => {

    return (
        <>

            <tr >
                <td> {product} </td>
                <td> {measure}  </td>
                <td> {quantity} </td>
                <td> {price} </td>
                <td><button 
                className='btn btn-danger'
                onClick={()=>handlerDeleteItem(id)}>Eliminar</button></td>
            </tr>
            



        </>
    )
}

RowIngredientsView.propTypes={
    product: PropTypes.string.isRequired,
    measure: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}
