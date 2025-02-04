import { useEffect, useState } from "react";
import { BeerRowCol } from "./BeerRowCol";
import axios from "axios";

export const BeerByCountry = ({ country,handlerDeleteBeerTypes,handlerAddProductCart }) => {
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/beers/importation/${country}`);
                setBeers(response.data);
            } catch (err) {
                setError("Error fetching beers");
            } finally {
                setLoading(false);
            }
        };

        fetchBeers();
    }, [country]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!loading && beers.length === 0) {
        return <div>No beers found for {country}</div>;
    }

    return (
        <div className="container">
            <BeerRowCol beerTypes={beers} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
        </div>
    );
};