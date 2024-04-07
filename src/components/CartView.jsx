import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../services/BeerService";
import '../styles/border.css'

export const CartView = ({ handler, items }) => {

    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        setTotal(calculateTotal(items))
        sessionStorage.setItem('cart', JSON.stringify(items))

    }, [items])

    const onDeleteProduct = (product) => {
        console.log('Eliminando producto')
        handler(product);
    }

    const onProducts = () => {
        navigate('/')


    }

    return (
        <>
            <div className="container text-bg-light m-2 rounded-form">
            <h3>Shopping Cart</h3>
            <table className="table table-hover table-striped table align-middle rounded-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {items.map(i => (
                        <tr key={i.product.id}>
                            <td><img className='rounded-card' src={i.product.image} style={{ width: '70px', height: '70px' }}/> </td>
                            <td className="align-bottom"> {i.product.beerName} </td>
                            <td  className="align-bottom">{i.product.price}€</td>
                            <td  className="align-bottom">{i.quantity}</td>
                            <td  className="align-bottom">{i.quantity * i.product.price}€</td>
                            <td  className="align-bottom"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" onClick={() => onDeleteProduct(i.product)}>
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg></td>
                        </tr>

                    ))}


                </tbody>

                <tfoot>
                    <tr>
                        <td> <button className="btn btn-success"
                onClick={onProducts}
            >Volver inicio</button></td>
                        <td colSpan="4" className="text-end fw-bold">Total:</td>
                        <td colSpan="3" className="text-start fw-bold">  {total}€ </td>
                    </tr>

                </tfoot>

            </table>
           
            </div>




        </>
    )
}