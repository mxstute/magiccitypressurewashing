import { useState, useEffect, useRef } from "react";

const PINK = "#F472B6";
const BLUE = "#7DD3FC";
const DARK = "#0B1120";
const DARK2 = "#111827";
const DARK3 = "#1E293B";
const LIGHT = "#F8FAFC";
const GRAY = "#94A3B8";
const PHONE = "(305) 783-3133";

function PhoneBtn({ full = false }) {
  return (
    <a href={`tel:${PHONE.replace(/\D/g, "")}`} style={{
      display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
      background: BLUE, color: DARK, border: "none", borderRadius: 50,
      fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700,
      textDecoration: "none", letterSpacing: 0.5, width: full ? "100%" : "auto", justifyContent: "center",
    }}>📞 {PHONE}</a>
  );
}


// Google Places Autocomplete
const GOOGLE_MAPS_KEY = "AIzaSyAMDTN_tRU_MIKTh29BHZvrWRdOaYHZc98";

function useGooglePlaces() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY || GOOGLE_MAPS_KEY === "REPLACE_ME") return;
    if (window.google?.maps?.places) { setLoaded(true); return; }
    if (document.querySelector('script[src*="maps.googleapis"]')) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => { try { if (window.google?.maps?.places) setLoaded(true); } catch(e) {} };
    script.onerror = () => {};
    document.head.appendChild(script);
  }, []);
  return loaded;
}

function AddressAutocomplete({ label, value, onChange, placeholder = "Start typing your address..." }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const placesLoaded = useGooglePlaces();

  useEffect(() => {
    if (inputRef.current && value && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  useEffect(() => {
    if (!placesLoaded || !inputRef.current || autocompleteRef.current) return;
    try {
      const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "us" },
        fields: ["formatted_address"],
        types: ["address"],
      });
      ac.setBounds(new window.google.maps.LatLngBounds({ lat: 25.3, lng: -80.9 }, { lat: 26.0, lng: -80.0 }));
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (place?.formatted_address) onChange(place.formatted_address);
      });
      autocompleteRef.current = ac;
    } catch (e) {}
  }, [placesLoaded]);

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: GRAY, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      <input ref={inputRef} type="text" placeholder={placeholder}
        defaultValue={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: LIGHT, fontFamily: "'Outfit',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box" }}
        onFocus={e => e.target.style.borderColor = PINK + "55"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
    </div>
  );
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#whyus" },
    { label: "Book Now", href: "#book" },
    { label: "Areas", href: "#areas" },
  ];
  const linkStyle = { color: LIGHT, fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 1.5, textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,17,32,0.95)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(125,211,252,0.08)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", height: 68, padding: "0 24px" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, justifySelf: "start" }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 16 }}>
              {[10, 14, 12, 16, 13].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i % 2 === 0 ? DARK : PINK }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700, color: PINK, letterSpacing: 1, lineHeight: 1.1 }}>MAGIC CITY</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 7, fontWeight: 400, color: BLUE, letterSpacing: 2.5, lineHeight: 1.1 }}>PRESSURE WASHING</div>
          </div>
        </a>
        <div className="nav-center-links" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={linkStyle}
              onMouseEnter={e => e.target.style.color = BLUE}
              onMouseLeave={e => e.target.style.color = LIGHT}>{l.label}</a>
          ))}
        </div>
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 16 }}>
          <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="nav-phone-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px",
            background: BLUE, color: DARK, border: "none", borderRadius: 50,
            fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}>📞 {PHONE}</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
            display: "none", background: "none", border: "none", color: LIGHT, fontSize: 26, cursor: "pointer", padding: 4,
          }}>{menuOpen ? "✕" : "☰"}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu" style={{ padding: "20px 0 28px", display: "flex", flexDirection: "column", gap: 20, alignItems: "center", background: "rgba(11,17,32,0.98)", borderTop: "1px solid rgba(125,211,252,0.1)" }}>
          {links.map(l => (<a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 15 }}>{l.label}</a>))}
          <a href={`tel:${PHONE.replace(/\D/g, "")}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: BLUE, color: DARK, borderRadius: 50, fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>📞 {PHONE}</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(165deg, ${DARK} 0%, #0B1E30 40%, #0A1628 100%)`,
      position: "relative", overflow: "hidden", padding: "100px 24px 60px",
    }}>
      <div style={{ position: "absolute", top: "5%", right: "-10%", width: "55vw", height: "55vw", background: `radial-gradient(circle, rgba(125,211,252,0.06) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: "35vw", height: "35vw", background: `radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ maxWidth: 800, position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{
          display: "inline-block", padding: "5px 16px", borderRadius: 50,
          border: "1px solid rgba(125,211,252,0.25)", marginBottom: 24,
          fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 2, textTransform: "uppercase",
        }}>South Florida's Exterior Cleaning Experts</div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 700, color: LIGHT, lineHeight: 1.1, margin: "0 0 8px" }}>
          Professional
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px",
          background: `linear-gradient(135deg, ${BLUE}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Pressure Washing Miami</h1>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(15px,1.8vw,19px)", color: GRAY, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 32px" }}>
          Driveways, patios, building exteriors, roofs, and more — restored to like-new condition. Miami's humidity, mold, and algae don't stand a chance.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
          <PhoneBtn />
          <a href="#services" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px",
            background: "transparent", color: PINK, border: `1.5px solid rgba(244,114,182,0.25)`,
            borderRadius: 50, fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 600, textDecoration: "none",
          }}>Our Services ↓</a>
        </div>

        <div style={{ display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "center" }}>
          {[{ v: "Eco-Safe", l: "Cleaning Products" }, { v: "Free", l: "On-Site Estimates" }, { v: "100%", l: "Satisfaction Guarantee" }].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 700, color: LIGHT }}>{s.v}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: GRAY, letterSpacing: 1, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: "🏠", title: "House Exterior Washing", desc: "Remove years of dirt, mold, and mildew from stucco, vinyl, brick, and painted surfaces.", price: "From $299" },
    { icon: "🛣️", title: "Driveway & Sidewalk", desc: "Blast away oil stains, tire marks, algae, and grime from concrete and pavers.", price: "From $199" },
    { icon: "🏊", title: "Pool Deck & Patio", desc: "Restore slip-prone, algae-covered pool decks to clean, safe surfaces.", price: "From $149" },
    { icon: "🏢", title: "Commercial Properties", desc: "Storefronts, parking lots, loading docks, and building exteriors. Flexible scheduling.", price: "Custom quote" },
    { icon: "🏡", title: "Roof Soft Washing", desc: "Low-pressure treatment that safely removes black streaks and algae without damaging shingles.", price: "From $399" },
    { icon: "🧱", title: "Fence & Wall Cleaning", desc: "Wood, vinyl, and concrete fences and retaining walls restored to original condition.", price: "From $149" },
  ];

  return (
    <section id="services" style={{ background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 30%, ${DARK2} 70%, ${DARK} 100%)`, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>What We Clean</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: 0 }}>Pressure Washing Services</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {items.map(it => (
            <div key={it.title} style={{
              background: DARK3, borderRadius: 16, padding: "28px", border: "1px solid rgba(255,255,255,0.03)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 30 }}>{it.icon}</span>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600, color: BLUE }}>{it.price}</span>
              </div>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 600, color: LIGHT, margin: "0 0 6px" }}>{it.title}</h4>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, lineHeight: 1.6, margin: 0 }}>{it.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY, marginBottom: 20 }}>Need multiple surfaces cleaned? Ask about our <span style={{ color: PINK, fontWeight: 600 }}>bundle discounts</span>.</p>
          <PhoneBtn />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    { icon: "💧", title: "South Florida Specialists", desc: "We understand Miami's unique climate — humidity, salt air, and tropical storms. Our methods are built for it." },
    { icon: "🌿", title: "Eco-Friendly Products", desc: "Biodegradable cleaning solutions that are tough on grime but safe for your landscaping and pets." },
    { icon: "⚡", title: "Same-Week Scheduling", desc: "Fast turnaround without cutting corners. Most jobs completed within 2-4 hours." },
    { icon: "🛡️", title: "Licensed & Insured", desc: "Full liability coverage on every job. Your property is protected." },
  ];

  return (
    <section id="whyus" style={{ background: DARK, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Why Choose Us</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: LIGHT, margin: 0 }}>Built for Miami's Climate</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16 }}>
          {reasons.map(r => (
            <div key={r.title} style={{ background: DARK3, borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, color: LIGHT, margin: "0 0 6px" }}>{r.title}</h4>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const a = ["Miami", "Miami Beach", "Coral Gables", "Hialeah", "Doral", "Kendall", "Homestead", "Aventura", "North Miami", "Brickell", "Wynwood", "Coconut Grove", "Key Biscayne", "Pinecrest", "Palmetto Bay", "Little Havana"];
  return (
    <section id="areas" style={{ background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 30%, ${DARK2} 70%, ${DARK} 100%)`, padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Coverage</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: LIGHT, margin: "0 0 24px" }}>Pressure Washing All of Miami-Dade</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {a.map(x => (
            <span key={x} style={{ padding: "7px 16px", borderRadius: 50, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 500, color: "#CBD5E1" }}>{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ background: `linear-gradient(180deg, ${DARK} 0%, rgba(125,211,252,0.06) 25%, rgba(244,114,182,0.03) 75%, ${DARK} 100%)`, padding: "80px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💦</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Make It Look Brand New</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 32 }}>
          Free estimates on all residential and commercial pressure washing. Call now — your property will thank you.
        </p>
        <PhoneBtn />
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginTop: 20 }}>
          or visit <a href="https://magiccityservicesmiami.com" style={{ color: PINK, textDecoration: "none", fontWeight: 600 }}>magiccityservicesmiami.com</a> for all our services
        </p>
      </div>
    </section>
  );
}

function Footer() {
  const otherServices = [
    { name: "Junk Removal", desc: "Cleanouts, hauling & debris removal", icon: "🚛", url: "https://magiccityjunkremovalmiami.com" },
    { name: "Mobile Detailing", desc: "Showroom-quality results at your door", icon: "✨", url: "https://magiccitydetailingmiami.com" },
  ];
  return (
    <>
      <section style={{ background: `linear-gradient(180deg, ${DARK} 0%, #1A1035 30%, #1A1035 70%, ${DARK} 100%)`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>More from Magic City</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: LIGHT, margin: "0 0 8px" }}>Explore All Our Services</h3>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: GRAY, marginBottom: 32 }}>One company. Three services. All of Miami-Dade covered.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
            {otherServices.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(244,114,182,0.12)", borderRadius: 16, padding: "24px 20px", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = PINK; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(244,114,182,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(244,114,182,0.12)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 700, color: LIGHT, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginBottom: 12 }}>{s.desc}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600, color: PINK }}>Learn More →</div>
              </a>
            ))}
          </div>
          <a href="https://magiccityservicesmiami.com" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", background: `linear-gradient(135deg, ${PINK}, #E04DA0)`, borderRadius: 50, textDecoration: "none", fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 20px rgba(244,114,182,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 30px rgba(244,114,182,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(244,114,182,0.3)"; }}>
            View All Magic City Services
          </a>
        </div>
      </section>
      <footer style={{ background: DARK, padding: "40px 24px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: PINK }}>MAGIC CITY</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, color: BLUE, letterSpacing: 2 }}>PRESSURE WASHING</div>
          </div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "#475569" }}>© 2026 Magic City Services LLC — Licensed & Insured — Miami-Dade, FL</span>
        </div>
      </footer>
    </>
  );
}


// ==================== BOOKING SYSTEM ====================

const FORMSPREE_BOOKING = "https://formspree.io/f/xqeyrgno";
const FORMSPREE_QUOTE = "https://formspree.io/f/xyknrbor";
const bookingPackages = [
    { name: "Driveway / Sidewalk", price: 199, desc: "Standard driveway or sidewalk cleaning" },
    { name: "House Exterior", price: 349, desc: "Full house exterior soft wash" },
    { name: "Full Property", price: 649, desc: "Driveway + house + patio + pool deck" },
];
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

function BookingInput({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: GRAY, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      <input {...props} style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: LIGHT, fontFamily: "'Outfit',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box", ...props.style }}
        onFocus={e => e.target.style.borderColor = "#7DD3FC55"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
    </div>
  );
}

function BookingSystem() {
  const [tab, setTab] = useState("book");
  const [step, setStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", date: "", time: "", vehicle: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleBooking = async () => {
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_BOOKING, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New Booking: Pressure Washing — " + selectedPkg.name,
          service: "Pressure Washing", package: selectedPkg.name, packagePrice: "$" + selectedPkg.price,
          ...form,
        }),
      });
      setSubmitted(true);
    } catch (e) { alert("Something went wrong. Please call us at " + PHONE); }
    setSubmitting(false);
  };

  const handleQuote = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      await fetch(FORMSPREE_QUOTE, { method: "POST", body: new FormData(e.target) });
      setQuoteSubmitted(true);
    } catch (e) { alert("Something went wrong. Please call us at " + PHONE); }
    setSubmitting(false);
  };

  const tabBtn = (id, label, icon) => (
    <button onClick={() => { setTab(id); setStep(1); setSelectedPkg(null); setSubmitted(false); setQuoteSubmitted(false); }}
      style={{ flex: 1, padding: "14px 12px", borderRadius: 12, border: "none", cursor: "pointer",
        background: tab === id ? PINK : "rgba(255,255,255,0.04)", color: tab === id ? "#fff" : GRAY,
        fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
      <span style={{ fontSize: 18 }}>{icon}</span> {label}
    </button>
  );

  if (submitted) {
    return (
      <section id="book" style={{ background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 30%, ${DARK2} 70%, ${DARK} 100%)`, padding: "80px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", background: DARK3, borderRadius: 24, padding: "44px 28px", border: "1px solid rgba(244,114,182,0.15)" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Booking Confirmed!</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 8 }}>
            We've received your booking for <strong style={{ color: PINK }}>{selectedPkg?.name}</strong>.
          </p>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY, lineHeight: 1.7, marginBottom: 32 }}>
            You'll receive a confirmation call within 30 minutes during business hours.
          </p>
          <PhoneBtn />
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginTop: 24, cursor: "pointer" }} onClick={() => { setSubmitted(false); setStep(1); setSelectedPkg(null); }}>← Book another service</p>
        </div>
      </section>
    );
  }

  return (
    <section id="book" style={{ background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 35%, ${DARK2} 65%, ${DARK} 100%)`, padding: "80px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Get Started</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Book Your Pressure Washing</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY }}>Book online, request a custom quote, or call us directly.</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, padding: "8px", background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)" }}>
          {tabBtn("book", "Book Online", "📅")}
          {tabBtn("quote", "Get a Quote", "📝")}
          {tabBtn("call", "Call Now", "📞")}
        </div>

        {/* ====== BOOK TAB ====== */}
        {tab === "book" && (
          <div style={{ background: DARK3, borderRadius: 24, padding: "28px 28px", border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" }}>
            {/* Progress */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
              {["Package", "Date & Time", "Your Info"].map((s, i) => (
                <div key={s} style={{ flex: 1 }}>
                  <div style={{ height: 3, borderRadius: 2, background: step > i ? PINK : "rgba(255,255,255,0.06)", transition: "background 0.3s" }} />
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, color: step > i ? PINK : GRAY, marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{s}</div>
                </div>
              ))}
            </div>

            {/* Step 1: Package */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 600, color: LIGHT, margin: "0 0 16px" }}>Select a package:</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {bookingPackages.map(p => (
                    <button key={p.name} onClick={() => { setSelectedPkg(p); setStep(2); }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = PINK + "44"; e.currentTarget.style.background = PINK + "08"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                      <div>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, color: LIGHT }}>{p.name}</div>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY }}>{p.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 700, color: PINK }}>${p.price}</div>
                        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: BLUE }}>Free estimate</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: GRAY, fontFamily: "'Outfit',sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 16 }}>← Back</button>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 600, color: LIGHT, margin: "0 0 16px" }}>When works best?</h3>
                <BookingInput label="Preferred Date" type="date" min={minDate} value={form.date} onChange={e => update("date", e.target.value)} />
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: GRAY, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Preferred Time</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => update("time", t)}
                        style={{ padding: "9px 14px", borderRadius: 10, cursor: "pointer",
                          background: form.time === t ? PINK : "rgba(255,255,255,0.03)",
                          border: form.time === t ? "none" : "1px solid rgba(255,255,255,0.06)",
                          color: form.time === t ? "#fff" : GRAY,
                          fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, transition: "all 0.15s" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => { if (form.date && form.time) setStep(3); else alert("Please select a date and time."); }}
                  style={{ width: "100%", padding: "14px", borderRadius: 50, border: "none", background: (form.date && form.time) ? PINK : GRAY, color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                  Continue →
                </button>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <div>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: GRAY, fontFamily: "'Outfit',sans-serif", fontSize: 13, cursor: "pointer", marginBottom: 16 }}>← Back</button>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 600, color: LIGHT, margin: "0 0 6px" }}>Almost done!</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginBottom: 16 }}>
                  {selectedPkg?.name} — {form.date} at {form.time}
                </p>
                <div style={{ background: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.12)", borderRadius: 14, padding: "14px 18px", marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, color: LIGHT }}>💦 {selectedPkg?.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: PINK }}>${selectedPkg?.price}</div>
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: BLUE }}>Price after on-site estimate</div>
                    </div>
                  </div>
                </div>
                <BookingInput label="Full Name" type="text" placeholder="Your full name" value={form.name} onChange={e => update("name", e.target.value)} />
                <BookingInput label="Phone" type="tel" placeholder="(305) 000-0000" value={form.phone} onChange={e => update("phone", e.target.value)} />
                <BookingInput label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                <BookingInput label="Service Address" type="text" placeholder="Full address in Miami-Dade" value={form.address} onChange={e => update("address", e.target.value)} />
                
                <button onClick={handleBooking} disabled={submitting || !form.name || !form.phone || !form.email || !form.address}
                  style={{ width: "100%", padding: "15px", borderRadius: 50, border: "none",
                    background: `linear-gradient(135deg, ${PINK}, #E04DA0)`, color: "#fff",
                    fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8, opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? "Submitting..." : "Book Free On-Site Estimate"}
                </button>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: GRAY, textAlign: "center", marginTop: 14 }}>
                  We'll confirm within 30 minutes during business hours.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ====== QUOTE TAB ====== */}
        {tab === "quote" && (
          <div style={{ background: DARK3, borderRadius: 24, padding: "28px 28px", border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" }}>
            {quoteSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 600, color: LIGHT, margin: "0 0 8px" }}>Quote Request Received!</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY, marginBottom: 20 }}>We'll get back to you within the hour.</p>
                <PhoneBtn />
              </div>
            ) : (
              <form onSubmit={handleQuote}>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 600, color: LIGHT, margin: "0 0 6px" }}>Request a Free Quote</h3>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: GRAY, marginBottom: 20 }}>Need a custom quote for your property? Describe the surfaces and we'll get back to you within the hour.</p>
                <input type="hidden" name="_subject" value="Quote Request — Magic City Pressure Washing" />
                <input type="hidden" name="service" value="Pressure Washing" />
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: GRAY, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Describe Your Project</label>
                  <textarea name="description" rows={4} required placeholder="Tell us about the job..."
                    style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: LIGHT, fontFamily: "'Outfit',sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box", resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = PINK + "55"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <BookingInput label="Full Name" name="name" type="text" placeholder="Your name" required />
                  <BookingInput label="Phone" name="phone" type="tel" placeholder="(305) 000-0000" required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <BookingInput label="Email" name="email" type="email" placeholder="your@email.com" required />
                  <BookingInput label="Address / Zip" name="address" type="text" placeholder="Miami, FL 33101" />
                </div>
                <button type="submit" disabled={submitting}
                  style={{ width: "100%", padding: "15px", borderRadius: 50, border: "none",
                    background: `linear-gradient(135deg, ${PINK}, #E04DA0)`, color: "#fff",
                    fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8, opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? "Sending..." : "Submit Quote Request"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ====== CALL TAB ====== */}
        {tab === "call" && (
          <div style={{ background: DARK3, borderRadius: 24, padding: "36px 28px", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📞</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Talk to Us Now</h3>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY, lineHeight: 1.7, marginBottom: 28, maxWidth: 380, margin: "0 auto 28px" }}>
              Available 7 days a week for immediate quotes, same-day service, or any questions.
            </p>
            <a href={`tel:${PHONE.replace(/[^0-9]/g, "")}`} style={{
              display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 44px",
              background: `linear-gradient(135deg, ${PINK}, #E04DA0)`, color: "#fff",
              borderRadius: 50, fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 700,
              textDecoration: "none" }}>
              {PHONE}
            </a>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
              {[{ label: "Mon – Sat", value: "7am – 7pm" }, { label: "Sunday", value: "9am – 5pm" }, { label: "Emergency", value: "Call anytime" }].map(h => (
                <div key={h.label}>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, color: LIGHT }}>{h.value}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: GRAY }}>{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function PressureWashingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0}
        html{scroll-behavior:smooth}body{background:${DARK}}
        ::selection{background:${BLUE}44;color:#fff}
        @media (max-width: 768px) {
          .nav-center-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .nav-phone-btn { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        input, textarea, select, button { max-width: 100%; box-sizing: border-box; }
        .pac-container { background: #1E293B !important; border: 1px solid rgba(244,114,182,0.15) !important; border-radius: 12px !important; margin-top: 4px !important; font-family: "Outfit", sans-serif !important; box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important; }
        .pac-item { padding: 10px 16px !important; border-top: 1px solid rgba(255,255,255,0.06) !important; color: #F8FAFC !important; cursor: pointer !important; font-size: 14px !important; }
        .pac-item:hover { background: rgba(244,114,182,0.08) !important; }
        .pac-item-query { color: #F472B6 !important; font-weight: 600 !important; }
        .pac-matched { color: #7DD3FC !important; }
        .pac-icon { display: none !important; }
        .pac-item-selected { background: rgba(244,114,182,0.12) !important; }
        }
      `}</style>
      <Nav /><Hero /><Services /><WhyUs /><BookingSystem /><Areas /><CTA /><Footer />
    </>
  );
}
