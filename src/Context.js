import React, { useState, useEffect } from "react";
import { storeProducts, detailProduct } from "./data";
import context from "react-bootstrap/esm/AccordionContext";

const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [state, setState] = useState({
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  });

  useEffect(() => {
    setProducts();
    addTotals();
  }, [state.cart]);

  const setProducts = () => {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    setState((prevState) => {
      return { ...prevState, products: products };
    });
    // console.log("products", products);
  };

  const getItem = (id) => {
    const product = state.products.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setState((prevState) => {
      return { ...prevState, detailProduct: product };
    });
  };

  const addToCart = (id) => {
    let tempProducts = [...state.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    setState((prevState) => {
      return {
        ...prevState,
        products: [...tempProducts],
        cart: [...state.cart, product],
        detailProduct: { ...product },
      };
    }, addTotals);
  };

  const openModal = (id) => {
    const product = getItem(id);
    setState((prevState) => {
      return { ...prevState, modalProduct: product, modalOpen: true };
    });
    console.log("modal", product);
  };

  const closeModal = () => {
    setState((prevState) => {
      return { ...prevState, modalOpen: false };
    });
  };

  const increment = (id) => {
    let tempCart = [...state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    setState((prevState) => {
      return {
        ...prevState,
        cart: [...tempCart],
      };
    }, addTotals);
  };

  const decrement = (id) => {
    let tempCart = [...state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setState((prevState) => {
        return { ...prevState, cart: [...tempCart] };
      }, addTotals);
    }
  };

  const getTotals = () => {
    let subTotal = 0;
    state.cart.forEach((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };

  const addTotals = () => {
    const totals = getTotals();
    setState((prevState) => {
      return {
        ...prevState,
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total,
      };
    });
    console.log("asss", addTotals);
  };

  const removeItem = (id) => {
    let tempProducts = [...state.products];
    let tempCart = [...state.cart];

    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter((item) => item.id !== id);

    setState((prevState) => {
      return {
        ...prevState,
        cart: [...tempCart],
        products: [...tempProducts],
      };
    }, addTotals);
  };

  const clearCart = () => {
    setState(
      (prevState) => {
        return { ...prevState, cart: [] };
      },
      () => {
        setProducts();
        addTotals();
      }
    );
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
