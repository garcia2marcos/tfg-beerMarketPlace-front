import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { impMyBeer } from "../services/BeerService";


export const useBeerItems=({beerTypes})=>{

    const [myCounter, setMyCounter] = useState(9)
    


    

   

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


    return(

        beerTypes,

        handlerAddBeerTypes,
        handlerDeleteBeerTypes

    )

   
}