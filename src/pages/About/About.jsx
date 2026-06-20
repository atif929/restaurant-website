import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUtensils, 
  FaStar, 
  FaTrophy, 
  FaClock, 
  FaUsers, 
  FaAward,
  FaMedal,
  FaHeart,
  FaBullseye,
  FaGem,
  FaCalendarAlt,
  FaFire,
  FaCrown,
  FaQuoteLeft,
  FaPlay,
  FaLeaf,
  FaTruck
} from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import styles from './About.module.css';

function About() {
  const statistics = [
    { number: '10+', label: 'Years of Excellence', icon: FaCalendarAlt, color: '#e67e22' },
    { number: '5000+', label: 'Happy Customers', icon: FaUsers, color: '#27ae60' },
    { number: '50+', label: 'Exquisite Dishes', icon: FaUtensils, color: '#2980b9' },
    { number: '15', label: 'Award Winning Chefs', icon: FaTrophy, color: '#c0392b' }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'We pour our heart into every dish, creating culinary experiences that delight and inspire.',
      color: '#e74c3c'
    },
    {
      icon: FaLeaf,
      title: 'Sustainability',
      description: 'Committed to locally-sourced ingredients and eco-friendly practices for a better tomorrow.',
      color: '#27ae60'
    },
    {
      icon: FaStar,
      title: 'Excellence',
      description: 'We never compromise on quality, striving for perfection in every aspect of dining.',
      color: '#f1c40f'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'Building a welcoming space where food brings people together and creates memories.',
      color: '#3498db'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'Delicious Restaurant opened its doors with a vision of culinary excellence.' },
    { year: '2018', title: 'First Award', description: 'Recognized as "Best New Restaurant" by Culinary Excellence Magazine.' },
    { year: '2020', title: 'Michelin Star', description: 'Awarded our first Michelin star for exceptional cuisine and service.' },
    { year: '2023', title: 'Global Recognition', description: 'Featured in World\'s Best Restaurants list, cementing our legacy.' }
  ];

  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img 
            src="/images/about-banner.jpg" 
            alt="About Delicious" 
            className={styles.heroImage}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1920x600/2D2D2D/FFF8F0?text=About+Delicious';
            }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.heroBadge}>About Us</span>
            <h1 className={styles.heroTitle}>
              Our <span>Story</span>
            </h1>
            <p className={styles.heroSubtitle}>
              A journey of passion, excellence, and culinary artistry that began with a simple dream
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className={styles.sectionBadge}>Our Journey</span>
              <h2 className={styles.sectionTitle}>
                From a Dream to a <span>Culinary Destination</span>
              </h2>
              <div className={styles.storyText}>
                <p>
                  Founded in 2015, Delicious Restaurant was born from a simple yet powerful vision: 
                  to create a dining experience that combines exceptional cuisine with warm, 
                  welcoming hospitality.
                </p>
                <p>
                  What started as a small family-owned establishment has grown into a beloved 
                  culinary destination, known for our commitment to quality, creativity, and 
                  the finest ingredients sourced from local farmers and international purveyors.
                </p>
                <p>
                  Today, we continue to honor our founding principles while pushing the boundaries 
                  of culinary innovation, creating memorable experiences for every guest who walks 
                  through our doors.
                </p>
              </div>
              <div className={styles.storyStats}>
                <div className={styles.storyStat}>
                  <span>10+</span>
                  <label>Years of Excellence</label>
                </div>
                <div className={styles.storyStat}>
                  <span>50+</span>
                  <label>Exquisite Dishes</label>
                </div>
                <div className={styles.storyStat}>
                  <span>5000+</span>
                  <label>Happy Customers</label>
                </div>
              </div>
            </div>
            <div className={styles.storyImageWrapper}>
              <div className={styles.storyImage}>
                <img 
                  src="/images/about-story.jpg" 
                  alt="Restaurant Story"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x500/FFF8F0/C0392B?text=Our+Story';
                  }}
                />
                <div className={styles.storyImageBadge}>
                  <FaPlay className={styles.playIcon} />
                  <span>Watch Our Story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <div className={styles.valuesHeader}>
            <span className={styles.sectionBadge}>Our Mission</span>
            <h2 className={styles.sectionTitle}>
              What Drives <span>Us Forward</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Our mission is to deliver unforgettable dining experiences through exceptional cuisine, 
              impeccable service, and a commitment to culinary excellence.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className={styles.valueCard}>
                  <div className={styles.valueIcon} style={{ backgroundColor: `${value.color}20` }}>
                    <Icon style={{ color: value.color }} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.teamContainer}>
          <div className={styles.teamHeader}>
            <span className={styles.sectionBadge}>Our Team</span>
            <h2 className={styles.sectionTitle}>
              Meet Our <span>Executive Team</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Passionate culinary artists dedicated to creating extraordinary dining experiences
            </p>
          </div>

          <div className={styles.teamGrid}>
            {[1, 2, 3].map((num, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <img 
                    src={`/images/chef${num}.jpg`} 
                    alt={`Chef ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x350/FFF8F0/C0392B?text=Chef';
                    }}
                  />
                  <div className={styles.teamOverlay}>
                    <FaStar className={styles.teamStar} />
                    <span>{index === 0 ? 'Michelin Star' : index === 1 ? 'Pastry Expert' : 'Grill Master'}</span>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h4>{['Chef Marco Rossi', 'Chef Sofia Chen', 'Chef Antonio Silva'][index]}</h4>
                  <p>{['Executive Chef', 'Pastry Chef', 'Sous Chef'][index]}</p>
                  <span>{['20+', '15+', '12+'][index]} years Experience</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineHeader}>
            <span className={styles.sectionBadge}>Our Journey</span>
            <h2 className={styles.sectionTitle}>
              Milestones <span>Achieved</span>
            </h2>
          </div>

          <div className={styles.timeline}>
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: stat.color }}>
                  <Icon />
                </div>
                <div className={styles.statNumber}>
                  {stat.number}
                </div>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default About;