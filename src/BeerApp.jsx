
import { useEffect, useState } from "react";
import { BeerService,calculateTotal, impMyBeer } from "./services/BeerService"
import { BeerView, MyBeerView } from "./components/BeerView";
import { ImportationView } from "./components/ImportationView";
import { CompanyView } from "./components/CompanyView";
import { Tipos } from "./components/TiposView";
import { TableIngredientsView } from "./components/TableIngredientsView";
import { TotalView } from "./components/TotalView";
import { FormIngView } from "./components/FormIngView";
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

    const [total, setTotal]= useState(0)
    const [counter, setCounter] = useState(5)
    const [myCounter, setMyCounter] = useState(5)
    const [beer, setBeer]= useState(beerInitial);
    const [myBeer, setMyBeer] = useState(myBeerInitial)
    const [ingredients, setIngredientes] = useState([])
    const [beerTypes, setBeerTypes] = useState([])
    const [activeForm, setActiveForm] = useState([true])
    const [showForm, setShowForm] = useState(false);

    const { id, name, price: ingPrice, type, importation,
        company: { name: nameComp, fiscalname },
    } = beer
    
    useEffect(()=>{
        console.log('eel formulario cambio')
        setTotal(calculateTotal(ingredients))

    }, [ingredients])

    useEffect(() =>{
        const data = BeerService();
        setBeer(data)
        setIngredientes(data.ingredients)

    }, []) 

    useEffect(()=>{
        const myData= impMyBeer();
        setMyBeer(myData);
        setBeerTypes(myData.myBeer);

    },[])

    const handlerAddIngs = ({product,price,measure,quantity})=>{

        setIngredientes([...ingredients, {
            id: counter,
            product: product.trim(),
            price: +price.trim(),
            measure: measure.trim(),
            quantity: +quantity.trim()
        }]);

        setCounter(counter + 1);

    }
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

    const handlerDeleteItem=(id)=>{
        setIngredientes(ingredients.filter(ing=>ing.id!==id))

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
                        <NewForm handler={handlerAddBeerTypes} activeform={showForm} />
                    ) : (
                        <>
                            <BeerTable1 beerTypes={beerTypes} handlerDeleteBeerTypes={handlerDeleteBeerTypes} />
                            <button className="btn btn-secondary mb-3" onClick={handleToggleForm}>
                                Agregar Item
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

                    /*<TableIngredientsView ingredients={ingredients} handlerDeleteItem={handlerDeleteItem} />
                    <TotalView total={total} />
                    <button className="btn btn-secondary"
                    onClick={onActiveFrom}>  {!activeForm? 'Agregar Item': 'Ocultar form'} </button>
                    {!activeForm?'': <FormIngView handler={handlerAddIngs} />}*/