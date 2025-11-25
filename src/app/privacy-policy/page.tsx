import React from "react";
import { Metadata } from "next";

// Page-specific metadata
export const metadata: Metadata = {
  title: "Privacy Policy - Collybus",
  // Add a description meta tag if desired, e.g.:
  // description: 'Learn how Collybus handles your personal data and our commitment to privacy.',
};

const PrivacyPolicyPage = () => {
  return (
    // The main wrapper for this page's content, distinct from the global layout
    <div className="bg-black text-gray-200 pt-20 md:pt-24 pb-8 md:pb-12">
      {/* Added more top padding to account for fixed header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gold Banner for Page Title */}
        <div className="bg-yellow-400 p-8 md:p-12 text-start mb-8 md:mb-12 rounded-2xl mt-8 md:mt-12">
          <h1 className="text-black text-[35px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-semibold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.1' }}>
            Privacy Policy
          </h1>
        </div>

        {/* Prose content for the policy details */}
        <div className="prose prose-invert max-w-none text-white/80 prose-p:leading-relaxed prose-p:my-4 prose-headings:font-semibold prose-headings:text-white prose-strong:font-semibold prose-strong:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <style dangerouslySetInnerHTML={{__html: `
            .prose p {
              font-size: 1rem;
              line-height: 1.6;
            }
            @media (min-width: 640px) {
              .prose p {
                font-size: 1.125rem;
              }
            }
            @media (min-width: 768px) {
              .prose p {
                font-size: 1.25rem;
              }
            }
            .prose h2 {
              font-size: 1.25rem;
              font-weight: 600;
              color: white;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            @media (min-width: 640px) {
              .prose h2 {
                font-size: 1.5rem;
              }
            }
            @media (min-width: 768px) {
              .prose h2 {
                font-size: 1.75rem;
              }
            }
          `}} />
          <h2>INTRODUCTION</h2>
          <p>
            This Privacy Policy (the "Policy") explains how{" "}
            <strong>Collybus Pte Ltd</strong> ("Collybus" "we" "us" "our"), a
            company incorporated in Singapore with Company No 202420599E,
            collects, processes, and protects your personal data when you use
            our platform and services.
          </p>
          <p>
            Collybus is committed to handling your personal data lawfully,
            fairly, and in a transparent manner, in compliance with the{" "}
            <strong>Personal Data Protection Act 2012 (PDPA)</strong> of
            Singapore, the{" "}
            <strong>General Data Protection Regulation (GDPR)</strong> for
            individuals in the European Union, and applicable Australian privacy
            regulations.
          </p>

          <h2>Data Controller</h2>
          <p>
            Collybus Pte Ltd is the data controller responsible for your
            personal data. If you have any questions about this Policy or wish
            to exercise your rights, please contact us:
          </p>
          <p>
            <strong>Collybus Pte Ltd</strong>
            <br />
            49 Duxton Road #02-01
            <br />
            Singapore 089513
            <br />
            Email: support@collybus.co
          </p>
          <p>
            It is important that the personal data we hold about you is accurate
            and current. Please keep us informed if your personal information
            changes at any time by emailing us.
          </p>
          <p>
            We may update this Policy periodically. Any changes will be posted
            on our website or communicated via email.
          </p>

          <h2>Personal Data We Collect</h2>
          <p>
            We collect and process personal data that you provide directly to us
            or that we obtain through our interactions with you in the course of
            our business. "Personal Data" means any information that can
            identify an individual. This may include:
          </p>
          <ul>
            <li>Name, title, and occupation;</li>
            <li>Contact information (e.g., email address, phone number);</li>
            <li>Postal address and other contact details;</li>
            <li>
              Information and documentation provided to us for due diligence,
              Know-Your-Customer ("KYC"), or Anti-Money Laundering (AML) checks;
            </li>
            <li>
              Any additional data provided during account registration,
              correspondence, or when using our platform or services.
            </li>
          </ul>
          <p>
            We only collect personal data necessary for the purposes outlined in
            this Policy.
          </p>

          <h2>Purpose and Legal Basis for Processing</h2>
          <p>We process your personal data for the following purposes:</p>
          <ul>
            <li>
              <strong>Service Delivery & Communication</strong>: To communicate
              with you about the services we offer, respond to your inquiries,
              and provide relevant updates about our platform and activities.
            </li>
            <li>
              <strong>Compliance & Regulatory Obligations</strong>: To conduct
              KYC, AML checks, and meet our legal, regulatory, and compliance
              obligations under applicable laws in Singapore, Australia, the EU,
              and other jurisdictions.
            </li>
            <li>
              <strong>Business Operations & Record-Keeping</strong>: To maintain
              proper records, including administrative and operational records,
              consistent with legal requirements and best practices.
            </li>
            <li>
              <strong>Marketing & Updates (Where Applicable)</strong>: To send
              you communications that may interest you, subject to obtaining
              your consent where required by law, and always providing an
              opt-out option.
            </li>
          </ul>
          <p>
            We rely on one or more of the following legal bases under GDPR and
            corresponding principles under PDPA and Australian privacy
            regulations:
          </p>
          <ul>
            <li>
              <strong>Consent</strong>: Where you have given clear consent for
              us to process your personal data for a specific purpose.
            </li>
            <li>
              <strong>Performance of a Contract</strong>: Where processing is
              necessary to perform a contract with you or to take steps at your
              request before entering into a contract.
            </li>
            <li>
              <strong>Legal Obligation</strong>: Where processing is necessary
              for us to comply with legal or regulatory obligations.
            </li>
            <li>
              <strong>Legitimate Interests</strong>: Where processing is
              necessary for our legitimate interests (or those of a third
              party), provided that your fundamental rights and interests do not
              override those interests.
            </li>
          </ul>
          <p>
            If we need to process your personal data for a purpose unrelated to
            the original reason for collection, we will inform you and explain
            the legal basis that allows us to do so.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            We operate primarily from Singapore, but our services and related
            data processing activities may require transferring your personal
            data outside your country of residence, including to jurisdictions
            that may have different data protection standards.
          </p>
          <p>
            For EU residents, we will ensure such transfers comply with GDPR,
            employing appropriate safeguards such as EU-approved certifications,
            standard contractual clauses, or transferring data to entities
            participating in recognized frameworks offering adequate protection.
          </p>

          <h2>Data Protection in Singapore (PDPA)</h2>
          <p>
            Under the PDPA, we have appointed a Data Protection Officer (DPO)
            responsible for ensuring compliance with Singapore's data protection
            requirements. If you have any queries or concerns related to our
            data practices under PDPA, please contact us at the email provided
            above.
          </p>

          <h2>Marketing Communications</h2>
          <p>
            We may send marketing communications if you have requested such
            updates or if we have a legitimate interest in informing you of our
            services and believe it would be of interest to you. If required by
            local law, we will seek your explicit consent before sending
            marketing materials. You have the right to opt out of receiving
            marketing communications at any time by following the unsubscribe
            instructions in our emails or contacting us directly.
          </p>
          <p>
            We do not sell or share your personal data with third parties for
            their own marketing purposes.
          </p>

          <h2>Who We Share Information With</h2>
          <p>
            We may share your personal data with trusted third parties, where
            necessary, including:
          </p>
          <ul>
            <li>
              <strong>Service Providers</strong>: IT support, system
              administration, cloud hosting, or data storage services;
            </li>
            <li>
              <strong>Professional Advisers</strong>: Lawyers, auditors,
              custodians, prime brokers, and insurers supporting our business
              operations;
            </li>
            <li>
              <strong>Regulatory Authorities</strong>: Regulators, government
              bodies, and tax authorities, as required by law.
            </li>
          </ul>
          <p>
            We require all third parties to respect the security and
            confidentiality of your personal data and only process it according
            to our instructions and applicable law.
          </p>

          <h2>Security Measures</h2>
          <p>
            We take reasonable technical and organizational measures to protect
            your personal data from loss, misuse, unauthorized access,
            disclosure, alteration, or destruction. Access to personal data is
            restricted to employees and partners with a business need to know.
            We have procedures to deal with suspected personal data breaches and
            will notify you and any relevant regulator where legally required.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill
            the purposes for which it was collected, including to satisfy legal,
            accounting, or regulatory requirements. Generally, we keep client
            records for up to five (5) years after the end of the client
            relationship, or longer if required by law or regulation.
          </p>

          <h2>Your Rights</h2>
          <p>
            If you are located in the EU, you have rights under GDPR, including
            the right to request access, rectification, erasure, restriction, or
            portability of your personal data. You may also have the right to
            object to certain processing or withdraw consent where processing is
            based on consent. To exercise your rights, please contact us at the
            email address provided above. We may request additional information
            to confirm your identity before fulfilling your request.
          </p>
          <p>
            If you believe we have not addressed your data protection concerns,
            you have the right to lodge a complaint with a relevant data
            protection authority in your jurisdiction.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies to enhance user experience and analyze site
            usage (e.g., through Google Analytics). Cookies are small pieces of
            data stored on your device. You can adjust your browser settings to
            refuse cookies; however, some site features may not function
            properly without them. By using our website, you consent to our use
            of cookies. For more information, including how Google may use your
            data, consult Google's Privacy Policy. You can opt out of Google
            Analytics by using a browser add-on available from Google.
          </p>

          <h2>Contact Us</h2>
          <p>
            For any questions, requests, or concerns about this Privacy Policy
            or our handling of your personal data, please contact:
          </p>
          <p>
            <strong>Collybus Pte Ltd</strong>
            <br />
            49 Duxton Road #02-01
            <br />
            Singapore 089513
            <br />
            Email: support@collybus.co
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
