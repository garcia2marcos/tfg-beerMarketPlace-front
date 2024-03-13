import PropTypes from 'prop-types';
import { BeerCard } from './BeerCard';

export const BeerRowCol=({beerTypes,handlerDeleteBeerTypes,handlerAddProductCart })=>{

    return (
        <>
                <div className='row'>
                    {beerTypes.map(b => (
                        <div className='col-3 my-2' key={b.id}>
                        
                            <BeerCard
                                
                                id={b.id}
                                beerName={b.beerName}
                                price={b.price}
                                type={b.type}
                                importation={b.importation}
                                description={b.description}
                                image={b.image}
                                alcoholGrade={b.alcoholGrade}
                                handlerDeleteBeerTypes={handlerDeleteBeerTypes}
                                handlerAddProductCart={handlerAddProductCart}/>
                                
                        </div>
                        
                    ))}

                </div>
                
           
        </>
    );
    
    
    
    
    

}

BeerRowCol.propTypes ={
    beerTypes: PropTypes.array.isRequired
}