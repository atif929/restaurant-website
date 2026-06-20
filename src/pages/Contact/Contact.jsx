import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
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
  FaExclamationCircle,
  FaSpinner,
  FaWhatsapp,
  FaLinkedin
} from 'react-icons/fa';

import { EMAIL_CONFIG } from '../../config/emailConfig';

import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

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
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: false, message: '' });

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        to_name: 'Delicious Restaurant Team',
        reply_to: formData.email,
        // Add current date for reference
        date: new Date().toLocaleString()
      };

      // Send email using EmailJS

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,    // ✅ From environment variables
        EMAIL_CONFIG.TEMPLATE_ID,   // ✅ From environment variables
        templateParams,
        {
          publicKey: EMAIL_CONFIG.PUBLIC_KEY  // ✅ From environment variables
        }
      );

      console.log('✅ Email sent successfully!', response);

      setSubmitStatus({
        success: true,
        error: false,
        message: '✅ Thank you! We\'ll get back to you soon.'
      });
      toast.success('Message sent successfully!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('❌ Email sending failed:', error);
      
      setSubmitStatus({
        success: false,
        error: true,
        message: '❌ Something went wrong. Please try again later.'
      });
      toast.error('Failed to send message. Please try again.');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: ['123 Foodie Street', 'Culinary City, CC 12345'],
      color: '#e74c3c'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: ['(555) 123-4567', '+1 800 555 0123'],
      color: '#27ae60'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: ['info@delicious.com', 'reservations@delicious.com'],
      color: '#2980b9'
    },
    {
      icon: FaClock,
      title: 'Opening Hours',
      details: ['Mon - Fri: 11:00 AM - 10:00 PM', 'Sat - Sun: 10:00 AM - 11:00 PM'],
      color: '#e67e22'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', color: '#1877f2', url: '#' },
    { icon: FaInstagram, label: 'Instagram', color: '#e4405f', url: '#' },
    { icon: FaTwitter, label: 'Twitter', color: '#1da1f2', url: '#' },
    { icon: FaYoutube, label: 'YouTube', color: '#ff0000', url: '#' },
    { icon: FaWhatsapp, label: 'WhatsApp', color: '#25d366', url: '#' },
    { icon: FaLinkedin, label: 'LinkedIn', color: '#0a66c2', url: '#' }
  ];

  return (
    <>
      <Toaster position="top-right" />
      <div className={styles.contact}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.heroBadge}>Get In Touch</span>
              <h1 className={styles.heroTitle}>
                Let's <span>Connect</span>
              </h1>
              <p className={styles.heroSubtitle}>
                We'd love to hear from you. Reach out for reservations, inquiries, or feedback
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.contactContainer}>
            <div className={styles.contactGrid}>
              {/* Contact Information */}
              <div className={styles.contactInfo}>
                <h2 className={styles.infoTitle}>Contact Information</h2>
                <p className={styles.infoSubtitle}>
                  We're here to help and answer any questions you might have
                </p>

                <div className={styles.infoGrid}>
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className={styles.infoCard}>
                        <div className={styles.infoIcon} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                          <Icon />
                        </div>
                        <div className={styles.infoContent}>
                          <h3>{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx}>{detail}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.socialSection}>
                  <h4>Follow Us</h4>
                  <div className={styles.socialLinks}>
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a 
                          key={index}
                          href={social.url}
                          className={styles.socialLink}
                          style={{ backgroundColor: social.color }}
                          aria-label={social.label}
                        >
                          <Icon />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={styles.contactFormWrapper}>
                <div className={styles.contactForm}>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>
                  <p className={styles.formSubtitle}>
                    Fill in the form and we'll get back to you within 24 hours
                  </p>

                  {submitStatus.success && (
                    <div className={styles.successMessage}>
                      <FaCheckCircle /> {submitStatus.message}
                    </div>
                  )}

                  {submitStatus.error && (
                    <div className={styles.errorMessage}>
                      <FaExclamationCircle /> {submitStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name">
                          <FaUser /> Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="email">
                          <FaEnvelope /> Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone">
                          <FaPhone /> Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 8900"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="subject">
                          <FaPaperPlane /> Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Reservation Inquiry"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message">
                        <FaPaperPlane /> Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us how we can help..."
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className={styles.submitBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className={styles.spinner} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
              <div className={styles.map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb82d63%3A0x5b1c8d54b2f89450!2sNew%20York%20City%20Hall!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Restaurant Location"
                ></iframe>
              </div>
              <div className={styles.mapOverlay}>
                <FaMapMarkerAlt />
                <span>123 Foodie Street, Culinary City</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;