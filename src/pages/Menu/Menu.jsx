import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './Menu.module.css';
import { menuItems, categories } from '../../data/menuData';
import DishCard from '../../components/DishCard/DishCard';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const filtersRef = useRef(null);
  const searchInputRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 250;
      setIsSticky(scrollY > threshold);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Filter items when category or search changes
  useEffect(() => {
    let items = menuItems;
    
    if (activeCategory !== 'All') {
      items = items.filter(item => item.category === activeCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredItems(items);
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Close search when category changes
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      setSearchTerm('');
    }
  };

  const getGroupedItems = () => {
    const grouped = {};
    categories.forEach(cat => {
      grouped[cat.value] = menuItems.filter(item => item.category === cat.value);
    });
    return grouped;
  };

  const groupedItems = getGroupedItems();
  const hasResults = filteredItems.length > 0;

  // Get category counts
  const getCategoryCount = (category) => {
    if (category === 'All') return menuItems.length;
    return menuItems.filter(item => item.category === category).length;
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      className={styles.menu}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.heroBadge}>🍽️ Our Menu</span>
            <h1 className={styles.heroTitle}>
              Culinary <span>Delights</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Explore our carefully curated selection of exquisite dishes, 
              crafted with passion and the finest ingredients
            </p>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span>{menuItems.length}</span>
                <label>Dishes</label>
              </div>
              <div className={styles.heroStat}>
                <span>{categories.length}</span>
                <label>Categories</label>
              </div>
              <div className={styles.heroStat}>
                <span>⭐ 4.9</span>
                <label>Rating</label>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div 
        ref={filtersRef}
        className={`${styles.filterBar} ${isSticky ? styles.filterBarSticky : ''}`}
      >
        <div className={styles.filterBarInner}>
          <div className={styles.filterBarContainer}>
            {/* Category Filters */}
            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryBtn} ${activeCategory === 'All' ? styles.active : ''}`}
                onClick={() => handleCategoryChange('All')}
              >
                <span>All</span>
                <span className={styles.categoryCount}>{getCategoryCount('All')}</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryBtn} ${activeCategory === category.value ? styles.active : ''}`}
                  onClick={() => handleCategoryChange(category.value)}
                >
                  <span>{category.label}</span>
                  <span className={styles.categoryCount}>{getCategoryCount(category.value)}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className={styles.searchWrapper}>
              {isSearchOpen ? (
                <motion.div 
                  className={styles.searchInputWrapper}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                >
                  <FaSearch className={styles.searchIcon} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                  {searchTerm && (
                    <button 
                      className={styles.clearSearch}
                      onClick={() => setSearchTerm('')}
                    >
                      <FaTimes />
                    </button>
                  )}
                  <button 
                    className={styles.closeSearch}
                    onClick={handleSearchToggle}
                  >
                    <FaTimes />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  className={styles.searchBtn}
                  onClick={handleSearchToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSearch />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <section className={styles.menuSection}>
        <div className={styles.menuContainer}>
          {searchTerm && (
            <motion.div 
              className={styles.searchResults}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>
                {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'} found for "{searchTerm}"
              </span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {hasResults ? (
              <motion.div 
                key={activeCategory + searchTerm}
                className={styles.menuGrid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {activeCategory === 'All' && !searchTerm ? (
                  categories.map((category, catIndex) => {
                    const items = groupedItems[category.value] || [];
                    if (items.length === 0) return null;
                    return (
                      <motion.div 
                        key={category.id}
                        className={styles.categorySection}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                      >
                        <div className={styles.categoryHeader}>
                          <h2 className={styles.categoryTitle}>{category.label}</h2>
                          <span className={styles.categoryItemCount}>{items.length} items</span>
                        </div>
                        <div className={styles.categoryItems}>
                          {items.map((item, index) => (
                            <DishCard
                              key={item.id}
                              image={item.image}
                              name={item.name}
                              description={item.description}
                              price={item.price}
                              index={index}
                            />
                          ))}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className={styles.categorySection}>
                    <div className={styles.categoryHeader}>
                      <h2 className={styles.categoryTitle}>
                        {searchTerm ? 'Search Results' : activeCategory}
                      </h2>
                      <span className={styles.categoryItemCount}>{filteredItems.length} items</span>
                    </div>
                    <div className={styles.categoryItems}>
                      {filteredItems.map((item, index) => (
                        <DishCard
                          key={item.id}
                          image={item.image}
                          name={item.name}
                          description={item.description}
                          price={item.price}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className={styles.noResults}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <span className={styles.noResultsIcon}>🔍</span>
                <h3>No dishes found</h3>
                <p>Try adjusting your search or filter</p>
                <button 
                  className={styles.resetSearch}
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Scroll to Top */}
      {isSticky && (
        <motion.button
          className={styles.scrollTopBtn}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </motion.div>
  );
}

export default Menu;