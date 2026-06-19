import React from 'react';
import { motion } from 'framer-motion';
import styles from './FeatureCard.module.css';

function FeatureCard({ icon, title, description, color, index }) {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index || 0) * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <motion.div 
        className={styles.iconWrapper}
        whileHover={{ rotate: 10, scale: 1.1 }}
        style={{ backgroundColor: color ? `${color}20` : 'rgba(192, 57, 43, 0.1)' }}
      >
        <span className={styles.icon} style={{ color: color || 'var(--primary)' }}>
          {icon}
        </span>
      </motion.div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.iconLine} style={{ backgroundColor: color || 'var(--primary)' }}></div>
    </motion.div>
  );
}

export default FeatureCard;