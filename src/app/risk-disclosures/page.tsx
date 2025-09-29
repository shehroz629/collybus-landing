import React from "react";
import { Metadata } from "next";

// Page-specific metadata
export const metadata: Metadata = {
  title: "Risk Disclosures - Collybus",
  // Add a description meta tag if desired, e.g.:
  // description: 'Understand the risks involved with digital asset trading through Collybus.',
};

const RiskDisclosuresPage = () => {
  return (
    <div className="bg-black text-gray-200 py-8 md:py-12">
      <div className="container mx-auto px-6">
        {/* Gold Banner for Page Title */}
        <div className="bg-yellow-400 p-8 md:p-12 text-start mb-8 md:mb-12">
          <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-normal" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Risk Disclosures
          </h1>
        </div>

        <div className="prose prose-invert max-w-none text-gray-200 font-thin prose-p:leading-relaxed prose-p:my-4 prose-headings:font-semibold prose-strong:font-semibold">
          <p>
            <strong>RISK DISCLOSURES</strong>
          </p>
          <p>
            These Risk Disclosures are supplemental to any platform trading
            agreement, terms of business, or other documentation you may have
            with Collybus Pte Ltd (“Collybus” “we” “us” “our”). We reserve the
            right to update or amend these disclosures at any time. Trading in
            financial instruments carries significant risk and may result in
            substantial financial losses. Margin trading is highly speculative
            and may involve an extreme degree of risk, including losses in
            excess of your collateral. You are solely responsible for making
            independent decisions regarding our services and should seek
            independent financial and/or legal advice as needed. Our services
            are available exclusively to Accredited and Institutional Investors
            as defined under Section 4A of the Securities and Futures Act (SFA),
            Singapore. By accessing our services, you confirm that you meet the
            eligibility criteria and understand the associated risks. You must
            fully assess the risks associated with trading financial
            instruments, including their terms, features, and underlying
            arrangements. Consider whether such trading aligns with your
            experience, financial resources, risk appetite, and investment
            objectives.
          </p>
          <p>
            <strong>General Trading Risks</strong>
          </p>
          <p>
            Financial markets are subject to market volatility, liquidity
            constraints, leverage, regulatory changes, macroeconomic conditions,
            and geopolitical events. Certain instruments may be highly
            speculative, illiquid, or complex, potentially exposing investors to
            risks such as margin calls, forced liquidations, funding rate
            fluctuations, and counterparty default. These Risk Disclosures are
            not exhaustive and do not encompass all risks associated with the
            instruments, transactions, or services we offer. We accept no
            liability for any direct or indirect losses, including loss of
            profits, business, or opportunities arising from the use or reliance
            on this information. We strongly advise you to carefully read and
            understand these Risk Disclosures before using our services.
          </p>
          <p>
            <strong>Derivatives Risks</strong>
          </p>
          <p>
            Derivatives are financial instruments whose value is derived from an
            underlying asset, such as equities, bonds, commodities, or index
            (such as equity index or interest rate). Common types include
            futures, options, swaps, and forwards. Trading derivatives involves
            significant risks, including but not limited to:
          </p>
          <p>
            Counterparty Risk: OTC derivatives are not cleared through
            exchanges, exposing investors to counterparty default risk. The
            failure of a counterparty may result in the loss of unrealized gains
            and force liquidation at unfavourable market prices.
          </p>
          <p>
            Credit Risk: Disposing of or closing an uncleared derivative may
            require counterparty consent, and offsetting positions may not
            always be available. Non-centrally cleared derivatives carry the
            risk of counterparty payment default.
          </p>
          <p>
            Leverage Risk: Derivatives utilize leverage (using borrowed funds),
            amplifying both gains and losses. Small adverse price movements can
            lead to substantial losses, potentially exceeding initial deposits
            or margin requirements.
          </p>
          <p>
            Liquidity Risk: OTC derivatives may lack liquidity, making it
            difficult to enter or exit positions at desired prices. Reduced
            market depth can impact pricing, execution, and risk management
            potentially resulting in significant financial losses.
          </p>
          <p>
            Early Termination Restrictions: Some OTC contracts impose
            restrictions or penalties on early termination. This can limit your
            ability to adjust trading strategies in response to changing market
            conditions.
          </p>
          <p>
            <strong>Currency Risks</strong>
          </p>
          <p>
            Investing in financial instruments denominated in a currency other
            than your base currency involves currency risk. Exchange rate
            fluctuations may increase losses or reduce profits when converted
            back to your base currency. Currency trading is volatile, highly
            leveraged, and may be illiquid. Prices are influenced by supply and
            demand, government policies, political and economic events, and
            interest rate changes. Governments may intervene in currency
            markets, affecting price movements. Market liquidity is not
            guaranteed. In volatile conditions, it may not always be possible to
            exit positions to limit losses or realize gains. Banks and dealers
            are not obligated to provide continuous pricing, and bid/offer
            spreads may widen significantly, increasing the risk that losses
            cannot be controlled.
          </p>
          <p>
            <strong>
              Digital Assets, Cryptocurrency, Perpetual Futures Risks
            </strong>
          </p>
          <p>
            Trading digital assets and cryptocurrencies, involves significant
            risk due to high volatility and rapidly changing market conditions.
            Cryptocurrency perpetual futures introduce additional risks, such as
            leverage and funding rate fluctuations. Some of the key risks
            associated with these financial products include:
          </p>
          <p>
            Cybersecurity & Operational Risk: Digital assets are vulnerable to
            hacking, fraud, cyberattacks, and technological failures,
            potentially resulting in asset loss or trading disruptions.
          </p>
          <p>
            Lack of Consumer Protection: Unlike traditional financial
            instruments digital assets and cryptocurrencies are decentralized
            and not backed by governments or central banks, offering no deposit
            insurance or investor recourse. Pursuant to current relevant
            regulations, digital assets and any associated activities within
            Singapore do not fall within the scope of the Financial Industry
            Disputes Resolution Centre (FIDReC) and will not benefit from the
            Deposit Insurance Scheme (DIS).
          </p>
          <p>
            Leverage Risk: Perpetual futures often involve leverage (using
            borrowed funds), amplifying both gains and losses. Small price
            movements in the underlying cryptocurrency can a substantial loss of
            margin, and traders may be required to add additional funds or risk
            liquidation.
          </p>
          <p>
            Funding Rate Risk: Contracts in perpetual futures do not have an
            expiry date but require periodic funding payments between long and
            short position holders. Periodic funding payments between position
            holders affect profitability. The funding rate and liquidation
            mechanisms for perpetual futures are based on an index price derived
            from multiple exchanges. Index price discrepancies may cause
            premature liquidations.
          </p>
          <p>
            Technology Risks: The features, functionality, characteristics and
            operation of digital assets and the associated software, networks,
            protocols and technology used may be complex difficult to understand
            and evaluate.
          </p>
          <p>
            Liquidation Risk: Liquidation of positions can occur if a trader's
            margin balance falls below the maintenance margin requirement.
            Market volatility can trigger automatic liquidations, leading to
            total loss of margin. Cryptocurrency markets operate 24/7,
            increasing exposure to sudden price swings.
          </p>
          <p>
            Market Manipulation & Disruptions: Cryptocurrency derivatives
            markets are susceptible to price manipulation, flash crashes and
            liquidity gaps.
          </p>
          <p>
            Exchange Risk: Cryptocurrency exchanges may lack regulatory
            oversight, posing risks of security breaches, downtime, network
            connectivity disruption or withdrawal restrictions.
          </p>
          <p>
            Regulatory Risk: The regulatory landscape for digital assets is
            evolving rapidly and subject to change. Cryptocurrency derivatives
            may be restricted or banned in certain jurisdictions. Traders are
            responsible for ensuring compliance with local laws and regulations
            before engaging in perpetual futures trading.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosuresPage;
