import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUtensils, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaBook, 
  FaInfoCircle, 
  FaEnvelope,
  FaPhone,
  FaShoppingCart
} from 'react-icons/fa';
import styles from './Navbar.module.css';
import { getTotalItems } from '../../utils/orderUtils';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getTotalItems());
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/menu', label: 'Menu', icon: FaBook },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isHomePage && !scrolled ? styles.transparent : ''}`}>
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <motion.div 
          className={styles.logo}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavLink to="/" className={styles.logoLink}>
            <motion.div 
              className={styles.logoIcon}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <FaUtensils />
            </motion.div>
            <span className={styles.logoMain}>Delicious</span>
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.path}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={styles.navItem}
              >
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  <Icon className={styles.navIcon} />
                  <span>{link.label}</span>
                  {location.pathname === link.path && (
                    <motion.div 
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
          
          {/* Cart Icon with Badge */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={styles.navItem}
          >
            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              style={{ position: 'relative' }}
            >
              <FaShoppingCart className={styles.navIcon} />
              <span>Cart</span>
              {cartCount > 0 && (
                <motion.span 
                  className={styles.cartBadge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </NavLink>
          </motion.div>

          {/* Reserve Button */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <NavLink to="/contact" className={styles.reserveBtn}>
              Reserve Table
            </NavLink>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <motion.button 
          className={`${styles.hamburger} ${isHomePage && !scrolled ? styles.hamburgerLight : ''}`}
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <FaTimes className={styles.hamburgerIcon} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <FaBars className={styles.hamburgerIcon} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            <motion.div 
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.mobileMenuHeader}>
                <span className={styles.mobileMenuTitle}>Menu</span>
                <motion.button 
                  className={styles.mobileCloseBtn}
                  onClick={toggleMenu}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              <div className={styles.mobileLinks}>
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ x: 30 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <NavLink 
                        to={link.path} 
                        className={({ isActive }) => 
                          `${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`
                        }
                        onClick={toggleMenu}
                      >
                        <Icon className={styles.mobileNavIcon} />
                        <span>{link.label}</span>
                        {location.pathname === link.path && (
                          <motion.span 
                            className={styles.mobileActiveDot}
                            layoutId="mobileActiveDot"
                          />
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Cart Link */}
                <motion.div
                  initial={{ x: 30 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <NavLink 
                    to="/cart" 
                    className={({ isActive }) => 
                      `${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`
                    }
                    onClick={toggleMenu}
                    style={{ position: 'relative' }}
                  >
                    <FaShoppingCart className={styles.mobileNavIcon} />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className={styles.mobileCartBadge}>{cartCount}</span>
                    )}
                  </NavLink>
                </motion.div>
                
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={styles.mobileReserveWrapper}
                >
                  <NavLink to="/contact" className={styles.mobileReserveBtn} onClick={toggleMenu}>
                    <FaPhone className={styles.mobileNavIcon} />
                    Reserve Table
                  </NavLink>
                </motion.div>
              </div>
              
              <div className={styles.mobileFooter}>
                <p className={styles.mobileFooterText}>🍽️ Fine Dining Experience</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;