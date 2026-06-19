import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Menu.module.css';
import { menuItems, categories } from '../../data/menuData';
import DishCard from '../../components/DishCard/DishCard';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const getGroupedItems = () => {
    const grouped = {};
    categories.forEach(cat => {
      grouped[cat.value] = menuItems.filter(item => item.category === cat.value);
    });
    return grouped;
  };

  const groupedItems = getGroupedItems();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      className={styles.menu}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            className={styles.pageTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our <span>Menu</span>
          </motion.h1>
          <motion.p 
            className={styles.pageDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our carefully curated selection of culinary delights, crafted with passion 
            and the finest ingredients
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className={styles.filtersSection}>
        <div className="container">
          <div className={styles.filters}>
            <motion.button
              className={`${styles.filterBtn} ${activeCategory === 'All' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('All')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`${styles.filterBtn} ${activeCategory === category.value ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className={styles.menuSection}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className={styles.menuGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeCategory === 'All' ? (
                categories.map((category, catIndex) => {
                  const items = groupedItems[category.value] || [];
                  if (items.length === 0) return null;
                  return (
                    <motion.div 
                      key={category.id}
                      className={styles.categoryGroup}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                    >
                      <h2 className={styles.categoryTitle}>{category.label}</h2>
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
                <div className={styles.categoryGroup}>
                  <h2 className={styles.categoryTitle}>{activeCategory}</h2>
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
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}

export default Menu;