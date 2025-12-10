import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{email?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user types
    if (e.target.name === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Format phone for WhatsApp (keep only digits with country code)
  const formatPhoneForWhatsApp = (phone?: string) => {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
  };

  // Open WhatsApp with pre-filled message
  const openWhatsApp = () => {
    const phone = formatPhoneForWhatsApp(personalInfo.phone);
    const name = formData.name || 'Visitor';
    const email = formData.email || 'not-provided';
    
    const messageBody = `Hi! Anurag...\n\nI visited your portfolio and would like to discuss a potential project.\n\n${
      formData.message ? `Message: ${formData.message}\n\n` : ''
    }Looking forward to hearing from you!\n\nBest regards,`;

    if (!phone) {
      window.open('https://web.whatsapp.com/', '_blank');
      return;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageBody)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      // Use FormSubmit.co for functional email delivery
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio: New Message from ${formData.name}`,
          _template: "table",
          _captcha: "false", // Disable captcha to prevent submission issues
          _autoresponse: "Thank you for contacting me. I will get back to you shortly."
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status after 10 seconds so user can see the message
        setTimeout(() => setStatus('idle'), 10000);
      } else {
        console.error("FormSubmit error:", response.statusText);
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dark relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Have a project in mind? Let's talk.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium text-lg">{personalInfo.location}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <a href={`mailto:${personalInfo.email}`} className="font-medium text-lg hover:text-primary transition-colors break-all">
                                {personalInfo.email}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500 shrink-0">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <a href={`tel:${personalInfo.phone}`} className="font-medium text-lg hover:text-primary transition-colors">
                                {personalInfo.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Real Google Map Embed */}
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden relative shadow-inner">
               <iframe 
                 title="Location Map"
                 className="w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700"
                 src={`https://maps.google.com/maps?q=${encodeURIComponent(personalInfo.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                 style={{ border: 0 }}
                 loading="lazy"
                 allowFullScreen
               ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-primary'} focus:ring-2 focus:border-transparent transition-all outline-none`}
                          placeholder="john@example.com"
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <AlertCircle size={20} />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                        placeholder="Hello, I'd like to work with you..."
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send size={20} />
                        </>
                    )}
                </button>

                <button 
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/30"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-.355.228-.558.561-.558.906 0 .348.203.679.56.909a9.879 9.879 0 005.031 1.378h.004c5.487 0 9.974-4.487 9.974-9.974 0-2.461-.917-4.769-2.608-6.514-.822-.852-1.922-1.412-3.158-1.412-1.237 0-2.336.56-3.158 1.412A9.885 9.885 0 0012.05 6.98z"/>
                    </svg>
                    Message on WhatsApp
                </button>

                {status === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm"
                    >
                        <p className="font-bold">Message sent successfully!</p>
                        <p className="mt-1">Important: If this is your first time, please check your <span className="underline">email and spam folder</span> to activate the form.</p>
                    </motion.div>
                )}
                {status === 'error' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
                    >
                        <p className="font-bold">Something went wrong.</p>
                        <p className="mt-1">Please ensure you are not using an ad-blocker that might block the form, or email me directly at {personalInfo.email}.</p>
                    </motion.div>
                )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;