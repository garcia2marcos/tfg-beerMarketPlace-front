
import { useEffect, useState } from "react";
import { findById, impMyBeer, remove, save, update } from "./services/BeerService"
import { BeerRowCol } from "./components/BeerRowCol";
import { NewForm } from "./components/NewForm";
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar";
import { useItemsCart } from "./hooks/useItemsCart";
import { CartView } from "./components/CartView";
import { loginReducer } from "./reducers/loginReducer"
import { useReducer } from "react"
import {LoginPage} from "../src/components/LoginPage"
import Swal from "sweetalert2";
import { loginUser } from "./services/authService";
import { UsersPage } from "./pages/UsersPage";
import { BeerRowColImpESP } from "./components/importations/BeerRowColImpESP";
import { BeerRowColImpGER } from "./components/importations/BeerRowColImpGER";
import { BeerRowColImpBELG } from "./components/importations/BeerRowColImpBELG";
import { BeerRowColImpREST } from "./components/importations/BeerRowColImpREST";


const initialLogin= JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const BeerApp = () => {


    const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();
    const [beerTypes, setBeerTypes] = useState([]);
    const [isLoading,setIsLoading]= useState(true);

    const findAll= async()=>{
        const myData = await impMyBeer();
        setBeerTypes(myData.myBeer);
        setIsLoading(false);

    }
    

    useEffect(() => {
       findAll();
        
    }, [])

    const [myCounter, setMyCounter] = useState(0)   

    const handlerAddBeerTypes = async ({
        beerName, alcoholGrade, type, price, importation, description, image, quality,
    }) => {
        const imageUrl = URL.createObjectURL(image);
    
        const newBeer = {
            beerName: beerName.trim(),
            alcoholGrade: +alcoholGrade.trim(),
            type: type.trim(),
            price: +price.trim(),
            quality: +quality.trim(),
            importation: importation.trim(),
            description: description.trim(),
            imagePath: imageUrl,
        };
    
        let response;

        if (myCounter === 0) {
            response = await save(newBeer);
        } else {
            response = await update({ id: myCounter, ...newBeer });
        }
    
        if (response) {
            setBeerTypes([...beerTypes, { id: myCounter, ...newBeer }]);
            setMyCounter(myCounter + 1);
        } else {
            console.error("Error adding beer");
        }
    };


    const handlerDeleteBeerTypes = (id) => {
        if (!id) {
            console.error("No ID provided for deletion");
            return;
        }
    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id).then((response) => {
                    if (response) {
                        setBeerTypes(beerTypes.filter((beer) => beer.id !== id));
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    } else {
                        console.error("Error deleting beer");
                    }
                });
            }
        });

    };


    


    const [login,dispatch] = useReducer(loginReducer, initialLogin)
    const handlerLogin =({username,password})=>{
        const isLogin =loginUser({username,password})
 
     if(isLogin){
 
         const user={username}
 
         dispatch({
             type: 'login',
             payload: user,
         })  
         sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user
         }))  
         Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Successfully logged in",
            showConfirmButton: false,
            timer: 700
          });
     }else{
         Swal.fire('Error','Username y password no validos','error')
     }
 
    }

    const handlerLogOut =()=>{

        dispatch({
            type: 'logout',
        })
        sessionStorage.removeItem('login')

    }

    



    return (
    <>

    {
        isLoading &&<div className="alert alert-info">Cargando...</div>
    }
        {login.isAuth ?
        
        <>
        <Navbar handlerLogOut={handlerLogOut} login={login}/>
            <div className="container">
                <Routes>
    
                    <Route path="form" element={
                        <NewForm handler={handlerAddBeerTypes} />
                    } />
    
                    <Route path="products" element={
                        <BeerRowCol beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    } />
                    
                    <Route path="esp" element={
                        <BeerRowColImpESP beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    } />
                     <Route path="ger" element={
                        <BeerRowColImpGER beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    } />
                     <Route path="belg" element={
                        <BeerRowColImpBELG beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    } />
                     <Route path="rest" element={
                        <BeerRowColImpREST beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    } />

                    <Route path="cart" element={
    
                        cartItems.length === 0? <div className="alert alert-warning my-4 mx-2 w-50">No hay productos en el carrito</div>:
                        
                        <CartView handler={handlerDeleteProductCart} items={cartItems} />
                    } />
    
                    <Route path="login" element={
                        <UsersPage/>
                    } />
    
    
                    <Route path="/" element={<Navigate to={'/products'} />} />
    
                </Routes>
            </div>
            </>
    
        : <LoginPage handlerLogin={handlerLogin}/>
        
        } </>
    
    
    );

}
