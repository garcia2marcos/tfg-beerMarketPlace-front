import PropTypes from 'prop-types';
import { BeerCard } from '../BeerCard';

export const BeerRowColImpREST = ({ beerTypes, handlerDeleteBeerTypes, handlerAddProductCart }) => {



    const otherBeers = beerTypes.filter(b => !['España', 'Alemania', 'Belgica'].includes(b.importation));


    return (
        <>
            <div className='row'>
                {otherBeers.map(b => (
                    <div className='col-3 my-2' key={b.id}>

                        <BeerCard

                            id={b.id}
                            beerName={b.beerName}
                            price={b.price}
                            quality={b.quality}
                            type={b.type}
                            importation={b.importation}
                            description={b.description}
                            image={b.image}
                            alcoholGrade={b.alcoholGrade}
                            handlerDeleteBeerTypes={handlerDeleteBeerTypes}
                            handlerAddProductCart={handlerAddProductCart}
                        />

                    </div>

                ))}

            </div>


        </>
    );
}