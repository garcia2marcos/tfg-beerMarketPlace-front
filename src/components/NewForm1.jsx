import {useNavigate } from 'react-router-dom';
import uploadImage from '../images/uploadimage.png'
import { useState } from "react";
import '../styles/border.css'


export const NewForm = ({ handler }) => {
    const navigate = useNavigate();

    const [formBeerState, setFormBeerState] = useState({
        beerName: '',
        alcoholGrade: '',
        type: '',
        price: '',
        importation: '',
        description: '',
        image: ''
    })

    const { beerName, alcoholGrade, type, price, importation, description, image } = formBeerState

    const onInputBeerChange = ({ target: { name, value } }) => {

        console.log(value)
        setFormBeerState({
            ...formBeerState,
            [name]: value
        })
    }

    const onFileChange = (event) => {
        const file = event.target.files[0];
        setFormBeerState({
            ...formBeerState,
            image: file
        });
    }


    const onBeerSumbit = (event) => {
        event.preventDefault();

        if (!formBeerState.image) {
            alert('Please upload an image');
            return;
        }

        if (beerName.trim().length <= 0) {

            alert('BeerName is rquired')

            return;
        }
        if (alcoholGrade.trim().length <= 0) {

            alert('Alcohol grade is required')

            return;
        }
        if (isNaN(alcoholGrade.trim())) {
            alert('Alcohol grade must be a number')

            return;
        }
        if (price.trim().length <= 0) {

            alert('Price is required')

            return;
        }

        if (isNaN(price.trim())) {

            alert('Price must be a number')

            return;
        }
        if (importation.trim().length <= 0) {

            alert('Importation is required')

            return;
        }




        handler(formBeerState)

        setFormBeerState({
            beerName: '',
            alcoholGrade: '',
            type: '',
            price: '',
            importation: '',
            description: '',
            image: ''
        })


        navigate('/products')
    }

    const handleGoBack = () => {
        navigate('/products')
    };



    return (

        

            <form className="container w-65 text-bg-light m-2 rounded-form" onSubmit={onBeerSumbit}>
            
                <div className="container text-center">
                    <h2>NEW PRODUCT</h2>
                </div>
                <img src={uploadImage} style={{ maxHeight: '100px', margin: 15 }} />
                <label htmlFor="formFile" className="form-label" />
                <input className="form-control m-2" type="file" id="formFile" onChange={onFileChange} />
                <input type="text" name="beerName" placeholder="Nombre de la cerveza" className="form-control m-2" value={beerName} onChange={onInputBeerChange} />
                <select name="type" placeholder="Tipo de cerveza" className="form-control m-2" value={type} onChange={onInputBeerChange}>
                    <option value="Tipo de cerveza">Tipo de cerveza</option>
                    <option value="Lagger">Lagger</option>
                    <option value="Pale Ale">Pale Ale</option>
                    <option value="Ipa">Ipa</option>
                </select>
                <input type="text" name="alcoholGrade" placeholder="Grado de Alcohol" className="form-control m-2" value={alcoholGrade} onChange={onInputBeerChange} />
                <input type="text" name="price" placeholder="Precio" className="form-control m-2" value={price} onChange={onInputBeerChange} />
                <input type="text" name="importation" placeholder="Importación" className="form-control m-2" value={importation} onChange={onInputBeerChange} />
                <textarea className="form-control m-2" id="description" rows="6" placeholder='Descripcion del producto' name="description" value={description} onChange={onInputBeerChange} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="submit" className="btn btn-primary m-2 rounded-pill" >Añadir nuevo producto</button>
                    <button className="btn btn-secondary m-2 rounded-pill" onClick={handleGoBack}>Volver inicio</button>
                
                </div>
            </form>

        


    )
}