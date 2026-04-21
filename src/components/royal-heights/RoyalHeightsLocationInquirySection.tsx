'use client';

import { useMemo, useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function RoyalHeightsLocationInquirySection() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [unitType, setUnitType] = useState('');
  const [message, setMessage] = useState('');
  const [siteVisit, setSiteVisit] = useState(false);
  const [siteVisitDate, setSiteVisitDate] = useState('');

  const defaultMessage = useMemo(
    () => "Hello, I'm interested in Royal Heights Sukari. Please share more details.",
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Unit Type: ${unitType || 'Not specified'}`,
      `Site Visit Requested: ${siteVisit ? 'Yes' : 'No'}`,
      `Site Visit Date: ${siteVisit ? siteVisitDate || 'Not selected' : 'N/A'}`,
      '',
      `Message: ${message || defaultMessage}`,
    ];

    const subject = encodeURIComponent('Royal Heights Sukari Inquiry');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:info@promittoltd.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary">Prime Location</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Kahawa Sukari, Nairobi</h2>
            <p className="mt-4 text-gray-600 leading-7">
              Located in one of Nairobi&apos;s fastest-growing residential areas, Royal Heights Sukari
              places you close to schools, shopping, healthcare, and major transport routes.
            </p>
            <p className="mt-3 text-gray-600 leading-7">
              Commuting is effortless with easy access roads and daily conveniences around you.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 h-[260px]">
            <iframe
              title="Royal Heights Sukari location map"
              src="https://maps.google.com/maps?q=Kahawa%20Sukari%2C%20Nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-4xl font-bold">Interested in This Property?</h3>
            <p className="mt-4 text-white/90 max-w-lg leading-7">
              Fill out this form and our team will get back to you quickly. You can also contact us
              directly via WhatsApp, email, or phone.
            </p>

            <div className="mt-7 space-y-4">
              <a href="https://wa.me/254729506506" className="flex items-center gap-3 hover:text-secondary transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>+254 729 506 506</span>
              </a>
              <a href="mailto:info@promittoltd.com" className="flex items-center gap-3 hover:text-secondary transition-colors">
                <Mail className="h-5 w-5" />
                <span>info@promittoltd.com</span>
              </a>
              <a href="tel:+254729506506" className="flex items-center gap-3 hover:text-secondary transition-colors">
                <Phone className="h-5 w-5" />
                <span>+254 729 506 506</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white text-gray-900 rounded-xl p-6 shadow-lg space-y-3">
            <h4 className="text-xl font-semibold">Request More Information</h4>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your Phone Number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select Unit Type</option>
              <option value="Studio Apartment">Studio Apartment</option>
              <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
              <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
              <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={siteVisit}
                onChange={(e) => {
                  setSiteVisit(e.target.checked);
                  if (!e.target.checked) setSiteVisitDate('');
                }}
              />
              Request a site visit
            </label>

            {siteVisit && (
              <input
                type="date"
                value={siteVisitDate}
                onChange={(e) => setSiteVisitDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            )}

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={defaultMessage}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
