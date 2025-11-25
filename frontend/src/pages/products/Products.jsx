import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_SITE_URL;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
       <div className="card shadow-sm mb-3">
          <div className="card-body">
            <h4 className="card-title">Products</h4>
            
          </div>
        </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  product.image_url
                    ? `${API_URL}${product.image_url}`
                    : `${API_URL}/uploads/default-product.png`
                }
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.brand}</p>
                <p className="card-text"><strong>₹{product.price}</strong></p>
                <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products