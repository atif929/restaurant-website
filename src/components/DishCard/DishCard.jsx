import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderButton from '../OrderButton/OrderButton';
import styles from './DishCard.module.css';

function DishCard({ image, name, description, price, index }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getImageUrl = () => {
    if (imgError || !image) {
      return null;
    }
    return image;
  };

  return (
    <motion.div 
      className={`${styles.card} card-hover`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.05 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.imageContainer}>
        {!isLoaded && !imgError && (
          <div className={styles.imagePlaceholder}>
            <span>🍽️</span>
          </div>
        )}
        <img 
          src={getImageUrl() || `https://via.placeholder.com/400x300/FFF8F0/C0392B?text=${encodeURIComponent(name)}`}
          alt={name} 
          className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setImgError(true);
            setIsLoaded(true);
            e.target.src = `https://via.placeholder.com/400x300/FFF8F0/C0392B?text=${encodeURIComponent(name)}`;
          }}
          style={{ 
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
        <div className={styles.overlay}>
          <span className={styles.price}>${price}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <OrderButton dish={{ id: name.replace(/\s+/g, '-').toLowerCase(), name, description, price, image }} />
      </div>
    </motion.div>
  );
}

export default DishCard;