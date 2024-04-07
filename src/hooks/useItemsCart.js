import { useState } from "react";

const initialItems = JSON.parse(sessionStorage.getItem('cart'))||[];


export const  useItemsCart = ()=>{

    const [cartItems, setCartItems] = useState(initialItems);

    const handlerAddProductCart = (product) => {

        const hasItem = cartItems.find((i) => i.product.id === product.id);

        console.log(product.quantity)

       
        if (hasItem) {
          
            setCartItems(
                cartItems.map((i) => {
                    if (i.product.id === product.id) {
                        i.quantity = i.quantity + i.product.quantity;
                    }

                    console.log(i.product.quantity)

                    return i;
                }),
            )


        } else {

            setCartItems([
                ...cartItems,
                {
                    product,
                    quantity: product.quantity, //uno por defecto

                }

            ])
        }




    }

    const handlerDeleteProductCart = (product) => {

        const updatedCartItems = cartItems.map((item) => {
            if (item.product.id === product.id) {
                if (item.quantity === 1) {
                    return null;
                } else {
                    return { ...item, quantity: item.quantity - 1 };
                }
            } else {
                return item;
            }
        }).filter(item => item !== null);

        setCartItems(updatedCartItems);

    }


    return{

        cartItems,
        handlerAddProductCart,
        handlerDeleteProductCart,

        
    }
}