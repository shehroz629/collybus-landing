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

    // Simulate successful submission
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
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-8 md:py-12 bg-transparent text-white">
      <div className="container mx-auto px-6 flex flex-col items-center animate-fadeIn [&::-webkit-scrollbar]:hidden">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-6 bg-black/30 p-6 rounded-lg"
        >
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-normal text-gray-300 mb-1"
              >
                First Name
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
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-normal text-gray-300 mb-1"
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
            </div>
          </div>

          {/* Email */}
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

          {/* Phone */}
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

          {/* Company */}
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

          {/* Country & Enquiry */}
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
                <option value="">Please select...</option>
                {countryOptions.map((country) => (
                  <option key={country.value} value={country.label}>
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
                <option value="">Please select...</option>
                <option value="demo">Book a Demo</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                className="h-4 w-4 text-[#f2c016] border-gray-500 rounded focus:ring-[#f2c016] bg-black/20 backdrop-blur-sm"
                checked={formData.termsAccepted}
                onChange={handleChange}
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
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#f2c016] hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#f2c016] hover:bg-[#d9ad14] text-black font-semibold py-4 rounded-sm text-md
              transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 
              shadow-lg hover:shadow-xl backdrop-blur-sm relative overflow-hidden group"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-400">Thank you! We’ll be in touch.</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
