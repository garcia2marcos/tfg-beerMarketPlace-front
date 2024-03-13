
import { useEffect, useState } from "react";
import {impMyBeer } from "./services/BeerService"
import { BeerRowCol } from "./components/BeerRowCol";
import { NewForm } from "./components/NewForm1";
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar";
import { useItemsCart } from "./hooks/useItemsCart";
import { CartView } from "./components/CartView";

const myBeerInitial={
    myBeer:[]
}


export const BeerApp = () => {

  
    const [myCounter, setMyCounter] = useState(9)
    const [myBeer, setMyBeer] = useState(myBeerInitial)
    const [beerTypes, setBeerTypes] = useState([])


    const {cartItems,handlerAddProductCart,handlerDeleteProductCart} = useItemsCart();

    useEffect(()=>{
        const myData= impMyBeer();
        setMyBeer(myData);
        setBeerTypes(myData.myBeer);

    },[])

    const handlerAddBeerTypes = ({beerName,alcoholGrade,type,price,importation,description,image})=>{

        const imageUrl = URL.createObjectURL(image);

        setBeerTypes([...beerTypes, {
            id: myCounter,
            beerName: beerName.trim(),
            alcoholGrade: +alcoholGrade.trim(),
            type: type.trim(),
            price: +price.trim(),
            importation: importation.trim(),
            description: description.trim(),
            image: imageUrl,
        }]);

        setMyCounter(myCounter + 1);

    }


    const handlerDeleteBeerTypes=(id)=>{
        setBeerTypes(beerTypes.filter(beer=>beer.id!==id))

    }

    

    return (<>
        <Navbar/>
        <div className="container">    
                <Routes>
                
                    <Route path="form" element={
                        <NewForm handler={handlerAddBeerTypes} />
                    }/>
                            
                    <Route path="products" element={
                        <BeerRowCol beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    }/>

                    <Route path="cart" element={
                        <CartView  handler={handlerDeleteProductCart} items={cartItems}   />
                    }/>
                    

                    <Route  path="/" element={<Navigate to={'/products'} />} />

                </Routes>
            </div>
        
        </>
    );
    
}
