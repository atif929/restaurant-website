import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, 
  FaLeaf, 
  FaRocket, 
  FaUserTie,    // ✅ Using FaUserTie instead of FaChef
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import styles from './Home.module.css';
import { menuItems } from '../../data/menuData';
import DishCard from '../../components/DishCard/DishCard';

function Home() {
  const featuredDishes = menuItems.slice(0, 6);

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

  // ✅ ONLY ONE features array - removed the duplicate
  const features = [
    {
      icon: FaLeaf,
      title: 'Fresh Ingredients',
      description: 'We source only the freshest, locally-sourced ingredients to ensure every dish is bursting with flavor and quality.',
      color: '#27ae60',
      bgColor: 'rgba(39, 174, 96, 0.1)'
    },
    {
      icon: FaRocket,
      title: 'Fast Service',
      description: 'Our efficient team ensures your meal arrives promptly without compromising on quality or presentation.',
      color: '#2980b9',
      bgColor: 'rgba(41, 128, 185, 0.1)'
    },
    {
      icon: FaUserTie,    // ✅ Using FaUserTie - no more FaChef!
      title: 'Experienced Chefs',
      description: 'Our award-winning chefs bring years of culinary expertise to create unforgettable dining experiences.',
      color: '#e67e22',
      bgColor: 'rgba(230, 126, 34, 0.1)'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Critic',
      content: 'An absolutely remarkable dining experience. The attention to detail in every dish is extraordinary.',
      rating: 5,
      avatar: 'S'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      content: 'I\'ve been coming here for years and the quality never disappoints. The staff is incredibly welcoming.',
      rating: 5,
      avatar: 'M'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Wedding Planner',
      content: 'We chose Delicious for our wedding reception and it was the best decision. The food was exquisite.',
      rating: 5,
      avatar: 'E'
    }
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img 
            src="/images/hero-section.jpg" 
            alt="Delicious Restaurant" 
            className={styles.heroBgImage}
            loading="eager"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1920x1080/2D2D2D/FFF8F0?text=Delicious+Restaurant';
            }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroTagline}>
              <span className={styles.taglineIcon}>✦</span>
              <span>Delicious</span>
              <span className={styles.taglineDivider}>|</span>
              <span className={styles.taglineSub}>Fine Dining</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>Welcome to</span>
              <span className={styles.heroTitleHighlight}>Delicious</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Experience culinary excellence with our exquisite dishes, crafted with passion 
              and the finest ingredients from around the world.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/menu" className={styles.heroPrimaryBtn}>
                Explore Menu
                <FaArrowRight className={styles.btnArrow} />
              </Link>
              <Link to="/contact" className={styles.heroSecondaryBtn}>
                Reserve Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Our <span>Featured Dishes</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Discover our most popular and beloved dishes, carefully crafted to delight your taste buds
            </p>
          </div>

          <div className={styles.dishesGrid}>
            {featuredDishes.map((dish, index) => (
              <DishCard
                key={dish.id}
                image={dish.image}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                index={index}
              />
            ))}
          </div>

          <div className={styles.viewAllContainer}>
            <Link to="/menu" className={styles.viewAllBtn}>
              View Full Menu
              <FaArrowRight className={styles.arrowIcon} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>
              What Makes Us <span>Special</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              We pride ourselves on delivering exceptional dining experiences every time
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div 
                    className={styles.featureIconWrapper}
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <Icon className={styles.featureIcon} style={{ color: feature.color }} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  <div className={styles.featureLine} style={{ backgroundColor: feature.color }}></div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5000+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Exquisite Dishes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15</span>
              <span className={styles.statLabel}>Award Winning Chefs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Testimonials</span>
            <h2 className={styles.sectionTitle}>
              What Our <span>Customers Say</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Real reviews from our valued guests who have experienced our culinary excellence
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className={styles.testimonialQuote}>
                  <FaQuoteLeft />
                </div>
                <div className={styles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.avatar}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                    <span className={styles.testimonialRole}>{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;