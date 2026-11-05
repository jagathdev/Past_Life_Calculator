import React from 'react';
import { usePrice } from '../../context/PriceContext';

const CURRENCY_SYMBOLS = {
  INR: '₹ ',
  USD: '$ ',
  MYR: 'MYR ',
};

const ASTROVED_STORE_URL =
  'https://www.astroved.com/Customized-Reports-Karmic-Astrology-Report-Past-Life-Influence-Report--P399.aspx';

const formatDecimal = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '0.00';
  return Number(num).toFixed(2);
};

const Pricing = ({ className = '' }) => {
  const { prices, currency } = usePrice();

  // Allowed currencies: only INR, USD, MYR
  let activeCode = (currency || 'INR').toUpperCase();
  if (!['INR', 'USD', 'MYR'].includes(activeCode)) {
    activeCode = 'INR';
  }

  let matchedPrice = null;
  if (Array.isArray(prices)) {
    matchedPrice = prices.find(
      (p) =>
        String(p.CurrencyCode).toUpperCase() === activeCode ||
        String(p.CurrencyId) === activeCode
    );
  }

  let displaySellingPrice = '';
  let displayListPrice = '';
  let displayYouSave = '';
  let savePercentage = 0;
  let hasDiscount = false;

  if (matchedPrice) {
    const code = String(matchedPrice.CurrencyCode).toUpperCase();
    const symbol = CURRENCY_SYMBOLS[code] || `${code} `;

    const sellingVal = parseFloat(matchedPrice.SellingPrice);
    const listVal = parseFloat(matchedPrice.ListPrice || matchedPrice.SellingPrice);
    const youSaveVal = matchedPrice.Yousave !== undefined ? parseFloat(matchedPrice.Yousave) : (listVal - sellingVal);

    savePercentage = matchedPrice.YouSavePercentage !== undefined
      ? Math.round(parseFloat(matchedPrice.YouSavePercentage))
      : (listVal > 0 ? Math.round(((listVal - sellingVal) / listVal) * 100) : 0);

    displaySellingPrice = `${symbol}${formatDecimal(sellingVal)}`;
    displayListPrice = `${symbol}${formatDecimal(listVal)}`;
    displayYouSave = `${symbol}${formatDecimal(youSaveVal > 0 ? youSaveVal : 0)}`;

    hasDiscount = listVal > sellingVal && youSaveVal > 0;
  }

  return (
    <div className={`w-full flex justify-center my-4 animate-fade-in-up ${className}`}>
      {/* Clean Solid Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 text-center border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] w-full max-w-[390px]">

        {/* Pricing Area */}
        <div className="flex flex-col items-center justify-center mb-4">

          {/* Row 1: Strikeout Price on the LEFT, Selling Price on the RIGHT */}
          <div className="flex items-center justify-center gap-3">
            {hasDiscount && (
              <span className="text-gray-400 line-through text-lg sm:text-xl font-medium font-poppins">
                {displayListPrice}
              </span>
            )}
            <span className="text-[#004b87] font-bold text-3xl sm:text-[34px] font-poppins tracking-tight leading-none">
              {displaySellingPrice}
            </span>
          </div>

          {/* Row 2: Bottom of price shows Save amount & percentage */}
          {hasDiscount && (
            <div className="mt-1.5 flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-sans">
              <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/70 rounded-full px-3 py-0.5">
                Save {displayYouSave} ({savePercentage}%)
              </span>
            </div>
          )}

        </div>

        {/* Solid Color CTA Button */}
        <a
          href={ASTROVED_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#C04921] hover:bg-[#a63d1a] active:scale-[0.99] text-white border-none rounded-xl py-3.5 px-5 text-sm sm:text-[15px] font-bold cursor-pointer transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group no-underline"
        >
          <span>Get My Past Life Report</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>

        {/* Footer Text */}
        <p className="text-slate-500 text-xs mt-3 font-normal text-center">
          Full report delivered as PDF
        </p>

      </div>
    </div>
  );
};

export default Pricing;
