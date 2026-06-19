import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace these with your EmailJS credentials
      // Sign up at https://www.emailjs.com/ for free
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Delicious Restaurant'
      };

      // Uncomment this when you have EmailJS setup
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   templateParams,
      //   'YOUR_USER_ID'
      // );

      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Thank you! Your message has been sent successfully.');
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['123 Foodie Street', 'Culinary City, CC 12345']
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['(555) 123-4567', '+1 800 555 0123']
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@delicious.com', 'reservations@delicious.com']
    },
    {
      icon: FaClock,
      title: 'Opening Hours',
      details: ['Mon - Fri: 11:00 AM - 10:00 PM', 'Sat - Sun: 10:00 AM - 11:00 PM']
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', color: '#1877f2' },
    { icon: FaInstagram, label: 'Instagram', color: '#e4405f' },
    { icon: FaTwitter, label: 'Twitter', color: '#1da1f2' },
    { icon: FaYoutube, label: 'YouTube', color: '#ff0000' }
  ];

  return (
    <>
      <Toaster position="top-right" />
      <motion.div 
        className={styles.contact}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
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
              Get In <span>Touch</span>
            </motion.h1>
            <motion.p 
              className={styles.pageDescription}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We'd love to hear from you. Reach out for reservations, inquiries, or feedback
            </motion.p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className={styles.contactSection}>
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Contact Information */}
              <motion.div 
                className={styles.contactInfo}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className={styles.contactInfoTitle}>Contact Information</h2>
                <p className={styles.contactInfoSubtitle}>
                  We're here to help and answer any questions you might have
                </p>

                <div className={styles.infoGrid}>
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div 
                        key={index}
                        className={styles.infoCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={styles.infoIcon}>
                          <Icon />
                        </div>
                        <div className={styles.infoContent}>
                          <h3 className={styles.infoTitle}>{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className={styles.infoDetail}>{detail}</p>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div 
                  className={styles.socialConnect}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className={styles.connectTitle}>Connect With Us</h4>
                  <div className={styles.socialLinks}>
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a 
                          key={index}
                          href="#" 
                          className={styles.socialLink}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ '--hover-color': social.color }}
                          aria-label={social.label}
                        >
                          <Icon />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                className={styles.contactForm}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={styles.formWrapper}>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>
                  <p className={styles.formSubtitle}>
                    We'll get back to you as soon as possible
                  </p>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        <FaUser className={styles.labelIcon} /> Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        <FaEnvelope className={styles.labelIcon} /> Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.formLabel}>
                        <FaPaperPlane className={styles.labelIcon} /> Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.formTextarea}
                        rows="5"
                        placeholder="Tell us how we can help..."
                        required
                      />
                    </div>

                    <motion.button 
                      type="submit" 
                      className={styles.submitBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <span className={styles.btnIcon}>→</span>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection}>
          <div className="container">
            <motion.h2 
              className={`${styles.sectionTitle} fade-in`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Find Us <span>Here</span>
            </motion.h2>
            
            <motion.div 
              className={styles.mapWrapper}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb82d63%3A0x5b1c8d54b2f89450!2sNew%20York%20City%20Hall!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Restaurant Location"
                  className={styles.mapIframe}
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default Contact;