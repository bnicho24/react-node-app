import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_SITE_URL;

const ProductDetails = ({ productId }) => {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
     <div className="container mt-4">
        <div className="card shadow-sm mb-3">
          <div className="card-body">
           <Link to="/products" className="mt-4 text-dark text-decoration-none">
                ⬅ Back
              </Link>
            
          </div>
        </div>
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={
                product.image_url
                  ? `${API_URL}${product.image_url}`
                  : `${API_URL}/uploads/default-product.png`
              }
              alt={product.name}
              className="img-fluid rounded-start"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
              <p className="card-text"><strong>Description:</strong> {product.description}</p>
              <p className="card-text"><strong>Price:</strong> ₹{product.price}</p>

              {product.specs && (
                <div className="mt-3">
                  <h5>Specifications</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">CPU: {product.specs.cpu}</li>
                    <li className="list-group-item">RAM: {product.specs.ram}</li>
                    <li className="list-group-item">Storage: {product.specs.storage}</li>
                  </ul>
                </div>
              )}

              {product.variants && product.variants.length > 0 && (
                <div className="mt-3">
                  <h5>Variants</h5>
                  <ul className="list-group list-group-flush">
                    {product.variants.map((v) => (
                      <li key={v.id} className="list-group-item">
                        {v.color} - ${v.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails