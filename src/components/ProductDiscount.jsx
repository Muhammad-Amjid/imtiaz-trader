
import React from "react";

function ProductDiscount({ product }) {
  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);

  const hasDiscount =
    product.price !== "" &&
    product.price != null &&
    product.originalPrice !== "" &&
    product.originalPrice != null &&
    Number.isFinite(price) &&
    Number.isFinite(originalPrice) &&
    originalPrice > price &&
    price >= 0;

  if (!hasDiscount) return null;

  const discount = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );

  const savings = originalPrice - price;

  return (
    <div className="product-discount-info">
      <span className="badge bg-danger mb-2">
        {discount}% OFF
      </span>

      <div className="d-flex align-items-center gap-2 flex-wrap">
        <strong className="text-danger">
          Rs. {price.toLocaleString("en-PK")}
        </strong>

        <del className="text-secondary">
          Rs. {originalPrice.toLocaleString("en-PK")}
        </del>
      </div>

      <small className="text-success fw-semibold">
        You save Rs. {savings.toLocaleString("en-PK")}
      </small>
    </div>
  );
}

export default ProductDiscount;
