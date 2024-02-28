import { RowIngredientsView } from "./RowIngredientsView"
import PropTypes from 'prop-types';


export const TableIngredientsView=({ingredients, handlerDeleteItem})=>{


    return (

        <>
        <h4>Ingredientes de la cerveza</h4>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Medidas</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map(({id,product,measure,quantity,price}) =>(
                                <RowIngredientsView  key={id} id={id} product={product} price={price} measure={measure} quantity={quantity} handlerDeleteItem={handlerDeleteItem}  />
                            ))}


                            



                        </tbody>



                    </table>
        
        
        </>
    )
}

TableIngredientsView.propTypes ={
    ingredients: PropTypes.array.isRequired
}

