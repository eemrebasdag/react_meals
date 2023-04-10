import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = props => {
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;

  const cartItemRemoveHandler = id => {
    context.removeItem(id);
  };
  const cartItemAddHandler = item => {
    context.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map(items => (
        <CartItem
          key={items.id}
          name={items.name}
          amount={items.amount}
          price={items.price}
          onRemove={cartItemRemoveHandler.bind(null, items.id)}
          onAdd={cartItemAddHandler.bind(null, items)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
