import PropTypes from 'prop-types';
import { BeerTable2 } from './BeerTable2';

export const BeerTable1=({beerTypes,handlerDeleteBeerTypes })=>{

    let cardGroups = []; // Array para almacenar los grupos de tarjetas

    // Agrupar las tarjetas en grupos de cuatro
    for (let i = 0; i < beerTypes.length; i += 4) {
        cardGroups.push(beerTypes.slice(i, i + 4));
    }

    return (
        <>
            <h3>Clases de cervezas </h3>

            {/* Mapear cada grupo de tarjetas */}
            {cardGroups.map((group, index) => (
                <div className="card-group" key={index}>
                    {/* Mapear las tarjetas dentro de cada grupo */}
                    {group.map(({ id, beerName, alcoholGrade, type, price, importation, description, image }) => (
                        <BeerTable2
                            key={id}
                            id={id}
                            beerName={beerName}
                            price={price}
                            type={type}
                            importation={importation}
                            description={description}
                            image={image}
                            alcoholGrade={alcoholGrade}
                            handlerDeleteBeerTypes={handlerDeleteBeerTypes}
                        />
                    ))}
                </div>
            ))}
        </>
    );
    
    
    
    
    

}

BeerTable1.propTypes ={
    beerTypes: PropTypes.array.isRequired
}