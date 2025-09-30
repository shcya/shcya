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