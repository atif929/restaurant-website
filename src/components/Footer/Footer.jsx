import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialIcons = [
    { icon: FaFacebook, label: 'Facebook', url: '#' },
    { icon: FaInstagram, label: 'Instagram', url: '#' },
    { icon: FaTwitter, label: 'Twitter', url: '#' },
    { icon: FaYoutube, label: 'YouTube', url: '#' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.title}>Delicious</h3>
            <p className={styles.description}>
              Experience the finest dining with our exquisite menu prepared by world-class chefs.
              We bring you the best flavors from around the world.
            </p>
            <div className={styles.socialIcons}>
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={styles.socialIcon}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.links}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className={styles.column}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <ul className={styles.contactInfo}>
              <li><FaMapMarkerAlt /> 123 Foodie Street, Culinary City</li>
              <li><FaPhone /> (555) 123-4567</li>
              <li><FaEnvelope /> info@delicious.com</li>
              <li><FaClock /> Mon-Sun: 11:00 AM - 10:00 PM</li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className={styles.copyright}>
            © {currentYear} Delicious Restaurant. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;