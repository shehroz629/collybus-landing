"use client";

import React, { useState, useEffect } from "react";
import { getData } from "country-list";
import Link from "next/link";

interface CountryOption {
  value: string;
  label: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    country: "",
    enquiryType: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

  useEffect(() => {
    const countries = getData().map((country) => ({
      value: country.code,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    if (!formData.termsAccepted || !formData.privacyAccepted) {
      setErrorMessage(
        "Please accept the Terms and Conditions and Privacy Policy."
      );
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://app.collybus.co/v1/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          company: "",
          country: "",
          enquiryType: "",
          termsAccepted: false,
          privacyAccepted: false,
        });
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || "Submission failed. Please try again.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-8 md:py-12 bg-transparent text-white">
      <div className="container mx-auto px-6 flex flex-col items-center animate-fadeIn [&::-webkit-scrollbar]:hidden">
        <div className="mb-6 animate-fadeInDown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-light text-white mb-8 animate-fadeInDown" style={{ fontFamily: 'Montserrat, sans-serif' }}>Get in Touch</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 animate-fadeInUp">
          {submitStatus === "success" && (
            <p className="text-green-400 bg-green-900/50 backdrop-blur-sm p-3 rounded-md text-center animate-fadeIn">
              Form submitted successfully! We will be in touch soon.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 bg-red-900/50 backdrop-blur-sm p-3 rounded-md text-center animate-fadeIn">
              {errorMessage || "An error occurred. Please try again."}
            </p>
          )}

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-normal text-gray-300 mb-1 transition-all duration-300"
              >
                Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm 
                  focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                  backdrop-blur-sm placeholder-gray-500 hover:border-gray-500"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-400 mt-1 font-normal">First</p>
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-normal text-gray-300 mb-1 md:invisible"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm 
                  focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                  backdrop-blur-sm placeholder-gray-500 hover:border-gray-500"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-400 mt-1 font-normal">Last</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-normal text-gray-300 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm 
                focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                backdrop-blur-sm placeholder-gray-500 hover:border-gray-500"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-normal text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm 
                focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                backdrop-blur-sm placeholder-gray-500 hover:border-gray-500"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-normal text-gray-300 mb-1"
            >
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm 
                focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                backdrop-blur-sm placeholder-gray-500 hover:border-gray-500"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="country"
                className="block text-sm font-normal text-gray-300 mb-1"
              >
                Country *
              </label>
              <select
                id="country"
                name="country"
                className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm appearance-none
                  focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                  backdrop-blur-sm hover:border-gray-500"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="" style={{ backgroundColor: '#18181b', color: '#fff' }}>Please select...</option>
                {countryOptions.map((country) => (
                  <option key={country.value} value={country.value} style={{ backgroundColor: '#18181b', color: '#fff' }}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="enquiryType"
                className="block text-sm font-normal text-gray-300 mb-1"
              >
                Enquiry Type *
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm appearance-none
                  focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                  backdrop-blur-sm hover:border-gray-500"
                value={formData.enquiryType}
                onChange={handleChange}
                required
              >
                <option value="" style={{ backgroundColor: '#18181b', color: '#fff' }}>Please select...</option>
                <option value="demo" style={{ backgroundColor: '#18181b', color: '#fff' }}>Book a Demo</option>
                <option value="general" style={{ backgroundColor: '#18181b', color: '#fff' }}>General Enquiry</option>
                <option value="support" style={{ backgroundColor: '#18181b', color: '#fff' }}>Support</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                className="h-4 w-4 text-[#f2c016] border-gray-500 rounded focus:ring-[#f2c016] bg-black/20 backdrop-blur-sm"
                checked={formData.termsAccepted && formData.privacyAccepted}
                onChange={(e) => {
                  // Update both checkboxes at once
                  setFormData(prev => ({
                    ...prev,
                    termsAccepted: e.target.checked,
                    privacyAccepted: e.target.checked
                  }));
                }}
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-300 font-normal"
              >
                I agree to the{" "}
                <Link
                  href="/terms-conditions"
                  className="text-[#f2c016] hover:underline"
                  target="_blank"
                >
                  Terms and Conditions
                </Link>
                {" "}and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#f2c016] hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <p className="text-xs text-gray-400 font-normal">
              Please agree to the Terms & Conditions and Privacy Policy to proceed.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f2c016] hover:bg-[#d9ad14] text-black font-semibold py-4 rounded-sm text-md
              transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 
              shadow-lg hover:shadow-xl backdrop-blur-sm relative overflow-hidden group"
            disabled={isSubmitting}
          >
            <div className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </div>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
