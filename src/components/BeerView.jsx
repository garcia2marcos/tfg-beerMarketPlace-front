import PropTypes from 'prop-types';

export const BeerView=({id,name,ingPrice,type})=>{
    return (
        <>
          <ul className="list-group">
                        <li className="list-group-item">Id: {id} </li>
                        <li className="list-group-item"> name: {name} </li>
                        <li className="list-group-item">price: {ingPrice} </li>
                        <li className="list-group-item">type: {type} </li>

                    </ul>
        
        </>


    )
}

export const MyBeerView =({id, beerName,alcoholGrade,type,price,importartion,description,foto})=>{

    return (
        <>
          <ul className="list-group">
                        <li className="list-group-item">Id: {id} </li>
                        <li className="list-group-item"> name: {beerName} </li>
                        <li className="list-group-item">price: {alcoholGrade} </li>
                        <li className="list-group-item">type: {type} </li>
                        <li className="list-group-item">type: {price} </li>
                        <li className="list-group-item">type: {importartion} </li>
                        <li className="list-group-item">type: {description} </li>
                        <li className="list-group-item">type: {foto} </li>

                    </ul>
        
        </>


    )

}

BeerView.propTypes ={
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingPrice: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
}