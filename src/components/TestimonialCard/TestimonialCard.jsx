import React from 'react';
import { motion } from 'framer-motion';
import styles from './TestimonialCard.module.css';

function TestimonialCard({ name, role, content, rating, index }) {
  const renderStars = () => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <motion.div 
      className={`${styles.card} card-hover`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={styles.quoteIcon}>"</div>
      <p className={styles.content}>"{content}"</p>
      <div className={styles.rating}>{renderStars()}</div>
      <div className={styles.author}>
        <div className={styles.avatar}>
          {name.charAt(0)}
        </div>
        <div className={styles.authorInfo}>
          <h4 className={styles.name}>{name}</h4>
          <span className={styles.role}>{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;