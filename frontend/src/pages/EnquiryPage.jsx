import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { 
  ArrowLeft, Mail, MessageCircle, User, Calendar, Mail as MailIcon, 
  Phone, BookOpen, AlertCircle, Zap, CheckCircle
} from "lucide-react";
// Initialize EmailJS
emailjs.init("Adhk2_-6F_9Gg16VO");
const EnquiryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseName = location.state?.courseName || "";
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

    const phoneNumber = "+923488644868"; // Replace with actual company WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_4wupvwd",           // Service ID from EmailJS
        "template_975ex6p",          // Template ID from EmailJS
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
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.error("Email send failed:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20 md:pt-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100"
      >
        <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-slate-600 hover:text-amber-600 transition-colors text-sm font-black uppercase tracking-wider"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Course Enquiry
          </h1>
          <div className="w-20" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4 md:py-10 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 items-start">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 leading-tight">
                  Get More Info About This <span className="text-amber-600">Course</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Fill in your details below and our team will contact you shortly with all the information you need.
                </p>
              </div>

              <div className="space-y-8 pt-12 border-t border-slate-200">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-tight mb-1">WhatsApp Support</h3>
                    <p className="text-sm text-slate-600">Chat with us directly on WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-tight mb-1">Email Support</h3>
                    <p className="text-sm text-slate-600">We'll respond via email within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-tight mb-1">Quick Response</h3>
                    <p className="text-sm text-slate-600">Choose your preferred contact method</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg border border-slate-100">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3">Thank You!</h3>
                  <p className="text-lg text-slate-600 mb-8">We've received your enquiry. Our team will contact you shortly.</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-black uppercase tracking-wider text-sm transition-all"
                  >
                    Return to Course
                  </motion.button>
                </motion.div>
              ) : (
                <form className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-amber-600 mb-2">Your Information</h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-amber-600 to-transparent rounded-full" />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-amber-600" />
                        Full Name *
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-5 py-3.5 rounded-xl border-2 font-medium text-slate-900 placeholder-slate-400 transition-all text-base ${
                        errors.name
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-slate-50 focus:border-amber-500"
                      } focus:outline-none`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                        <AlertCircle size={14} />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Age Field */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-amber-600" />
                        Age *
                      </div>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                      className={`w-full px-5 py-3.5 rounded-xl border-2 font-medium text-slate-900 placeholder-slate-400 transition-all text-base ${
                        errors.age
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-slate-50 focus:border-amber-500"
                      } focus:outline-none`}
                    />
                    {errors.age && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                        <AlertCircle size={14} />
                        {errors.age}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                      <div className="flex items-center gap-2">
                        <MailIcon size={16} className="text-amber-600" />
                        Email Address *
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`w-full px-5 py-3.5 rounded-xl border-2 font-medium text-slate-900 placeholder-slate-400 transition-all text-base ${
                        errors.email
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-slate-50 focus:border-amber-500"
                      } focus:outline-none`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                        <AlertCircle size={14} />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Contact Number Field */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-amber-600" />
                        Contact Number *
                      </div>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your contact number"
                      className={`w-full px-5 py-3.5 rounded-xl border-2 font-medium text-slate-900 placeholder-slate-400 transition-all text-base ${
                        errors.contactNumber
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-slate-200 bg-slate-50 focus:border-amber-500"
                      } focus:outline-none`}
                    />
                    {errors.contactNumber && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                        <AlertCircle size={14} />
                        {errors.contactNumber}
                      </div>
                    )}
                  </div>

                  {/* Course Name Field */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-amber-600" />
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
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-100 font-medium text-slate-600 placeholder-slate-400 cursor-not-allowed text-base"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-slate-100">
                    {/* WhatsApp Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsApp}
                      type="button"
                      className="group w-full bg-green-500 hover:bg-green-600 text-white py-4 md:py-5 rounded-xl font-black uppercase tracking-wider text-xs md:text-sm transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle size={18} />
                      <span>Chat on WhatsApp</span>
                    </motion.button>

                    {/* Email Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEmail}
                      type="button"
                      className="group w-full bg-blue-500 hover:bg-blue-600 text-white py-4 md:py-5 rounded-xl font-black uppercase tracking-wider text-xs md:text-sm transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      <Mail size={18} />
                      <span>Send Email</span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
