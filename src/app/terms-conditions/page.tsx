import React from "react";
import { Metadata } from "next";

// Page-specific metadata
export const metadata: Metadata = {
  title: "Terms & Conditions - Collybus",
  // Add a description meta tag if desired, e.g.:
  // description: 'Read the Terms and Conditions for using the Collybus website and services.',
};

const TermsConditionsPage = () => {
  return (
    <div className="bg-black text-gray-200 py-8 md:py-12">
      <div className="container mx-auto px-6">
        {/* Gold Banner for Page Title */}
        <div className="bg-yellow-400 p-8 md:p-12 text-start mb-8 md:mb-12">
          <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-normal" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Terms & Conditions
          </h1>
        </div>

        <div className="prose prose-invert max-w-none text-gray-200 font-thin prose-p:leading-relaxed prose-p:my-4 prose-headings:font-semibold prose-strong:font-semibold">
          <p>
            <strong>TERMS AND CONDITIONS</strong>
          </p>
          <p>
            Welcome to the website of&nbsp;<strong>Collybus Pte Ltd</strong>
            &nbsp;(“We”, “Us”, or “Our”), a company incorporated in Singapore
            with Company No 202420599E. These Terms and Conditions (“Terms”)
            govern your access to and use of our services, and website located
            at&nbsp;<a href="http://www.collybus.co/">www.collybus.co</a>
            &nbsp;(the “Website”).
          </p>
          <p>
            Website is strictly designed for&nbsp;
            <strong>Institutional Investors</strong>&nbsp;and&nbsp;
            <strong>Accredited Investors</strong>, as defined under Singapore
            law. By accessing or using the Website, you confirm your eligibility
            and acceptance of these Terms.
          </p>
          <p>
            If you do not meet the eligibility criteria or agree to these Terms,
            you must refrain from using the Website.
          </p>
          <ol className="wp-block-list">
            <li>
              <strong>ELIGIBILITY</strong>
            </li>
          </ol>
          <p>
            The Website is&nbsp;<strong>not for retail investors</strong>.
            Access is limited to:
          </p>
          <ul className="wp-block-list">
            <li>
              <strong>Accredited Investors</strong>, meeting the financial
              thresholds set in Section 4A of the{" "}
              <strong>Securities and Futures Act (SFA), Singapore</strong>; and
            </li>
            <li>
              <strong>Institutional Investors</strong>, including licensed
              financial institutions, corporate entities, or other qualifying
              organizations as set in Section 4A of the the{" "}
              <strong>Securities and Futures Act (SFA), Singapore.</strong>
            </li>
          </ul>
          <p>To access and use the Website:</p>
          <ol className="wp-block-list">
            <li>
              You must provide any documentation reasonably requested by us to
              verify your identity and confirm your eligibility as an Accredited
              Investor or Institutional Investor.
            </li>
            <li>
              We reserve the right, at our sole and reasonable discretion, to
              accept or decline your application for registration and use of the
              Website.
            </li>
            <li>
              In the event your application is rejected, we will inform you of
              the reasons, where required under applicable laws.
            </li>
          </ol>
          <ol start={2} className="wp-block-list">
            <li>
              <strong>NO FINANCIAL ADVICE OR OFFER</strong>
            </li>
          </ol>
          <p>
            None of the information provided on this Website constitutes
            investment advice, a recommendation, or an offer or solicitation to
            buy, sell, or otherwise transact in any security, derivative, or
            other financial instrument. The information presented should not be
            relied upon as the basis for entering into any contract, making any
            investment decision, or undertaking any transaction.&nbsp;
          </p>
          <p>
            Any decision to invest, trade, or engage in any financial activity
            remains solely at your discretion and risk.
          </p>
          <ol start={3} className="wp-block-list">
            <li>
              <strong>NO RELIANCE OR INFORMATION</strong>
            </li>
          </ol>
          <p>
            All information on the Website is provided&nbsp;
            <strong>for informational purposes only</strong>. While we strive
            for accuracy and reliability, we:
          </p>
          <ul className="wp-block-list">
            <li>
              Do not guarantee completeness, timeliness, or accuracy of the
              information;
            </li>
            <li>
              Disclaim all liability arising from any reliance on such
              materials.
            </li>
          </ul>
          <p>
            You should independently verify all information and seek
            professional advice where necessary.
          </p>
          <ol start={4} className="wp-block-list">
            <li>
              <strong>WEBSITE USE AND USER OBLIGATION</strong>
            </li>
          </ol>
          <p>You agree:</p>
          <ul className="wp-block-list">
            <li>To use the Website only for lawful and authorized purposes;</li>
            <li>
              Not to introduce malware, viruses, or engage in any activity that
              could disrupt the Website's functionality;
            </li>
            <li>
              To ensure compliance with all applicable laws, including
              securities regulations.
            </li>
          </ul>
          <p>
            We reserve the right to suspend or restrict access for violations of
            these Terms.
          </p>
          <ol start={5} className="wp-block-list">
            <li>
              <strong>MALWARE</strong>
            </li>
          </ol>
          <p>
            While we implement industry-standard security protocols, we cannot
            guarantee the Website is free from viruses, malware, or harmful
            code. You are responsible for implementing your own security
            measures, including:
          </p>
          <ul className="wp-block-list">
            <li>Use of updated antivirus software;</li>
            <li>Avoiding unauthorized introduction of harmful material.</li>
          </ul>
          <p>
            Any attempt to disrupt or compromise our Website's security will
            result in legal action.
          </p>
          <ol start={6} className="wp-block-list">
            <li>
              <strong>THIRD PARTY RESOURCES AND DEVICES</strong>
            </li>
          </ol>
          <p>
            The Website may include links to third-party websites, resources, or
            require interaction with specific devices and technology.
          </p>
          <ol className="wp-block-list">
            <li>
              <strong>Devices and Technology</strong>
            </li>
          </ol>
          <ul className="wp-block-list">
            <li>
              You are solely responsible for the device, software, and
              technology you use to access or interact with the Website,
              including support, maintenance, and security.
            </li>
            <li>
              We do not warrant that the Website will be compatible with your
              device, browser, software, or other technology.
            </li>
          </ul>
          <ol start={2} className="wp-block-list">
            <li>
              <strong>Third-Party Resources</strong>
            </li>
          </ol>
          <ul className="wp-block-list">
            <li>
              Links to third-party websites or resources are provided for your
              convenience only.
            </li>
            <li>
              We do not endorse, control, or accept responsibility for the
              content, accuracy, or security of any third-party resources.
            </li>
            <li>
              Access to and use of third-party content is at your sole
              discretion and risk
            </li>
          </ul>
          <ol start={3} className="wp-block-list">
            <li>
              <strong>Liability for Technology and Systems</strong>
            </li>
          </ol>
          <p>We are not liable from any claims arising from:</p>
          <ul className="wp-block-list">
            <li>
              Any software, technology, equipment, data, materials, currency, or
              other information provided by or relied upon by you, the User, or
              an Authorised User;
            </li>
            <li>
              Delays, disruptions, malfunctions, errors, or failures of any
              communications network, data processing system, computer system,
              or technology that we or you use to access the Website; or
            </li>
            <li>
              The Website failing to meet your requirements or being
              interrupted, untimely, incomplete, inaccurate, insecure, or free
              from defects or errors.
            </li>
          </ul>
          <ol start={4} className="wp-block-list">
            <li>
              <strong>Viruses and Security</strong>
            </li>
          </ol>
          <ul className="wp-block-list">
            <li>
              While we make reasonable efforts to exclude viruses or other
              destructive features, we cannot guarantee such exclusion.
            </li>
            <li>
              We are not responsible for any loss, damage, or data corruption
              arising from viruses or harmful features. You are advised to take
              appropriate measures, such as installing anti-virus software, to
              protect your devices and systems.
            </li>
          </ul>
          <ol start={7} className="wp-block-list">
            <li>
              <strong>JURISDICTIONAL COMPLIANCE</strong>
            </li>
          </ol>
          <p>
            Our services are designed for jurisdictions where we intend to
            operate, namely:
          </p>
          <ul className="wp-block-list">
            <li>
              <strong>Singapore</strong>: Compliant with the{" "}
              <strong>SFA</strong> and{" "}
              <strong>Personal Data Protection Act (PDPA)</strong>;
            </li>
            <li>
              <strong>Australia</strong>: Compliant with applicable{" "}
              <strong>Australian Corporations Act</strong> and{" "}
              <strong>Privacy Act 1988;</strong>
            </li>
            <li>
              <strong>EU</strong>: For users in the European Union, we comply
              with the{" "}
              <strong>General Data Protection Regulation (GDPR)</strong>.
            </li>
          </ul>
          <p>
            You are responsible for ensuring compliance with laws in your
            jurisdiction.
          </p>
          <ol start={8} className="wp-block-list">
            <li>
              <strong>INTELLECTUAL PROPERTY</strong>
            </li>
          </ol>
          <p>
            All content on the Website, including text, graphics, logos,
            software, images, and other materials (“Content”), is the property
            of Collybus Pte Ltd is protected by intellectual property laws in
            Singapore, Australia, the EU, and other jurisdictions.
          </p>
          <p>
            <strong>Permitted Use</strong>
          </p>
          <p>
            You are granted a limited, non-exclusive, and revocable license to
            access and use the Content for&nbsp;
            <strong>personal or internal business purposes only</strong>.
          </p>
          <p>
            <strong>Prohibited Use</strong>
          </p>
          <p>You must not:</p>
          <ol className="wp-block-list">
            <li>
              Copy, reproduce, modify, distribute, or create derivative works of
              the Content;
            </li>
            <li>
              Use the Content for commercial purposes without our written
              consent;
            </li>
            <li>Remove or alter any proprietary notices;</li>
            <li>
              Use automated tools (e.g., bots or scraping tools) to access the
              Website;
            </li>
            <li>
              Reverse engineer or attempt to discover the Website's underlying
              code.
            </li>
          </ol>
          <p>
            <strong>Trademarks</strong>
            <br />
            "Collybus" and other trademarks or logos on the Website are the
            exclusive property of Collybus Pte Ltd. Unauthorized use is strictly
            prohibited.
          </p>
          <p>
            <strong>Enforcement</strong>
            <br />
            Any unauthorized use may result in suspension of access and legal
            action. To report misuse, please contact us
            at&nbsp;support@collybus.co
          </p>
          <ol start={9} className="wp-block-list">
            <li>
              <strong>LIMITATION OF LIABILITY</strong>
            </li>
          </ol>
          <p>To the fullest extent permitted by law:</p>
          <ul className="wp-block-list">
            <li>
              The Website and services are provided <strong>"as is"</strong>{" "}
              without warranties of any kind;
            </li>
            <li>
              We disclaim all liability for losses, whether direct, indirect, or
              consequential, arising from your use of the Website;
            </li>
            <li>Your sole remedy is to discontinue use of the Website.</li>
          </ul>
          <ol start={10} className="wp-block-list">
            <li>
              <strong>PRIVACY POLICY</strong>
            </li>
          </ol>
          <p>
            Your privacy is important to us. Our collection, use, and protection
            of personal data are governed by our&nbsp;
            <strong>Privacy Policy</strong>, which complies with the following
            privacy regulations:
          </p>
          <ul className="wp-block-list">
            <li>
              <strong>Singapore Personal Data Protection Act (PDPA)</strong> –
              for users accessing the Website from Singapore;
            </li>
            <li>
              <strong>General Data Protection Regulation (GDPR)</strong> – for
              users located within the European Union; and
            </li>
            <li>
              <strong>
                Australian Privacy Act and other applicable Australian privacy
                regulations
              </strong>{" "}
              – for users accessing the Website from Australia.
            </li>
          </ul>
          <p>
            <strong>Your Consent</strong>
            <br />
            By accessing or using the Website, you acknowledge and agree that:
          </p>
          <ol className="wp-block-list">
            <li>
              We may collect, process, and use your personal data in accordance
              with the terms outlined in our <strong>Privacy Policy</strong>;
            </li>
            <li>
              Your continued use of the Website constitutes your acceptance of
              our data handling practices;
            </li>
            <li>
              It is your responsibility to read and understand our{" "}
              <strong>Privacy Policy</strong>, which provides details on:
              <ul className="wp-block-list">
                <li>The types of personal data we collect;</li>
                <li>How we collect, process, and use your data;</li>
                <li>How we share or disclose your data; and</li>
                <li>
                  Your rights and choices regarding your personal data,
                  including rights under GDPR and other applicable laws.
                </li>
              </ul>
            </li>
          </ol>
          <p>
            <strong>International Data Transfers</strong>
            <br />
            As we operate in multiple jurisdictions, your data may be
            transferred to, stored in, or processed in countries outside your
            jurisdiction, including Singapore and Australia. We take reasonable
            steps to ensure that your data is handled securely and in compliance
            with applicable regulations.
          </p>
          <p>
            <strong>Privacy Policy Review</strong>
            <br />
            We encourage you to review our Privacy Policy for full details on
            how we collect, use, protect, and disclose your personal data.
          </p>
          <p>
            If you have any questions about our data practices, please contact
            us at support@collybus.co
          </p>
          <ol start={11} className="wp-block-list">
            <li>
              <strong>AMENDMENTS</strong>
            </li>
          </ol>
          <p>
            We may update these Terms periodically. Updates will take effect
            upon posting to the Website. Continued use constitutes acceptance of
            the revised Terms.
          </p>
          <ol start={12} className="wp-block-list">
            <li>
              <strong>APPLICABLE LAW</strong>
            </li>
          </ol>
          <p>
            These Terms are governed by the laws of&nbsp;Singapore, without
            regard to conflicts of law principles. Any disputes will be subject
            to the exclusive jurisdiction of the courts of Singapore.
          </p>
          <p>
            For services offered in Australia or the European Union, additional
            compliance with local laws may apply where necessary.
          </p>
          <ol start={13} className="wp-block-list">
            <li>
              <strong>CONTACT</strong>
            </li>
          </ol>
          <p>
            For questions or clarifications regarding these Terms, please
            contact:
          </p>
          <p>
            <strong>Collybus Pte Ltd</strong>
            <br />
            49 Duxton Road #02-01
          </p>
          <p>Singapore 089513</p>
          <p>Email: support@collybus.co</p>
          <ol start={14} className="wp-block-list">
            <li>
              <strong>ACKNOWLEDGEMENT</strong>
            </li>
          </ol>
          <p>By accessing or using the Website, you confirm that you:</p>
          <ol className="wp-block-list">
            <li>
              Meet the eligibility criteria as an{" "}
              <strong>Accredited Investor</strong> or{" "}
              <strong>Institutional Investor as defined under Clause 1</strong>;
            </li>
            <li>
              Understand the risks and responsibilities associated with using
              the Website; and
            </li>
            <li>Accept these Terms and Conditions in full.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
