
import { useEffect, useState } from "react";
import {impMyBeer } from "./services/BeerService"
import { TotalView } from "./components/TotalView";
import { BeerTable1 } from "./components/BeerTable1";
import { NewForm } from "./components/NewForm1";

const beerInitial={
    id: 0,
    name: '',
    price: 0,
    type: '',
    importation: {
        name: '',
        province: '',
        street: '',
        number: 0
    },
    company: {
        name: '',
        fiscalname: 0,
    },
    ingredients:[ ]
}

const myBeerInitial={
    myBeer:[]
}
export const BeerApp = () => {

   // const [total, setTotal]= useState(0)
    const [myCounter, setMyCounter] = useState(5)
    const [beer, setBeer]= useState(beerInitial);
    const [myBeer, setMyBeer] = useState(myBeerInitial)
    const [beerTypes, setBeerTypes] = useState([])
    const [showForm, setShowForm] = useState(false);

    const { id, name, price: ingPrice, type, importation,
        company: { name: nameComp, fiscalname },
    } = beer
    
    /*useEffect(()=>{
        console.log('eel formulario cambio')
        setTotal(calculateTotal(ingredients))

    }, [ingredients])*/


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

        setShowForm(false);

    }


    const handlerDeleteBeerTypes=(id)=>{
        setBeerTypes(beerTypes.filter(beer=>beer.id!==id))

    }

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };
    

    return (
        <div className="container">
            <div className="card text-bg-light mb-3">
                <div className="card-header">
                    <h1>BeerMarketPlace</h1>
                </div>
                <div className="card-body">
                    {showForm ? (
                        <NewForm handler={handlerAddBeerTypes}  handleToggleForm={handleToggleForm} />
                    ) : (
                        <>
                            <BeerTable1 beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} />
                            <div className="d-grid gap-2">
                            <button className="btn btn-secondary mb-3 btn-sm" onClick={handleToggleForm}>
                                Agregar Item
                            </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
