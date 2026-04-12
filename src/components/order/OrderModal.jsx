import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  CreditCard, 
  Upload, 
  AlertCircle, 
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  Phone,
  Check,
  Edit2
} from 'lucide-react';
import { createOrder } from '../../api/api';

const OrderModal = ({ isOpen, onClose, product, selectedPlan, bankAccounts, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState('');
  const [formData, setFormData] = useState({
    transaction_id: '',
    payment_proof: null,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedBank('');
      setFormData({
        transaction_id: '',
        payment_proof: null,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
      });
      setErrors({});
      setPreviewUrl(null);
    }
  }, [isOpen]);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, payment_proof: 'File size must be less than 10MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, payment_proof: 'Please upload an image file' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, payment_proof: file }));
      setPreviewUrl(URL.createObjectURL(file));
      if (errors.payment_proof) {
        setErrors(prev => ({ ...prev, payment_proof: '' }));
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!selectedBank) {
        newErrors.bank_account = 'Please select a payment method';
      }
    }
    
    if (step === 2) {
      if (!formData.transaction_id.trim()) {
        newErrors.transaction_id = 'Transaction ID is required';
      }
      if (!formData.payment_proof) {
        newErrors.payment_proof = 'Payment screenshot is required';
      }
    }
    
    if (step === 3) {
      if (!formData.customer_name.trim()) {
        newErrors.customer_name = 'Name is required';
      }
      if (!formData.customer_email.trim()) {
        newErrors.customer_email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
        newErrors.customer_email = 'Invalid email format';
      }
      if (!formData.customer_phone.trim()) {
        newErrors.customer_phone = 'Phone number is required';
      } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.customer_phone)) {
        newErrors.customer_phone = 'Invalid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const orderData = new FormData();
      orderData.append('customer_name', formData.customer_name);
      orderData.append('customer_email', formData.customer_email);
      orderData.append('customer_phone', formData.customer_phone);
      orderData.append('customer_address', 'Not provided');
      orderData.append('product', product.id);
      if (selectedPlan) {
        orderData.append('plan', selectedPlan.id);
      }
      orderData.append('amount', selectedPlan?.price || product.price);
      orderData.append('bank_account', selectedBank);
      orderData.append('transaction_id', formData.transaction_id);
      orderData.append('payment_proof', formData.payment_proof);
      
      const response = await createOrder(orderData);
      onSuccess(response);
      onClose();
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again. ' + (error.message || ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  // Swipe handling for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentStep < 4 && validateStep(currentStep)) {
        handleNext();
      } else if (diff < 0 && currentStep > 1) {
        handleBack();
      }
    }
    
    setTouchStart(null);
  };

  if (!isOpen) return null;

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const selectedBankDetails = bankAccounts.find(b => b.id.toString() === selectedBank);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        {/* Modal */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">Complete Your Order</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-700 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Step Indicators */}
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => handleStepClick(step)}
                    disabled={step > currentStep}
                    className={`text-xs font-medium transition-colors ${
                      step <= currentStep ? 'text-purple-600 cursor-pointer' : 'text-gray-400'
                    }`}
                  >
                    {step === 1 && 'Bank'}
                    {step === 2 && 'Payment'}
                    {step === 3 && 'Details'}
                    {step === 4 && 'Confirm'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            
            {/* Step 1: Bank Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="text-purple-800 text-sm">
                    <span className="font-semibold">Step 1 of 4:</span> Choose your preferred payment method
                  </p>
                </div>
                
                {bankAccounts.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-800 font-medium mb-1">No payment methods available</p>
                        <p className="text-yellow-700 text-sm">Please contact support or try again later.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bankAccounts.map(bank => (
                      <label
                        key={bank.id}
                        className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedBank === bank.id.toString()
                            ? 'border-purple-600 bg-purple-50 shadow-md'
                            : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="bank_account"
                            value={bank.id}
                            checked={selectedBank === bank.id.toString()}
                            onChange={(e) => {
                              setSelectedBank(e.target.value);
                              if (errors.bank_account) {
                                setErrors(prev => ({ ...prev, bank_account: '' }));
                              }
                            }}
                            className="mt-1 mr-3 accent-purple-600"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Building2 className="w-5 h-5 text-gray-600 mr-2" />
                              <span className="font-semibold text-gray-900">
                                {bank.bank_name_display || bank.bank_name}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1 bg-gray-50 rounded-lg p-3">
                              <p><span className="font-medium">Account Title:</span> {bank.account_title}</p>
                              <p><span className="font-medium">Account Number:</span> {bank.account_number}</p>
                              {bank.iban && <p><span className="font-medium">IBAN:</span> {bank.iban}</p>}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                {errors.bank_account && (
                  <p className="text-red-500 text-sm mt-2">{errors.bank_account}</p>
                )}
              </div>
            )}
            
            {/* Step 2: Payment Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="text-purple-800 text-sm">
                    <span className="font-semibold">Step 2 of 4:</span> Enter payment details
                  </p>
                </div>
                
                {/* Selected Bank Summary */}
                {selectedBankDetails && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">Paying to:</p>
                    <p className="font-semibold">{selectedBankDetails.bank_name_display}</p>
                    <p className="text-sm text-gray-600">{selectedBankDetails.account_number}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID / Reference Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="transaction_id"
                      value={formData.transaction_id}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.transaction_id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="e.g., TRX123456789"
                    />
                  </div>
                  {errors.transaction_id && (
                    <p className="text-red-500 text-xs mt-1">{errors.transaction_id}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Screenshot *
                  </label>
                  <div className={`border-2 border-dashed rounded-xl transition-colors ${
                    errors.payment_proof ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-400'
                  }`}>
                    {previewUrl ? (
                      <div className="relative p-4">
                        <img src={previewUrl} alt="Payment proof" className="max-h-48 mx-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(previewUrl);
                            setPreviewUrl(null);
                            setFormData(prev => ({ ...prev, payment_proof: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <div className="flex justify-center text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                            <span>Upload screenshot</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/gif,image/webp"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                  {errors.payment_proof && (
                    <p className="text-red-500 text-xs mt-1">{errors.payment_proof}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 3: Customer Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="text-purple-800 text-sm">
                    <span className="font-semibold">Step 3 of 4:</span> Enter your contact information
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.customer_name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.customer_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.customer_email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.customer_email && (
                    <p className="text-red-500 text-xs mt-1">{errors.customer_email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.customer_phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="03001234567"
                    />
                  </div>
                  {errors.customer_phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.customer_phone}</p>
                  )}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      We'll use this email to send you order updates and tracking information.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 text-sm font-semibold">
                      Review your order before submitting
                    </p>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-gray-900">Order Summary</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium">{product.title}</span>
                    </div>
                    {selectedPlan && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{selectedPlan.title}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span>Total:</span>
                      <span className="text-purple-600">Rs. {selectedPlan?.price || product.price}</span>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Payment Method</h4>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="text-purple-600 text-sm hover:underline flex items-center"
                    >
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </button>
                  </div>
                  {selectedBankDetails && (
                    <div className="text-sm">
                      <p className="font-medium">{selectedBankDetails.bank_name_display}</p>
                      <p className="text-gray-600">{selectedBankDetails.account_number}</p>
                    </div>
                  )}
                </div>
                
                {/* Payment Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Payment Proof</h4>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="text-purple-600 text-sm hover:underline flex items-center"
                    >
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </button>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><span className="text-gray-600">Transaction ID:</span> <span className="font-mono">{formData.transaction_id}</span></p>
                    {previewUrl && (
                      <img src={previewUrl} alt="Payment proof" className="max-h-24 rounded-lg" />
                    )}
                  </div>
                </div>
                
                {/* Customer Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Customer Information</h4>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      className="text-purple-600 text-sm hover:underline flex items-center"
                    >
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </button>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Name:</span> {formData.customer_name}</p>
                    <p><span className="text-gray-600">Email:</span> {formData.customer_email}</p>
                    <p><span className="text-gray-600">Phone:</span> {formData.customer_phone}</p>
                  </div>
                </div>
                
                {/* Important Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">
                      By placing this order, you confirm that all information provided is accurate. 
                      Your order will be activated after payment verification.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
          
          {/* Footer with Navigation */}
          <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 1 && bankAccounts.length === 0}
                  className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center ${
                    (currentStep === 1 && bankAccounts.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Confirm Order
                    </>
                  )}
                </button>
              )}
            </div>
            
            {/* Step counter for mobile */}
            <p className="text-center text-xs text-gray-500 mt-3">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;