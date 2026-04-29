"use client";

import { useEffect, useMemo, useState } from "react";

const royalHeightsImages = {
  exteriorOne: "/api/assets/images/royal-heights/ROYAL%20HEIGHTS%20Grey_1.png",
  exteriorTwo: "/api/assets/images/royal-heights/ROYAL%20HEIGHTS%20Grey_2.png",
  exteriorThree: "/api/assets/images/royal-heights/ROYAL%20HEIGHTS%20Grey_3.png",
  exteriorFour: "/api/assets/images/royal-heights/ROYAL%20HEIGHTS%20Grey_4.jpg",
  exteriorFive: "/api/assets/images/royal-heights/ROYAL%20HEIGHTS%20Grey_5.png",
  exteriorSix: "/api/assets/images/royal-heights/ROYAL%20HEIGHTS%20Grey_6.png",
};

const heroSlides = [
  {
    image: royalHeightsImages.exteriorOne,
    title: "Royal Heights - Sukari Apartment by Promitto Limited",
    description: "Own a High-Return Apartment in Sukari, Thika Road — From KES 4.5M",
  },
  {
    image: royalHeightsImages.exteriorTwo,
    title: "Invest in modern apartments with 9%-15% ROI in a high-demand location along Thika Road.",
    description: "With only 60 units available and flexible payment plans",
  },
];

const units = [
  { name: "Studio Apartment", price: "KES 3.2M", image: royalHeightsImages.exteriorThree },
  { name: "2 Bedroom Apartment", price: "KES 8.5M", image: royalHeightsImages.exteriorFour },
  { name: "3 Bedroom Apartment", price: "KES 13M", image: royalHeightsImages.exteriorFive },
  { name: "3 Bedroom Executive", price: "KES 16.5M", image: royalHeightsImages.exteriorSix },
];

const amenitySlides = [
  {
    image: royalHeightsImages.exteriorFour,
    title: "Blended Nature",
    description: "Green spaces and attractive landscaping on individual courts.",
  },
  {
    image: royalHeightsImages.exteriorSix,
    title: "Dedicated Entries",
    description: "Gated courts with dedicated entry and exits to the main gate.",
  },
];

const amenityItems = [
  {
    icon: "lift",
    title: "High Speed Lifts",
    description: "Move smoothly across all floors with fast, reliable lifts designed for everyday convenience.",
  },
  {
    icon: "wifi",
    title: "High Speed WIFI",
    description: "Stay connected with high-speed internet access for work, streaming, and modern living.",
  },
  {
    icon: "parking",
    title: "Ample Parking Space",
    description: "Enjoy convenient access with generous parking space for residents and visiting guests.",
  },
];

const lifeItems = [
  { title: "Flexible, Contemporary Spaces", description: "Offering residents an active lifestyle and strong sense of community." },
  { title: "Well-Developed Infrastructure", description: "Wide boulevard network with thoughtful pedestrian and access planning." },
  { title: "Nature-Inspired Design", description: "Homes blending with natural surroundings and open visual flow." },
  { title: "Expansive Green Spaces", description: "Lush parks and tree-lined boulevards for relaxation and recreation." },
  { title: "Sports & Recreational Facilities", description: "Access to active-lifestyle spaces within and around the development." },
  { title: "World-Class Amenities", description: "Resident amenities designed for convenience, comfort, and community events." },
];

function AmenityIcon({ type }) {
  if (type === "wifi") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M10 25c12.7-10.7 31.3-10.7 44 0" />
        <path d="M18 34c8.2-6.9 19.8-6.9 28 0" />
        <path d="M26 43c3.5-2.9 8.5-2.9 12 0" />
        <circle cx="32" cy="52" r="3" />
      </svg>
    );
  }

  if (type === "parking") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M15 54V10h21c8 0 13 5.2 13 12.8S44 36 36 36H25v18" />
        <path d="M25 19h10c3.2 0 5 1.5 5 4s-1.8 4-5 4H25" />
        <path d="M43 54h9" />
        <path d="M47.5 45v9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="18" y="10" width="28" height="44" rx="3" />
      <path d="M25 18h14" />
      <path d="M25 46h14" />
      <path d="M32 27v12" />
      <path d="M27 32l5-5 5 5" />
      <path d="M27 35l5 5 5-5" />
    </svg>
  );
}

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [amenityIndex, setAmenityIndex] = useState(0);
  const [siteVisit, setSiteVisit] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -80px",
        threshold: 0.15,
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const amenity = amenitySlides[amenityIndex];
  const defaultMessage = useMemo(
    () => "Hello, I'm interested in Royal Heights Sukari. Please share more details.",
    []
  );

  function handleInquirySubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      `Full Name: ${form.get("fullName") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Unit Type: ${form.get("unitType") || "Not specified"}`,
      `Site Visit Requested: ${siteVisit ? "Yes" : "No"}`,
      `Site Visit Date: ${siteVisit ? form.get("siteVisitDate") || "Not selected" : "N/A"}`,
      "",
      `Message: ${form.get("message") || defaultMessage}`,
    ];

    const subject = encodeURIComponent("Royal Heights Sukari Inquiry");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@promittoltd.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="logo-link">
            <img src="/api/assets/images/logo4.png" alt="Promitto" className="logo" />
          </a>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#units">The Apartments</a>
            <a href="#apartments">Amenities</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="pill-btn" href="#contact">Schedule a Visit</a>
        </div>
      </header>

      <section id="home" className="hero">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.title}
            className={`hero-slide ${idx === heroIndex ? "active" : ""}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
        <div className="hero-overlay" />
        <div className="container hero-content" data-reveal>
          <h1>{heroSlides[heroIndex].title}</h1>
          <p>{heroSlides[heroIndex].description}</p>
          <div className="hero-dots">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.title}
                className={`dot ${idx === heroIndex ? "active" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Hero slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="container split">
          <div data-reveal>
            <h2>ROYAL HEIGHTS SUKARI</h2>
            <p><strong>Welcome to Royal Heights Sukari</strong></p>
            <p>
              A premier gated community where modern living meets the tranquility of nature.
              Nestled in the serene surroundings of Sukari, Royal Heights offers a peaceful retreat
              while remaining conveniently connected to key urban amenities.
            </p>
            <p>
              Beyond lifestyle, Royal Heights Sukari presents a compelling investment opportunity,
              offering <strong>attractive returns (ROI)</strong> in a high-demand location. With a{" "}
              <strong>flexible repayment plan of up to 3 years</strong>, owning your home or
              investment property has never been more accessible.
            </p>
            <p>
              At Royal Heights Sukari, every detail is thoughtfully crafted - from the layout of
              the homes to the overall community planning - ensuring comfort, security, and a refined living experience.
            </p>
          </div>
          <div className="about-image-wrap" data-reveal style={{ "--reveal-delay": "120ms" }}>
            <img src={royalHeightsImages.exteriorThree} alt="Royal Heights view" />
          </div>
        </div>
        <div className="container metrics">
          <div data-reveal><strong>60</strong><span>Units</span></div>
          <div data-reveal style={{ "--reveal-delay": "100ms" }}><strong>10</strong><span>Floors</span></div>
        </div>
      </section>

      <section id="units" className="units section-pad">
        <div className="container">
          <h2 className="center" data-reveal>Choose Your Perfect Home</h2>
          <div className="unit-grid">
            {units.map((unit, index) => {
              const message = `Hello, I'm interested in the ${unit.name} at Royal Heights Sukari (${unit.price}). Please share more details.`;
              const whatsappHref = `https://wa.me/254729506506?text=${encodeURIComponent(message)}`;
              const emailHref = `mailto:info@promittoltd.com?subject=${encodeURIComponent(`Inquiry: ${unit.name} at Royal Heights Sukari`)}&body=${encodeURIComponent(message)}`;

              return (
                <article
                  key={unit.name}
                  className="unit-card"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` }}
                >
                  <img src={unit.image} alt={unit.name} />
                  <div className="unit-body">
                    <h3 className="unit-name">{unit.name}</h3>
                    <p className="unit-price">{unit.price}</p>
                    <div className="cta-row">
                      <a className="btn-wa" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                      <a className="btn-mail" href={emailHref}>Email</a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="apartments" className="amenities section-pad">
        <div className="container-wide amenities-wrap">
          <div className="amenity-carousel" data-reveal>
            <img src={amenity.image} alt="Royal Heights amenities" />
            <div className="amenity-overlay">
              <p>{amenity.title}</p>
              <p>{amenity.description}</p>
              <span>EXPLORE</span>
            </div>
            <div className="amenity-controls">
              <button onClick={() => setAmenityIndex((prev) => (prev === 0 ? amenitySlides.length - 1 : prev - 1))} aria-label="Previous amenity slide">&#8249;</button>
              <span>{amenityIndex + 1}/{amenitySlides.length}</span>
              <button onClick={() => setAmenityIndex((prev) => (prev + 1) % amenitySlides.length)} aria-label="Next amenity slide">&#8250;</button>
            </div>
          </div>
          <div className="amenity-content">
            <h2 data-reveal>AMENITIES</h2>
            <div className="amenity-feature-list">
              {amenityItems.map((item, index) => (
                <article
                  key={item.title}
                  className="amenity-feature"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                >
                  <span className="amenity-feature-icon">
                    <AmenityIcon type={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="life section-pad">
        <div className="container">
          <h2 data-reveal>LIFE AT ROYAL HEIGHTS RESIDENCES</h2>
          <div className="life-grid">
            {lifeItems.map((item, index) => (
              <article key={item.title} data-reveal style={{ "--reveal-delay": `${index * 80}ms` }}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="container split">
          <div data-reveal>
            <h2>Interested in This Property?</h2>
            <p>Fill out this form and our team will get back to you quickly.</p>
            <p><a href="https://wa.me/254729506506" target="_blank" rel="noopener noreferrer">+254 729 506 506</a></p>
            <p><a href="mailto:info@promittoltd.com">info@promittoltd.com</a></p>
          </div>
          <form className="inquiry-form" onSubmit={handleInquirySubmit} data-reveal style={{ "--reveal-delay": "120ms" }}>
            <input name="fullName" type="text" placeholder="Your Full Name" required />
            <input name="email" type="email" placeholder="Your Email Address" required />
            <input name="phone" type="tel" placeholder="Your Phone Number" required />
            <select name="unitType">
              <option value="">Select Unit Type</option>
              <option>Studio Apartment</option>
              <option>2 Bedroom Apartment</option>
              <option>3 Bedroom Apartment</option>
              <option>3 Bedroom Executive</option>
            </select>
            <label className="checkbox">
              <input type="checkbox" checked={siteVisit} onChange={(e) => setSiteVisit(e.target.checked)} />
              Request a site visit
            </label>
            {siteVisit && <input name="siteVisitDate" type="date" required />}
            <textarea
              name="message"
              rows={4}
              placeholder={defaultMessage}
            />
            <button type="submit">Send Inquiry</button>
          </form>
        </div>
      </section>
    </main>
  );
}
