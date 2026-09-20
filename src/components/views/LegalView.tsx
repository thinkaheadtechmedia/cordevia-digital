import React, { useState } from 'react';
import { ViewTab } from '../../types';
import { BRAND_INFO } from '../../data/brandData';
import { Shield, FileText, Lock, Mail, ArrowRight, Cookie, Award } from 'lucide-react';

interface LegalViewProps {
  initialType: 'terms' | 'privacy' | 'dmca' | 'disclosure';
  onNavigate: (tab: ViewTab) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ initialType, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'dmca' | 'disclosure'>(initialType);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center p-1 bg-slate-900 border border-slate-800 rounded-2xl max-w-xl mx-auto gap-1">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 min-w-[120px] py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'privacy' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`flex-1 min-w-[120px] py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'terms' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          Terms of Service
        </button>
        <button
          onClick={() => setActiveTab('disclosure')}
          className={`flex-1 min-w-[120px] py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'disclosure' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          Ad & Cookie Disclosure
        </button>
        <button
          onClick={() => setActiveTab('dmca')}
          className={`flex-1 min-w-[100px] py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'dmca' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
          }`}
        >
          DMCA Policy
        </button>
      </div>

      {/* Content Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0B101E] border border-slate-800 shadow-2xl text-slate-300 space-y-6 text-sm leading-relaxed">
        
        {/* PRIVACY POLICY (GOOGLE ADSENSE & GDPR/CCPA COMPLIANT) */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase">Data Protection & AdSense Compliance</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Cordevia Digital Privacy Policy</h1>
              <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026 • Full AdSense, GDPR & CCPA Compliance</p>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Commitment to Privacy & Transparency</h2>
              <p>
                At <strong>Cordevia Digital LLC</strong> (&quot;Cordevia Digital&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;, formerly operating as Tarana Group), accessible from <a href="https://cordeviadigital.com" className="text-cyan-400 hover:underline">cordeviadigital.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by Cordevia Digital and how we use it.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Google DoubleClick DART Cookie & Third-Party Advertising</h2>
              <p>
                Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code className="text-cyan-400">cordeviadigital.com</code> and other sites on the internet.
              </p>
              <p>
                However, visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">https://policies.google.com/technologies/ads</a> or through the Network Advertising Initiative opt-out page at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">https://www.aboutads.info/choices/</a>.
              </p>
              <p>
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Cordevia Digital, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </p>
              <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                Note that Cordevia Digital has no access to or control over these cookies that are used by third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Log Files & Analytics</h2>
              <p>
                Cordevia Digital follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
              <p>
                Under the California Consumer Privacy Act (CCPA), California consumers have the right to request that a business that collects personal data disclose the categories and specific pieces of personal data collected, request deletion of personal data, and request that a business not sell the consumer&apos;s personal data. Cordevia Digital does NOT sell personal data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. GDPR Data Protection Rights</h2>
              <p>
                Every user is entitled to the right to access, rectification, erasure, restrict processing, object to processing, and data portability. If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at <code className="text-teal-400">privacy@cordeviadigital.com</code>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">6. Children&apos;s Information (COPPA)</h2>
              <p>
                Cordevia Digital does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </section>
          </div>
        )}

        {/* TERMS OF SERVICE */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Legal Agreement</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Cordevia Digital Terms of Service</h1>
              <p className="text-xs text-slate-400 mt-1">Last Updated: September 2026 • Governs all client retainers, marketplace orders & website usage</p>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing, browsing, or retaining the services of <strong>Cordevia Digital LLC</strong> (&quot;Cordevia Digital&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;, formerly operating as Tarana Group), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue using our website and services immediately.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Services & Digital Marketplace</h2>
              <p>
                Cordevia Digital provides professional media-tech services (YouTube management, web development, SEO strategies) and digital marketplace items (audits, kits, systems, templates). Digital downloadable products are delivered upon completed payment and are subject to single-entity commercial license restrictions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Intellectual Property Rights</h2>
              <p>
                All content, trademarks, designs, logos, audio-visual materials, and software published on this website are the intellectual property of Cordevia Digital LLC, unless otherwise stated. Reproduction, redistribution, or commercial resale without express written authorization is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Limitation of Liability</h2>
              <p>
                In no event shall Cordevia Digital, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website, content, services, or marketplace digital products.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Governing Law & Jurisdiction</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        )}

        {/* ADVERTISING & COOKIE DISCLOSURE */}
        {activeTab === 'disclosure' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Transparency & Monetization</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Advertising & Cookie Policy Disclosure</h1>
              <p className="text-xs text-slate-400 mt-1">Disclosures regarding Google AdSense, affiliate references, and cookie mechanics</p>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Advertising Disclosure (Google AdSense)</h2>
              <p>
                This website may feature advertisements served by <strong>Google AdSense</strong> and other verified advertising networks. These advertisements help support the creation of free, high-value technical articles, growth guides, and research on Cordevia Digital.
              </p>
              <p>
                We do not directly endorse every product or service promoted within automated third-party ad units. Ads are clearly distinguishable from editorial content, and we maintain strict separation between commercial ad placements and our independent editorial guidelines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device by websites you visit. They are widely used to make websites function efficiently, remember user preferences, and provide anonymous reporting data to website owners and ad networks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. How We Use Cookies</h2>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
                <li><strong className="text-slate-200">Essential Cookies:</strong> Required for site navigation, shopping cart sessions, and security verification.</li>
                <li><strong className="text-slate-200">Performance & Analytics:</strong> Measure visitor numbers, page views, and traffic sources to improve user experience.</li>
                <li><strong className="text-slate-200">Advertising Cookies:</strong> Used by Google AdSense and partners to deliver personalized, relevant ads based on browsing behavior.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Managing Your Cookie Preferences</h2>
              <p>
                You can prevent the setting of cookies by adjusting your browser settings (see your browser&apos;s Help menu for instructions). Be aware that disabling cookies may affect the functionality of this and many other websites that you visit.
              </p>
              <p>
                To opt out of personalized Google advertising, visit <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Google Ads Settings</a>.
              </p>
            </section>
          </div>
        )}

        {/* DMCA POLICY */}
        {activeTab === 'dmca' && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Copyright Compliance</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Cordevia Digital DMCA Copyright Notice</h1>
              <p className="text-xs text-slate-400 mt-1">Digital Millennium Copyright Act Compliance Protocol</p>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Copyright Protection & Respect</h2>
              <p>
                Cordevia Digital respects the intellectual property rights of creators, artists, developers, and rights holders. In accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512), we respond expeditiously to notices of alleged copyright infringement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Submitting a DMCA Takedown Notice</h2>
              <p>
                If you believe that material residing on or accessible through our website infringes a copyright, please send a written notice containing:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>Identification of the material claimed to be infringing and its specific URL.</li>
                <li>Your contact information (name, address, telephone number, and email).</li>
                <li>A statement of good faith belief that the disputed use is unauthorized.</li>
                <li>A statement made under penalty of perjury that the notification is accurate.</li>
                <li>A physical or electronic signature of the copyright owner or authorized agent.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Designated DMCA Agent</h2>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <div><strong className="text-white">Cordevia Digital DMCA Compliance Agent</strong></div>
                <div>Legal Department, Cordevia Digital LLC</div>
                <div>Email: <a href="mailto:dmca@cordeviadigital.com" className="text-cyan-400 hover:underline">dmca@cordeviadigital.com</a></div>
                <div>Subject Line: <span className="font-mono text-teal-300">DMCA Takedown Notice - [Content Reference]</span></div>
              </div>
            </section>
          </div>
        )}

      </div>

    </div>
  );
};
