"use client";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

import React, { useState, useEffect } from "react";
import { getData } from "country-list";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Mail, X } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

interface CountryOption {
  value: string;
  label: string;
}

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormPopup: React.FC<ContactFormPopupProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    emailjs.init("RgVnlXZxiSWHyxK9V");
  }, []);

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

  // Add state for reCAPTCHA token
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

  useEffect(() => {
    const countries = getData().map((country) => ({
      value: country.code,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  // Close popup on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^\d{7,15}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validation
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      setErrorMessage("Please accept the Terms and Conditions and Privacy Policy.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(formData.phoneNumber)) {
      setErrorMessage(
        "Please enter a valid phone number (digits only, 7-15 characters)."
      );
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Check reCAPTCHA token
    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        user_name: `${formData.firstName} ${formData.lastName}`,
        user_email: formData.email,
        user_first_name: formData.firstName,
        user_last_name: formData.lastName,
        user_phone: formData.phoneNumber,
        user_company: formData.company,
        user_country: formData.country,
        user_enquiry: formData.enquiryType,
        message: `
          Full Name: ${formData.firstName} ${formData.lastName}
          Email: ${formData.email}
          Phone: ${formData.phoneNumber}
          Company: ${formData.company}
          Country: ${formData.country}
          Enquiry Type: ${formData.enquiryType}
        `,
        to_name: "Collybus Team",
        recaptcha_token: recaptchaToken,
      };

      const response = await emailjs.send(
        "service_xacc01r",
        "template_cymjgsx",
        templateParams,
        "RgVnlXZxiSWHyxK9V"
      );

      if (response.status === 200) {
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
        setRecaptchaToken("");
        // Close popup after 2 seconds on success
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        throw new Error(`Email send failed with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Detailed error:", error);
      setErrorMessage(
        error?.text || error?.message || "Failed to send message. Please try again later."
      );
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  const handleRecaptcha = (token: string | null) => {
    if (!token) {
      setErrorMessage("reCAPTCHA verification failed, please try again.");
      setSubmitStatus("error");
      setIsSubmitting(false);
      setRecaptchaToken("");
      return;
    }
    setRecaptchaToken(token);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-gray-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Form content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center gap-3 mb-6">
            <Mail size={28} className="text-[#f2c016]" />
            <h2 className="text-2xl font-semibold text-white">Get In Touch</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Name fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-normal text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="new-password"
                  data-form-type="other"
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
                <label htmlFor="lastName" className="block text-sm font-normal text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="new-password"
                  data-form-type="other"
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
              <label htmlFor="email" className="block text-sm font-normal text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="new-password"
                data-form-type="other"
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
              <label htmlFor="phoneNumber" className="block text-sm font-normal text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="new-password"
                data-form-type="other"
                className="w-full p-3 bg-black/20 text-white border border-gray-700 rounded-sm 
                  focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                  backdrop-blur-sm placeholder-gray-500 hover:border-gray-500"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (!/[0-9+\-\(\)\s]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                pattern="[0-9+\-\(\)\s]+"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-normal text-gray-300 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                autoComplete="new-password"
                data-form-type="other"
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
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="country" className="block text-sm font-normal text-gray-300 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="w-full p-3 bg-black/80 text-white border border-gray-700 rounded-sm appearance-none
                    focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                    backdrop-blur-sm hover:border-gray-500 [&>option]:bg-black/90"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
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
                <label htmlFor="enquiryType" className="block text-sm font-normal text-gray-300 mb-1">
                  Enquiry Type *
                </label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  className="w-full p-3 bg-black/80 text-white border border-gray-700 rounded-sm appearance-none
                    focus:ring-[#f2c016] focus:border-[#f2c016] transition-all duration-300 ease-in-out
                    backdrop-blur-sm hover:border-gray-500 [&>option]:bg-black/90"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
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

            {/* Terms and Privacy */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="termsAccepted"
                  type="checkbox"
                  className="h-4 w-4 text-[#f2c016] border-gray-500 rounded focus:ring-[#f2c016] bg-black/20 backdrop-blur-sm"
                  checked={formData.termsAccepted}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prev) => ({ ...prev, privacyAccepted: e.target.checked }));
                  }}
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300 font-normal">
                  I agree to the{" "}
                  <Link href="/terms-conditions" className="text-[#f2c016] hover:underline" target="_blank">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-[#f2c016] hover:underline" target="_blank">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* reCAPTCHA */}
            <ReCAPTCHA
              sitekey="6LdtCOsrAAAAAFp2TgRZubl4c1mmXgNUWrtsNAHj"
              onChange={handleRecaptcha}
              theme="light"
            />

            {/* Submit */}
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
              <p className="text-green-400 text-center">Thank you! We'll be in touch.</p>
            )}
            {submitStatus === "error" && <p className="text-red-400 text-center">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPopup;
