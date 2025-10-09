import emailjs from '@emailjs/browser';

// EmailJS configuration - replace these with your actual EmailJS IDs
const EMAILJS_PUBLIC_KEY = 'WELDXLc19pgfuT31U';
const EMAILJS_SERVICE_ID = 'service_w9jfa6g';
const EMAILJS_TEMPLATE_ID = 'template_11iws3s';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  country: string;
  enquiryType: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export const sendContactFormEmail = async (formData: ContactFormData) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing');
  }

  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    phone: formData.phoneNumber,
    company: formData.company,
    country: formData.country,
    enquiry_type: formData.enquiryType,
    message: `New contact form submission from Collybus landing page.`,
    to_email: 'fj@collybus.co',
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
};
