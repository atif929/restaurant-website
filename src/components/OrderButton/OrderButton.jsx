import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { addToOrder } from '../../utils/orderUtils';
import styles from './OrderButton.module.css';

function OrderButton({ dish }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleOrder = () => {
    addToOrder(dish);
    setIsAdded(true);
    toast.success(`${dish.name} added to cart!`);
    
    // Trigger storage event for navbar update
    window.dispatchEvent(new Event('storage'));
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.button
      className={`${styles.orderBtn} ${isAdded ? styles.added : ''}`}
      onClick={handleOrder}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isAdded ? (
        <>
          <FaCheck className={styles.btnIcon} />
          Added!
        </>
      ) : (
        <>
          <FaShoppingCart className={styles.btnIcon} />
          Order Now
        </>
      )}
    </motion.button>
  );
}

export default OrderButton;