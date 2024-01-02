import React from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../../Context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

const Store = (props) => {
  return (
    <section>
      <ProductContext>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <React.Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} history={props.history} />
              </React.Fragment>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductContext>
    </section>
  );
};

export default Store;
