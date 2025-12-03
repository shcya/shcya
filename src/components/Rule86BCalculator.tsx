import React, { useState } from 'react';
import { Calculator, Info, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Rule86BResult {
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

const Rule86BCalculator: React.FC = () => {
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

  const [result, setResult] = useState<Rule86BResult | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const quantize = (x: number): number => {
    return Math.round(x * 100) / 100;
  };

  const calculateRule86B = () => {
    const taxable_value = quantize(parseFloat(formData.taxable_value) || 0);
    const output_tax = quantize(parseFloat(formData.output_tax) || 0);
    const itc_available = quantize(parseFloat(formData.itc_available) || 0);
    const cumulative_cash_paid = quantize(parseFloat(formData.cumulative_cash_paid) || 0);
    const cumulative_output_tax_so_far = quantize(parseFloat(formData.cumulative_output_tax_so_far) || output_tax);

    const result: Rule86BResult = { applies: false, reason: '', details: {} };

    // Threshold check
    if (taxable_value <= 5000000) {
      result.applies = false;
      result.reason = "Monthly taxable supplies ≤ ₹50,00,000 — Rule 86B not applicable.";
      setResult(result);
      return;
    }

    // Exceptions
    if (formData.income_tax_paid_each_yr) {
      result.applies = false;
      result.reason = "Exception: Income-tax paid > ₹1 lakh in each of last two FYs by required persons.";
      setResult(result);
      return;
    }

    if (formData.refund_unutilised_itc_gt_1l) {
      result.applies = false;
      result.reason = "Exception: Refund > ₹1 lakh on account of unutilised ITC in preceding FY.";
      setResult(result);
      return;
    }

    if (formData.is_govt_psu_local_statutory) {
      result.applies = false;
      result.reason = "Exception: Entity is Govt/PSU/Local authority/Statutory body.";
      setResult(result);
      return;
    }

    // Check cumulative cash paid > 1%
    const cumulative_cash_pct = cumulative_output_tax_so_far > 0 
      ? quantize((cumulative_cash_paid / cumulative_output_tax_so_far) * 100)
      : 0;

    if (cumulative_cash_pct > 1) {
      result.applies = false;
      result.reason = "Exception: Cumulative cash paid in FY exceeds 1% of cumulative output tax (till this month).";
      result.details.cumulative_cash_pct = cumulative_cash_pct.toFixed(2);
      setResult(result);
      return;
    }

    // Rule 86B applies
    result.applies = true;
    const allowed_itc_by_percent = quantize(output_tax * 0.99);
    const allowed_itc = Math.min(itc_available, allowed_itc_by_percent);
    const required_cash = quantize(output_tax - allowed_itc);
    const min_cash_percent_amount = quantize(output_tax * 0.01);

    result.reason = "Rule 86B applies: at least 1% of this month's output tax must be paid from cash (unless exception).";
    result.details = {
      taxable_value: taxable_value.toFixed(2),
      output_tax: output_tax.toFixed(2),
      itc_available: itc_available.toFixed(2),
      allowed_itc_by_99_percent: allowed_itc_by_percent.toFixed(2),
      allowed_itc_used: allowed_itc.toFixed(2),
      required_cash_payment: required_cash.toFixed(2),
      minimum_1_percent_amount: min_cash_percent_amount.toFixed(2),
      cumulative_cash_pct: cumulative_cash_pct.toFixed(2)
    };

    setResult(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">GST Rule 86B Calculator</h2>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Info className="w-5 h-5" />
          <span>Info</span>
        </button>
      </div>

      {showInfo && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">About GST Rule 86B</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Rule 86B restricts the use of Input Tax Credit (ITC) for taxpayers with monthly taxable supplies exceeding ₹50 lakhs. 
            Such taxpayers can use ITC for a maximum of 99% of their output tax liability, requiring at least 1% to be paid in cash, 
            unless specific exceptions apply.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Taxable Value (₹) *
            </label>
            <input
              type="number"
              name="taxable_value"
              value={formData.taxable_value}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter taxable value (excluding exempt & zero-rated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Output Tax Liability (₹) *
            </label>
            <input
              type="number"
              name="output_tax"
              value={formData.output_tax}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter output tax for this month"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available ITC (₹) *
            </label>
            <input
              type="number"
              name="itc_available"
              value={formData.itc_available}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter available Input Tax Credit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cumulative Cash Paid in FY (₹)
            </label>
            <input
              type="number"
              name="cumulative_cash_paid"
              value={formData.cumulative_cash_paid}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Total cash paid via cash ledger so far in FY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cumulative Output Tax in FY (₹)
            </label>
            <input
              type="number"
              name="cumulative_output_tax_so_far"
              value={formData.cumulative_output_tax_so_far}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Leave blank to use current month only"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-800">Exceptions (Check if applicable)</h4>
            
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="income_tax_paid_each_yr"
                checked={formData.income_tax_paid_each_yr}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Income tax paid > ₹1 lakh in each of last two FYs by required persons
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="refund_unutilised_itc_gt_1l"
                checked={formData.refund_unutilised_itc_gt_1l}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Refund > ₹1 lakh on account of unutilised ITC in preceding FY
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="is_govt_psu_local_statutory"
                checked={formData.is_govt_psu_local_statutory}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                Entity is Government/PSU/Local authority/Statutory body
              </span>
            </label>
          </div>

          <button
            onClick={calculateRule86B}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Calculate Rule 86B Compliance
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
          
          {result ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-l-4 ${
                result.applies 
                  ? 'bg-orange-50 border-orange-400' 
                  : 'bg-green-50 border-green-400'
              }`}>
                <div className="flex items-start space-x-3">
                  {result.applies ? (
                    <AlertTriangle className="w-6 h-6 text-orange-500 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-semibold ${
                      result.applies ? 'text-orange-800' : 'text-green-800'
                    }`}>
                      {result.applies ? 'Rule 86B Applies' : 'Rule 86B Does Not Apply'}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      result.applies ? 'text-orange-700' : 'text-green-700'
                    }`}>
                      {result.reason}
                    </p>
                  </div>
                </div>
              </div>

              {result.applies && result.details && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Calculation Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxable Value:</span>
                      <span className="font-medium">{formatCurrency(result.details.taxable_value!)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Output Tax:</span>
                      <span className="font-medium">{formatCurrency(result.details.output_tax!)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available ITC:</span>
                      <span className="font-medium">{formatCurrency(result.details.itc_available!)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max ITC Usable (99%):</span>
                      <span className="font-medium">{formatCurrency(result.details.allowed_itc_by_99_percent!)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ITC to be Used:</span>
                      <span className="font-medium">{formatCurrency(result.details.allowed_itc_used!)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-800 font-semibold">Required Cash Payment:</span>
                      <span className="font-bold text-red-600">{formatCurrency(result.details.required_cash_payment!)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum 1% Amount:</span>
                      <span className="font-medium">{formatCurrency(result.details.minimum_1_percent_amount!)}</span>
                    </div>
                  </div>
                </div>
              )}

              {result.details.cumulative_cash_pct && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Cumulative Analysis</h4>
                  <p className="text-sm text-blue-700">
                    Cumulative cash paid percentage: <span className="font-semibold">{result.details.cumulative_cash_pct}%</span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Enter the required details and click calculate to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rule86BCalculator;