import { useNavigate } from 'react-router-dom';
import uploadImage from '../images/uploadimage.png'
import { useState } from "react";
import '../styles/border.css'
import Swal from 'sweetalert2';


export const NewForm = ({ handler }) => {
    const navigate = useNavigate();

    const [formBeerState, setFormBeerState] = useState({
        beerName: '',
        alcoholGrade: '',
        type: '',
        price: '',
        quality: '',
        importation: '',
        description: '',
        image: '',
        origin: '',
        family: '',
        style: '',
        substyle: '',
        ingredients: '',
        allergens: '',
        category: '',
        color: '',
        tone: '',
        format: '',
        model: ''
    })

    const { beerName, alcoholGrade, type, price, quality, importation, description, image, origin,
        family,
        style,
        substyle,
        ingredients,
        allergens,
        category,
        color,
        tone,
        format,
        model } = formBeerState

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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Upload an image!",
            });
            return;
        }

        if (beerName.trim().length <= 0) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "A Beer name is rquired!",
            });

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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Price is required!",
            });

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
            quality: '',
            importation: '',
            description: '',
            image: '',
            origin: '',
            family: '',
            style: '',
            substyle: '',
            ingredients: '',
            allergens: '',
            category: '',
            color: '',
            tone: '',
            format: '',
            model: ''
        })


        navigate('/products')
        window.location.reload()
        Swal.fire({
            title: "Beer added!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleGoBack = () => {
        navigate('/products')
    };




    return (



        <form className="container w-65 text-bg-light m-2 rounded-form" onSubmit={onBeerSumbit}>

            <div className="container text-center">
                <h2 className="display-6 text-primary">NEW PRODUCT</h2>
            </div>
            <img src={uploadImage} style={{ maxHeight: '100px', margin: 10 }} />
            <label htmlFor="formFile" className="form-label" />
            <input className="form-control my-2" type="file" id="formFile" onChange={onFileChange} />
            <div className="row g-2">
                <div className="col-md-6">
                    <input type="text" name="beerName" placeholder="Nombre de la cerveza" className="form-control" value={beerName} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="importation" placeholder="Importación" className="form-control" value={importation} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="type" placeholder="Tipo de cerveza" className="form-control" value={type} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="alcoholGrade" placeholder="Grado de Alcohol" className="form-control" value={alcoholGrade} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="price" placeholder="Precio" className="form-control" value={price} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="quality" placeholder="Calidad" className="form-control" value={quality} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="family" placeholder="Familia" className="form-control" value={family} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="style" placeholder="Estilo" className="form-control" value={style} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="substyle" placeholder="Subestilo" className="form-control" value={substyle} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="ingredients" placeholder="Ingredientes" className="form-control" value={ingredients} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="allergens" placeholder="Alérgenos" className="form-control" value={allergens} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="category" placeholder="Categoría" className="form-control" value={category} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="color" placeholder="Color" className="form-control" value={color} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="tone" placeholder="Tono" className="form-control" value={tone} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="format" placeholder="Formato" className="form-control" value={format} onChange={onInputBeerChange} />
                </div>
                <div className="col-md-6">
                    <input type="text" name="model" placeholder="Modelo" className="form-control" value={model} onChange={onInputBeerChange} />
                </div>
            </div>

            <textarea className="form-control my-2" id="description" rows="6" placeholder='Descripcion del producto' name="description" value={description} onChange={onInputBeerChange} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" className="btn btn-primary m-2 rounded-pill" >Añadir nuevo producto</button>
                <button className="btn btn-secondary m-2 rounded-pill" onClick={handleGoBack}>Volver inicio</button>

            </div>
        </form>




    )
}