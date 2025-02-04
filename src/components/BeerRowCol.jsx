import PropTypes from 'prop-types';
import { BeerCard } from './BeerCard';

export const BeerRowCol = ({ beerTypes, handlerDeleteBeerTypes, handlerAddProductCart }) => {
    const sortedBeerTypes = [...beerTypes].sort((a, b) => b.quality - a.quality);

    return (
        <>
            <div className="row">
                {sortedBeerTypes.map((b) => (
                    <div className="col-3 my-2" key={b.id}>
                        <BeerCard
                            id={b.id}
                            beerName={b.beerName}
                            price={b.price}
                            quality={b.quality}
                            type={b.type}
                            importation={b.importation}
                            description={b.description}
                            image={b.imagePath}
                            alcoholGrade={b.alcoholGrade}
                            handlerDeleteBeerTypes={handlerDeleteBeerTypes}
                            handlerAddProductCart={handlerAddProductCart}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

BeerRowCol.propTypes = {
    beerTypes: PropTypes.array.isRequired,
    handlerDeleteBeerTypes: PropTypes.func.isRequired,
    handlerAddProductCart: PropTypes.func.isRequired,
};
