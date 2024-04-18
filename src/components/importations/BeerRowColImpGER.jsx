import PropTypes from 'prop-types';
import { BeerCard } from '../BeerCard';

export const BeerRowColImpGER=({beerTypes,handlerDeleteBeerTypes,handlerAddProductCart })=>{

    const filteredBeerTypes = beerTypes.filter(b => b.importation === 'Alemania');

    return (
        <>
                <div className='row'>
                    {filteredBeerTypes.map(b => (
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