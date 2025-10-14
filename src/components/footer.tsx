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
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-5 gap-8 text-sm text-white/70">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="https://collybus.co/images/collybus-logo.svg" alt="Collybus" className="h-6 w-auto opacity-90 transform scale-[1.3] origin-left"/>
          </div>
          <p className="max-w-xs">Institutional execution for Digital Assets, Derivatives, and Forex.</p>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Product</div>
          <ul className="space-y-1">
            <li><a className="hover:text-white/90" href="/?section=connex#connex">CONNEX</a></li>
            <li><a className="hover:text-white/90" href="/?section=integrations#integrations">Integrations</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Company</div>
          <ul className="space-y-1">
           
            <li><a className="hover:text-white/90" href="/product">Product</a></li>
            <li><a className="hover:text-white/90" href="/about">About</a></li>
             <li><a className="hover:text-white/90" href="/team">Team</a></li>
            
            <li><a className="hover:text-white/90" href="/team?section=careers#careers">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Disclaimers</div>
          <ul className="space-y-1">
            <li><a className="hover:text-white/90" href="/privacy-policy">Privacy Policy</a></li>
            <li><a className="hover:text-white/90" href="/terms-conditions">Terms & Conditions</a></li>
            <li><a className="hover:text-white/90" href="/risk-disclosures">Risk Disclosures</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-medium mb-2">Get in touch</div>
          <ul className="space-y-1">
            <li>
              <button 
                className="hover:text-white/90 cursor-pointer text-white/70 transition-colors bg-transparent border-0 p-0 text-sm"
                onClick={handleBookDemoClick}
              >
                Book a demo
              </button>
            </li>
            <li><a className="hover:text-white/90" href="mailto:contact@collybus.co">contact@collybus.co</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 py-6 border-t border-white/10 gap-2">
        <span className="md:text-left w-full md:w-auto text-center">Collybus Pte Ltd UEN 202420599E</span>
        <span className="md:text-center w-full md:w-auto text-center">© {new Date().getFullYear()} Collybus. All rights reserved.</span>
        <span className="md:text-right w-full md:w-auto text-center">Collybus Pty Ltd ABN 25 658 764 017</span>
      </div>
    </footer>
  );
};

export default Footer;
