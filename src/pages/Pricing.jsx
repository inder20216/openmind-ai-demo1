import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Pricing.css'

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="pricing-page">

      {/* HERO */}
      <section className="hero">
        <div className="badge">Transparent Pricing</div>
        <h1>One Bot. One Price.<br />Zero Surprises.</h1>
        <p>Every plan includes a dedicated build by our team, full deployment, and ongoing support — we handle everything so you don't have to.</p>

        <div className="toggle-wrap">
          <span className={`toggle-label${!isAnnual ? ' active' : ''}`}>Monthly</span>
          <button
            className={`toggle${isAnnual ? ' annual' : ''}`}
            onClick={() => setIsAnnual(a => !a)}
          />
          <span className={`toggle-label${isAnnual ? ' active' : ''}`}>
            Annual &nbsp;<span className="saving-badge">Save 2 Months</span>
          </span>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-item"><span className="trust-icon">🔒</span> No hidden charges</div>
        <div className="trust-item"><span className="trust-icon">🤝</span> Done-for-you setup</div>
        <div className="trust-item"><span className="trust-icon">⚡</span> Live in 5 business days</div>
        <div className="trust-item"><span className="trust-icon">🌐</span> Web, WhatsApp, App &amp; Social</div>
        <div className="trust-item"><span className="trust-icon">🔄</span> Monthly bot updates included</div>
      </div>

      {/* PRICING PLANS */}
      <section className="plans-section" style={{ paddingTop: '60px' }}>
        <div className="plans-grid">

          {/* GROWTH */}
          <div className="plan-card popular">
            <div className="popular-badge">⭐ Most Popular</div>
            <div className="plan-name">Growth</div>
            <p className="plan-tagline">For growing businesses ready to automate across multiple channels</p>

            <div className="setup-fee">
              <div className="setup-fee-label">One-Time Setup Fee</div>
              <div className="setup-fee-amount">₹65,000</div>
              <div className="setup-fee-note">Starting from ₹65,000 · varies as per requirements</div>
            </div>

            <div className="monthly-label">Then Monthly — Starting From</div>
            <div className="monthly-price">
              {isAnnual ? '₹20,834' : '₹25,000'}
            </div>
            <div className="monthly-period">
              {isAnnual ? 'per month (billed annually) + GST · varies per client' : 'per month + GST · varies per client'}
            </div>

            <button className="plan-cta filled" onClick={() => navigate('/contact')}>Get Started</button>

            <div className="features-title">What's Included</div>
            <ul className="feature-list">
              <li><span className="check">✓</span> Up to 3 Custom AI Chatbots</li>
              <li><span className="check">✓</span> 2,000 conversations / month</li>
              <li><span className="check">✓</span> Web + WhatsApp + Mobile App</li>
              <li><span className="check">✓</span> Knowledge base (up to 100 docs)</li>
              <li><span className="check">✓</span> Automation Workflows</li>
              <li><span className="check">✓</span> Lead capture + CRM integration</li>
              <li><span className="check">✓</span> Advanced analytics dashboard</li>
              <li><span className="check">✓</span> Priority support (24hr response)</li>
              <li><span className="check">✓</span> Quarterly bot fine-tuning</li>
              <li><span className="check">✓</span> Multi-language support (50+ languages)</li>
            </ul>
          </div>

          {/* ENTERPRISE */}
          <div className="plan-card">
            <div className="plan-name">Enterprise</div>
            <p className="plan-tagline">For large teams needing unlimited bots, channels, and custom workflows</p>

            <div className="setup-fee">
              <div className="setup-fee-label">One-Time Setup Fee</div>
              <div className="setup-fee-amount">Custom</div>
              <div className="setup-fee-note">Scoped to your requirements — talk to us first</div>
            </div>

            <div className="monthly-label">Monthly Retainer</div>
            <div className="monthly-price">Custom</div>
            <div className="monthly-period">based on usage &amp; scale</div>

            <button className="plan-cta dark" onClick={() => navigate('/contact')}>Contact Sales</button>

            <div className="features-title">Everything in Growth, Plus</div>
            <ul className="feature-list">
              <li><span className="check gold">✓</span> Unlimited AI Chatbots</li>
              <li><span className="check gold">✓</span> Unlimited conversations</li>
              <li><span className="check gold">✓</span> All channels — Web, WhatsApp, App, Instagram, Facebook</li>
              <li><span className="check gold">✓</span> Custom Automation Pipelines</li>
              <li><span className="check gold">✓</span> EHR / CRM / ERP integrations</li>
              <li><span className="check gold">✓</span> Dedicated account manager</li>
              <li><span className="check gold">✓</span> White-label option available</li>
              <li><span className="check gold">✓</span> SLA-backed uptime guarantee</li>
              <li><span className="check gold">✓</span> Monthly strategy review calls</li>
              <li><span className="check gold">✓</span> On-site training for your team</li>
            </ul>
          </div>

        </div>
      </section>

      <hr className="p-divider" />

      {/* WHAT GOES INTO YOUR BOT */}
      <section className="p-section">
        <h2 className="section-title">What Goes Into Your Bot</h2>
        <p className="section-sub">Every chatbot we deliver is custom-built for your business — not a template. Here's what your investment covers.</p>
        <div className="cost-grid">
          <div className="cost-card">
            <div className="cost-icon">🤖</div>
            <h3>AI Model Usage</h3>
            <p>Your bot runs on enterprise-grade AI — OpenAI GPT-4o, Google Gemini, or Claude — selected based on your use case for maximum accuracy.</p>
            <div className="cost-detail">Smart routing keeps API costs low while maintaining quality</div>
          </div>
          <div className="cost-card">
            <div className="cost-icon">⚙️</div>
            <h3>Custom Build &amp; Training</h3>
            <p>Our team spends 3–8 days building, training on your documents, testing responses, and deploying your bot. This isn't a drag-and-drop tool.</p>
            <div className="cost-detail">Covered by your one-time setup fee</div>
          </div>
          <div className="cost-card">
            <div className="cost-icon">🔄</div>
            <h3>Smart Automation Workflows</h3>
            <p>Beyond chat, your bot triggers real actions — sending emails, updating CRM records, creating tickets — via our intelligent automation layer.</p>
            <div className="cost-detail">Included in Growth &amp; Enterprise plans — runs on our cloud infrastructure</div>
          </div>
          <div className="cost-card">
            <div className="cost-icon">☁️</div>
            <h3>Cloud Hosting (AWS)</h3>
            <p>Your bot runs 24/7 on AWS infrastructure. We manage all server costs, uptime monitoring, and scaling — included in your monthly fee.</p>
            <div className="cost-detail">99.9% uptime, auto-scaled on demand</div>
          </div>
          <div className="cost-card">
            <div className="cost-icon">📊</div>
            <h3>Analytics &amp; Reporting</h3>
            <p>Monthly reports on conversation volume, resolution rate, top queries, and ROI metrics — so you always know your bot is working.</p>
            <div className="cost-detail">Included in all plans</div>
          </div>
          <div className="cost-card">
            <div className="cost-icon">🛠️</div>
            <h3>Ongoing Maintenance</h3>
            <p>As your business evolves, we update your bot's knowledge base, fix edge cases, and improve responses — included in the monthly fee.</p>
            <div className="cost-detail">No extra charge for routine updates</div>
          </div>
        </div>
      </section>

      <hr className="p-divider" />

      {/* COMPARE TABLE */}
      <section className="p-section">
        <h2 className="section-title">Compare Plans</h2>
        <p className="section-sub">See exactly what you get at each tier</p>
        <table className="compare-table">
          <thead>
            <tr>
              <th className="feature-col">Feature</th>
              <th className="highlight">Growth</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr className="cat-row"><td colSpan={3}>Pricing</td></tr>
            <tr><td className="feature-col">One-Time Setup Fee</td><td className="highlight-col">From ₹65,000</td><td><span className="custom-val">Custom</span></td></tr>
            <tr><td className="feature-col">Monthly Fee</td><td className="highlight-col">From ₹25,000/mo</td><td><span className="custom-val">Custom</span></td></tr>
            <tr><td className="feature-col">Annual Saving</td><td className="highlight-col">Up to ₹50,000/yr</td><td><span className="custom-val">Negotiable</span></td></tr>

            <tr className="cat-row"><td colSpan={3}>Bot Capabilities</td></tr>
            <tr><td className="feature-col">Number of Bots</td><td className="highlight-col">Up to 3</td><td><span className="custom-val">Unlimited</span></td></tr>
            <tr><td className="feature-col">Conversations / Month</td><td className="highlight-col">2,000</td><td><span className="custom-val">Unlimited</span></td></tr>
            <tr><td className="feature-col">Knowledge Base Documents</td><td className="highlight-col">100 docs</td><td><span className="custom-val">Unlimited</span></td></tr>
            <tr><td className="feature-col">Languages Supported</td><td className="highlight-col">50+</td><td><span className="custom-val">All</span></td></tr>
            <tr><td className="feature-col">Human Handoff / Escalation</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>

            <tr className="cat-row"><td colSpan={3}>Channels</td></tr>
            <tr><td className="feature-col">Website Widget</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">WhatsApp Business</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">Mobile App (iOS &amp; Android)</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">Instagram &amp; Facebook</td><td className="highlight-col"><span className="no">—</span></td><td><span className="yes">✓</span></td></tr>

            <tr className="cat-row"><td colSpan={3}>Automation</td></tr>
            <tr><td className="feature-col">Basic Automations</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">Advanced Workflows</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">CRM / ERP Integration</td><td className="highlight-col"><span className="no">—</span></td><td><span className="yes">✓</span></td></tr>

            <tr className="cat-row"><td colSpan={3}>Support &amp; SLA</td></tr>
            <tr><td className="feature-col">Support Type</td><td className="highlight-col">Priority Email</td><td><span className="custom-val">Dedicated Manager</span></td></tr>
            <tr><td className="feature-col">Response Time</td><td className="highlight-col">24 hours</td><td><span className="custom-val">4 hours</span></td></tr>
            <tr><td className="feature-col">Monthly Reporting</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">Quarterly Bot Review</td><td className="highlight-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
            <tr><td className="feature-col">Uptime SLA</td><td className="highlight-col">99.5%</td><td><span className="custom-val">99.9% guaranteed</span></td></tr>
          </tbody>
        </table>
      </section>

      <hr className="p-divider" />

      {/* CHANNELS */}
      <section className="p-section">
        <h2 className="section-title">Supported Channels</h2>
        <p className="section-sub">Your bot can be deployed wherever your customers already are</p>
        <div className="channels-grid">
          <div className="channel-card">
            <div className="channel-icon">🌐</div>
            <div className="channel-name">Website Widget</div>
            <div className="channel-cost">Included in all plans</div>
            <span className="channel-note free">No extra cost</span>
            <div className="channel-plans">Available: Growth &amp; Enterprise</div>
          </div>
          <div className="channel-card">
            <div className="channel-icon">💬</div>
            <div className="channel-name">WhatsApp Business</div>
            <div className="channel-cost">Meta API: ~₹0.60 / conversation</div>
            <span className="channel-note paid">Included in Growth+</span>
            <div className="channel-plans">Available: Growth &amp; Enterprise</div>
          </div>
          <div className="channel-card">
            <div className="channel-icon">📱</div>
            <div className="channel-name">Mobile App</div>
            <div className="channel-cost">iOS &amp; Android SDK</div>
            <span className="channel-note paid">Included in Growth+</span>
            <div className="channel-plans">Available: Growth &amp; Enterprise</div>
          </div>
          <div className="channel-card">
            <div className="channel-icon">📸</div>
            <div className="channel-name">Instagram &amp; Facebook</div>
            <div className="channel-cost">Meta API: ~₹0.60 / conversation</div>
            <span className="channel-note paid">Enterprise only</span>
            <div className="channel-plans">Available: Enterprise</div>
          </div>
        </div>
      </section>

      <hr className="p-divider" />

      {/* HOW IT WORKS */}
      <section className="p-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">From sign-up to a live bot — our team handles everything in 5 steps</p>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-num">🤖</div>
            <div className="step-title">Choose Your Bot</div>
            <div className="step-desc">Pick the bot type that fits your industry and use case</div>
            <div className="step-time">Day 1</div>
          </div>
          <div className="step-item">
            <div className="step-num">📋</div>
            <div className="step-title">Tell Us About Your Business</div>
            <div className="step-desc">Fill a short form and upload your documents &amp; knowledge base</div>
            <div className="step-time">Day 1–2</div>
          </div>
          <div className="step-item">
            <div className="step-num">⚙️</div>
            <div className="step-title">We Build Your Bot</div>
            <div className="step-desc">Our team trains, tests, and configures your custom AI bot</div>
            <div className="step-time">Day 2–4</div>
          </div>
          <div className="step-item">
            <div className="step-num">✅</div>
            <div className="step-title">You Review &amp; Approve</div>
            <div className="step-desc">Test the bot, request changes, and give us the go-ahead</div>
            <div className="step-time">Day 4–5</div>
          </div>
          <div className="step-item">
            <div className="step-num">🚀</div>
            <div className="step-title">Go Live</div>
            <div className="step-desc">Bot is deployed across your chosen channels — you're live!</div>
            <div className="step-time">Day 5</div>
          </div>
        </div>
      </section>

      <hr className="p-divider" />

      {/* FAQ */}
      <section className="p-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-sub">Everything you need to know before signing up</p>
        <div className="faq-grid">
          <div className="faq-item">
            <div className="faq-q">Why is there a one-time setup fee?</div>
            <div className="faq-a">The setup fee covers the actual work of building your bot — training it on your specific documents, configuring the conversation flows, setting up integrations, and deploying it to your channels. This is done by our team, not automated, which is why your bot actually understands your business.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What happens if I exceed my conversation limit?</div>
            <div className="faq-a">We'll notify you before you hit the limit. Additional conversations are billed at ₹8/conversation for Growth. Enterprise clients can negotiate a custom overage rate. We never cut off your bot mid-month — your customers always get a response.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Which AI model powers my bot?</div>
            <div className="faq-a">We use a combination of OpenAI GPT-4o, Google Gemini, and Anthropic Claude depending on your use case. We route simple queries to lighter models (lower cost) and complex queries to premium models — so you always get the best quality at the right price.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Can I upgrade my plan later?</div>
            <div className="faq-a">Yes, you can upgrade from Growth to Enterprise at any time. We'll scope the additional requirements and adjust your plan accordingly. Downgrades are available at the next billing cycle.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How do you handle sensitive data (especially for Healthcare)?</div>
            <div className="faq-a">We do not store patient conversations on our servers beyond session duration. All data is encrypted in transit and at rest. For Healthcare clients, we follow applicable data privacy guidelines and can sign a data processing agreement.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Is there a long-term contract?</div>
            <div className="faq-a">No lock-in. Monthly plans can be cancelled with 30 days notice. Annual plans offer 2 months free and are non-refundable after the bot is built and deployed. The setup fee is non-refundable as it covers real work done by our team.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How long does it take to go live?</div>
            <div className="faq-a">Most bots go live within 5 business days of receiving your documents and approval. Complex Enterprise deployments with multiple integrations may take 2–3 weeks. We'll give you a clear timeline before we start.</div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What if my bot gives a wrong answer?</div>
            <div className="faq-a">All plans include a review &amp; feedback loop. If your bot gives incorrect responses, report it and we'll retrain the relevant section within 48 hours (Growth) or 24 hours (Enterprise). Monthly bot reviews also proactively catch these issues.</div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner">
        <h2>Ready to Automate Your Business?</h2>
        <p>Talk to us today. We'll recommend the right bot for your business and give you a free consultation.</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate('/contact')}>Get Started — From ₹65,000</button>
          <button className="btn-secondary" onClick={() => navigate('/contact')}>Talk to Sales First</button>
        </div>
        <p style={{ marginTop: '20px', fontSize: '13px', color: '#555' }}>No commitment required for the consultation · GST applicable on all plans</p>
      </div>

    </div>
  )
}

export default Pricing
