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
    <section id="contact" className="py-16 md:py-24 bg-black text-white">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="mb-6">
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
        <h2 className="text-5xl font-light text-white mb-12">Contact</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-8">
          {submitStatus === "success" && (
            <p className="text-green-400 bg-green-900 p-3 rounded-md text-center">
              Form submitted successfully! We will be in touch soon.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 bg-red-900 p-3 rounded-md text-center">
              {errorMessage || "An error occurred. Please try again."}
            </p>
          )}

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-normal text-gray-300 mb-1"
              >
                Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-3 bg-white text-black border border-gray-600 rounded-sm focus:ring-yellow-400 focus:border-yellow-400"
                placeholder=""
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
                className="w-full p-3 bg-white text-black border border-gray-600 rounded-sm focus:ring-yellow-400 focus:border-yellow-400"
                placeholder=""
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
              className="w-full p-3 bg-white text-black border border-gray-600 rounded-sm focus:ring-yellow-400 focus:border-yellow-400"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              required
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
              className="w-full p-3 bg-white text-black border border-gray-600 rounded-sm focus:ring-yellow-400 focus:border-yellow-400"
              placeholder=""
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
                className="w-full p-3 bg-white text-black border border-gray-600 rounded-sm appearance-none focus:ring-yellow-400 focus:border-yellow-400"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Please select...</option>
                {countryOptions.map((country) => (
                  <option key={country.value} value={country.value}>
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
                className="w-full p-3 bg-white text-black border border-gray-600 rounded-sm appearance-none focus:ring-yellow-400 focus:border-yellow-400"
                value={formData.enquiryType}
                onChange={handleChange}
                required
              >
                <option value="">Please select...</option>
                <option value="demo">Book a Demo</option>
                <option value="general">General Enquiry</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                className="h-4 w-4 text-yellow-400 border-gray-500 rounded focus:ring-yellow-300 bg-gray-700"
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
                  className="text-yellow-400 hover:underline"
                  target="_blank"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="privacy"
                name="privacyAccepted"
                type="checkbox"
                className="h-4 w-4 text-yellow-400 border-gray-500 rounded focus:ring-yellow-300 bg-gray-700"
                checked={formData.privacyAccepted}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="privacy"
                className="ml-2 block text-sm text-gray-300 font-normal"
              >
                I agree to the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-yellow-400 hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <p className="text-xs text-gray-400 font-normal">
              Please agree to the Terms & Conditions and Privacy Policy to
              proceed.
            </p>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-normal py-3 px-8 rounded-sm text-md transition duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
