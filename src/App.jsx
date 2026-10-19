import { useState } from "react";
import { Page, Promo, Nav, Hero, Tiles, How, Booking, Pricing, PriceList, Areas, Band, Footer, MemberSignup, goTo, ArrowIcon } from "./SiteKit";

/*
  MAGIC CITY PRESSURE WASHING — v4 (Oct 2026 redesign)
  Layout and booking live in SiteKit.jsx (shared with the other Magic City sites).
  Deposit amounts are enforced server-side in api/create-checkout.js.
*/

const PACKAGES = [
  { name: "Driveway / Sidewalk", price: "$250", deposit: 50, note: "Up to ~1,000 sq ft; larger priced by size", tag: null },
  { name: "House Exterior (1-Story)", price: "$350-$450", deposit: 75, note: "Stucco, siding, brick, painted", tag: null },
  { name: "House Exterior (2-Story)", price: "$600-$900", deposit: 250, note: "Full two-story exterior wash", tag: null },
  { name: "Pool Deck / Patio", price: "$200", deposit: 50, note: "Up to ~600 sq ft; pavers, concrete, stone", tag: null },
  { name: "Roof Soft Wash (Shingle)", price: "$449+", deposit: 225, note: "Safe low-pressure cleaning", tag: null },
  { name: "Roof Soft Wash (Tile)", price: "$549+", deposit: 275, note: "Tile-safe chemical treatment", tag: null },
  { name: "Roof Soft Wash (2-Story Tile)", price: "$799+", deposit: 400, note: "Two-story tile roof wash", tag: null },
  { name: "Full Property Package", price: "$1,199+", deposit: 600, note: "Driveway + house + roof + deck", tag: "Best Value" },
  { name: "Fence / Wall Cleaning", price: "$200", deposit: 40, note: "Wood, vinyl, concrete, stucco", tag: null },
];

const PW_SERVICES = [
  { icon: "🏠", name: "House Washing", desc: "Soft wash for siding, stucco, brick & painted surfaces" },
  { icon: "🚗", name: "Driveway & Sidewalk", desc: "High-pressure surface cleaning for concrete & pavers" },
  { icon: "🏊", name: "Pool Decks & Patios", desc: "Remove algae, mold, and staining from outdoor surfaces" },
  { icon: "🏗️", name: "Roof Soft Wash", desc: "Safe chemical treatment for shingle & tile roofs" },
  { icon: "🏢", name: "Commercial Properties", desc: "Storefronts, parking lots, common areas" },
  { icon: "🧱", name: "Fences & Walls", desc: "Restore wood, vinyl, and concrete fences" },
];

const PACKAGE_SPECS = {
  "Driveway / Sidewalk": {
    time: "1-2 hours",
    items: [
      "Full surface pressure wash (up to 4,500 PSI commercial-grade equipment)",
      "Pre-treatment with degreaser for oil and grease stains",
      "Edge-to-edge cleaning (driveway, walkways, and connected sidewalks)",
      "Weed and debris removal from expansion joints and cracks",
      "Mold, mildew, and algae treatment",
      "Rinse and drainage management (water directed away from home and landscaping)",
      "Final walk-through inspection",
    ],
  },
  "House Exterior (1-Story)": {
    time: "2-3 hours",
    items: [
      "Full soft wash of all exterior walls (low-pressure with professional cleaning solution)",
      "Mold, mildew, algae, and dirt buildup removal",
      "Eave and soffit cleaning",
      "Fascia board cleaning",
      "Exterior window frame rinse",
      "Downspout exterior rinse",
      "Front porch / entryway wash",
      "Garage door exterior wash",
      "Foundation base rinse",
      "Landscaping protection (pre-soak plants, cover sensitive areas)",
      "Final walk-through inspection",
    ],
  },
  "House Exterior (2-Story)": {
    time: "3-5 hours",
    tierUp: "Everything in 1-Story House Exterior, PLUS:",
    items: [
      "Extended-reach soft wash for second-story walls, eaves, and soffits",
      "Upper-level window frame rinse",
      "Balcony / upper deck railing wash (if accessible)",
      "Additional time and equipment for height access",
      "Price varies based on total square footage and level of buildup",
    ],
  },
  "Pool Deck / Patio": {
    time: "1-2 hours",
    items: [
      "Full pressure wash of pool deck surface (pavers, concrete, tile, or stone)",
      "Patio and sitting area cleaning",
      "Mold and algae removal (especially in shaded/wet areas)",
      "Expansion joint and grout line cleaning",
      "Screen enclosure frame rinse (if applicable)",
      "Surrounding walkway cleaning",
      "Debris removal and rinse-off",
      "Final inspection",
    ],
  },
  "Roof Soft Wash (Shingle)": {
    time: "2-3 hours",
    items: [
      "Low-pressure soft wash application (NO high-pressure on shingles)",
      "Professional-grade algae, mold, and lichen treatment solution",
      "Full roof surface treatment (all shingle faces)",
      "Ridge cap and peak cleaning",
      "Gutter exterior face rinse",
      "Rinse and runoff management to protect landscaping",
      "Prevents black streaks from returning for 12-18 months",
      "Final visual inspection from ground level",
    ],
  },
  "Roof Soft Wash (Tile)": {
    time: "2-4 hours",
    tierUp: "Everything in Shingle Roof Wash, PLUS:",
    items: [
      "Tile-safe low-pressure chemical treatment",
      "Mold and organic growth removal between tile ridges",
      "Barrel tile and flat tile compatible",
      "Higher solution concentration for heavy South Florida buildup",
    ],
  },
  "Roof Soft Wash (2-Story Tile)": {
    time: "3-5 hours",
    tierUp: "Everything in Tile Roof Wash, PLUS:",
    items: [
      "Extended reach and equipment for two-story height",
      "Additional safety measures and setup time",
      "Full upper and lower roof plane coverage",
    ],
  },
  "Full Property Package": {
    time: "5-8 hours (may require full day)",
    items: [
      "Driveway and sidewalk pressure wash",
      "Full house exterior soft wash (1 or 2 story)",
      "Pool deck / patio cleaning",
      "Roof soft wash",
      "Fence / wall cleaning (if applicable)",
      "Walkways, pathways, and entryway cleaning",
      "Garage floor rinse",
      "Trash can area rinse",
      "Full property walk-through and final inspection",
      "Best value — saves $200-$400+ vs. booking individually",
    ],
  },
  "Fence / Wall Cleaning": {
    time: "1-1.5 hours",
    items: [
      "Full pressure wash of fence (wood, vinyl, aluminum, or chain-link)",
      "Both sides cleaned (where accessible)",
      "Mold, mildew, and green algae removal",
      "Gate and post cleaning",
      "Retaining wall and perimeter wall cleaning (if applicable)",
      "Final inspection",
    ],
  },
};

const PW_ADDON_SPECS = {
  "Gutter Cleaning": {
    price: "$95 (1-story) / $150 (2-story)",
    items: [
      "Remove leaves, debris, and buildup from all gutters",
      "Downspout flush to ensure proper drainage",
      "Gutter exterior face rinse",
      "Debris bagged and removed",
    ],
  },
  "Window Washing": {
    price: "$10/window ($150 min)",
    items: [
      "Interior and exterior glass cleaning (streak-free)",
      "Frame and sill wipe-down",
      "Screen dusting",
      "Most homes: 15-25 windows = $150-$250",
    ],
  },
  "Concrete Sealing": {
    price: "$1.50/sq ft ($600 min)",
    items: [
      "Applied after pressure wash (surface must be clean and dry)",
      "Clear or wet-look sealant options",
      "Protects against staining, mold regrowth, and UV damage",
      "Lasts 1-3 years depending on traffic and exposure",
    ],
  },
  "Roof Tile Sealing": {
    price: "$1.25/sq ft clear · $2.50/sq ft coated",
    items: [
      "Applied after soft wash (surface must be clean and dry)",
      "Prevents moisture absorption and algae regrowth",
      "Clear sealer ($1.25/sq ft) does not change tile appearance; colored waterproof coating available ($2.50/sq ft)",
    ],
  },
};

const PROPERTY_SIZE_NOTE = "All prices listed are for standard single-family homes up to approximately 2,000 sq ft. Larger properties, commercial buildings, multi-unit residences, and HOA common areas may require custom quotes.";

const PHONE = "3057833133";
const PHONE_DISPLAY = "(305) 783-3133";

const TILES = [
  { name: "Driveways & walkways", from: "From $250", pkg: 0, img: "/images/v4/pressure-washing-driveway", cta: "Book a driveway", blurb: "Pavers and concrete brought back from black mildew, oil and tire marks." },
  { name: "House washing", from: "From $350", pkg: 1, img: "/images/v4/house-washing", cta: "Book a house wash", blurb: "Soft wash for stucco, siding and painted walls. Safe on paint and plants." },
  { name: "Roof soft wash", from: "From $449", pkg: 4, img: "/images/v4/roof-soft-wash", cta: "Book a roof wash", blurb: "Low-pressure cleaning that clears black algae streaks from shingle and tile." },
  { name: "Pool decks & patios", from: "From $200", pkg: 3, img: "/images/v4/pool-deck", cta: "Book a pool deck", blurb: "Travertine, pavers and concrete cleaned of algae and slippery buildup." },
];

const HOME_PLANS = [
  { id: "curb_appeal", name: "Curb Appeal", label: "Home Plan: Curb Appeal", monthly: 95, worth: 1350,
    items: ["Driveway and walkways washed every 3 months", "Full house wash once a year"] },
  { id: "full_exterior", name: "Full Exterior", label: "Home Plan: Full Exterior", monthly: 139, worth: 1940, featured: true,
    items: ["Everything in Curb Appeal", "Pool deck or patio washed twice a year", "Gutters cleaned twice a year"] },
  { id: "estate", name: "Estate", label: "Home Plan: Estate", monthly: 189, worth: 2690,
    items: ["Everything in Full Exterior", "Roof soft wash once a year", "Windows washed once a year"] },
];

const MEMBER_PERKS = [
  ["Price lock", "Your monthly rate stays the same for as long as you're a member."],
  ["First call after storms", "Priority scheduling for post-storm cleanups during hurricane season."],
  ["Free touch-ups", "If something isn't right, we come back within 7 days at no charge."],
  ["15% off everything else", "Member pricing on extra washes, junk removal and mobile detailing."],
  ["$100 off holiday lights", "Off any Magic City holiday lighting install."],
  ["Priority booking", "Members book first and get the same crew whenever possible."],
];

export default function PressureWashingSite() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [tab, setTab] = useState("book");
  const [openKey, setOpenKey] = useState(null);
  const [quoteValue, setQuoteValue] = useState(null);
  const [homePlan, setHomePlan] = useState("full_exterior");
  const joinPlan = (id) => { setHomePlan(id); goTo("signup"); };

  const pick = (t) => { setSelectedPkg(t.pkg); setTab("book"); goTo("booking"); };
  const askPlan = () => { setQuoteValue("Home Exterior Plan"); setTab("quote"); goTo("booking"); };
  const SHORT = { "Gutter Cleaning": "From $95", "Window Washing": "$10/window", "Concrete Sealing": "$1.50/sq ft", "Roof Tile Sealing": "From $1.25/sq ft" };
  const addons = Object.keys(PW_ADDON_SPECS).map(n => ({ name: n, price: SHORT[n] || PW_ADDON_SPECS[n].price, note: PW_ADDON_SPECS[n].price }));

  return (
    <Page>
      <Promo />
      <Nav sub="Pressure Washing" phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        links={[{ id: "services", label: "Services" }, { id: "pricing", label: "Pricing" }, { id: "plan", label: "Home plans" }, { id: "areas", label: "Areas" }]} />

      <Hero
        img="/images/v4/hero-house-softwash.webp"
        mobileImg="/images/v4/hero-house-softwash-mobile.webp"
        alt="Technician soft-washing the stucco wall of a two-story Miami home at sunset"
        where="Miami-Dade, Broward and Palm Beach"
        title="Pressure washing for South Florida homes"
        copy="Driveways, house walls, roofs and pool decks cleaned of mildew and algae. See the starting price, pay a small deposit to hold your date, and we handle the rest."
        bookLabel="Book a wash"
        phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        facts={[["Soft wash for roofs and walls", "Low pressure that won't damage paint or tile"], ["Prices up front", "Starting prices posted for every package"], ["Hablamos español", "Call or book in Spanish"]]}
      />

      <Tiles id="services" heading="What we clean" lede="Tap a service to start a booking with that package picked. Bigger property or commercial job? Ask for a free quote."
        tiles={TILES} onPick={pick} />

      <How img="/images/v4/tech-and-homeowners" alt="Technician showing homeowners their freshly cleaned driveway" />

      <Booking service="Pressure Washing" siteName="magiccitypressurewashingmiami.com" heading="Book your wash"
        intro="Choose what you need cleaned and a time, then pay a small deposit to hold it. Prices are for homes up to about 2,000 sq ft; larger properties get a free quote."
        packages={PACKAGES} selectedPkg={selectedPkg} setSelectedPkg={setSelectedPkg} tab={tab} setTab={setTab}
        phone={PHONE} phoneDisplay={PHONE_DISPLAY} quoteValue={quoteValue}
        quoteOptions={["Driveway or walkways", "House wash", "Roof soft wash", "Pool deck or patio", "Full property", "Home Exterior Plan", "Commercial or HOA", "Something else"]}
        quotePrompt="Tell us about the property" quotePlaceholder="What needs cleaning, rough size, 1 or 2 stories. Photos help: you can text them to us after." />

      <Pricing heading="Pressure washing prices" lede="Starting prices for single-family homes up to about 2,000 sq ft. Your exact price is confirmed before any work starts."
        img="/images/v4/roof-soft-wash" imgAlt="Roof soft wash in progress">
        <PriceList packages={PACKAGES} specs={PACKAGE_SPECS} openKey={openKey} setOpenKey={setOpenKey} />
        <h3 className="subhead">Add-ons</h3>
        <p className="subnote">Added to any wash. Ask when you book or on your quote.</p>
        <PriceList packages={addons} specs={PW_ADDON_SPECS} openKey={openKey} setOpenKey={setOpenKey} prefix="addon_" />
        <p className="fine">{PROPERTY_SIZE_NOTE}</p>
      </Pricing>

      <section id="plan" className="section member">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Home Exterior Plans</h2>
            <p className="lede">Your home kept washed all year on a set schedule, for about 15% less than booking each visit. Cancel anytime.</p>
          </div>
          <div className="member-grid member-grid-3">
            {HOME_PLANS.map(p => (
              <div key={p.id} className={"plan" + (p.featured ? " is-featured" : "")}>
                <h3>{p.name}</h3>
                <p className="plan-price">${p.monthly}<small>/month</small></p>
                <p className="plan-worth">Worth ${p.worth.toLocaleString()} a year at regular prices. You pay ${(p.monthly * 12).toLocaleString()}.</p>
                <ul className="checks">{p.items.map(i => <li key={i}>{i}</li>)}</ul>
                <button className={"btn " + (p.featured ? "btn-pink" : "btn-outline")} onClick={() => joinPlan(p.id)}>
                  <span className="btn-label">Choose {p.name}</span>
                  <span className="btn-icon"><ArrowIcon /></span>
                </button>
              </div>
            ))}
          </div>
          <h3 className="subhead">Every plan includes</h3>
          <ul className="info-grid perks">
            {MEMBER_PERKS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ul>
          <p className="member-fine">For homes up to about 2,000 sq ft. Bigger home or a business? <button type="button" className="link" onClick={askPlan}>Get a quote</button>. Cancel anytime; if you cancel after getting more service than you've paid for, we bill the difference at member prices.</p>
          <MemberSignup kind="home" plans={HOME_PLANS} plan={homePlan} setPlan={setHomePlan} phoneDisplay={PHONE_DISPLAY} onQuote={askPlan} siteName="magiccitypressurewashingmiami.com" />
        </div>
      </section>

      <section className="section info alt">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Homes and businesses</h2>
            <p className="lede">Residential, commercial and HOA properties across South Florida.</p>
          </div>
          <ul className="info-grid">
            {PW_SERVICES.map(c => <li key={c.name}><h3>{c.name}</h3><p>{c.desc}</p></li>)}
          </ul>
        </div>
      </section>

      <Areas />
      <Band phone={PHONE} phoneDisplay={PHONE_DISPLAY} onQuote={() => { setTab("quote"); goTo("booking"); }} />
      <Footer sub="Pressure Washing" current="Pressure Washing" phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        about="Magic City Pressure Washing cleans driveways, homes, roofs and pool decks across South Florida with vetted, insured local crews. Part of Magic City Services." />
    </Page>
  );
}
