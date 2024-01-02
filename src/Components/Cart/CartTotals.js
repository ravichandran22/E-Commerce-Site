import React from "react";
import { Link } from "react-router-dom";
import { ProductProvider } from "../../Context";

const CartTotals = ({ value }) => {
  // const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  // console.log("value", value);

  return (
    <ProductProvider value={value}>
      <React.Fragment>
        <div className="container">
          <div className="row w-100 justify-content-end">
            <div className="col-12 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right justify-content-end">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => {
                    value.clearCart();
                  }}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className="text-title">subtotal :</span>
                <strong>{value.cartSubTotal}</strong>
              </h5>
              <h5>
                <span className="text-title">tax :</span>
                <strong>{value.cartTax}</strong>
              </h5>
              <h5>
                <span className="text-title">total :</span>
                <strong>{value.cartTotal}</strong>
              </h5>
            </div>
          </div>
        </div>
      </React.Fragment>
    </ProductProvider>
  );
};

export default CartTotals;
