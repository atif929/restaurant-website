import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingCart,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { getOrders, removeFromOrder, updateQuantity, clearOrders, getTotalPrice } from '../../utils/orderUtils';
import styles from './Cart.module.css';

function Cart() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success('🎉 Order placed successfully! Thank you for dining with us!');
      clearOrders();
      loadOrders();
      window.dispatchEvent(new Event('storage'));
      setIsCheckingOut(false);
    }, 1500);
  };

  const getTotalItems = () => {
    return orders.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Empty Cart View
  if (orders.length === 0) {
    return (
      <motion.div 
        className={styles.emptyCart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.emptyCartContent}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <FaShoppingCart className={styles.emptyIcon} />
          </motion.div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <p className={styles.emptySubtext}>Start exploring our delicious menu!</p>
          <Link to="/menu" className={styles.browseBtn}>
            Browse Menu
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.cartPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        {/* Cart Header */}
        <div className={styles.cartHeader}>
          <Link to="/menu" className={styles.backBtn}>
            <FaArrowLeft /> Continue Shopping
          </Link>
          <h1 className={styles.cartTitle}>
            Your Cart <span className={styles.itemCount}>({getTotalItems()} items)</span>
          </h1>
          <button onClick={handleClearCart} className={styles.clearBtn}>
            <FaTrash /> Clear Cart
          </button>
        </div>

        {/* Cart Grid */}
        <div className={styles.cartGrid}>
          {/* Cart Items */}
          <div className={styles.cartItems}>
            <AnimatePresence>
              {orders.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={styles.cartItem}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  {/* Image */}
                  <div className={styles.itemImage}>
                    <img 
                      src={item.image || 'https://via.placeholder.com/80x80/FFF8F0/C0392B?text=Food'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80/FFF8F0/C0392B?text=Food';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className={styles.itemQuantity}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className={styles.qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.qtyNumber}>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Total */}
                  <div className={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className={styles.removeBtn}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div 
            className={styles.cartSummary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            
            <div className={styles.summaryRow}>
              <span>Items ({getTotalItems()})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Delivery Fee</span>
              <span className={styles.freeDelivery}>Free</span>
            </div>
            
            {total > 50 && (
              <div className={styles.summaryRow}>
                <span>Discount (10%)</span>
                <span className={styles.discount}>-${(total * 0.1).toFixed(2)}</span>
              </div>
            )}
            
            <div className={styles.summaryDivider}></div>
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${total > 50 ? (total * 0.9).toFixed(2) : total.toFixed(2)}</span>
            </div>
            
            {total > 0 && total < 50 && (
              <p className={styles.deliveryNote}>
                🎉 Add ${(50 - total).toFixed(2)} more for 10% discount!
              </p>
            )}

            <motion.button 
              className={styles.checkoutBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <span className={styles.spinner}></span>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </motion.button>
            
            <p className={styles.paymentNote}>
              🔒 Secure checkout • No payment required for demo
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;