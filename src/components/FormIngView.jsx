import { useEffect, useState } from "react";

export const FormIngView = ({handler}) => {
    const [formItemState, setFormItemState] = useState({
        product: '',
        price: '',
        measure: '',
        quantity: '',
    });
    const{product,price,measure,quantity} = formItemState;

  

    const onInputChange = ({target:{name,value}}) => {
        {
            console.log(value)
            setFormItemState({
                ...formItemState,
                [name]: value

            })
            
        }
    }

    const onBeerItemSumbit = (event) => {
        event.preventDefault();

        if (product.trim().length <= 1) return;
        if (measure.trim().length < 1) return;
        if (price.trim().length <= 1) return;
        if (isNaN(price.trim())) {

            alert('Error el precio no es un numero')

            return;
        }
        if (quantity.trim().length < 1) return;
        if (isNaN(quantity.trim())) {

            alert('Error la cantidad no es un numero')

            return;
        }
        handler(formItemState);

        setFormItemState({
            product: '',
            price: '',
            measure: '',
            quantity: '',
        })
       
    }

    return (<>

        <form className="w-50" onSubmit={event => onBeerItemSumbit(event)}>

            <input type="text"
                name="product"
                value={product}
                placeholder="Producto"
                className="form-control m-2"
                onChange={onInputChange} />

            <input type="text"
                name="measure"
                value={measure}
                placeholder="Medida"
                className="form-control m-2"
                onChange={onInputChange} />

            <input type="text"
                name="quantity"
                value={quantity}
                placeholder="Cantidad"
                className="form-control m-2"
                onChange={onInputChange} />

            <input type="text"
                name="price"
                value={price}
                placeholder="Precio"
                className="form-control m-2"
                onChange={event => onInputChange(event)} />

            <button type="submit"
                className="btn btn-primary m-2">Nuevo Item</button>


        </form>



    </>)
}