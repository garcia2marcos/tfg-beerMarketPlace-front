
//import {myBeer} from "../data/myBeer"
import axios from "axios"

export const impMyBeer=async()=>{

    const response = await fetch('http://localhost:8080/beers')
    const myBeer = await response.json();
    return {myBeer}
}

export const calculateTotal=(items)=>{

    return items.reduce((accumulator, item)=> accumulator+item.product.price * item.quantity,0)

}

export const save = async (beerData) => {
    console.log("Data being sent to API (save):", beerData);

    try {
        return await axios.post('http://localhost:8080/beers', beerData);
    } catch (error) {
        console.error("Error in save request:", error.response?.data || error.message);
    }

    return null;
};

export const update = async ({ id, ...beerData }) => {
    console.log(`Data being sent to API (update):`, beerData);

    try {
        return await axios.put(`http://localhost:8080/beers/${id}`, beerData);
    } catch (error) {
        console.error("Error in update request:", error.response?.data || error.message);
    }

    return null;
};

export const remove = async(id)=>{
    console.log("removing data:",);
    try {
        return await axios.delete(`${'http://localhost:8080/beers'}/${id}`);
    } catch (error) {

        console.log(error);
        
    }

}

export const findById = async(id)=>{
    try {
        return await axios.get(`${'http://localhost:8080/beers'}/${id}`);
    } catch (error) {

        console.log(error);
        
    }

}

