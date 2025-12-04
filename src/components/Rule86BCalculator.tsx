import React, { useState } from 'react';
import { X, Calculator, Info, AlertTriangle, CheckCircle, IndianRupee } from 'lucide-react';

interface Rule86BCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CalculationResult {
  applies: boolean;
  reason: string;
  details: {
    taxable_value?: string;
    output_tax?: string;
    itc_available?: string;
    allowed_itc_by_99_percent?: string;
    allowed_itc_used?: string;
    required_cash_payment?: string;
    minimum_1_percent_amount?: string;
    cumulative_cash_pct?: string;
  };
}

const Rule86BCalculator: React.FC<Rule86BCalculatorProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    taxable_value: '',
    output_tax: '',
    itc_available: '',
    cumulative_cash_paid: '',
    cumulative_output_tax_so_far: '',
    income_tax_paid_each_yr: false,
    refund_unutilised_itc_gt_1l: false,
    is_govt_psu_local_statutory: false
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const quantize = (value: number): number => {
    return Math.round(value * 100) / 100;
  };

  const formatCurrency = (amount: string | number): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(num);
  };

  const calculateRule86B = () => {
    const taxable_value = quantize(parseFloat(formData.taxable_value) || 0);
    const output_tax = quantize(parseFloat(formData.output_tax) || 0);
    const itc_available = quantize(parseFloat(formData.itc_available) || 0);
    const cumulative_cash_paid = quantize(parseFloat(formData.cumulative_cash_paid) || 0);
    const cumulative_output_tax_so_far = quantize(parseFloat(formData.cumulative_output_tax_so_far) || output_tax);

    const calculationResult: CalculationResult = {
      applies: false,
      reason: '',
      details: {}
    };

    // Threshold check
    if (taxable_value <= 5000000) {
      calculationResult.applies = false;
      calculationResult.reason = "Monthly taxable supplies ≤ ₹50,00,000 — Rule 86B not applicable.";
      setResult(calculationResult);
      return;
    }

    // Exceptions
    if (formData.income_tax_paid_each_yr) {
      calculationResult.applies = false;
      calculationResult.reason = "Exception: Income-tax paid > ₹1 lakh in each of last two FYs by required persons.";
      setResult(calculationResult);
      return;
    }

    if (formData.refund_unutilised_itc_gt_1l) {
      calculationResult.applies = false;
      calculationResult.reason = "Exception: Refund > ₹1 lakh on account of unutilised ITC in preceding FY.";
      setResult(calculationResult);
      return;
    }

    if (formData.is_govt_psu_local_statutory) {
      calculationResult.applies = false;
      calculationResult.reason = "Exception: Entity is Govt/PSU/Local authority/Statutory body.";
      setResult(calculationResult);
      return;
    }

    // Check cumulative cash paid > 1%
    let cumulative_cash_pct = 0;
    if (cumulative_output_tax_so_far > 0) {
      cumulative_cash_pct = quantize((cumulative_cash_paid / cumulative_output_tax_so_far) * 100);
    }

    if (cumulative_cash_pct > 1) {
      calculationResult.applies = false;
      calculationResult.reason = "Exception: Cumulative cash paid in FY exceeds 1% of cumulative output tax (till this month).";
      calculationResult.details.cumulative_cash_pct = cumulative_cash_pct.toString();
      setResult(calculationResult);
      return;
    }

    // Rule 86B applies
    calculationResult.applies = true;
    const allowed_itc_by_percent = quantize(output_tax * 0.99);
    const allowed_itc = Math.min(itc_available, allowed_itc_by_percent);
    const required_cash = quantize(output_tax - allowed_itc);
    const min_cash_percent_amount = quantize(output_tax * 0.01);

    calculationResult.reason = "Rule 86B applies: at least 1% of this month's output tax must be paid from cash.";
    calculationResult.details = {
      taxable_value: taxable_value.toString(),
      output_tax: output_tax.toString(),
      itc_available: itc_available.toString(),
      allowed_itc_by_99_percent: allowed_itc_by_percent.toString(),
      allowed_itc_used: allowed_itc.toString(),
      required_cash_payment: required_cash.toString(),
      minimum_1_percent_amount: min_cash_percent_amount.toString(),
      cumulative_cash_pct: cumulative_cash_pct.toString()
    };

    setResult(calculationResult);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      taxable_value: '',
      output_tax: '',
      itc_available: '',
      cumulative_cash_paid: '',
      cumulative_output_tax_so_far: '',
      income_tax_paid_each_yr: false,
      refund_unutilised_itc_gt_1l: false,
      is_govt_psu_local_statutory: false
    });
    setResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">GST Rule 86B Calculator</h2>
                <p className="text-blue-100">Check compliance with GST Rule 86B requirements</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Information about Rule 86B"
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 m-6 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">About GST Rule 86B</h3>
                <div className="text-blue-800 space-y-2">
                  <p>
                    <strong>Rule 86B</strong> restricts the utilization of Input Tax Credit (ITC) to 99% of output tax liability 
                    for taxpayers with monthly taxable supplies exceeding ₹50 lakhs.
                  </p>
                  <p>
                    <strong>Key Requirements:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>At least 1% of output tax must be paid in cash</li>
                    <li>Applies when monthly taxable supplies > ₹50 lakhs</li>
                    <li>Several exceptions available for compliant taxpayers</li>
                    <li>Cumulative cash payment of >1% in FY provides exemption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2 text-green-600" />
                  Financial Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Taxable Value (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.taxable_value}
                      onChange={(e) => handleInputChange('taxable_value', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter taxable value (excluding exempt & zero-rated)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Tax Liability (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.output_tax}
                      onChange={(e) => handleInputChange('output_tax', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter output tax for this month"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available ITC (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.itc_available}
                      onChange={(e) => handleInputChange('itc_available', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter available Input Tax Credit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cumulative Cash Paid in FY (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.cumulative_cash_paid}
                      onChange={(e) => handleInputChange('cumulative_cash_paid', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Total cash paid via cash ledger in current FY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cumulative Output Tax in FY (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.cumulative_output_tax_so_far}
                      onChange={(e) => handleInputChange('cumulative_output_tax_so_far', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Total output tax till this month in FY"
                    />
                  </div>
                </div>
              </div>

              {/* Exceptions */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                  Exception Criteria
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.income_tax_paid_each_yr}
                      onChange={(e) => handleInputChange('income_tax_paid_each_yr', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Income tax paid > ₹1 lakh in each of the last two financial years by the registered person or any of the persons specified in sub-rule (1)
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.refund_unutilised_itc_gt_1l}
                      onChange={(e) => handleInputChange('refund_unutilised_itc_gt_1l', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Refund > ₹1 lakh on account of unutilised input tax credit in the preceding financial year
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_govt_psu_local_statutory}
                      onChange={(e) => handleInputChange('is_govt_psu_local_statutory', e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Entity is Government, PSU, Local authority, or Statutory body
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={calculateRule86B}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Calculate Rule 86B
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {result ? (
                <div className={`rounded-xl p-6 border-2 ${
                  result.applies 
                    ? 'bg-orange-50 border-orange-200' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    {result.applies ? (
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                    <div>
                      <h3 className={`text-xl font-bold ${
                        result.applies ? 'text-orange-900' : 'text-green-900'
                      }`}>
                        {result.applies ? 'Rule 86B Applies' : 'Rule 86B Does Not Apply'}
                      </h3>
                      <p className={`text-sm ${
                        result.applies ? 'text-orange-700' : 'text-green-700'
                      }`}>
                        {result.applies ? 'Compliance Required' : 'No Restrictions'}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg mb-4 ${
                    result.applies ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    <p className={`font-medium ${
                      result.applies ? 'text-orange-900' : 'text-green-900'
                    }`}>
                      {result.reason}
                    </p>
                  </div>

                  {result.applies && result.details && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Calculation Details:</h4>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                          <span className="text-gray-600">Taxable Value:</span>
                          <span className="font-semibold">{formatCurrency(result.details.taxable_value || '0')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                          <span className="text-gray-600">Output Tax:</span>
                          <span className="font-semibold">{formatCurrency(result.details.output_tax || '0')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                          <span className="text-gray-600">Available ITC:</span>
                          <span className="font-semibold">{formatCurrency(result.details.itc_available || '0')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                          <span className="text-gray-600">Max ITC Usable (99%):</span>
                          <span className="font-semibold">{formatCurrency(result.details.allowed_itc_by_99_percent || '0')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                          <span className="text-gray-600">ITC to be Used:</span>
                          <span className="font-semibold">{formatCurrency(result.details.allowed_itc_used || '0')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-orange-100 rounded-lg border-2 border-orange-300">
                          <span className="text-orange-800 font-medium">Required Cash Payment:</span>
                          <span className="font-bold text-orange-900 text-lg">{formatCurrency(result.details.required_cash_payment || '0')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border">
                          <span className="text-blue-700">Minimum 1% Amount:</span>
                          <span className="font-semibold text-blue-900">{formatCurrency(result.details.minimum_1_percent_amount || '0')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {result.details.cumulative_cash_pct && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border">
                      <span className="text-blue-700">Cumulative Cash Percentage: </span>
                      <span className="font-semibold text-blue-900">{result.details.cumulative_cash_pct}%</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-500">
                    Fill in the required details and click "Calculate Rule 86B" to check compliance requirements.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule86BCalculator;