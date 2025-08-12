import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="container mx-auto px-6">
        <hr className="border-gray-300 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="text-xs">
            <div className="mb-2">
              <p className="font-semibold">COLLYBUS PTE LTD</p>
              <p>UEN 202420599E</p>
            </div>
            <div>
              <p className="font-semibold">COLLYBUS PTY LTD</p>
              <p>ABN 25658764017</p>
            </div>
          </div>

          <div className="text-xs md:text-right">
            <Link
              href="/privacy-policy"
              className="block mb-1 hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="block mb-1 hover:text-black"
            >
              Terms & Conditions
            </Link>
            <Link href="/risk-disclosures" className="block hover:text-black">
              Risk Disclosures
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 mt-8 text-center">
          <p className="text-xs text-gray-600 mb-4 max-w-xl mx-auto">
            Collybus has partnered with{" "}
            <a
              href="https://www.tradingview.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black"
            >
              https://www.tradingview.com/
            </a>
            . The platform incorporates Advanced Charts from TradingView to
            provide fully customizable charts, drawing tools and indicators for
            in-depth technical analysis.
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/trading-view-300x157.png"
              alt="TradingView Logo"
              width={100}
              height={25}
              unoptimized
            />
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-8 mt-8 border-t border-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Collybus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
