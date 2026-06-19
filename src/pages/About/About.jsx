import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { 
  FaHeart, FaBullseye, FaCrown, FaGem, FaStar, 
  FaTrophy, FaMedal, FaFire, FaCalendarAlt, FaUsers, FaUtensils 
} from 'react-icons/fa';

function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const statistics = [
    { number: '10+', label: 'Years Experience', icon: FaCalendarAlt },
    { number: '5000+', label: 'Happy Customers', icon: FaUsers },
    { number: '50+', label: 'Exquisite Dishes', icon: FaUtensils },
    { number: '15', label: 'Award Winning Chefs', icon: FaTrophy }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      className={styles.about}
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
            About <span>Us</span>
          </motion.h1>
          <motion.p 
            className={styles.pageDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the story behind our passion for exceptional dining and culinary excellence
          </motion.p>
        </div>
      </section>

      {/* Restaurant Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div 
              className={styles.storyContent}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionTitle}>Our <span>Story</span></h2>
              <p className={styles.storyText}>
                Founded in 2015, Delicious Restaurant was born from a simple yet powerful vision: 
                to create a dining experience that combines exceptional cuisine with warm, 
                welcoming hospitality.
              </p>
              <p className={styles.storyText}>
                What started as a small family-owned establishment has grown into a beloved 
                culinary destination, known for our commitment to quality, creativity, and 
                the finest ingredients sourced from local farmers and international purveyors.
              </p>
              <p className={styles.storyText}>
                Today, we continue to honor our founding principles while pushing the boundaries 
                of culinary innovation, creating memorable experiences for every guest who walks 
                through our doors.
              </p>
              <motion.div 
                className={styles.storyBadge}
                whileHover={{ scale: 1.05 }}
              >
                <FaHeart className={styles.badgeIcon} />
                <span>Est. 2015</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className={styles.storyImage}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src="/images/about-banner.jpg" 
                  alt="Restaurant interior"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/FFF8F0/C0392B?text=Our+Restaurant';
                  }}
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.overlayText}>Since 2015</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <motion.div 
              className={styles.missionCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={styles.missionIcon}>
                <FaBullseye />
              </div>
              <h3 className={styles.missionTitle}>Our Mission</h3>
              <p className={styles.missionText}>
                To deliver unforgettable dining experiences through exceptional cuisine, 
                impeccable service, and a commitment to culinary excellence that exceeds 
                our guests' expectations every time.
              </p>
            </motion.div>

            <motion.div 
              className={styles.missionCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.missionIcon}>
                <FaCrown />
              </div>
              <h3 className={styles.missionTitle}>Our Vision</h3>
              <p className={styles.missionText}>
                To be recognized as a premier dining destination, celebrated for our innovative 
                culinary creations, warm hospitality, and commitment to sustainable, 
                locally-sourced ingredients.
              </p>
            </motion.div>

            <motion.div 
              className={styles.missionCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className={styles.missionIcon}>
                <FaGem />
              </div>
              <h3 className={styles.missionTitle}>Our Values</h3>
              <p className={styles.missionText}>
                Quality, creativity, sustainability, and community. We believe in using the 
                finest ingredients, supporting local farmers, and creating a welcoming space 
                for our community to gather and connect.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className={styles.chefSection}>
        <div className="container">
          <motion.h2 
            className={`${styles.sectionTitle} ${styles.centered} fade-in`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Meet Our <span>Executive Chef</span>
          </motion.h2>
          
          <div className={styles.chefGrid}>
            <motion.div 
              className={styles.chefImage}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={styles.chefImageWrapper}>
                <img 
                  src="/images/chef.jpg" 
                  alt="Executive Chef"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500/FFF8F0/C0392B?text=Executive+Chef';
                  }}
                />
                <div className={styles.chefBadge}>
                  <FaStar /> Michelin Star
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.chefContent}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.chefName}>Chef Marco Rossi</h3>
              <p className={styles.chefTitle}>Executive Chef & Co-Founder</p>
              <p className={styles.chefBio}>
                With over 20 years of culinary experience across Europe and Asia, Chef Marco 
                brings a wealth of knowledge and creativity to Delicious Restaurant. His passion 
                for combining traditional techniques with modern innovation has earned him 
                numerous accolades.
              </p>
              <p className={styles.chefBio}>
                A graduate of the prestigious Culinary Institute of America, Chef Marco has 
                worked in Michelin-starred restaurants in Paris, Tokyo, and New York before 
                bringing his expertise to our kitchen.
              </p>
              <div className={styles.chefAchievements}>
                <div className={styles.achievement}>
                  <FaTrophy className={styles.achievementIcon} />
                  <span>Best Chef Award 2022</span>
                </div>
                <div className={styles.achievement}>
                  <FaMedal className={styles.achievementIcon} />
                  <span>Michelin Star 2023</span>
                </div>
                <div className={styles.achievement}>
                  <FaFire className={styles.achievementIcon} />
                  <span>Featured on Food Network</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <motion.h2 
            className={`${styles.sectionTitle} ${styles.centered} fade-in`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our <span>Numbers</span>
          </motion.h2>
          
          <div className={styles.statsGrid}>
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className={styles.statCard}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className={styles.statIcon}>
                    <Icon />
                  </div>
                  <motion.div 
                    className={styles.statNumber}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className={styles.statLabel}>{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default About;