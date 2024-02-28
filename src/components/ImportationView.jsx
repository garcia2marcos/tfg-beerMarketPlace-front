import PropTypes from 'prop-types';

export const ImportationView=({importation})=>{

    const { name: nameImpo, province, street, number } = importation;

    return(
        <>
        <h3>Datos de importación</h3>
                            <ul className="list-group">

                                <li className="list-group-item active" >  {nameImpo} </li>
                                <li className="list-group-item" >  {province}/{street} </li>
                                <li className="list-group-item" >  {number} </li>


                            </ul >
        
        </>

    )

}
ImportationView.proptypes ={
    importation: PropTypes.object.isRequired
}