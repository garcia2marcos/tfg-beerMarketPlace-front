import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findById, remove } from '../services/BeerService';
import Swal from 'sweetalert2';
import '../styles/border.css';

export const ProductPage = ({ handlerDeleteBeerTypes, handlerAddProductCart }) => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {  
      try {
        const fetchedProduct = await findById(id);
        setProduct(fetchedProduct);
        setRating(fetchedProduct.quality || 0);
      } catch (err) {
        setError('Error al cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addProduct = () => {
    if (!product) return;

    const productToAdd = {
      id: product.id,
      beerName: product.beerName,
      description: product.description,
      price: product.price,
      quantity,
      image: product.imagePath,
    };

    handlerAddProductCart(productToAdd);

    Swal.fire({
      title: 'Beer added to shopping cart!',
      text: `${product.beerName} has been added to your shopping cart.`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/cart');
  };

  const deleteProduct = () => {
    console.log("Directly calling remove with ID:", id);
    remove(id)
        .then((response) => {
            console.log("Response from remove in deleteProduct:", response);
            if (response) {
                Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                        }).then(() => {
                  navigate("/products");  
                  window.location.reload()
                });
            } else {
                console.error("Error: Could not delete beer");
            }
        })
        .catch((error) => {
            console.error("Error in remove:", error);
        });
};

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <div className="container text-bg-light rounded-form my-3" style={{ maxWidth: '1000px', padding: '20px' }}>
      <div className="row">
        <div className="col-md-6 my-5 d-flex justify-content-center align-items-center" style={{ height: '450px' }}>
          <img
            src={product.imagePath}
            alt={product.beerName}
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6 my-3">
          <h1> {product.beerName}</h1>
          <h5>{product.model}</h5>
          <p>{product.description}</p>
        
          <h5 className="my-3">Precio: {product.price}€/Unidad</h5>
          <div className="product-counter col-md-4 my-3">
            <button className="counter-button" onClick={decrement}>-</button>
            <span className="count-display">{quantity}</span>
            <button className="counter-button" onClick={increment}>+</button>
          </div>

          <button
            className="btn btn-outline-primary mb-2 me-2 rounded-pill"
            onClick={addProduct}
          >
            Add to shopping cart
          </button>
          <button
            className="btn btn-outline-secondary mb-2 rounded-pill"
            onClick={deleteProduct}
          >
            Delete product
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h5>Details of the product</h5>
          <table className="table">
            <tbody>
              <tr>
                <td>Origin</td>
                <td>{product.importation}</td>
              </tr>
              <tr>
                <td>Family</td>
                <td>{product.family}</td>
              </tr>
              <tr>
                <td>Style</td>
                <td>{product.style}</td>
              </tr>
              <tr>
                <td>Sub style</td>
                <td>{product.substyle}</td>
              </tr>
              <tr>
                <td>Graduation</td>
                <td>{product.alcoholGrade}º</td>
              </tr>
              <tr>
                <td>Ingredients</td>
                <td>{product.ingredients}.</td>
              </tr>
              <tr>
                <td>Allergens</td>
                <td>{product.allergens}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5>Technical Sheet</h5>
          <table className="table">
          <tbody>
              <tr>
                <td>Category</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>{product.color}</td>
              </tr>
              <tr>
                <td>Origin</td>
                <td>{product.importation}</td>
              </tr>
              <tr>
                <td>Tone</td>
                <td>{product.tone}</td>
              </tr>
              <tr>
                <td>Graduation</td>
                <td>{product.alcoholGrade}º</td>
              </tr>
              <tr>
                <td>Format</td>
                <td>{product.format}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};
      

export default ProductPage;
