import React, { useState } from 'react';
import { Shield, Calculator, BookOpen, FileCheck, Phone, Mail, MapPin, Menu, X, Star, Users, Award, CheckCircle, Briefcase, GraduationCap, Clock, MapPin as Location } from 'lucide-react';
import { serviceInquiryService, dscApplicationService, jobApplicationService } from './lib/supabase';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDSCForm, setShowDSCForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showJobApplicationForm, setShowJobApplicationForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');

  const services = [
    {
      icon: Shield,
      title: "Digital Signature Certificate",
      description: "Secure digital signatures for legal documents and online transactions with government-approved certificates.",
      features: ["Class 2 & Class 3 DSC", "Individual & Organization", "2-3 Year Validity", "USB Token Included"],
      price: "Starting from ₹1,200"
    },
    {
      icon: Calculator,
      title: "Taxation Services",
      description: "Complete tax solutions including GST registration, filing, and compliance management for businesses.",
      features: ["GST Registration & Filing", "Income Tax Returns", "TDS Compliance", "Tax Planning"],
      price: "Starting from ₹2,500"
    },
    {
      icon: BookOpen,
      title: "Book Keeping",
      description: "Professional bookkeeping services to maintain accurate financial records and ensure compliance.",
      features: ["Daily Transaction Recording", "Bank Reconciliation", "Financial Statements", "Monthly Reports"],
      price: "Starting from ₹3,000"
    },
    {
      icon: FileCheck,
      title: "Auditing",
      description: "Comprehensive audit services to ensure financial accuracy and regulatory compliance.",
      features: ["Statutory Audit", "Internal Audit", "Tax Audit", "Compliance Review"],
      price: "Starting from ₹5,000"
    }
  ];

  const stats = [
    { number: "Growing", label: "Client Base" },
    { number: "Quality", label: "Service Focus" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  const DSCForm = () => {
    const [formData, setFormData] = useState({
      applicant_name: '',
      email: '',
      mobile: '',
      pan_number: '',
      aadhaar_number: '',
      dsc_class: 'class2',
      application_type: 'new',
      organization: '',
      designation: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        await dscApplicationService.create(formData);
        alert('DSC Application submitted successfully! We will contact you soon.');
        setShowDSCForm(false);
        setFormData({
          applicant_name: '', email: '', mobile: '', pan_number: '', aadhaar_number: '',
          dsc_class: 'class2', application_type: 'new', organization: '', designation: '',
          address: '', city: '', state: '', pincode: ''
        });
      } catch (error) {
        setSubmitError(error.message || 'Failed to submit application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">DSC Application Form</h2>
              <button onClick={() => setShowDSCForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {submitError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.applicant_name}
                    onChange={(e) => setFormData({...formData, applicant_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.pan_number}
                    onChange={(e) => setFormData({...formData, pan_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.aadhaar_number}
                    onChange={(e) => setFormData({...formData, aadhaar_number: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DSC Class *</label>
                  <select
                    value={formData.dsc_class}
                    onChange={(e) => setFormData({...formData, dsc_class: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="class2">Class 2</option>
                    <option value="class3">Class 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Type *</label>
                  <select
                    value={formData.application_type}
                    onChange={(e) => setFormData({...formData, application_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="renewal">Renewal</option>
                    <option value="revoke">Revoke</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDSCForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const ServiceInquiryForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      service_type: '',
      message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        await serviceInquiryService.create(formData);
        alert('Service inquiry submitted successfully! We will contact you soon.');
        setShowServiceForm(false);
        setFormData({
          name: '', email: '', phone: '', company: '', service_type: '', message: ''
        });
      } catch (error) {
        setSubmitError(error.message || 'Failed to submit inquiry. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Service Inquiry</h2>
              <button onClick={() => setShowServiceForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {submitError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                <select
                  required
                  value={formData.service_type}
                  onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a service</option>
                  <option value="Digital Signature">Digital Signature Certificate</option>
                  <option value="Taxation">Taxation Services</option>
                  <option value="Book Keeping">Book Keeping</option>
                  <option value="Auditing">Auditing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowServiceForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/shcya.png" 
                alt="SHCYA Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SHCYA</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
              <a href="#careers" className="text-gray-700 hover:text-blue-600 font-medium">Join Us</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            </nav>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
                <a href="#careers" className="text-gray-700 hover:text-blue-600 font-medium">Join Us</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Business <span className="text-blue-600">Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your business with cutting-edge digital solutions. From secure Digital Signature Certificates 
              to comprehensive financial services - we deliver precision, compliance, and growth for forward-thinking enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowDSCForm(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Your DSC Today
              </button>
              <button
                onClick={() => setShowServiceForm(true)}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive business solutions tailored to meet your professional needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.title === "Digital Signature Certificate" ? (
                  <button
                    onClick={() => setShowDSCForm(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                ) : (
                  <button
                    onClick={() => setShowServiceForm(true)}
                    className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Get Quote
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The SHCYA Advantage</h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience the difference of working with industry leaders. Our proven track record of excellence, 
                combined with cutting-edge technology and personalized service, makes us the preferred choice for 
                businesses seeking reliable, innovative, and results-driven professional solutions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Certified Professionals</h3>
                    <p className="text-gray-600">Expert team with industry certifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Client-Focused</h3>
                    <p className="text-gray-600">Personalized service for every client</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
                    <p className="text-gray-600">Data security and confidentiality assured</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Service</h3>
                    <p className="text-gray-600">Commitment to excellence in every project</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">eMudhra Partner</h3>
                <p className="text-gray-600 mb-6">
                  As an authorized eMudhra partner, we deliver government-certified Digital Signature solutions 
                  with complete regulatory compliance and industry recognition - your gateway to secure digital transformation.
                </p>
                <button
                  onClick={() => setShowServiceForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a dynamic team that's shaping the future of digital business solutions
            </p>
          </div>
          
          {/* Why Work With Us */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Work With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Collaborative Environment</h4>
                <p className="text-gray-600 text-sm">Work with passionate professionals in a supportive team culture</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Growth</h4>
                <p className="text-gray-600 text-sm">Continuous learning opportunities and career advancement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Industry Recognition</h4>
                <p className="text-gray-600 text-sm">Work with certified professionals and industry leaders</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Work-Life Balance</h4>
                <p className="text-gray-600 text-sm">Flexible working arrangements and competitive benefits</p>
              </div>
            </div>
          </div>
          
          {/* Current Openings */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Current Openings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Chartered Accountant */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Full-time</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Chartered Accountant</h4>
                <div className="flex items-center text-gray-600 mb-4">
                  <Location className="w-4 h-4 mr-1" />
                  <span className="text-sm">Puducherry, India</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Requirements:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• CA qualification from ICAI</li>
                      <li>• 2-5 years of experience</li>
                      <li>• Strong knowledge of taxation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Responsibilities:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Statutory audits and compliance</li>
                      <li>• GST and income tax matters</li>
                      <li>• Financial statement preparation</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedPosition('Chartered Accountant');
                    setShowJobApplicationForm(true);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
              
              {/* Tax Consultant */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Flexible</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Tax Consultant</h4>
                <div className="flex items-center text-gray-600 mb-4">
                  <Location className="w-4 h-4 mr-1" />
                  <span className="text-sm">Remote/Hybrid</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Requirements:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• B.Com/M.Com qualification</li>
                      <li>• 1-3 years tax experience</li>
                      <li>• GST and income tax knowledge</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Responsibilities:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Tax return preparation</li>
                      <li>• GST filing and compliance</li>
                      <li>• Client consultation</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedPosition('Tax Consultant');
                    setShowJobApplicationForm(true);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
              
              {/* Digital Services Associate */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Full-time</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Digital Services Associate</h4>
                <div className="flex items-center text-gray-600 mb-4">
                  <Location className="w-4 h-4 mr-1" />
                  <span className="text-sm">Puducherry, India</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Requirements:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Graduate in any discipline</li>
                      <li>• 0-2 years experience</li>
                      <li>• Good communication skills</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Responsibilities:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• DSC application processing</li>
                      <li>• Client support and coordination</li>
                      <li>• Documentation management</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedPosition('Digital Services Associate');
                    setShowJobApplicationForm(true);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          
          {/* General Application */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See Your Role?</h3>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedPosition('General Application');
                  setShowJobApplicationForm(true);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit General Application
              </button>
              <a
                href="mailto:sk.shcya@gmail.com?subject=Career Opportunity"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Email Resume Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Let's Build Success Together</h2>
            <p className="text-xl text-gray-600">Ready to transform your business? Connect with our experts for a personalized consultation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+91 96296 18619</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">sk.shcya@gmail.com</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Puducherry, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/shcya.png" 
                  alt="SHCYA Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold">SHCYA</span>
              </div>
              <p className="text-gray-400">
                Pioneering digital excellence and business transformation through innovative professional services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Digital Signature Certificate</li>
                <li>Taxation Services</li>
                <li>Book Keeping</li>
                <li>Auditing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#careers" className="hover:text-white">Join Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>+91 96296 18619</p>
                <p>sk.shcya@gmail.com</p>
                <p>Puducherry, India</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SHCYA. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Forms */}
      {showDSCForm && <DSCForm />}
      {showServiceForm && <ServiceInquiryForm />}
      {showJobApplicationForm && <JobApplicationForm />}
    </div>
  );
};

export default App;