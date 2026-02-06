import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  X, Mail, MessageCircle, User, Calendar, Mail as MailIcon, 
  Phone, BookOpen, AlertCircle 
} from "lucide-react";

// Initialize EmailJS with public key
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "Adhk2_-6F_9Gg16VO";
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_4wupvwd";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_975ex6p";

emailjs.init(PUBLIC_KEY);
const EnquiryForm = ({ isOpen, onClose, courseName }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    contactNumber: "",
    courseName: courseName || ""
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (isNaN(formData.age) || formData.age < 18 || formData.age > 100) 
      newErrors.age = "Age must be between 18 and 100";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = "Invalid email format";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!/^\+?[0-9\s\-()]{8,}$/.test(formData.contactNumber)) 
      newErrors.contactNumber = "Invalid phone number";
    if (!formData.courseName.trim()) newErrors.courseName = "Course name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `Hello! I'm interested in enrolling in the ${formData.courseName} course.

Details:
Name: ${formData.name}
Age: ${formData.age}
Email: ${formData.email}
Contact: ${formData.contactNumber}

Please provide me with more information about the course.`;

    const phoneNumber = "+92 348 8644868"; // Replace with actual company WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: "cheemamaryam39@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.contactNumber,
          age: formData.age,
          course_name: formData.courseName,
          message: `New course enquiry from ${formData.name}`
        }
      );

      if (result.status === 200) {
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Email send failed:", error);
      alert("Failed to send email. Please try again or contact us via WhatsApp.");
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      age: "",
      email: "",
      contactNumber: "",
      courseName: courseName || ""
    });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-8 sm:p-10 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/15 rounded-full blur-3xl" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex-1">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3 sm:mb-4 leading-tight">
                      Course Enquiry
                    </h2>
                    <p className="text-amber-50 text-sm sm:text-base font-medium tracking-wide">Complete the form below to get started</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 hover:bg-white/30 rounded-lg sm:rounded-xl flex items-center justify-center transition-all text-white flex-shrink-0 ml-4"
                  >
                    <X size={24} className="sm:w-6 sm:h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 sm:p-10 md:p-14">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 sm:py-20"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Thank You!</h3>
                    <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">We've received your enquiry. Our team will contact you shortly.</p>
                  </motion.div>
                ) : (
                  <form className="space-y-7 sm:space-y-8 md:space-y-9">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-800 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2.5 mb-2">
                          <User size={18} className="text-amber-600" />
                          Full Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full px-5 sm:px-6 py-4 sm:py-5 rounded-lg sm:rounded-xl border-2 font-medium text-base text-slate-900 placeholder-slate-500 transition-all ${
                          errors.name
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-slate-50 focus:border-amber-500"
                        } focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-amber-300/50`}
                      />
                      {errors.name && (
                        <div className="flex items-center gap-2 mt-2.5 sm:mt-3 text-red-600 text-xs sm:text-sm font-bold tracking-wide">
                          <AlertCircle size={16} />
                          {errors.name}
                        </div>
                      )}
                    </div>

                    {/* Age Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-800 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2.5 mb-2">
                          <Calendar size={18} className="text-amber-600" />
                          Age *
                        </div>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        className={`w-full px-5 sm:px-6 py-4 sm:py-5 rounded-lg sm:rounded-xl border-2 font-medium text-base text-slate-900 placeholder-slate-500 transition-all ${
                          errors.age
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-slate-50 focus:border-amber-500"
                        } focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-amber-300/50`}
                      />
                      {errors.age && (
                        <div className="flex items-center gap-2 mt-2.5 sm:mt-3 text-red-600 text-xs sm:text-sm font-bold tracking-wide">
                          <AlertCircle size={16} />
                          {errors.age}
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-800 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2.5 mb-2">
                          <MailIcon size={18} className="text-amber-600" />
                          Email Address *
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full px-5 sm:px-6 py-4 sm:py-5 rounded-lg sm:rounded-xl border-2 font-medium text-base text-slate-900 placeholder-slate-500 transition-all ${
                          errors.email
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-slate-50 focus:border-amber-500"
                        } focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-amber-300/50`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 mt-2.5 sm:mt-3 text-red-600 text-xs sm:text-sm font-bold tracking-wide">
                          <AlertCircle size={16} />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Contact Number Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-800 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2.5 mb-2">
                          <Phone size={18} className="text-amber-600" />
                          Contact Number *
                        </div>
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your contact number"
                        className={`w-full px-5 sm:px-6 py-4 sm:py-5 rounded-lg sm:rounded-xl border-2 font-medium text-base text-slate-900 placeholder-slate-500 transition-all ${
                          errors.contactNumber
                            ? "border-red-400 bg-red-50 focus:border-red-500"
                            : "border-slate-200 bg-slate-50 focus:border-amber-500"
                        } focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-amber-300/50`}
                      />
                      {errors.contactNumber && (
                        <div className="flex items-center gap-2 mt-2.5 sm:mt-3 text-red-600 text-xs sm:text-sm font-bold tracking-wide">
                          <AlertCircle size={16} />
                          {errors.contactNumber}
                        </div>
                      )}
                    </div>

                    {/* Course Name Field */}
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-800 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2.5 mb-2">
                          <BookOpen size={18} className="text-amber-600" />
                          Course Name *
                        </div>
                      </label>
                      <input
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleInputChange}
                        placeholder="Course name"
                        disabled
                        className="w-full px-5 sm:px-6 py-4 sm:py-5 rounded-lg sm:rounded-xl border-2 border-slate-200 bg-slate-100 font-medium text-base text-slate-600 placeholder-slate-400 cursor-not-allowed"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-slate-200">
                      {/* WhatsApp Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleWhatsApp}
                        className="group w-full bg-green-500 hover:bg-green-600 text-white py-5 sm:py-6 rounded-lg sm:rounded-xl font-black uppercase tracking-[0.15em] text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
                      >
                        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                        <span>Chat WhatsApp</span>
                      </motion.button>

                      {/* Email Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEmail}
                        className="group w-full bg-blue-500 hover:bg-blue-600 text-white py-5 sm:py-6 rounded-lg sm:rounded-xl font-black uppercase tracking-[0.15em] text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30"
                      >
                        <Mail size={20} className="sm:w-6 sm:h-6" />
                        <span>Send Email</span>
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnquiryForm;
