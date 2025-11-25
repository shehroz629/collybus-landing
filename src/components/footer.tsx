"use client";

const Footer = () => {
  const handleBookDemoClick = () => {
    // Trigger the floating CTA button click
    const floatingButton = document.querySelector('button[aria-label="Open contact form"]') as HTMLButtonElement;
    if (floatingButton) {
      floatingButton.click();
    } else {
      // Fallback: scroll to contact form section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm pb-10">
          {/* COLLYBUS Branding */}
          <div className="md:col-span-1">
            <img src="/images/collybus-logo.svg" alt="Collybus" className="h-8 w-auto mb-3" />
            <p className="text-white/50 text-base leading-relaxed">
              Institutional execution for Digital Assets,
Derivatives, and Forex.
            </p>
          </div>

          {/* Products */}
          <div>
            <div className="text-white font-medium mb-3">Products</div>
            <ul className="space-y-2 text-white/60">
              <li><a className="hover:text-white/90 transition-colors" href="/?section=connex#connex">CONNEX</a></li>
              <li><a className="hover:text-white/90 transition-colors" href="/?section=integrations#integrations">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-white font-medium mb-3">Company</div>
            <ul className="space-y-2 text-white/60">
              <li><a className="hover:text-white/90 transition-colors" href="/product">Product</a></li>
              <li><a className="hover:text-white/90 transition-colors" href="/about">About</a></li>
              <li><a className="hover:text-white/90 transition-colors" href="/team">Team</a></li>
              <li><a className="hover:text-white/90 transition-colors" href="/team?section=careers#careers">Careers</a></li>
            </ul>
          </div>

          {/* Disclaimers */}
          <div>
            <div className="text-white font-medium mb-3">Disclaimers</div>
            <ul className="space-y-2 text-white/60">
              <li><a className="hover:text-white/90 transition-colors" href="/privacy-policy">Privacy Policy</a></li>
              <li><a className="hover:text-white/90 transition-colors" href="/terms-conditions">Terms & Conditions</a></li>
              <li><a className="hover:text-white/90 transition-colors" href="/risk-disclosures">Risk Disclosures</a></li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <div className="text-white font-medium mb-3">Get in touch</div>
            <ul className="space-y-2 text-white/60">
              <li>
                <button 
                  className="hover:text-white/90 cursor-pointer transition-colors bg-transparent border-0 p-0 text-sm text-left"
                  onClick={handleBookDemoClick}
                >
                  Book a demo
                </button>
              </li>
              <li><a className="hover:text-white/90 transition-colors" href="mailto:contact@collybus.co">contact@collybus.co</a></li>
            </ul>
          </div>
        </div>

        {/* Company Registration Info */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 mb-8">
          <div className="rounded-lg p-[1px]" style={{ background: 'linear-gradient(180deg, #4A4A4A 0%, #4A4A4A 50%, #4A4A4A 100%)' }}>
            <div className="bg-[#1a1a1a] rounded-lg p-4 text-white/40 text-sm flex items-center h-full">
              Collybus Pte Ltd UEN 202420599E,
              (held in trust, ACRA, issued by MAS)
            </div>
          </div>
          <div className="rounded-lg p-[1px]" style={{ background: 'linear-gradient(180deg, #4A4A4A 0%, #4A4A4A 50%, #4A4A4A 100%)' }}>
            <div className="bg-[#1a1a1a] rounded-lg p-4 text-white/40 text-sm flex items-center h-full">
              Collybus Pty Ltd is registered with AUSTRAC. AAN: 100906184
            </div>
          </div>
          <div className="rounded-lg p-[1px]" style={{ background: 'linear-gradient(180deg, #4A4A4A 0%, #4A4A4A 50%, #4A4A4A 100%)' }}>
            <div className="bg-[#1a1a1a] rounded-lg p-4 text-white/40 text-sm flex items-center h-full">
              Collybus Pte Ltd UEN 202420599E
            </div>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 last-foot">
          {/* <p className="text-white/40  text-left">
            © {new Date().getFullYear()} Collybus. All rights reserved.
          </p> */}
          <p className="text-white/40 text-left">
          Collybus Pte Ltd UEN 2024205996
          </p>
          <p className="text-white/40 text-left">
          Colybus Pty Ltd (ACN 658 764-017) holds an AFSL 546742 (issued by ASIC) <br /> Collybus Pty is registered with AUSTRAC (AAN:100906184)
          </p>
          <p className="text-white/40 text-left">
          {new Date().getFullYear()} Collybus All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
