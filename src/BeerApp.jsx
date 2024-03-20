
import { useEffect, useState } from "react";
import { impMyBeer } from "./services/BeerService"
import { BeerRowCol } from "./components/BeerRowCol";
import { NewForm } from "./components/NewForm";
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar";
import { useItemsCart } from "./hooks/useItemsCart";
import { CartView } from "./components/CartView";
import { LoginView } from "./components/LoginView";
import Swal from "sweetalert2";

const myBeerInitial = {
    myBeer: []
}



export const BeerApp = () => {


    const [myCounter, setMyCounter] = useState(9)
    const [myBeer, setMyBeer] = useState(myBeerInitial)
    const [beerTypes, setBeerTypes] = useState([])


    const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();

    useEffect(() => {
        const myData = impMyBeer();
        setMyBeer(myData);
        setBeerTypes(myData.myBeer);

    }, [])

    const handlerAddBeerTypes = ({ beerName, alcoholGrade, type, price, importation, description, image }) => {

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


    const handlerDeleteBeerTypes = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                setBeerTypes(beerTypes.filter(beer => beer.id !== id))
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });

    }



    return (<>
        <Navbar />
        <div className="container">
            <Routes>

                <Route path="form" element={
                    <NewForm handler={handlerAddBeerTypes} />
                } />

                <Route path="products" element={
                    <BeerRowCol beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                } />

                <Route path="cart" element={

                    cartItems.length === 0? <div className="alert alert-warning my-4 mx-2 w-50">No hay productos en el carrito</div>:
                    
                    <CartView handler={handlerDeleteProductCart} items={cartItems} />
                } />

                <Route path="login" element={
                    <LoginView/>
                } />


                <Route path="/" element={<Navigate to={'/products'} />} />

            </Routes>
        </div>

    </>
    );

}
