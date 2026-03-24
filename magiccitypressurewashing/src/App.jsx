import { useState } from "react";

const PINK = "#F472B6";
const BLUE = "#7DD3FC";
const DARK = "#0B1120";
const DARK2 = "#111827";
const DARK3 = "#1E293B";
const LIGHT = "#F8FAFC";
const GRAY = "#94A3B8";
const PHONE = "(305) 555-0199";

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

function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,17,32,0.95)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(125,211,252,0.08)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 max(20px,4vw)" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
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
        <PhoneBtn />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `linear-gradient(165deg, ${DARK} 0%, #0B1E30 40%, #0A1628 100%)`,
      position: "relative", overflow: "hidden", padding: "100px max(20px,4vw) 60px",
    }}>
      <div style={{ position: "absolute", top: "5%", right: "-10%", width: "55vw", height: "55vw", background: `radial-gradient(circle, rgba(125,211,252,0.06) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: "35vw", height: "35vw", background: `radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>
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

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(15px,1.8vw,19px)", color: GRAY, lineHeight: 1.7, maxWidth: 540, marginBottom: 32 }}>
          Driveways, patios, building exteriors, roofs, and more — restored to like-new condition. Miami's humidity, mold, and algae don't stand a chance.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <PhoneBtn />
          <a href="#services" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px",
            background: "transparent", color: PINK, border: `1.5px solid rgba(244,114,182,0.25)`,
            borderRadius: 50, fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 600, textDecoration: "none",
          }}>Our Services ↓</a>
        </div>

        <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
          {[{ v: "Eco-Safe", l: "Cleaning Products" }, { v: "Free", l: "On-Site Estimates" }, { v: "100%", l: "Satisfaction Guarantee" }].map(s => (
            <div key={s.l}>
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
    { icon: "🏠", title: "House Exterior Washing", desc: "Remove years of dirt, mold, and mildew from stucco, vinyl, brick, and painted surfaces.", price: "From $199" },
    { icon: "🛣️", title: "Driveway & Sidewalk", desc: "Blast away oil stains, tire marks, algae, and grime from concrete and pavers.", price: "From $129" },
    { icon: "🏊", title: "Pool Deck & Patio", desc: "Restore slip-prone, algae-covered pool decks to clean, safe surfaces.", price: "From $149" },
    { icon: "🏢", title: "Commercial Properties", desc: "Storefronts, parking lots, loading docks, and building exteriors. Flexible scheduling.", price: "Custom quote" },
    { icon: "🏡", title: "Roof Soft Washing", desc: "Low-pressure treatment that safely removes black streaks and algae without damaging shingles.", price: "From $299" },
    { icon: "🧱", title: "Fence & Wall Cleaning", desc: "Wood, vinyl, and concrete fences and retaining walls restored to original condition.", price: "From $99" },
  ];

  return (
    <section id="services" style={{ background: DARK2, padding: "80px max(20px,4vw)" }}>
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
    <section style={{ background: DARK, padding: "80px max(20px,4vw)" }}>
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
    <section style={{ background: DARK2, padding: "80px max(20px,4vw)" }}>
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
    <section style={{ background: `linear-gradient(135deg, ${BLUE}18, ${PINK}0D)`, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💦</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Make It Look Brand New</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 32 }}>
          Free estimates on all residential and commercial pressure washing. Call now — your property will thank you.
        </p>
        <PhoneBtn />
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginTop: 20 }}>
          or visit <a href="https://magiccityservices.com" style={{ color: PINK, textDecoration: "none", fontWeight: 600 }}>magiccityservices.com</a> for all our services
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK, padding: "40px max(20px,4vw) 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: PINK }}>MAGIC CITY</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, color: BLUE, letterSpacing: 2 }}>PRESSURE WASHING</div>
        </div>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "#475569" }}>© 2026 Magic City Services LLC — Licensed & Insured — Miami-Dade, FL</span>
      </div>
    </footer>
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
      `}</style>
      <Nav /><Hero /><Services /><WhyUs /><Areas /><CTA /><Footer />
    </>
  );
}
