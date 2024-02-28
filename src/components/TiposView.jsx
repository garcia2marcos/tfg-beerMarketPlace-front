import es1 from '../images/estrellagalicia2.png';
import es2 from '../images/estrellagalicia3.png';
import es3 from '../images/estrellagalicia4.jpg';
import es4 from '../images/estrellagalicia1.png';
import PropTypes from 'prop-types';

export const Tipos = ({ nameComp }) => {


    return (
        <>
            <h4>Tipos de {nameComp} </h4>
            <div className="card-group">
                <div className="card">
                    <img src={es1} />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" type="button">Comprar ya</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src={es2} />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" type="button">Comprar ya</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src={es3} />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" type="button">Comprar ya</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )



}

Tipos.propTypes = {
    nameComp: PropTypes.string.isRequired
}