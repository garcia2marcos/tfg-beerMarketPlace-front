
import { useEffect, useState } from "react";
import { findById, impMyBeer, remove, save, update } from "./services/BeerService"
import { BeerRowCol } from "./components/BeerRowCol";
import { NewForm } from "./components/NewForm";
import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import { useItemsCart } from "./hooks/useItemsCart";
import { CartView } from "./components/CartView";
import { loginReducer } from "./reducers/loginReducer"
import { useReducer } from "react"
import {LoginPage} from "../src/components/LoginPage"
import Swal from "sweetalert2";
import { loginUser, verifyLogIn } from "./services/authService";
import { UsersPage } from "./pages/UsersPage";
import { ProductPage } from "./components/ProductBeerPage";
import { BeerByCountry } from "./components/BeerByCountry";
import { BeerByFamily } from "./components/BeerByFamily";


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
        beerName, 
        alcoholGrade, 
        type, price, 
        quality, 
        importation, 
        description, 
        image, 
        origin,
        family,
        style,
        substyle,
        ingredients,
        allergens,
        category,
        color,
        tone,
        format,
        model
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
            family: family.trim(),
            style: style.trim(),
            substyle: substyle.trim(),
            ingredients: ingredients.trim(),
            allergens: allergens.trim(),
            category: category.trim(),
            color: color.trim(),
            tone: tone.trim(),
            format: format.trim(),
            model: model.trim()
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

        console.log('id en handler ='+ id)
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
    const handlerLogin = async ({ username, password = null }) => {
        console.log(`Logging in with user: ${username}`);
      
        if (!password) {
          // Caso de Google Login
          const user = { username };
      
          dispatch({
            type: 'login',
            payload: user,
          });
          sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user,
          }));
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Successfully logged in as ${username}`,
            showConfirmButton: false,
            timer: 700,
          });
          return;
        }
      
        // Caso normal (usuario y contraseña)
        const isLogin = await verifyLogIn({ username, password });
        if (isLogin) {
          const user = { username };
      
          dispatch({
            type: 'login',
            payload: user,
          });
          sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user,
          }));
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Successfully logged in",
            showConfirmButton: false,
            timer: 700,
          });
        } else {
          Swal.fire("Error", "Invalid username or password", "error");
        }
      };

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
        <Navbar handlerLogOut={handlerLogOut} login={login} cartCount={cartItems.length}/>
            <div className="container">
                <Routes>
    
                    <Route path="form" element={
                        <NewForm handler={handlerAddBeerTypes} />
                    } />
    
                    <Route path="products" element={
                        <BeerRowCol beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
                    } />

                    <Route path="/product/:id" element ={
                        <ProductPage handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>
                    }/>
                    
                    <Route path="/esp" element={<BeerByCountry country="España" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />
                    <Route path="/bel" element={<BeerByCountry country="Bélgica" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />
                    <Route path="/ger" element={<BeerByCountry country="Alemania" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />
                    <Route path="/jpn" element={<BeerByCountry country="Japón" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />
                    <Route path="/scot" element={<BeerByCountry country="Escocia" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />
                    <Route path="/noalcohol" element={<BeerByFamily family="SinAlcohol" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />
                    <Route path="/nogluten" element={<BeerByFamily family="SinGluten" handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart}/>} />

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
