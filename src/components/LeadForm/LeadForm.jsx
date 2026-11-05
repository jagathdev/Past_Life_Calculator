import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import countryData from '../../utils/country.json';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

// Reusable SVG Icons
const Icons = {
  User: () => <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Calendar: () => <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Clock: () => <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Globe: () => <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  MapPin: () => <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Female: () => <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a4 4 0 100-8 4 4 0 000 8zM12 11v10m-3-3h6" /></svg>,
  Male: () => <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14a4 4 0 100-8 4 4 0 000 8zm0 0l6 6m0-6v6h-6" /></svg>,
  Other: () => <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a4 4 0 100-8 4 4 0 000 8zm-4 4l-4 4m16 0l-4-4" /></svg>,
  Calculator: () => <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  Mail: () => <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Lotus: ({ className = "w-6 h-6" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22C12 22 17 19 19 15C21 11 19 7 19 7C19 7 15 9 12 13C9 9 5 7 5 7C5 7 3 11 5 15C7 19 12 22 12 22ZM12 22C12 22 15 16 15 11C15 6 12 2 12 2C12 2 9 6 9 11C9 16 12 22 12 22Z" /></svg>
};

const CustomSelect = ({ options, value, onChange, name, placeholder, searchable = false, icon: Icon, hasError = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!isOpen) {
      setSearchTerm('');
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 200 && rect.top > spaceBelow) {
          setOpenUpward(true);
        } else {
          setOpenUpward(false);
        }
      }
    }
    setIsOpen(!isOpen);
  };

  const selectedOption = options.find(opt => String(opt.value) === String(value) || opt.label === String(value) || (value && opt.value === String(parseInt(value, 10)))) || null;
  const filteredOptions = searchable ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase())) : options;

  return (
    <div className="relative w-full min-w-0" ref={dropdownRef}>
      <div
        className={`w-full h-8 px-1.5 sm:px-2.5 border rounded-lg font-sans text-[12px] sm:text-[13px] bg-white text-gray-800 cursor-pointer flex justify-between items-center transition-all select-none ${hasError
          ? 'border-red-400 bg-red-50/20 ring-1 ring-red-400'
          : 'border-gray-200 hover:border-gray-300 focus:border-[#C04921]'
          }`}
        onClick={toggleDropdown}
        tabIndex={0}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-hidden min-w-0 flex-1">
          {Icon && <Icon />}
          <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${!selectedOption && placeholder ? 'text-gray-400' : 'text-gray-800 font-medium'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <svg className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''} shrink-0 ml-0.5 sm:ml-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>

      {isOpen && (
        <div
          className={`absolute z-[999] w-full min-w-[70px] bg-white border border-gray-200 rounded-lg shadow-2xl max-h-[190px] overflow-y-auto ${openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
        >
          {searchable && (
            <div className="sticky top-0 bg-white p-1.5 border-b border-gray-100 z-20">
              <input
                type="text"
                className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-[#C04921]"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className="px-2.5 py-2 text-xs text-gray-400">No results found</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-2.5 py-1.5 sm:py-2 text-xs cursor-pointer hover:bg-orange-50/60 transition-colors ${String(value) === String(option.value) ? 'bg-orange-50 font-semibold text-[#C04921]' : 'text-gray-700'}`}
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const parseGeoResponse = async (response) => {
  const text = await response.text();
  const trimmed = text.trim();

  // 1. Try parsing JSON
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (_) { }
  }

  // 2. Try parsing XML with DOMParser
  if (typeof window !== 'undefined' && window.DOMParser) {
    try {
      const parser = new window.DOMParser();
      const xmlDoc = parser.parseFromString(trimmed, 'application/xml');
      const geoNodes = xmlDoc.getElementsByTagName('GeoDetails');
      if (geoNodes && geoNodes.length > 0) {
        const results = [];
        for (let i = 0; i < geoNodes.length; i++) {
          const node = geoNodes[i];
          const getVal = (tag) => {
            const el = node.getElementsByTagName(tag)?.[0];
            return el ? el.textContent.trim() : '';
          };
          results.push({
            City: getVal('City'),
            Country: getVal('Country'),
            CountryCode: getVal('CountryCode'),
            Latitude: getVal('Latitude'),
            Longitude: getVal('Longitude'),
            StateorProvince: getVal('StateorProvince'),
            TimeZone: getVal('TimeZone')
          });
        }
        return results;
      }
    } catch (e) {
      console.warn('DOMParser failed:', e);
    }
  }

  // 3. Fallback regex extraction for XML tags
  try {
    const geoRegex = /<GeoDetails[\s\S]*?>([\s\S]*?)<\/GeoDetails>/gi;
    const results = [];
    let match;
    while ((match = geoRegex.exec(trimmed)) !== null) {
      const block = match[1];
      const getTag = (t) => {
        const m = new RegExp(`<${t}[^>]*>([\\s\\S]*?)<\\/${t}>`, 'i').exec(block);
        return m ? m[1].trim() : '';
      };
      results.push({
        City: getTag('City'),
        Country: getTag('Country'),
        CountryCode: getTag('CountryCode'),
        Latitude: getTag('Latitude'),
        Longitude: getTag('Longitude'),
        StateorProvince: getTag('StateorProvince'),
        TimeZone: getTag('TimeZone')
      });
    }
    return results;
  } catch (err) {
    console.error('Failed to parse geo response:', err);
    return [];
  }
};

const CityAutocomplete = ({ value, country, onChange, name, placeholder, icon: Icon, onSelectCity, hasError = false, onBlurValidate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const isSelectingRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // If country changes, clear previously fetched city options and search cache
  useEffect(() => {
    setOptions([]);
    setIsOpen(false);
  }, [country]);

  const fetchCities = async (searchTerm) => {
    const trimmed = (searchTerm || '').trim();
    if (!trimmed || trimmed.length < 2 || !country) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    try {
      const locationBase = (import.meta.env.VITE_LOCATION_API_URL || "https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry").trim();
      const apiUrl = `${locationBase}/${encodeURIComponent(country.trim())}/${encodeURIComponent(trimmed)}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json, application/xml, text/xml, */*'
        }
      });
      const data = await parseGeoResponse(response);
      const rawList = Array.isArray(data) ? data : [];
      // Strictly filter to ensure only cities belonging to the selected country are displayed
      const filtered = rawList.filter(item => {
        if (!item || !item.City) return false;
        if (item.Country) {
          return item.Country.trim().toLowerCase() === country.trim().toLowerCase();
        }
        return true;
      });
      setOptions(filtered);
    } catch (error) {
      console.error("Error fetching cities from Location API:", error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    // Disallow starting with empty space
    if (newValue.startsWith(' ')) {
      newValue = newValue.trimStart();
    }
    // Prevent consecutive spaces
    newValue = newValue.replace(/\s{2,}/g, ' ');

    onChange({ target: { name, value: newValue } });
    
    // Only open and fetch if there are at least 2 non-whitespace characters
    const trimmed = newValue.trim();
    if (trimmed.length >= 2) {
      setIsOpen(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => fetchCities(trimmed), 250);
    } else {
      setIsOpen(false);
      setOptions([]);
    }
  };

  const handleBlur = () => {
    // If user is clicking an option from the dropdown, do not validate blur
    if (isSelectingRef.current) return;

    // Trim trailing whitespace on blur
    if (value && value !== value.trim()) {
      onChange({ target: { name, value: value.trim() } });
    }
    setTimeout(() => {
      if (!isSelectingRef.current && onBlurValidate) {
        onBlurValidate();
      }
    }, 150);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative w-full flex items-center">
        {Icon && <div className="absolute left-2.5"><Icon /></div>}
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          onFocus={() => { if (value && value.trim().length >= 2) setIsOpen(true); }}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full h-8 border rounded-lg font-sans text-[13px] bg-white text-gray-800 transition-all focus:outline-none placeholder-gray-400 ${Icon ? 'pl-8 pr-2.5' : 'px-2.5'
            } ${hasError
              ? 'border-red-400 bg-red-50/20 ring-1 ring-red-400'
              : 'border-gray-200 focus:border-[#C04921] focus:ring-1 focus:ring-[#C04921]/50'
            }`}
          autoComplete="off"
        />
      </div>
      {isOpen && (value && value.trim().length >= 2) && (
        <div className="absolute z-[999] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-[190px] overflow-y-auto">
          {isLoading ? (
            <div className="px-3 py-2 text-xs text-gray-500 bg-white">Searching cities...</div>
          ) : options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-500 bg-white">No matching cities found</div>
          ) : (
            options.map((option, index) => (
              <div
                key={`${option.City}-${index}`}
                className="px-3 py-2 cursor-pointer bg-white hover:bg-orange-50/70 transition-colors text-gray-800 border-b border-gray-100 last:border-b-0"
                onMouseDown={() => {
                  isSelectingRef.current = true;
                }}
                onClick={() => {
                  onChange({ target: { name, value: option.City } });
                  if (onSelectCity) onSelectCity(option);
                  setIsOpen(false);
                  setTimeout(() => {
                    isSelectingRef.current = false;
                  }, 200);
                }}
              >
                <div className="text-xs font-semibold text-gray-900">{option.City}</div>
                <div className="text-[11px] text-gray-500">{option.StateorProvince}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const LeadForm = ({ onReportReady }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', gender: 'female', email: '',
    day: '1', month: '1', year: '2000',
    hour: '12', minute: '0',
    country: 'India', city: ''
  });
  const [selectedCityData, setSelectedCityData] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today's date reference
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentDay = today.getDate();

  // Year Options: only past and current years (no future years)
  const yearOptions = useMemo(() => {
    return [...Array(120)].map((_, i) => {
      const year = String(currentYear - i);
      return { value: year, label: year };
    });
  }, [currentYear]);

  // Month Options: if selected year is current year, limit to months <= currentMonth
  const monthOptions = useMemo(() => {
    const isThisYear = parseInt(formData.year, 10) === currentYear;
    const maxMonth = isThisYear ? currentMonth : 12;
    return [...Array(maxMonth)].map((_, i) => ({
      value: String(i + 1),
      label: String(i + 1).padStart(2, '0')
    }));
  }, [formData.year, currentYear, currentMonth]);

  // Day Options: calculate days in month, and if current month & year, limit to today's date
  const dayOptions = useMemo(() => {
    const y = parseInt(formData.year, 10);
    const m = parseInt(formData.month, 10);
    let totalDays = 31;
    if (y && m) {
      totalDays = new Date(y, m, 0).getDate();
    }
    const isThisYearAndMonth = (y === currentYear) && (m === currentMonth);
    const maxDay = isThisYearAndMonth ? Math.min(totalDays, currentDay) : totalDays;

    return [...Array(maxDay)].map((_, i) => ({
      value: String(i + 1),
      label: String(i + 1).padStart(2, '0')
    }));
  }, [formData.year, formData.month, currentYear, currentMonth, currentDay]);

  // Adjust month and day if user changes year/month to a value where previous selection becomes invalid
  useEffect(() => {
    const y = parseInt(formData.year, 10);
    const m = parseInt(formData.month, 10);
    const d = parseInt(formData.day, 10);

    if (y === currentYear && m > currentMonth) {
      setFormData(prev => ({ ...prev, month: String(currentMonth), day: '1' }));
      return;
    }

    if (y && m) {
      const maxDaysInMonth = new Date(y, m, 0).getDate();
      const isThisYearAndMonth = (y === currentYear) && (m === currentMonth);
      const allowedMaxDay = isThisYearAndMonth ? Math.min(maxDaysInMonth, currentDay) : maxDaysInMonth;
      if (d > allowedMaxDay) {
        setFormData(prev => ({ ...prev, day: String(allowedMaxDay) }));
      }
    }
  }, [formData.year, formData.month, currentYear, currentMonth, currentDay]);

  const hourOptions = useMemo(() => [...Array(24)].map((_, i) => ({ value: String(i), label: String(i).padStart(2, '0') })), []);
  const minuteOptions = useMemo(() => [...Array(60)].map((_, i) => ({ value: String(i), label: String(i).padStart(2, '0') })), []);
  const countryOptions = useMemo(() => Array.from(new Set(countryData.Countries.map(c => c.CountryName1))).map(name => ({ value: name, label: name })), []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Name filtering: letters and spaces only, max 50 chars, no leading spaces
    if (name === 'fullName') {
      value = value.replace(/[^a-zA-Z\s]/g, ''); // letters and spaces only
      if (value.startsWith(' ')) value = value.trimStart();
      if (value.length > 50) value = value.slice(0, 50);
    }

    // If country changes, reset previously chosen city and city data
    if (name === 'country' && value !== formData.country) {
      setFormData(prev => ({ ...prev, [name]: value, city: '' }));
      setSelectedCityData(null);
      setFieldErrors(prev => {
        const copy = { ...prev };
        delete copy.country;
        delete copy.city;
        return copy;
      });
      return;
    }

    // Email filtering: disallow any spaces
    if (name === 'email') {
      value = value.replace(/\s+/g, '');
    }

    // City filtering: disallow starting spaces, collapse multi spaces
    if (name === 'city') {
      if (value.startsWith(' ')) value = value.trimStart();
      value = value.replace(/\s{2,}/g, ' ');
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time error clearance
    setFieldErrors(prev => {
      const copy = { ...prev };
      if (copy[name]) delete copy[name];
      if (['day', 'month', 'year'].includes(name) && copy.dob) delete copy.dob;
      if (['hour', 'minute'].includes(name) && copy.time) delete copy.time;
      if (name === 'city' && copy.city) delete copy.city;
      if (name === 'country' && copy.country) delete copy.country;
      return copy;
    });

    if (errorMessage) {
      setErrorMessage('');
    }

    if (name === 'city' && selectedCityData && selectedCityData.City?.trim().toLowerCase() !== value.trim().toLowerCase()) {
      setSelectedCityData(null);
    }
  };

  const validateForm = () => {
    const errors = {};

    // 1. Full Name Validation
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      errors.fullName = 'Please enter your full name.';
    } else if (nameTrimmed.length < 2) {
      errors.fullName = 'Name must be at least 2 characters long.';
    } else if (nameTrimmed.length > 50) {
      errors.fullName = 'Name cannot exceed 50 characters.';
    }

    // 2. Email Validation
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTrimmed) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(emailTrimmed)) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 3. Date of Birth Validation
    if (!formData.day || !formData.month || !formData.year) {
      errors.dob = 'Please select your complete date of birth (Day, Month, Year).';
    } else {
      const y = parseInt(formData.year, 10);
      const m = parseInt(formData.month, 10);
      const d = parseInt(formData.day, 10);
      const selectedDate = new Date(y, m - 1, d);
      const now = new Date();
      now.setHours(23, 59, 59, 999);

      if (selectedDate > now) {
        errors.dob = 'Date of birth cannot be in the future.';
      } else {
        const daysInSelectedMonth = new Date(y, m, 0).getDate();
        if (d > daysInSelectedMonth) {
          errors.dob = `The selected month only has ${daysInSelectedMonth} days.`;
        }
      }
    }

    // 4. Time of Birth Validation
    if (formData.hour === '' || formData.minute === '') {
      errors.time = 'Please select your birth hour and minute (use 12:00 if unknown).';
    }

    // 5. Country and City
    if (!formData.country) {
      errors.country = 'Please select your country of birth.';
    }
    if (!formData.city || !formData.city.trim()) {
      errors.city = 'Please enter and select your birth city from the dropdown.';
    } else if (
      !selectedCityData ||
      selectedCityData.City?.toLowerCase() !== formData.city.trim().toLowerCase() ||
      (selectedCityData.Country && formData.country && selectedCityData.Country.toLowerCase() !== formData.country.toLowerCase())
    ) {
      errors.city = `Please select a valid city in ${formData.country} from the dropdown.`;
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setErrorMessage(firstError);
      return;
    }

    setIsSubmitting(true);
    let reportData = null;

    try {
      const locationBase = (import.meta.env.VITE_LOCATION_API_URL || "https://webservice.astroved.com/Api/Panchang/PopulateCityBycountry").trim();

      // 1. Resolve location data strictly from selected Location API suggestion
      let geoCity = selectedCityData?.City || formData.city.trim();
      let geoState = selectedCityData?.StateorProvince || '';
      let geoCountry = selectedCityData?.Country || formData.country;
      let geoLatitude = selectedCityData?.Latitude ? parseFloat(selectedCityData.Latitude) : null;
      let geoLongitude = selectedCityData?.Longitude ? parseFloat(selectedCityData.Longitude) : null;

      // If user somehow has not selected from dropdown or coordinates are missing, verify with Location API
      if ((geoLatitude === null || geoLongitude === null || isNaN(geoLatitude) || isNaN(geoLongitude)) && geoCity) {
        try {
          const cityRes = await fetch(`${locationBase}/${encodeURIComponent(geoCountry)}/${encodeURIComponent(geoCity)}`, {
            headers: { 'Accept': 'application/json, application/xml, text/xml, */*' }
          });
          const cityList = await parseGeoResponse(cityRes);
          if (Array.isArray(cityList) && cityList.length > 0) {
            const matched = cityList.find(c => c.City?.toLowerCase() === geoCity.toLowerCase());
            if (matched) {
              geoCity = matched.City;
              geoState = matched.StateorProvince || geoState;
              geoCountry = matched.Country || geoCountry;
              geoLatitude = parseFloat(matched.Latitude);
              geoLongitude = parseFloat(matched.Longitude);
              setSelectedCityData(matched);
            }
          }
        } catch (err) {
          console.warn('Location API lookup error:', err);
        }
      }

      if (geoLatitude === null || isNaN(geoLatitude) || geoLongitude === null || isNaN(geoLongitude)) {
        setFieldErrors(prev => ({
          ...prev,
          city: `Please select a valid city in ${formData.country} from the dropdown list.`
        }));
        setErrorMessage(`Please select a valid city in ${formData.country} from the dropdown list.`);
        setIsSubmitting(false);
        return;
      }

      // 2. Format ISO 8601 date_of_birth (YYYY-MM-DDTHH:mm:ss)
      const year = parseInt(formData.year, 10);
      const month = parseInt(formData.month, 10);
      const day = parseInt(formData.day, 10);
      const hour = parseInt(formData.hour, 10) || 0;
      const minute = parseInt(formData.minute, 10) || 0;

      const dateOfBirth = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;

      // 3. Construct API payload conforming exactly to required schema
      const promoCode = searchParams.get("promo") || "empty";

      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        gender: (formData.gender || 'female').toLowerCase(),
        date_of_birth: dateOfBirth,
        city: geoCity,
        state: geoState,
        country: geoCountry,
        latitude: geoLatitude,
        longitude: geoLongitude,
        ayanamsa: 'LAHIRI',
        house_system: 'WHOLE_SIGN',
        promo: promoCode
      };

      console.log('Passing real-time data to backend API:', payload);

      const apiUrl = (import.meta.env.VITE_BACKEND_URL || '/past-life-report/report').trim();
      let response;

      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } catch (directErr) {
        console.warn('Direct connection failed, retrying via proxy endpoint /past-life-report/report:', directErr);
        response = await fetch('/past-life-report/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error('Backend returned non-200 response:', response.status, errText);

        // Friendly error messages instead of raw status codes
        if (response.status === 400 || response.status === 422) {
          throw new Error('Please review your birth details and try again.');
        } else if (response.status === 401 || response.status === 403) {
          throw new Error('Service authorization is currently updating. Please try again in a few moments.');
        } else if (response.status >= 500) {
          throw new Error('Our astrology calculation server is temporarily busy. Please try again shortly.');
        } else {
          throw new Error('Unable to generate your karma report at this moment. Please check your details and try again.');
        }
      }

      reportData = await response.json();
    } catch (err) {
      console.error('Error submitting lead form to backend:', err);
      setErrorMessage(err.message || 'Unable to connect to the Vedic report service. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
      if (reportData) {
        try {
          sessionStorage.setItem('past_life_report_data', JSON.stringify(reportData));
          localStorage.setItem('past_life_report_data', JSON.stringify(reportData));
        } catch {
          // Ignore storage errors
        }
        if (onReportReady) {
          onReportReady(reportData);
        } else {
          setShowReport(true);
        }
      }
    }
  };

  return (
    <>
      {isSubmitting && <LoadingOverlay />}
      <div className="w-full max-w-[440px] mx-auto px-1 sm:px-0">
        <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#C04921]/10 w-full relative flex flex-col">

          {/* Decorative Top Background */}
          <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-br from-[#FAF8F2] to-white pointer-events-none rounded-t-2xl"></div>
          {/* Faint Astrology Wheel SVG Watermark */}
          <div className="absolute -top-10 -right-10 w-52 h-52 opacity-[0.03] text-[#C04921] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" />
            </svg>
          </div>

          {/* Header Area */}
          <div className="relative z-10 px-4 sm:px-5 pt-4 pb-2.5">
            <div className="flex gap-2.5 sm:gap-3 items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C04921]/10 flex items-center justify-center text-[#C04921] shrink-0">
                <Icons.Lotus className="w-5 h-5" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-lg sm:text-[21px] font-serif font-bold leading-tight flex gap-1.5 flex-wrap">
                  <span className="text-[#1e293b]">See Your Past-Life Karma,</span>
                  <span className="text-[#C04921]">Free</span>
                </h2>
              </div>
            </div>
            <p className="text-[11.5px] sm:text-[12px] text-gray-500 mt-2 leading-relaxed w-full">
              Your birth details stay private. We use them only to read your Ketu, Rahu and 5th house karma.
            </p>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} noValidate className="relative z-10 p-3.5 sm:p-4.5 flex flex-col gap-3 sm:gap-3.5">

            {/* Section 1: Identity */}
            <div className="flex gap-2 sm:gap-2.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C04921] text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                1
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div>
                  <h3 className="text-[13px] font-bold text-[#1e293b]">Your Identity</h3>
                  <p className="text-[10.5px] text-gray-400 mt-0.5">Tell us who you are.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="relative w-full flex items-center">
                    <div className="absolute left-2.5"><Icons.User /></div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your Name (max 50 letters)"
                      maxLength={50}
                      className={`w-full h-8 pl-8 pr-2.5 border rounded-lg font-sans text-[13px] bg-white text-gray-800 focus:outline-none placeholder-gray-400 ${fieldErrors.fullName
                        ? 'border-red-400 bg-red-50/20 ring-1 ring-red-400'
                        : 'border-gray-200 focus:border-[#C04921] focus:ring-1 focus:ring-[#C04921]/50'
                        }`}
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <span className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.fullName}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="relative w-full flex items-center">
                    <div className="absolute left-2.5"><Icons.Mail /></div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      className={`w-full h-8 pl-8 pr-2.5 border rounded-lg font-sans text-[13px] bg-white text-gray-800 focus:outline-none placeholder-gray-400 ${fieldErrors.email
                        ? 'border-red-400 bg-red-50/20 ring-1 ring-red-400'
                        : 'border-gray-200 focus:border-[#C04921] focus:ring-1 focus:ring-[#C04921]/50'
                        }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <span className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11.5px] font-bold text-[#1e293b]">Gender</label>
                  <div className="flex rounded-full overflow-hidden h-8 bg-gray-50 p-0.5 border border-gray-100">
                    {['Female', 'Male', 'Other'].map((g) => {
                      const value = g.toLowerCase();
                      const isSelected = formData.gender === value;
                      const Icon = Icons[g];
                      return (
                        <button
                          type="button"
                          key={g}
                          onClick={() => handleChange({ target: { name: 'gender', value } })}
                          className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-[11.5px] sm:text-[12px] rounded-full transition-all duration-200 ${isSelected
                            ? 'bg-[#C04921] text-white font-semibold shadow-sm'
                            : 'bg-transparent text-gray-500 hover:text-gray-800 font-medium'
                            }`}
                        >
                          <Icon />
                          {g}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100/70 ml-7 sm:ml-8.5"></div>

            {/* Section 2: Birth Details */}
            <div className="flex gap-2 sm:gap-2.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C04921] text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                2
              </div>
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div>
                  <h3 className="text-[13px] font-bold text-[#1e293b]">When were you born?</h3>
                  <p className="text-[10.5px] text-gray-400 mt-0.5">Select your date and time of birth.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 relative z-50">
                    <CustomSelect
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      options={dayOptions}
                      placeholder="DD"
                      icon={Icons.Calendar}
                      hasError={!!fieldErrors.dob}
                    />
                    <CustomSelect
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      options={monthOptions}
                      placeholder="MM"
                      icon={Icons.Calendar}
                      hasError={!!fieldErrors.dob}
                    />
                    <CustomSelect
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      options={yearOptions}
                      placeholder="YYYY"
                      icon={Icons.Calendar}
                      hasError={!!fieldErrors.dob}
                    />
                  </div>
                  {fieldErrors.dob && (
                    <span className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.dob}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1 relative z-40">
                  <label className="text-[11.5px] font-bold text-[#1e293b]">Time (24-Hour)</label>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    <CustomSelect
                      name="hour"
                      value={formData.hour}
                      onChange={handleChange}
                      options={hourOptions}
                      placeholder="HH"
                      icon={Icons.Clock}
                      hasError={!!fieldErrors.time}
                    />
                    <CustomSelect
                      name="minute"
                      value={formData.minute}
                      onChange={handleChange}
                      options={minuteOptions}
                      placeholder="MM"
                      icon={Icons.Clock}
                      hasError={!!fieldErrors.time}
                    />
                  </div>
                  {fieldErrors.time && (
                    <span className="text-[11px] text-red-500 font-medium pl-1">{fieldErrors.time}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100/70 ml-7 sm:ml-8.5"></div>

            {/* Section 3: Location */}
            <div className="flex gap-2 sm:gap-2.5 relative z-30">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C04921] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                3
              </div>
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div>
                  <h3 className="text-[13px] font-bold text-[#1e293b]">Where were you born?</h3>
                  <p className="text-[10.5px] text-gray-400 mt-0.5">Enter your birth place details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <CustomSelect
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={countryOptions}
                    searchable={true}
                    placeholder="India"
                    icon={Icons.Globe}
                    hasError={!!fieldErrors.country}
                  />
                  <CityAutocomplete
                    name="city"
                    value={formData.city}
                    country={formData.country}
                    onChange={handleChange}
                    onSelectCity={(cityObj) => {
                      setSelectedCityData(cityObj);
                      setFieldErrors(prev => {
                        const copy = { ...prev };
                        delete copy.city;
                        return copy;
                      });
                    }}
                    onBlurValidate={() => {
                      if (!formData.city.trim()) {
                        setFieldErrors(prev => ({ ...prev, city: 'Please enter and select your birth city from the dropdown.' }));
                      } else if (
                        !selectedCityData ||
                        selectedCityData.City?.toLowerCase() !== formData.city.trim().toLowerCase() ||
                        (selectedCityData.Country && formData.country && selectedCityData.Country.toLowerCase() !== formData.country.toLowerCase())
                      ) {
                        setFieldErrors(prev => ({ ...prev, city: `Please select a valid city in ${formData.country} from the dropdown.` }));
                      }
                    }}
                    placeholder="Birth City/District"
                    icon={Icons.MapPin}
                    hasError={!!fieldErrors.city}
                  />
                </div>
                {(fieldErrors.country || fieldErrors.city) && (
                  <span className="text-[11px] text-red-500 font-medium pl-1">
                    {fieldErrors.country || fieldErrors.city}
                  </span>
                )}
              </div>
            </div>

            {/* General Error Message if any */}
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 animate-shake">
                <svg className="w-4 h-4 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-1 flex flex-col">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[40px] bg-gradient-to-r from-[#C04921] to-[#e87a55] hover:from-[#a83d1a] hover:to-[#d6653f] text-white border-none rounded-xl text-[13.5px] font-bold cursor-pointer transition-all shadow-[0_6px_18px_rgba(192,73,33,0.25)] flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Icons.Calculator />
                {isSubmitting ? 'Calculating Past-Life Karma...' : 'Calculate My Past-Life Karma'}
                <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default LeadForm;
