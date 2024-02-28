import PropTypes from 'prop-types';


export const CompanyView=({nameComp,fiscalname})=>{

    

    return(

        <>
            <h3>Datos de compañia</h3>
                            <ul className="list-group">

                                <li className="list-group-item active">  {nameComp} </li>
                                <li className="list-group-item">  {fiscalname} </li>


                            </ul>
        
        
        </>
    )
}

CompanyView.propTypes ={
    nameComp: PropTypes.string.isRequired,
    fiscalname: PropTypes.number.isRequired
}