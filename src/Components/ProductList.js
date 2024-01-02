import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductProvider, ProductContext } from "../Context";

const ProductList = () => {
  console.log("Result", ProductContext);
  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            <ProductContext.Consumer>
              {(value) => {
                return value.products.map((product) => (
                  <Product key={product.id} product={product} />
                ));
              }}
            </ProductContext.Consumer>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
