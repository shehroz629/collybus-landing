
const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-5 gap-8 text-sm text-white/70">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="https://collybus.co/images/collybus-logo.svg" alt="Collybus" className="h-6 w-auto opacity-90 transform scale-[1.3] origin-left"/>
          </div>
          <p className="max-w-xs">Institutional execution for Digital Assets, Derivatives, and Forex—built with FX discipline.</p>
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
            <li><a className="hover:text-white/90" href="/about">About</a></li>
            <li><a className="hover:text-white/90" href="/team">Team</a></li>
            <li><a className="hover:text-white/90" href="/product">Product</a></li>
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
            <li><a className="hover:text-white/90" href="#">Book a demo</a></li>
            <li><a className="hover:text-white/90" href="mailto:contact@collybus.co">contact@collybus.co</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-white/40 py-6 border-t border-white/10">© {new Date().getFullYear()} Collybus. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
