import { useEffect, useState } from "react";
import { BeerRowCol } from "./BeerRowCol";
import axios from "axios";

export const BeerByFamily = ({ family,handlerDeleteBeerTypes,handlerAddProductCart }) => {
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/beers/family/${family}`);
                setBeers(response.data);
            } catch (err) {
                setError("Error fetching beers");
            } finally {
                setLoading(false);
            }
        };

        fetchBeers();
    }, [family]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!loading && beers.length === 0) {
        return <div>No beers found for {family}</div>;
    }

    return (
        <div className="container">
            <BeerRowCol beerTypes={beers} handlerDeleteBeerTypes={handlerDeleteBeerTypes} handlerAddProductCart={handlerAddProductCart} />
        </div>
    );
};