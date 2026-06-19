import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingCart,
  FaArrowLeft
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { getOrders, removeFromOrder, updateQuantity, clearOrders, getTotalPrice } from '../../utils/orderUtils';
import styles from './Cart.module.css';

function Cart() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const items = getOrders();
    setOrders(items);
    setTotal(getTotalPrice());
  };

  const handleRemove = (id) => {
    removeFromOrder(id);
    loadOrders();
    window.dispatchEvent(new Event('storage'));
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      handleRemove(id);
      return;
    }
    updateQuantity(id, quantity);
    loadOrders();
    window.dispatchEvent(new Event('storage'));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearOrders();
      loadOrders();
      window.dispatchEvent(new Event('storage'));
      toast.success('Cart cleared');
    }
  };

  const handleCheckout = () => {
    if (orders.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('🎉 Order placed successfully! Thank you for dining with us!');
    clearOrders();
    loadOrders();
    window.dispatchEvent(new Event('storage'));
  };

  if (orders.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <Toaster position="top-right" />
        <div className={styles.emptyCartContent}>
          <FaShoppingCart className={styles.emptyIcon} />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/menu" className={styles.browseBtn}>
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <motion.div 
        className={styles.cartPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className={styles.cartHeader}>
            <Link to="/menu" className={styles.backBtn}>
              <FaArrowLeft /> Continue Shopping
            </Link>
            <h1 className={styles.cartTitle}>Your Cart</h1>
            <button onClick={handleClearCart} className={styles.clearBtn}>
              <FaTrash /> Clear Cart
            </button>
          </div>

          <div className={styles.cartGrid}>
            <div className={styles.cartItems}>
              {orders.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={styles.cartItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className={styles.itemImage}>
                    <img 
                      src={item.image || 'https://via.placeholder.com/100x100/FFF8F0/C0392B?text=Food'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100/FFF8F0/C0392B?text=Food';
                      }}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.itemQuantity}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className={styles.qtyBtn}
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.qtyNumber}>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className={styles.removeBtn}
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Items ({orders.reduce((acc, item) => acc + item.quantity, 0)})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <motion.button 
                className={styles.checkoutBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Cart;