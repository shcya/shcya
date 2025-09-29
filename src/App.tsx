import React, { useState } from 'react';
import { Shield, FileText, Calculator, BarChart3, Menu, X, Mail, Phone, MapPin, CheckCircle, Award, Receipt, BookOpen, Search } from 'lucide-react';
import { serviceInquiryService, dscApplicationService, fileUploadService, ServiceInquiry, DSCApplication } from './lib/supabase';

function App() {
  const [dscForm, setDscForm] = useState<DSCApplication | null>(null);

  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      id: 'digital-signature',
      title: 'Digital Signature',
      icon: Award,
      description: 'Secure digital signature solutions for businesses and individuals',
      details: 'Get Class 2 and Class 3 digital signature certificates for income tax filing, company registration, tender bidding, and document signing. We provide complete assistance from application to installation.',
      features: ['Class 2 & 3 DSC', 'Income Tax Filing', 'Company Registration', 'E-Tender Bidding', 'Document Signing', '24/7 Support']
    },
    {
      id: 'taxation',
      title: 'Taxation Services',
      icon: Receipt,
      description: 'Complete tax planning and compliance solutions',
      details: 'Professional tax services including GST registration, return filing, tax planning, and compliance management. Expert guidance for individuals and businesses.',
      features: ['GST Registration & Filing', 'Income Tax Returns', 'TDS/TCS Compliance', 'Tax Planning', 'Notice Handling', 'Audit Support']
    },
    {
      id: 'accounting',
      title: 'Accounting Services',
      icon: BookOpen,
      description: 'Comprehensive bookkeeping and financial management',
      details: 'Complete accounting solutions including bookkeeping, financial statements preparation, payroll management, and financial analysis for businesses of all sizes.',
      features: ['Bookkeeping', 'Financial Statements', 'Payroll Management', 'Accounts Reconciliation', 'Financial Analysis', 'MIS Reports']
    },
    {
      id: 'auditing',
      title: 'Auditing Services',
      icon: BarChart3,
      description: 'Professional audit and assurance services',
      details: 'Independent audit services including statutory audit, internal audit, tax audit, and special audits. Ensuring compliance and providing valuable business insights.',
      features: ['Statutory Audit', 'Internal Audit', 'Tax Audit', 'Bank Audit', 'Concurrent Audit', 'Special Audits']
    }
  ];

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
            SHCYA
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-light">
            Digital Signature & Professional Services
          </p>
          <p className="text-lg md:text-xl mb-12 text-green-100 max-w-2xl mx-auto">
            Your trusted partner for digital authentication solutions and comprehensive business services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('services')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              View Our Services
            </button>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive professional services to meet all your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="group">
                  <div className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <button 
                      onClick={() => setCurrentPage('services')}
                      className="text-green-600 font-semibold hover:text-green-700 flex items-center group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">About SHCYA</h2>
          <div className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl p-12 shadow-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl font-bold text-white">SK</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Shavan Kumar</h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With years of experience in digital services and professional consulting, SHCYA provides 
              reliable and efficient solutions for all your business compliance needs. We specialize in 
              digital signature certificates, taxation services, accounting, and auditing with a 
              commitment to excellence and customer satisfaction.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-green-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-green-200">sk.shcya@gmail.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <Phone className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-green-200">9629618619</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-green-200">Puducherry, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [showDSCForm, setShowDSCForm] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
    const [dscFormData, setDscFormData] = useState({
      applicantName: '',
      email: '',
      mobile: '',
      panNumber: '',
      aadhaarNumber: '',
      dscClass: 'class2',
      applicationType: 'new',
      organization: '',
      designation: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      panDocument: null,
      aadhaarDocument: null,
      photoDocument: null
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const submitInquiry = async () => {
        try {
          // Validate required fields
          if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all required fields (Name, Email, Phone)');
            return;
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
          }

          const inquiryData: ServiceInquiry = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || undefined,
            service_type: selectedService?.title || '',
            message: formData.message || undefined
          };

          await serviceInquiryService.create(inquiryData);
          alert('Thank you for your inquiry! We have received your request and will contact you soon.');
          setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
          setSelectedService(null);
        } catch (error) {
          console.error('Error submitting inquiry:', error);
          alert(`Error: ${error.message || 'There was an error submitting your inquiry. Please try again or contact us directly.'}`);
        }
      };

      submitInquiry();
    };

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDSCInputChange = (e) => {
      setDscFormData({ ...dscFormData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e, fieldName) => {
      const file = e.target.files[0];
      if (file) {
        setDscFormData({ ...dscFormData, [fieldName]: file });
      }
    };

    const handleDSCSubmit = (e) => {
      e.preventDefault();
      
      const submitDSCApplication = async () => {
        try {
          // Validate required fields
          const requiredFields = [
            'applicantName', 'email', 'mobile', 'panNumber', 'aadhaarNumber',
            'address', 'city', 'state', 'pincode'
          ];
          
          for (const field of requiredFields) {
            if (!dscFormData[field]) {
              alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
              return;
            }
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(dscFormData.email)) {
            alert('Please enter a valid email address');
            return;
          }

          // Validate PAN format
          const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
          if (!panRegex.test(dscFormData.panNumber.toUpperCase())) {
            alert('Please enter a valid PAN number (e.g., ABCDE1234F)');
            return;
          }

          // Validate Aadhaar format
          const aadhaarRegex = /^[0-9]{12}$/;
          if (!aadhaarRegex.test(dscFormData.aadhaarNumber)) {
            alert('Please enter a valid 12-digit Aadhaar number');
            return;
          }

          // Validate mobile format
          const mobileRegex = /^[0-9]{10}$/;
          if (!mobileRegex.test(dscFormData.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
          }

          // Validate pincode format
          const pincodeRegex = /^[0-9]{6}$/;
          if (!pincodeRegex.test(dscFormData.pincode)) {
            alert('Please enter a valid 6-digit PIN code');
            return;
          }

          // Check required documents
          if (!dscFormData.panDocument || !dscFormData.aadhaarDocument || !dscFormData.photoDocument) {
            alert('Please upload all required documents (PAN Card, Aadhaar Card, and Photo)');
            return;
          }

          // Upload documents if they exist
          let panDocumentUrl = '';
          let aadhaarDocumentUrl = '';
          let photoDocumentUrl = '';

          if (dscFormData.panDocument) {
            const panPath = `dsc-documents/${Date.now()}-pan-${dscFormData.panDocument.name}`;
            await fileUploadService.uploadFile(dscFormData.panDocument, 'dsc-documents', panPath);
            panDocumentUrl = fileUploadService.getPublicUrl('documents', panPath);
          }

          if (dscFormData.aadhaarDocument) {
            const aadhaarPath = `dsc-documents/${Date.now()}-aadhaar-${dscFormData.aadhaarDocument.name}`;
            await fileUploadService.uploadFile(dscFormData.aadhaarDocument, 'dsc-documents', aadhaarPath);
            aadhaarDocumentUrl = fileUploadService.getPublicUrl('documents', aadhaarPath);
          }

          if (dscFormData.photoDocument) {
            const photoPath = `dsc-documents/${Date.now()}-photo-${dscFormData.photoDocument.name}`;
            await fileUploadService.uploadFile(dscFormData.photoDocument, 'dsc-documents', photoPath);
            photoDocumentUrl = fileUploadService.getPublicUrl('documents', photoPath);
          }

          const applicationData: DSCApplication = {
            applicant_name: dscFormData.applicantName,
            email: dscFormData.email,
            mobile: dscFormData.mobile,
            pan_number: dscFormData.panNumber.toUpperCase(),
            aadhaar_number: dscFormData.aadhaarNumber,
            dsc_class: dscFormData.dscClass,
            application_type: dscFormData.applicationType,
            organization: dscFormData.organization || undefined,
            designation: dscFormData.designation || undefined,
            address: dscFormData.address,
            city: dscFormData.city,
            state: dscFormData.state,
            pincode: dscFormData.pincode,
            pan_document_url: panDocumentUrl || undefined,
            aadhaar_document_url: aadhaarDocumentUrl || undefined,
            photo_document_url: photoDocumentUrl || undefined,
            status: 'pending'
          };

          await dscApplicationService.create(applicationData);
          alert('Thank you for your DSC application! We have received your application and will process it soon. You will be contacted within 24-48 hours.');
          
          setDscFormData({
            applicantName: '',
            email: '',
            mobile: '',
            panNumber: '',
            aadhaarNumber: '',
            dscClass: 'class2',
            applicationType: 'new',
            organization: '',
            designation: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            panDocument: null,
            aadhaarDocument: null,
            photoDocument: null
          });
          setShowDSCForm(false);
        } catch (error) {
          console.error('Error submitting DSC application:', error);
          alert(`Error: ${error.message || 'There was an error submitting your application. Please try again or contact us directly.'}`);
        }
      };

      submitDSCApplication();
    };

    return (
      <div className="min-h-screen pt-20">
        <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">Our Services</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional services tailored to your business needs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h2>
                        <p className="text-gray-600 mb-6">{service.details}</p>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedService(service)}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                        >
                          Get Quote / Inquiry
                        </button>
                        
                        {service.id === 'digital-signature' && (
                          <button
                            onClick={() => setShowDSCForm(true)}
                            className="w-full mt-3 py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white font-semibold hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                          >
                            Apply for DSC Online
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Inquiry Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedService.title} Inquiry
                  </h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Organization</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Required</label>
                    <input
                      type="text"
                      value={selectedService.title}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message/Requirements</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Please describe your requirements in detail..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* DSC Application Form Modal */}
        {showDSCForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      Digital Signature Certificate Application
                    </h2>
                    <p className="text-gray-600 mt-2">Fill out the form below to apply for your DSC</p>
                  </div>
                  <button
                    onClick={() => setShowDSCForm(false)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleDSCSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-green-50/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name (As per PAN) *</label>
                        <input
                          type="text"
                          name="applicantName"
                          value={dscFormData.applicantName}
                          onChange={handleDSCInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter full name as per PAN card"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={dscFormData.email}
                          onChange={handleDSCInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={dscFormData.mobile}
                          onChange={handleDSCInputChange}
                          required
                          pattern="[0-9]{10}"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter 10-digit mobile number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                        <input
                          type="text"
                          name="panNumber"
                          value={dscFormData.panNumber}
                          onChange={handleDSCInputChange}
                          required
                          pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 uppercase"
                          placeholder="ABCDE1234F"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number *</label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={dscFormData.aadhaarNumber}
                        onChange={handleDSCInputChange}
                        required
                        pattern="[0-9]{12}"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter 12-digit Aadhaar number"
                      />
                    </div>
                  </div>

                  {/* DSC Details */}
                  <div className="bg-emerald-50/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      DSC Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">DSC Class *</label>
                        <select
                          name="dscClass"
                          value={dscFormData.dscClass}
                          onChange={handleDSCInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="class2">Class 2 DSC (Individual/Organization)</option>
                          <option value="class3">Class 3 DSC (High Assurance)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Application Type *</label>
                        <select
                          name="applicationType"
                          value={dscFormData.applicationType}
                          onChange={handleDSCInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="new">New Application</option>
                          <option value="renewal">Renewal</option>
                          <option value="reissue">Reissue</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Organization/Company</label>
                        <input
                          type="text"
                          name="organization"
                          value={dscFormData.organization}
                          onChange={handleDSCInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter organization name (if applicable)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={dscFormData.designation}
                          onChange={handleDSCInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your designation"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-blue-50/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Address Information
                    </h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                      <textarea
                        name="address"
                        value={dscFormData.address}
                        onChange={handleDSCInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Enter complete address"
                      ></textarea>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={dscFormData.city}
                          onChange={handleDSCInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={dscFormData.state}
                          onChange={handleDSCInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter state"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={dscFormData.pincode}
                          onChange={handleDSCInputChange}
                          required
                          pattern="[0-9]{6}"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter 6-digit PIN code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="bg-orange-50/50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-600" />
                      Document Upload
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">Please upload clear, scanned copies of the following documents (PDF, JPG, PNG formats accepted, max 5MB each)</p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Card Copy *</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'panDocument')}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                        </div>
                        {dscFormData.panDocument && (
                          <p className="text-sm text-green-600 mt-2">✓ {dscFormData.panDocument.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Card Copy *</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'aadhaarDocument')}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                        </div>
                        {dscFormData.aadhaarDocument && (
                          <p className="text-sm text-green-600 mt-2">✓ {dscFormData.aadhaarDocument.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Size Photo *</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'photoDocument')}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                        </div>
                        {dscFormData.photoDocument && (
                          <p className="text-sm text-green-600 mt-2">✓ {dscFormData.photoDocument.name}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I hereby declare that the information provided above is true and correct to the best of my knowledge. 
                        I understand that any false information may lead to rejection of my application. I agree to the 
                        <span className="text-green-600 font-semibold"> Terms and Conditions</span> and 
                        <span className="text-green-600 font-semibold"> Privacy Policy</span>.
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setShowDSCForm(false)}
                        className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                      >
                        Submit DSC Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                SHCYA
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-semibold transition-colors duration-200 ${
                  currentPage === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                className={`font-semibold transition-colors duration-200 ${
                  currentPage === 'services' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Services
              </button>
              <a
                href="#contact"
                onClick={() => setCurrentPage('home')}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-green-600" /> : <Menu className="w-5 h-5 text-green-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-green-100">
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-semibold transition-colors duration-200 ${
                  currentPage === 'home' ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('services');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-semibold transition-colors duration-200 ${
                  currentPage === 'services' ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                Services
              </button>
              <a
                href="#contact"
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left font-semibold text-gray-600"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-green-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">SHCYA</span>
          </div>
          <p className="text-green-200 mb-4">
            Your trusted partner for digital authentication solutions and comprehensive business services
          </p>
          <p className="text-green-300 text-sm">
            © 2024 SHCYA - All rights reserved. | Powered by Shavan Kumar
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;