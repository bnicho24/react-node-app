const db = require("../config/database");

exports.getAllProducts = (req, res, next) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.id;

  const productQuery = "SELECT * FROM products WHERE id = ?";
  const specsQuery = "SELECT * FROM product_specs WHERE product_id = ?";
  const variantsQuery = "SELECT * FROM product_variants WHERE product_id = ?";

  db.query(productQuery, [productId], (err, productResults) => {
    if (err) return next(err);
    if (productResults.length === 0) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    const product = productResults[0];

    db.query(specsQuery, [productId], (err, specsResults) => {
      if (err) return next(err);

      db.query(variantsQuery, [productId], (err, variantResults) => {
        if (err) return next(err);

        product.specs = specsResults[0] || {};
        product.variants = variantResults || [];

        res.json(product);
      });
    });
  });
};