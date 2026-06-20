// EmailJS Configuration using Environment Variables
// VITE_* variables are exposed to the browser

export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Check if variables are loaded (for debugging)
console.log('EmailJS Config:', {
  SERVICE_ID: EMAIL_CONFIG.SERVICE_ID ? '✅ Loaded' : '❌ Missing',
  TEMPLATE_ID: EMAIL_CONFIG.TEMPLATE_ID ? '✅ Loaded' : '❌ Missing',
  PUBLIC_KEY: EMAIL_CONFIG.PUBLIC_KEY ? '✅ Loaded' : '❌ Missing'
});