import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Metadata } from "next";
import BioCard from "@/components/bio-card";
import ContactForm from "@/components/contact-form";

// Page-specific metadata
export const metadata: Metadata = {
  description:
    "COLLYBUS brings an institutional FX-grade trading platform to the world of cryptocurrencies.",
  // You can add a specific title here if needed, e.g.:
  // title: 'Collybus - Home',
};

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="bg-black py-10 md:py-20">
        <div className="container mx-auto px-8 md:px-32 md:flex md:items-center md:gap-8">
          <div className="md:w-5/7 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-normal text-white mb-6">
              Transforming
              <br />
              <span className="text-yellow-400">crypto trading</span>
              <br />
              for <span className="text-yellow-400">institutions</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 md:mb-0 font-normal">
              COLLYBUS brings an institutional FX-grade trading platform to the
              world of cryptocurrencies. With decades of experience in all
              aspects of execution platform construction, user experience
              refinement, multi market accessibility and price aggregation, the
              team offer a unique product for the crypto market.
            </p>
          </div>

          <div className="md:w-2/7 mt-8 md:mt-0">
            <Image
              src="/images/platform_screenshot.png"
              alt="COLLYBUS CONNEX Platform Screenshot"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-normal text-center text-white mb-12">
            Our vision
          </h2>
          <p className="text-center text-gray-200 md:text-lg max-w-3xl mx-auto mb-12 font-normal">
            As the digital asset market continues to evolve, we recognise an
            unparalleled opportunity to deliver a trading and execution platform
            that is fundamental to the institutional and professional trader.
            With a focus on functionality, user experience, execution speed, and
            liquidity aggregation, we are committed to shaping the future of
            institutional crypto trading.
          </p>
          <div className="text-center">
            <Link
              href="/#contact"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-normal p-6 rounded-sm text-md transition duration-300"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Product Section - Collybus Connex */}
      <section id="product" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-6xl text-center mb-6 bg-gradient-to-r from-white via-yellow-400 to-yellow-400 text-transparent bg-clip-text font-logo">
            COLLYBUS CONNEX
          </h2>
          <p className="text-center text-gray-200 md:text-lg max-w-3xl mx-auto mb-16 font-normal">
            The COLLYBUS CONNEX trading platform is specifically designed to
            bring the functionality and user experience of FX platforms to the
            digital asset landscape. CONNEX empowers traders to seamlessly
            integrate with multiple crypto exchanges, enabling capitalization of
            liquidity opportunities and minimization of trading costs while
            effortlessly managing orders, positions, and collateral utilization.
          </p>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Aggregated Markets
              </h3>
              <p className="text-gray-200 mb-4">
                CONNEX is an industrial grade trading solution enabling
                institutions to navigate multiple crypto exchanges in order to
                source optimal liquidity and pricing. Access all the most liquid
                venues through a single UI.
              </p>
              <Link
                href="/#contact"
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Learn More &rarr;
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Orders and Execution
              </h3>
              <p className="text-gray-200 mb-4">
                Precision execution is available through streaming click to
                trade prices or via simple and conditional orders (If Done and
                OCO) and algorithmic execution types.
              </p>
              <Link
                href="/#contact"
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Learn More &rarr;
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Trader Controls
              </h3>
              <p className="text-gray-200 mb-4">
                Controls can be applied at the user level to monitor trading
                accessibility such as overall risk, order limits, instrument
                type and trade frequency.
              </p>
              <Link
                href="/#contact"
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Learn More &rarr;
              </Link>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Collateral Monitoring
              </h3>
              <p className="text-gray-200 mb-4">
                Monitor outstanding positions, risk, funding fees, de-leveraging
                and risk limits.
              </p>
              <Link
                href="/#contact"
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-normal text-center text-white mb-12">
            Decades of experience and a wealth of expertise
          </h2>
          <div className="grid md:grid-cols-2 md:items-start gap-8 lg:gap-12 max-w-4xl mx-auto">
            <BioCard
              imageSrc="/images/PJ-Image-819x1024.jpg"
              altText="Peter Jacobson"
              name="Peter Jacobson"
              title="Founder & CEO"
              bio={
                <p>
                  Peter Jacobson is a seasoned professional in the foreign
                  exchange (FX) industry, bringing over 30 years of trading
                  expertise across global financial hubs including London,
                  Tokyo, Singapore, and Sydney. He began his career at top-tier
                  sell-side institutions such as Swiss Bank and Goldman Sachs,
                  where he cultivated a deep knowledge in FX markets and
                  electronic trading. Peter went on to found Rhicon Currency
                  Management, where he played an instrumental role in shaping
                  the firm's vision and direction. His contributions spanned the
                  full spectrum of the business - from portfolio management and
                  overseeing execution platforms to managing day-to-day
                  functions. He also served as a core member of both the
                  investment and risk committees. With a sharp eye for market
                  structure and a passion for innovation in electronic
                  execution, Peter continues to be a thought leader in the
                  space.
                </p>
              }
            />
            <BioCard
              imageSrc="/images/GOS-image.jpg"
              altText="Greg O'Sullivan"
              name="Greg O'Sullivan"
              title="Founder & CGO"
              bio={
                <p>
                  Greg is a seasoned financial markets executive with over 20
                  years of experience in institutional sales, business
                  development, and strategic leadership across Asia-Pacific.
                  Before co-founding COLLYBUS, he led 360T's operations in
                  Australia and New Zealand, driving institutional market
                  expansion across the region. Prior to that, Greg spent nearly
                  15 years at State Street Bank, where he served as Vice
                  President and Head of Business Development for Australia and
                  New Zealand — successfully leading growth initiatives and
                  securing key institutional partnerships. Based in Sydney, Greg
                  is known for his strategic vision, strong client
                  relationships, and deep expertise in institutional finance and
                  electronic trading technologies. At COLLYBUS, he brings this
                  experience to bear in shaping the future of digital asset
                  trading.
                </p>
              }
            />
            <BioCard
              imageSrc="/images/JW-819x1024.jpg"
              altText="Jonathan Wharton"
              name="Jonathan Wharton"
              title="Founder & CCO"
              bio={
                <p>
                  Jonathan brings over 20 years of expertise from Rhicon
                  Currency Management in London and Singapore, where he oversaw
                  Operations, Risk, and Compliance. He has extensive experience
                  with the FCA, MAS, SEC and NFA. Prior to joining Rhicon,
                  Jonathan started his career at Goldman Sachs in London. Since
                  mid-2020, Jonathan has led the Singapore office at the
                  investment manager, and as well as serving on its fund's board
                  has been head of the risk and operations management committee.
                  His work with regulators ensures that COLLYBUS operates within
                  the legal frameworks of every jurisdiction we serve.
                </p>
              }
            />
            <BioCard
              imageSrc="/images/JD-image.jpg"
              altText="James Dalton"
              name="James Dalton"
              title="Advisor - CTO"
              bio={
                <p>
                  With over 30 years in banking and markets, including a decade
                  in Technology & Operations, followed by 20 years in Electronic
                  Execution and Trading, James has deep expertise in market
                  microstructure and product innovation. At Citibank in the
                  Foreign Exchange business, he built and ran the first Major
                  Bank FX Algorithmic Execution Service that combined internal
                  liquidity with sophisticated DMA smart order routing, driven
                  by some of the earliest real-time predictive liquidity models
                  in currency markets. He also ran all Digital Products and
                  Strategy for NAB FICC.
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </>
  );
};

export default HomePage;
