import React, { useState, useEffect, useMemo } from 'react';
import { config } from './config';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import { AppSection } from './types';

// --- Reusable Form Components ---

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'select';
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, required, as = 'input', className = '', ...props }) => {
  const Component = as as any;
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] uppercase font-bold text-stone-500 tracking-widest ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Component
        className={`w-full bg-white border ${error ? 'border-red-500' : 'border-stone-200'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/10 focus:border-emerald-800 transition-all text-stone-900 placeholder-stone-300 ${className}`}
        {...props}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-500 font-bold ml-1"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

const StarRating: React.FC<{ rating: number, setRating: (r: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase font-bold text-stone-500 tracking-widest ml-1">Rating <span className="text-red-500">*</span></label>
      <div className="flex gap-2 bg-stone-50 p-3 rounded-2xl w-fit border border-stone-100">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all ${star <= rating ? 'text-amber-400' : 'text-stone-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={star <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentSection]);

  const handleNavigation = (section: AppSection) => {
    if (isTransitioning || currentSection === section) return;

    setIsTransitioning(true);
    setCurrentSection(section);

    // Reset transition state after animations complete
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Premium page transition animations
  const pageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Hero onExplore={() => handleNavigation(AppSection.PRODUCTS)} />
            <Features />
            <ProductList isFullPage={false} onNavigate={handleNavigation} />
            <Testimonials />
          </motion.div>
        );
      case AppSection.PRODUCTS:
        return (
          <motion.div
            key="products"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <ProductList isFullPage={true} />
          </motion.div>
        );
      case AppSection.CONTACT:
        return (
          <motion.div
            key="contact"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ContactPage />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Hero onExplore={() => handleNavigation(AppSection.PRODUCTS)} />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-hidden">
      <Navbar currentSection={currentSection} onNavigate={handleNavigation} />
      <main className="relative">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

// --- Contact Page Implementation ---

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const tabs = ["General Enquiry", "Distributor Enquiry", "Customer Feedback"];

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

  const [general, setGeneral] = useState({ name: '', email: '', mobile: '', message: '' });
  const [distributor, setDistributor] = useState({
    name: '', firmName: '', address: '', telephone: '', mobile: '', email: '',
    type: 'Retailer', year: '', turnover: '', warehouse: '', comments: ''
  });
  const [feedback, setFeedback] = useState({ name: '', email: '', mobile: '', feedback: '', rating: 0 });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMobile = (mobile: string) => /^\d{10}$/.test(mobile);

  const errors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (activeTab === 0) {
      if (!general.name) errs.name = "Full Name is required";
      if (!isValidEmail(general.email)) errs.email = "Please enter a valid email";
      if (!isValidMobile(general.mobile)) errs.mobile = "Please enter a 10-digit mobile number";
      if (!general.message) errs.message = "Message is required";
      else if (general.message.length < 10) errs.message = "Message must be at least 10 characters";
    } else if (activeTab === 1) {
      if (!distributor.name) errs.d_name = "Full Name is required";
      if (!distributor.firmName) errs.d_firm = "Firm Name is required";
      if (!distributor.address) errs.d_address = "Address is required";
      if (!isValidMobile(distributor.mobile)) errs.d_mobile = "10-digit mobile required";
      if (!isValidEmail(distributor.email)) errs.d_email = "Valid email required";
    } else if (activeTab === 2) {
      if (!feedback.name) errs.f_name = "Name is required";
      if (!isValidEmail(feedback.email)) errs.f_email = "Valid email required";
      if (!isValidMobile(feedback.mobile)) errs.f_mobile = "10-digit mobile required";
      if (!feedback.feedback) errs.f_msg = "Feedback is required";
      if (feedback.rating === 0) errs.f_rate = "Please provide a rating";
    }
    return errs;
  }, [activeTab, general, distributor, feedback]);

  const canSubmit = Object.keys(errors).length === 0;

  const BACKEND_URL = config.apiBaseUrl;

  const FRONTEND_ORIGIN = window.location.origin;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      let endpoint = "";
      let payload: any = {};

      // General Enquiry
      if (activeTab === 0) {
        endpoint = "/api/general-enquiry";
        payload = {
          full_name: general.name,
          email: general.email,
          mobile: general.mobile,
          message: general.message,
        };
      }

      // Distributor Enquiry
      else if (activeTab === 1) {
        endpoint = "/api/distributor-enquiry";
        payload = {
          name: distributor.name,
          firm_name: distributor.firmName,
          address: distributor.address,
          telephone: distributor.telephone,
          mobile: distributor.mobile,
          email: distributor.email,
          type: distributor.type,
          year_of_establishment: distributor.year,
          turnover: distributor.turnover,
          warehouse_area: distributor.warehouse,
          comments: distributor.comments,
        };
      }

      // Customer Feedback
      else if (activeTab === 2) {
        endpoint = "/api/customer-feedback";
        payload = {
          name: feedback.name,
          email: feedback.email,
          mobile: feedback.mobile,
          feedback: feedback.feedback,
          rating: feedback.rating,
        };
      }

      console.log("Submitting to:", `${BACKEND_URL}${endpoint}`);
      console.log("Payload:", payload);

      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": FRONTEND_ORIGIN
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      setIsSuccess(true);
      setTouched({});

      // Reset form after successful submission
      if (activeTab === 0) {
        setGeneral({ name: '', email: '', mobile: '', message: '' });
      } else if (activeTab === 1) {
        setDistributor({
          name: '', firmName: '', address: '', telephone: '', mobile: '', email: '',
          type: 'Retailer', year: '', turnover: '', warehouse: '', comments: ''
        });
      } else if (activeTab === 2) {
        setFeedback({ name: '', email: '', mobile: '', feedback: '', rating: 0 });
      }

    } catch (err: any) {
      console.error("Submission error:", err);

      // User-friendly error messages
      if (err.message.includes("CORS") || err.message.includes("Origin")) {
        alert("Connection error. Please check if the server allows requests from this website.");
      } else if (err.message.includes("401") || err.message.includes("403")) {
        alert("Authentication error. Please contact support.");
      } else if (err.message.includes("404")) {
        alert("Server endpoint not found. Please contact support.");
      } else if (err.message.includes("Network")) {
        alert("Network error. Please check your internet connection and try again.");
      } else {
        alert(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-40 min-h-screen bg-stone-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header with simple animations */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-emerald-800 font-bold text-xs uppercase tracking-[0.8em] mb-6 block"
          >
            SINCE 2020
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-6xl md:text-8xl font-serif font-bold text-stone-900 leading-[1.1] tracking-tight mb-8"
          >
            Get In <span className="italic text-emerald-800">Touch.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-stone-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            From feedback to distribution partnerships, our team is ready to serve you.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-[30px] flex gap-1 shadow-sm border border-stone-200">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(idx); setIsSuccess(false); }}
                className={`relative px-6 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-[24px] ${activeTab === idx ? 'text-white' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {activeTab === idx && (
                  <div className="absolute inset-0 bg-emerald-900 rounded-[24px] shadow-lg shadow-emerald-900/20" />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[40px] shadow-2xl shadow-stone-200 border border-stone-100 p-8 md:p-14 relative overflow-hidden"
        >
          {isSuccess ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">Message Sent!</h3>
              <p className="text-stone-500 font-light max-w-sm mx-auto">Thank you for contacting RIS Foods. Our team will review your enquiry and get back to you shortly.</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-12 text-emerald-700 font-bold uppercase text-[10px] tracking-widest hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {activeTab === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    label="Full Name"
                    required
                    value={general.name}
                    onChange={e => setGeneral({ ...general, name: e.target.value })}
                    onBlur={() => markTouched('name')}
                    error={touched.name ? errors.name : ''}
                    placeholder="e.g. Rahul Nair"
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    required
                    value={general.email}
                    onChange={e => setGeneral({ ...general, email: e.target.value })}
                    onBlur={() => markTouched('email')}
                    error={touched.email ? errors.email : ''}
                    placeholder="name@example.com"
                  />
                  <FormField
                    label="Mobile Number"
                    type="tel"
                    required
                    className="md:col-span-2"
                    value={general.mobile}
                    onChange={e => setGeneral({ ...general, mobile: e.target.value })}
                    onBlur={() => markTouched('mobile')}
                    error={touched.mobile ? errors.mobile : ''}
                    placeholder="10-digit number"
                  />
                  <FormField
                    label="Comment / Message"
                    as="textarea"
                    rows={5}
                    required
                    className="md:col-span-2"
                    value={general.message}
                    onChange={e => setGeneral({ ...general, message: e.target.value })}
                    onBlur={() => markTouched('message')}
                    error={touched.message ? errors.message : ''}
                    placeholder="How can we help you today?"
                  />
                </div>
              )}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    label="Full Name"
                    required
                    value={distributor.name}
                    onChange={e => setDistributor({ ...distributor, name: e.target.value })}
                    onBlur={() => markTouched('d_name')}
                    error={touched.d_name ? errors.d_name : ''}
                    placeholder="Your full name"
                  />
                  <FormField
                    label="Firm / Company Name"
                    required
                    value={distributor.firmName}
                    onChange={e => setDistributor({ ...distributor, firmName: e.target.value })}
                    onBlur={() => markTouched('d_firm')}
                    error={touched.d_firm ? errors.d_firm : ''}
                    placeholder="Your company name"
                  />
                  <FormField
                    label="Business Address"
                    as="textarea"
                    rows={2}
                    required
                    className="md:col-span-2"
                    value={distributor.address}
                    onChange={e => setDistributor({ ...distributor, address: e.target.value })}
                    onBlur={() => markTouched('d_address')}
                    error={touched.d_address ? errors.d_address : ''}
                    placeholder="Complete business address"
                  />
                  <FormField
                    label="Telephone (Optional)"
                    value={distributor.telephone}
                    onChange={e => setDistributor({ ...distributor, telephone: e.target.value })}
                    placeholder="Landline number"
                  />
                  <FormField
                    label="Mobile Number"
                    required
                    value={distributor.mobile}
                    onChange={e => setDistributor({ ...distributor, mobile: e.target.value })}
                    onBlur={() => markTouched('d_mobile')}
                    error={touched.d_mobile ? errors.d_mobile : ''}
                    placeholder="10-digit mobile number"
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    required
                    value={distributor.email}
                    onChange={e => setDistributor({ ...distributor, email: e.target.value })}
                    onBlur={() => markTouched('d_email')}
                    error={touched.d_email ? errors.d_email : ''}
                    placeholder="business@email.com"
                  />
                  <FormField
                    label="Type of Firm"
                    as="select"
                    required
                    value={distributor.type}
                    onChange={e => setDistributor({ ...distributor, type: e.target.value })}
                  >
                    <option>Retailer</option>
                    <option>Wholesaler</option>
                    <option>Distributor</option>
                    <option>Exporter</option>
                  </FormField>
                  <FormField
                    label="Year of Establishment"
                    value={distributor.year}
                    onChange={e => setDistributor({ ...distributor, year: e.target.value })}
                    placeholder="e.g. 2010"
                  />
                  <FormField
                    label="Turnover (Last FY)"
                    value={distributor.turnover}
                    onChange={e => setDistributor({ ...distributor, turnover: e.target.value })}
                    placeholder="Annual turnover in ₹"
                  />
                  <FormField
                    label="Warehouse Area (Sq. Ft)"
                    value={distributor.warehouse}
                    onChange={e => setDistributor({ ...distributor, warehouse: e.target.value })}
                    placeholder="e.g. 5000"
                  />
                  <FormField
                    label="Comments"
                    as="textarea"
                    rows={3}
                    className="md:col-span-2"
                    value={distributor.comments}
                    onChange={e => setDistributor({ ...distributor, comments: e.target.value })}
                    placeholder="Additional information or requirements"
                  />
                </div>
              )}
              {activeTab === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    label="Name"
                    required
                    value={feedback.name}
                    onChange={e => setFeedback({ ...feedback, name: e.target.value })}
                    onBlur={() => markTouched('f_name')}
                    error={touched.f_name ? errors.f_name : ''}
                    placeholder="Your name"
                  />
                  <FormField
                    label="Email"
                    type="email"
                    required
                    value={feedback.email}
                    onChange={e => setFeedback({ ...feedback, email: e.target.value })}
                    onBlur={() => markTouched('f_email')}
                    error={touched.f_email ? errors.f_email : ''}
                    placeholder="your@email.com"
                  />
                  <FormField
                    label="Mobile"
                    type="tel"
                    required
                    className="md:col-span-2"
                    value={feedback.mobile}
                    onChange={e => setFeedback({ ...feedback, mobile: e.target.value })}
                    onBlur={() => markTouched('f_mobile')}
                    error={touched.f_mobile ? errors.f_mobile : ''}
                    placeholder="10-digit mobile number"
                  />
                  <FormField
                    label="Your Feedback"
                    as="textarea"
                    rows={6}
                    required
                    className="md:col-span-2"
                    value={feedback.feedback}
                    onChange={e => setFeedback({ ...feedback, feedback: e.target.value })}
                    onBlur={() => markTouched('f_msg')}
                    error={touched.f_msg ? errors.f_msg : ''}
                    placeholder="Share your experience with our products"
                  />
                  <div className="md:col-span-2">
                    <StarRating rating={feedback.rating} setRating={(r) => setFeedback({ ...feedback, rating: r })} />
                    {touched.f_rate && errors.f_rate && <span className="text-[10px] text-red-500 font-bold mt-2 block">{errors.f_rate}</span>}
                  </div>
                </div>
              )}
              <div className="pt-8 border-t border-stone-50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || !canSubmit}
                  className={`w-full flex items-center justify-center gap-4 py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.4em] transition-all shadow-xl relative overflow-hidden group ${!canSubmit ? 'bg-stone-100 text-stone-300 cursor-not-allowed' : 'bg-emerald-900 text-white hover:bg-emerald-800 shadow-emerald-900/10'
                    }`}
                >
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <><span>Submit {tabs[activeTab]}</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></>}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Contact Info Section */}
        <div className="mt-20 flex flex-col md:flex-row gap-6 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm flex items-center gap-6 w-full max-w-[420px]"
          >
            <div className="w-16 h-16 bg-emerald-50/50 rounded-2xl flex items-center justify-center text-emerald-800 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-[0.2em] block mb-1">Direct Support</span>
              <p className="text-stone-900 font-bold text-lg tracking-tight">+91 90723 36333</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm flex items-center gap-6 w-full max-w-[520px]"
          >
            <div className="w-16 h-16 bg-emerald-50/50 rounded-2xl flex items-center justify-center text-emerald-800 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-[0.2em] block mb-1">Email Desk</span>
              <p className="text-stone-900 font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                ris.emmanuelfoodproducts@gmail.com
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="py-24 bg-stone-50">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        { title: 'Direct Sourcing', icon: <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />, desc: 'We partner directly with farmers in Kuttanad to bring you the highest quality Matta grains.' },
        { title: 'Stone Grinding', icon: <circle cx="12" cy="12" r="10" />, desc: 'Our facility uses slow-speed stone mills to ensure natural oils and nutrients are preserved.' },
        { title: 'Zero Additives', icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />, desc: 'RIS Foods products contain no bleaching agents or artificial preservatives. Purely natural.' }
      ].map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="p-10 rounded-[40px] bg-white border border-stone-100 shadow-lg shadow-stone-200/20 hover:shadow-xl transition-all group"
        >
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-stone-900">{f.title}</h3>
          <p className="text-stone-500 text-sm leading-relaxed font-light">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 bg-stone-950 text-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
    <div className="max-w-7xl mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-serif font-bold mb-20"
      >
        Trusted by 10,000+ Homes
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { text: "RIS Foods has brought the authentic taste of my mother's kitchen to my home in London.", author: "Dr. Lakshmi S" },
          { text: "The texture of their roasted rice powder is unmatched. My Idiyappams are finally soft!", author: "Thomas K, Kottayam" },
          { text: "Cleanest breakfast products I've found in 20 years. Consistent quality every time.", author: "Ibrahim P, Kochi" }
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm p-12 rounded-[50px] border border-white/10 relative"
          >
            <div className="text-emerald-500 mb-8 text-5xl font-serif opacity-20">"</div>
            <p className="mb-10 text-stone-300 leading-relaxed italic text-lg font-light">"{t.text}"</p>
            <div className="font-bold text-emerald-500 text-[10px] uppercase tracking-[0.4em]">— {t.author}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default App;