
import {myBeer} from "../data/myBeer"

/*export const BeerService=()=>{

   const total = calculateTotal(beer.ingredients)
    
    return {...beer, total}
}

export const calculateTotal =(ingredients=[])=>{

    return ingredients
        .map(ing=> ing.price* ing.quantity)
        .reduce((accumulator, currentValue)=>accumulator+currentValue,0)
}*/

export const impMyBeer=()=>{

    return {...myBeer}
}

export const calculateTotal=(items)=>{

    return items.reduce((accumulator, item)=> accumulator+item.product.price * item.quantity,0)

}
