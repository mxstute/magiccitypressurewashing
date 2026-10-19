/*
  MAGIC CITY SITE KIT v4 (Oct 2026)
  Shared layout, booking and styling for the niche sites. Same design system as the hub
  (magiccityservicesmiami.com). This file is identical across the junk removal, pressure
  washing and detailing repos; change it in one, copy it to the others.
  Deposit amounts are enforced server-side in api/create-checkout.js.
*/
import { useState, useEffect } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

export function trackPhoneClick() { if (typeof gtag === "function") gtag("event", "conversion", { send_to: "AW-18078412608/XZo5CJzT3OccEMDeuqxD" }); }

export const AREAS = [
  "Miami Beach", "Brickell", "Coral Gables", "Kendall", "Doral", "Hialeah",
  "Coconut Grove", "Aventura", "Hollywood", "Fort Lauderdale", "Pembroke Pines",
  "Weston", "Boca Raton", "West Palm Beach", "Homestead", "Miami Gardens",
];

export const SITES = [
  { name: "Junk Removal", href: "https://magiccityjunkremovalmiami.com" },
  { name: "Pressure Washing", href: "https://magiccitypressurewashingmiami.com" },
  { name: "Mobile Detailing", href: "https://magiccitydetailingmiami.com" },
  { name: "Holiday Lighting", href: "https://magiccityservicesmiami.com/holiday-lighting" },
];

const TIMES = [];
for (let h = 7; h <= 21; h++) {
  for (let m = 0; m < 60; m += 15) {
    if (h === 21 && m > 0) break;
    const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    const label = `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
    let tag = "";
    if (h < 8) tag = " (Early Bird +$25)";
    else if (h >= 18) tag = " (After Hours +$25)";
    TIMES.push({ value: label, label: label + tag });
  }
}

const ADDRESS_INPUT = { padding: "12px", minHeight: "48px", borderRadius: 0, border: "1px solid rgba(163,174,194,0.16)", background: "#090E1A", fontSize: "16px", fontFamily: "inherit" };

export const STEPS = [
  { title: "Pick your package", text: "Choose it online, or call and we'll quote it for free." },
  { title: "Hold your time with a deposit", text: "A small deposit locks in your date. The amount shows before you pay." },
  { title: "A vetted, insured pro shows up", text: "We send the right crew for the job and confirm before they arrive." },
  { title: "Pay the rest when it's done", text: "The balance is due only after the job is finished and you're happy with it." },
];

export const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export function Logo({ sub }) {
  return (
    <a href="/" className="logo" aria-label={`Magic City ${sub} home`}>
      <span className="logo-mark" aria-hidden="true">
        {[10, 16, 12, 18].map((h, i) => (
          <span key={i} style={{ height: h, background: i % 2 === 0 ? "var(--pink)" : "linear-gradient(180deg, var(--sky), var(--pink))" }} />
        ))}
      </span>
      <span className="logo-words">
        <span className="logo-name">Magic City</span>
        <span className="logo-sub">{sub}</span>
      </span>
    </a>
  );
}

export function Img({ base, alt, className, eager }) {
  return (
    <img
      className={className}
      src={`${base}.webp`}
      srcSet={`${base}-sm.webp 800w, ${base}.webp 1400w`}
      sizes="(max-width: 760px) 100vw, 50vw"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function Page({ children }) {
  useEffect(() => {
    document.documentElement.style.background = "#090E1A";
    document.body.style.background = "#090E1A";
  }, []);
  return (
    <div className="site">
      <style>{CSS}</style>
      {children}
    </div>
  );
}

export function Promo() {
  return (
    <a className="promo" href="https://magiccityservicesmiami.com/holiday-lighting">
      Holiday light installs are booking now. Lights, install and takedown included, from $499. <span className="promo-link">Get a free estimate</span>
    </a>
  );
}

export function Nav({ sub, phone, phoneDisplay, links }) {
  return (
    <header className="nav">
      <Logo sub={sub} />
      <nav className="nav-links" aria-label="Main">
        {links.map(l => <button key={l.id} onClick={() => goTo(l.id)}>{l.label}</button>)}
      </nav>
      <div className="nav-actions">
        <button className="btn btn-ghost nav-book" onClick={() => goTo("booking")}>Book online</button>
        <a className="btn btn-pink" href={`tel:${phone}`} onClick={trackPhoneClick}>
          <span className="btn-label"><span className="hide-sm">{"Call "}</span>{phoneDisplay}</span>
          <span className="btn-icon"><PhoneIcon /></span>
        </a>
      </div>
    </header>
  );
}

export function Hero({ img, mobileImg, alt, where, title, copy, phone, phoneDisplay, facts, bookLabel }) {
  return (
    <section className="hero">
      <picture className="hero-media">
        <source media="(max-width: 760px)" srcSet={mobileImg} />
        <img src={img} alt={alt} fetchpriority="high" />
      </picture>
      <div className="hero-shade" />
      <div className="hero-inner">
        <p className="hero-where">{where}</p>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-copy">{copy}</p>
        <div className="hero-ctas">
          <button className="btn btn-pink btn-lg" onClick={() => goTo("booking")}>
            <span className="btn-label">{bookLabel || "Book online"}</span>
            <span className="btn-icon"><ArrowIcon /></span>
          </button>
          <a className="btn btn-outline btn-lg" href={`tel:${phone}`} onClick={trackPhoneClick}>
            <span className="btn-label">Call {phoneDisplay}</span>
            <span className="btn-icon"><PhoneIcon /></span>
          </a>
        </div>
        <ul className="hero-facts">
          {facts.map(f => <li key={f[0]}><strong>{f[0]}</strong><span>{f[1]}</span></li>)}
        </ul>
      </div>
    </section>
  );
}

/* Photo tiles. A tile with `pkg` preselects that package and jumps to booking. */
export function Tiles({ id, heading, lede, tiles, onPick }) {
  return (
    <section id={id} className="section services">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">{heading}</h2>
          <p className="lede">{lede}</p>
        </div>
        <div className="tiles">
          {tiles.map((s) => {
            const body = (
              <>
                <Img base={s.img} alt={s.alt || s.name} className="tile-img" />
                <span className="tile-shade" />
                {s.flag && <span className="tile-flag">{s.flag}</span>}
                <span className="tile-body">
                  <span className="tile-price">{s.from}</span>
                  <span className="tile-name">{s.name}</span>
                  <span className="tile-blurb">{s.blurb}</span>
                  <span className="tile-cta">{s.cta}<span className="tile-cta-icon"><ArrowIcon /></span></span>
                </span>
              </>
            );
            return s.href
              ? <a key={s.name} className="tile" href={s.href}>{body}</a>
              : <button key={s.name} className="tile" onClick={() => onPick(s)}>{body}</button>;
          })}
        </div>
      </div>
    </section>
  );
}

export function How({ img, alt, steps = STEPS, note }) {
  return (
    <section id="how" className="how">
      <div className="how-photo">
        <Img base={img} alt={alt} className="how-img" />
      </div>
      <div className="how-panel">
        <h2 className="h2">How booking works</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-n">{i + 1}</span>
              <div><h3>{s.title}</h3><p>{s.text}</p></div>
            </li>
          ))}
        </ol>
        <p className="how-note">{note || "Quotes are always free, by phone or online. Final price is confirmed on site before any work starts."}</p>
        <button className="btn btn-pink" onClick={() => goTo("booking")}>
          <span className="btn-label">Start a booking</span>
          <span className="btn-icon"><ArrowIcon /></span>
        </button>
      </div>
    </section>
  );
}

const YEARS = [2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010];
const MAKES = ["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ferrari","Fiat","Ford","Genesis","GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Lamborghini","Land Rover","Lexus","Lincoln","Maserati","Mazda","McLaren","Mercedes-Benz","Mini","Mitsubishi","Nissan","Porsche","Ram","Rolls-Royce","Subaru","Tesla","Toyota","Volkswagen","Volvo","Other"];
const SIZES = [{ label: "Sedan / Coupe", s: null }, { label: "SUV / Crossover", s: "+$20" }, { label: "Truck / Large SUV", s: "+$40" }];

/*
  Booking: online booking with a Stripe deposit, a free quote form (Formspree), or a call.
  selectedPkg and tab are owned by the page so photo tiles can preselect a package.
*/
export function Booking({
  service, heading, intro, packages, selectedPkg, setSelectedPkg, tab, setTab,
  phone, phoneDisplay, needsVehicle, quoteOptions, quotePrompt, quotePlaceholder, quoteValue, siteName,
}) {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleSize, setVehicleSize] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState("idle");

  const selectedPackage = selectedPkg !== null ? packages[selectedPkg] : null;
  const depositAmount = selectedPackage ? selectedPackage.deposit : 0;
  const vehicleMissing = needsVehicle && (!vehicleYear || !vehicleMake || !vehicleModel || !vehicleSize);

  // Stripe sends the customer back with ?booking=success
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("booking") === "success") {
      const saved = localStorage.getItem("pendingBooking");
      if (saved) {
        const data = JSON.parse(saved);
        fetch("https://formspree.io/f/xqeyrgno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, deposit: "$" + data.deposit, payment: "Stripe deposit paid" }),
        }).catch(() => {});
        localStorage.removeItem("pendingBooking");
      }
      setSubmitted(true);
      if (typeof gtag === "function") { let bookingValue = 0; try { bookingValue = Number(JSON.parse(saved || "{}").deposit) || 0; } catch (err) {} gtag("event", "conversion", { send_to: "AW-18078412608/S_40CIGMrZkcEMDeuqxD", value: bookingValue, currency: "USD" }); }
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => document.getElementById("booking")?.scrollIntoView(), 50);
    }
  }, []);

  const handleBookingSubmit = async () => {
    if (!selectedPackage || !name || !phoneNum || !email || !address || !bookingDate || !bookingTime || vehicleMissing) {
      alert("Please fill in every field before booking.");
      return;
    }
    setSubmitting(true);
    try {
      const vehicle = vehicleYear + " " + vehicleMake + " " + vehicleModel + " (" + vehicleColor + ") - " + vehicleSize;
      const bookingData = {
        name, phone: phoneNum, email, address,
        date: bookingDate, time: bookingTime,
        service,
        package: selectedPackage.name,
        price: selectedPackage.price,
        deposit: depositAmount,
        ...(needsVehicle ? { vehicleYear, vehicleMake, vehicleModel, vehicleSize, vehicleColor, vehicle } : {}),
      };
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: selectedPackage.name,
          price: depositAmount,
          customerName: name,
          customerEmail: email,
          customerPhone: phoneNum,
          date: bookingDate,
          time: bookingTime,
          address,
          ...(needsVehicle ? { vehicle } : {}),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Failed to create checkout session");
    } catch (e) {
      console.error("Checkout error:", e);
      alert(`We couldn't open checkout. Try again, or call ${phoneDisplay} and we'll book it for you.`);
      setSubmitting(false);
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setQuoteStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xyknrbor", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Formspree " + res.status);
      if (typeof gtag === "function") gtag("event", "conversion", { send_to: "AW-18078412608/MT3wCJnT3OccEMDeuqxD" });
      if (typeof fbq === "function") fbq("track", "Lead");
      form.reset();
      setQuoteStatus("sent");
    } catch (err) {
      setQuoteStatus("error");
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const timeOptions = TIMES.filter(t => {
    if (!bookingDate || bookingDate !== todayStr) return true;
    const now = new Date();
    const [timePart, ampm] = t.value.split(" ");
    const [hr, min] = timePart.split(":").map(Number);
    let h24 = hr;
    if (ampm === "PM" && hr !== 12) h24 = hr + 12;
    if (ampm === "AM" && hr === 12) h24 = 0;
    return h24 > now.getHours() || (h24 === now.getHours() && min > now.getMinutes());
  });

  return (
    <section id="booking" className="section booking">
      <div className="wrap booking-grid">
        <div className="booking-intro">
          <h2 className="h2">{heading}</h2>
          <p className="lede">{intro}</p>
          <dl className="booking-facts">
            <div><dt>Deposit</dt><dd>Holds your date. The amount shows before checkout.</dd></div>
            <div><dt>Balance</dt><dd>Due after the job is done to your satisfaction.</dd></div>
            <div><dt>Early or late slots</dt><dd>Before 8 AM or after 6 PM adds $25.</dd></div>
          </dl>
        </div>

        <div className="panel">
          <div className="tabs" role="tablist" aria-label="How would you like to book?">
            {[{ id: "book", label: "Book online" }, { id: "quote", label: "Free quote" }, { id: "call", label: "Call us" }].map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} className={"tab" + (tab === t.id ? " is-on" : "")} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>

          {tab === "book" && (
            <div className="form">
              <span className="label">Package</span>
              <div className="pkgs">
                {packages.map((pkg, i) => (
                  <button key={pkg.name} className={"pkg" + (selectedPkg === i ? " is-on" : "")} onClick={() => setSelectedPkg(i)}>
                    <span className="pkg-main">
                      <span className="pkg-name">{pkg.label || pkg.name}{pkg.tag && <span className="pkg-tag">{pkg.tag}</span>}</span>
                      <span className="pkg-note">{pkg.note}</span>
                    </span>
                    <span className="pkg-side">
                      <span className="pkg-price">{pkg.price}</span>
                      <span className="pkg-dep">${pkg.deposit} deposit</span>
                    </span>
                  </button>
                ))}
              </div>

              {needsVehicle && (
                <>
                  <span className="label">Vehicle</span>
                  <div className="row">
                    <label className="field"><span>Year</span>
                      <select value={vehicleYear} onChange={e => setVehicleYear(e.target.value)}>
                        <option value="">Select</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        <option value="2009 or older">2009 or older</option>
                      </select>
                    </label>
                    <label className="field"><span>Make</span>
                      <select value={vehicleMake} onChange={e => setVehicleMake(e.target.value)}>
                        <option value="">Select make</option>
                        {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="row">
                    <label className="field"><span>Model</span><input type="text" value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} placeholder="Civic, Model 3, X5" /></label>
                    <label className="field"><span>Color</span><input type="text" value={vehicleColor} onChange={e => setVehicleColor(e.target.value)} placeholder="Black, white, silver" /></label>
                  </div>
                  <span className="label">Vehicle size</span>
                  <div className="seg">
                    {SIZES.map(v => (
                      <button key={v.label} className={"seg-btn" + (vehicleSize === v.label ? " is-on" : "")} onClick={() => setVehicleSize(v.label)}>
                        {v.label}{v.s && <span className="seg-sub">{v.s}</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="row">
                <label className="field"><span>Date</span><input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={todayStr} /></label>
                <label className="field"><span>Time</span>
                  <select value={bookingTime} onChange={e => setBookingTime(e.target.value)}>
                    <option value="">Select time</option>
                    {timeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </label>
              </div>
              <label className="field"><span>Full name</span><input type="text" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label>
              <div className="row">
                <label className="field"><span>Phone</span><input type="tel" value={phoneNum} onChange={e => setPhoneNum(e.target.value)} placeholder="(305) 000-0000" autoComplete="tel" /></label>
                <label className="field"><span>Email</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" /></label>
              </div>
              <div className="field"><span>Service address</span>
                <AddressAutocomplete value={address} onChange={setAddress} placeholder="Street, city, ZIP" inputStyle={ADDRESS_INPUT} />
              </div>

              {selectedPackage && !submitted && (
                <div className="deposit">
                  <div>
                    <strong>{selectedPackage.label || selectedPackage.name}</strong>
                    <span>Deposit today. Balance after the job.</span>
                  </div>
                  <span className="deposit-amt">${depositAmount}</span>
                </div>
              )}

              {submitted ? (
                <div className="success" role="status">
                  <strong>Booking received</strong>
                  <span>Check your email for the confirmation. We'll text you within 30 minutes to confirm your crew.</span>
                </div>
              ) : (
                <button className="btn btn-pink btn-block" onClick={handleBookingSubmit} disabled={submitting || !selectedPackage || vehicleMissing}>
                  <span className="btn-label">{submitting ? "Opening secure checkout…" : selectedPackage ? `Pay $${depositAmount} deposit and book` : "Choose a package to continue"}</span>
                  <span className="btn-icon"><ArrowIcon /></span>
                </button>
              )}
              <p className="fine">Secure checkout by Stripe. Final price confirmed on site before work starts.</p>
            </div>
          )}

          {tab === "quote" && (
            quoteStatus === "sent" ? (
              <div className="form">
                <div className="success" role="status">
                  <strong>Quote request sent</strong>
                  <span>We'll text or call you back, usually within the hour. Need it sooner? Call {phoneDisplay}.</span>
                </div>
                <button className="btn btn-ghost btn-block" onClick={() => setQuoteStatus("idle")}>Send another request</button>
              </div>
            ) : (
              <form className="form" onSubmit={handleQuoteSubmit}>
                <input type="hidden" name="_subject" value={`New quote request (${siteName})`} />
                <input type="hidden" name="source" value={`${siteName} quote form`} />
                <p className="note-ok">Free quote. No deposit, no obligation.</p>
                <label className="field"><span>What do you need?</span>
                  <select name="service" key={quoteValue || "default"} defaultValue={quoteValue || quoteOptions[0]}>
                    {quoteOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <label className="field"><span>Full name</span><input type="text" name="name" required autoComplete="name" /></label>
                <div className="row">
                  <label className="field"><span>Phone</span><input type="tel" name="phone" required placeholder="(305) 000-0000" autoComplete="tel" /></label>
                  <label className="field"><span>Email</span><input type="email" name="email" placeholder="you@email.com" autoComplete="email" /></label>
                </div>
                <label className="field"><span>ZIP code</span><input type="text" name="zip" inputMode="numeric" placeholder="33133" /></label>
                <label className="field"><span>{quotePrompt}</span>
                  <textarea name="message" rows={4} placeholder={quotePlaceholder} />
                </label>
                {quoteStatus === "error" && <p className="note-err">That didn't send. Check your connection and try again, or call {phoneDisplay}.</p>}
                <button type="submit" className="btn btn-pink btn-block" disabled={quoteStatus === "sending"}>
                  <span className="btn-label">{quoteStatus === "sending" ? "Sending…" : "Get my free quote"}</span>
                  <span className="btn-icon"><ArrowIcon /></span>
                </button>
              </form>
            )
          )}

          {tab === "call" && (
            <div className="form call">
              <p className="call-big">{phoneDisplay}</p>
              <p className="lede">Calls are answered 24/7 in English or Spanish. Quotes by phone are free. Jobs run 7 AM to 9 PM, seven days a week.</p>
              <a className="btn btn-pink btn-block" href={`tel:${phone}`} onClick={trackPhoneClick}>
                <span className="btn-label">Call now</span>
                <span className="btn-icon"><PhoneIcon /></span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Expandable price list. `specs` maps package name to { time, capacity, tierUp, items, idealFor, note }. */
export function PriceList({ packages, specs, openKey, setOpenKey, prefix = "" }) {
  return (
    <ul className="prices">
      {packages.map((pkg) => {
        const sp = specs[pkg.name];
        const key = prefix + pkg.name;
        const open = openKey === key;
        return (
          <li key={pkg.name} className={"price" + (open ? " is-open" : "")}>
            <div className="price-row">
              <div>
                <h3>{pkg.label || pkg.name}</h3>
                <p>{pkg.note}</p>
              </div>
              <span className="price-amt">{pkg.price}</span>
            </div>
            {sp && (
              <>
                <button className="price-toggle" aria-expanded={open} onClick={() => setOpenKey(open ? null : key)}>
                  {open ? "Hide what's included" : "See what's included"}
                </button>
                {open && (
                  <div className="price-detail">
                    {(sp.time || sp.capacity) && (
                      <p className="chips">
                        {sp.time && <span>Time: {sp.time}</span>}
                        {sp.capacity && <span>Capacity: {sp.capacity}</span>}
                      </p>
                    )}
                    {sp.tierUp && <p className="tierup">{sp.tierUp}</p>}
                    <ul className="checks">{sp.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                    {sp.idealFor && <p className="ideal">Good for: {sp.idealFor}</p>}
                    {sp.note && <p className="ideal">{sp.note}</p>}
                  </div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Pricing({ heading, lede, img, imgAlt, children }) {
  return (
    <section id="pricing" className="section pricing">
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">{heading}</h2>
          <p className="lede">{lede}</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-media"><Img base={img} alt={imgAlt} className="pricing-img" /></div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Areas({ alt }) {
  return (
    <section id="areas" className={"section areas" + (alt ? " alt" : "")}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2">Where we work</h2>
          <p className="lede">All of Miami-Dade and Broward, plus south Palm Beach County. Don't see your city? Call and ask.</p>
        </div>
        <ul className="area-list">{AREAS.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    </section>
  );
}

export function Band({ heading = "Get a price today", phone, phoneDisplay, onQuote }) {
  return (
    <section className="band">
      <div className="band-slash" aria-hidden="true" />
      <div className="wrap band-inner">
        <h2 className="h2">{heading}</h2>
        <div className="band-ctas">
          <button className="btn btn-dark btn-lg" onClick={onQuote}>
            <span className="btn-label">Request a free quote</span>
            <span className="btn-icon"><ArrowIcon /></span>
          </button>
          <a className="btn btn-dark btn-lg" href={`tel:${phone}`} onClick={trackPhoneClick}>
            <span className="btn-label">{phoneDisplay}</span>
            <span className="btn-icon"><PhoneIcon /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ sub, about, phone, phoneDisplay, current }) {
  return (
    <footer id="footer" className="footer">
      <div className="wrap foot-grid">
        <div className="foot-about">
          <Logo sub={sub} />
          <p>{about}</p>
        </div>
        <div>
          <h3>Magic City Services</h3>
          <ul>
            {SITES.filter(s => s.name !== current).map(s => <li key={s.name}><a href={s.href}>{s.name}</a></li>)}
            <li><a href="https://magiccityservicesmiami.com">All services</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={`tel:${phone}`} onClick={trackPhoneClick}>{phoneDisplay}</a></li>
            <li><a href="mailto:info@magiccityservicesmiami.com">info@magiccityservicesmiami.com</a></li>
            <li>Miami-Dade, Broward and Palm Beach</li>
          </ul>
        </div>
        <div>
          <h3>Hours</h3>
          <ul>
            <li>Phones answered 24/7</li>
            <li>Jobs 7 AM to 9 PM, every day</li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-legal">
        <span>© 2026 Magic City Services Miami LLC</span>
        <span><a href="https://magiccityservicesmiami.com/privacy">Privacy</a> <a href="https://magiccityservicesmiami.com/terms">Terms</a></span>
      </div>
    </footer>
  );
}

/*
  Membership signup (Stripe subscription checkout via /api/create-subscription).
  kind "club": Detail Club. Pays the starter Full Detail today; monthly billing starts in 30 days.
  kind "home": Home Exterior Plan. $69/mo (+$30/mo with roof), billed from today.
*/
const STARTER_PRICES = { "Sedan / Coupe": 349, "SUV / Crossover": 369, "Truck / Large SUV": 389 };

export function MemberSignup({ kind, plan, setPlan, plans, roof, setRoof, phoneDisplay, onQuote, siteName }) {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleSize, setVehicleSize] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [sizeOk, setSizeOk] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("member") === "success") {
      const saved = localStorage.getItem("pendingMember");
      if (saved) {
        const data = JSON.parse(saved);
        fetch("https://formspree.io/f/xqeyrgno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, payment: "Stripe membership checkout completed", _subject: `New membership signup (${siteName})` }),
        }).catch(() => {});
        localStorage.removeItem("pendingMember");
        if (typeof gtag === "function") gtag("event", "conversion", { send_to: "AW-18078412608/S_40CIGMrZkcEMDeuqxD", value: Number(data.dueToday) || 0, currency: "USD" });
      }
      setStatus("joined");
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => document.getElementById("signup")?.scrollIntoView(), 50);
    }
  }, []);

  const club = kind === "club";
  const chosen = plans.find(p => p.id === plan);
  const dueToday = club ? (STARTER_PRICES[vehicleSize] || 349) : 69 + (roof ? 30 : 0);
  const monthly = club ? chosen.monthly : 69 + (roof ? 30 : 0);
  const missing = !name || !phoneNum || !email || !address || (club ? (!vehicleSize || !vehicle) : !sizeOk);

  const submit = async () => {
    if (missing) { setError(club ? "Fill in every field and pick your vehicle size." : "Fill in every field and confirm your home size."); return; }
    setError(""); setStatus("sending");
    const payload = { plan, roof: !!roof, vehicleSize, vehicle, customerName: name, customerEmail: email, customerPhone: phoneNum, address };
    localStorage.setItem("pendingMember", JSON.stringify({ name, phone: phoneNum, email, address, membership: club ? chosen.label : (roof ? "Home Exterior Plan + roof" : "Home Exterior Plan"), vehicle: club ? `${vehicle} - ${vehicleSize}` : "", dueToday, monthly: "$" + monthly + "/mo" }));
    try {
      const res = await fetch("/api/create-subscription", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "No checkout link");
    } catch (e) {
      console.error("Membership checkout error:", e);
      setStatus("idle");
      setError(`We couldn't open checkout. Try again, or call ${phoneDisplay} and we'll sign you up.`);
    }
  };

  if (status === "joined") {
    return (
      <div id="signup" className="panel signup">
        <div className="form">
          <div className="success" role="status">
            <strong>Welcome to the {club ? "Detail Club" : "Home Exterior Plan"}</strong>
            <span>Check your email for the receipt. We'll text you within 30 minutes to schedule your first visit.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="signup" className="panel signup">
      <div className="form">
        <h3 className="signup-title">{club ? "Join the Detail Club" : "Start your Home Exterior Plan"}</h3>
        {club ? (
          <>
            <span className="label">Plan</span>
            <div className="seg seg-2">
              {plans.map(p => (
                <button key={p.id} className={"seg-btn" + (plan === p.id ? " is-on" : "")} onClick={() => setPlan(p.id)}>
                  {p.name}<span className="seg-sub">${p.monthly}/mo</span>
                </button>
              ))}
            </div>
            <span className="label">Vehicle size (sets the price of your first Full Detail)</span>
            <div className="seg">
              {Object.keys(STARTER_PRICES).map(s => (
                <button key={s} className={"seg-btn" + (vehicleSize === s ? " is-on" : "")} onClick={() => setVehicleSize(s)}>
                  {s}<span className="seg-sub">${STARTER_PRICES[s]}</span>
                </button>
              ))}
            </div>
            <label className="field"><span>Year, make and model</span><input type="text" value={vehicle} onChange={e => setVehicle(e.target.value)} placeholder="2022 Tesla Model Y" /></label>
          </>
        ) : (
          <>
            <label className="check"><input type="checkbox" checked={!!roof} onChange={e => setRoof(e.target.checked)} /> <span>Add the yearly roof soft wash (+$30/mo)</span></label>
            <label className="check"><input type="checkbox" checked={sizeOk} onChange={e => setSizeOk(e.target.checked)} /> <span>My home is about 2,000 sq ft or smaller. <button type="button" className="link" onClick={onQuote}>Bigger home? Get a quote</button></span></label>
          </>
        )}
        <label className="field"><span>Full name</span><input type="text" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label>
        <div className="row">
          <label className="field"><span>Phone</span><input type="tel" value={phoneNum} onChange={e => setPhoneNum(e.target.value)} placeholder="(305) 000-0000" autoComplete="tel" /></label>
          <label className="field"><span>Email</span><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" /></label>
        </div>
        <div className="field"><span>Service address</span>
          <AddressAutocomplete value={address} onChange={setAddress} placeholder="Street, city, ZIP" inputStyle={ADDRESS_INPUT} />
        </div>
        <div className="deposit">
          <div>
            <strong>Due today: ${dueToday}</strong>
            <span>{club ? `Your first Full Detail. Then $${monthly}/mo starting in 30 days. 6-month minimum.` : `Then $${monthly}/mo. 12-month plan; cancelling early, the rest of the 12 months is due.`}</span>
          </div>
          <span className="deposit-amt">${dueToday}</span>
        </div>
        {error && <p className="note-err">{error}</p>}
        <button className="btn btn-pink btn-block" onClick={submit} disabled={status === "sending"}>
          <span className="btn-label">{status === "sending" ? "Opening secure checkout…" : `Pay $${dueToday} and join`}</span>
          <span className="btn-icon"><ArrowIcon /></span>
        </button>
        <p className="fine">Secure checkout by Stripe. Questions first? Call {phoneDisplay}.</p>
      </div>
    </div>
  );
}

const CSS = `
:root {
  --ink: #090E1A;
  --night: #0F1626;
  --panel: #151E33;
  --panel-2: #1B2640;
  --line: rgba(163, 174, 194, 0.16);
  --paper: #F3F5F9;
  --mist: #A3AEC2;
  --pink: #F472B6;
  --pink-deep: #DB4A97;
  --sky: #7DD3FC;
  --ok: #4ADE80;
  --wide: "Archivo", system-ui, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
html, body, #root { margin: 0; padding: 0; background: var(--ink); }
.site { background: var(--ink); color: var(--paper); font-family: "Archivo", system-ui, sans-serif; font-stretch: 100%; font-size: 16px; line-height: 1.6; overflow-x: hidden; min-height: 100vh; }
.site img { display: block; max-width: 100%; }
.site a { color: inherit; }
.site button { font: inherit; color: inherit; }
.site :focus-visible { outline: 2px solid var(--sky); outline-offset: 3px; }
section[id] { scroll-margin-top: 72px; }
.wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* Type */
.h2 { font-family: var(--wide); font-stretch: 125%; font-weight: 300; text-transform: uppercase; letter-spacing: 0.04em; font-size: clamp(24px, 3.2vw, 38px); line-height: 1.15; margin: 0 0 14px; }
.lede { color: var(--mist); max-width: 60ch; margin: 0; }
.section { padding: clamp(64px, 9vw, 112px) 0; }
.section-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px 48px; align-items: end; margin-bottom: 40px; border-top: 1px solid var(--line); padding-top: 28px; }
.section-head .h2 { margin: 0; }

/* Buttons: label block + square icon, as in the brief's reference */
.btn { display: inline-flex; align-items: stretch; border: 0; padding: 0; cursor: pointer; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.02em; min-height: 46px; transition: background-color .2s, color .2s, border-color .2s; }
.btn-label { display: flex; align-items: center; padding: 0 18px; }
.btn-icon { display: flex; align-items: center; justify-content: center; width: 46px; flex: none; }
.btn-lg { min-height: 54px; font-size: 15px; }
.btn-lg .btn-icon { width: 54px; }
.btn-block { width: 100%; justify-content: space-between; }
.btn-pink { background: var(--pink); color: #160812; }
.btn-pink .btn-icon { background: var(--pink-deep); color: #fff; }
.btn-pink:hover { background: #F78CC4; }
.btn-outline { background: transparent; color: var(--paper); box-shadow: inset 0 0 0 1px rgba(243,245,249,.55); }
.btn-outline .btn-icon { background: var(--paper); color: var(--ink); }
.btn-outline:hover { box-shadow: inset 0 0 0 1px var(--paper); background: rgba(243,245,249,.08); }
.btn-ghost { background: transparent; color: var(--paper); box-shadow: inset 0 0 0 1px var(--line); padding: 0 16px; align-items: center; }
.btn-ghost:hover { box-shadow: inset 0 0 0 1px var(--mist); }
.btn-dark { background: var(--ink); color: var(--paper); }
.btn-dark .btn-icon { background: var(--paper); color: var(--ink); }
.btn-dark:hover { background: #000; }
.btn:disabled { opacity: .45; cursor: not-allowed; }

/* Promo + nav */
.promo { display: block; text-align: center; padding: 10px 16px; font-size: 13px; text-decoration: none; background: #1D1408; color: #FCD34D; border-bottom: 1px solid rgba(252,211,77,.2); }
.promo-link { text-decoration: underline; text-underline-offset: 3px; font-weight: 600; }
.nav { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 24px; background: rgba(9,14,26,.88); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-mark { width: 34px; height: 34px; display: flex; gap: 2px; align-items: flex-end; justify-content: center; padding-bottom: 8px; border: 1px solid rgba(244,114,182,.3); }
.logo-mark span { width: 4px; display: block; }
.logo-words { display: flex; flex-direction: column; line-height: 1.05; }
.logo-name { font-stretch: 125%; font-weight: 700; font-size: 14px; letter-spacing: .06em; text-transform: uppercase; }
.logo-sub { font-stretch: 125%; font-size: 9px; letter-spacing: .32em; color: var(--mist); text-transform: uppercase; }
.nav-links { display: flex; gap: 4px; }
.nav-links button { background: none; border: 0; padding: 8px 12px; cursor: pointer; font-size: 14px; color: var(--mist); }
.nav-links button:hover { color: var(--paper); }
.nav-actions { display: flex; gap: 8px; }

/* Hero */
.hero { position: relative; min-height: min(88vh, 860px); display: flex; align-items: flex-end; overflow: hidden; }
.hero-media, .hero-media img { position: absolute; inset: 0; width: 100%; height: 100%; }
.hero-media img { object-fit: cover; object-position: 62% 50%; animation: settle 2.4s cubic-bezier(.2,.7,.2,1) both; }
@keyframes settle { from { transform: scale(1.06); filter: brightness(.6); } to { transform: scale(1); filter: brightness(1); } }
.hero-shade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9,14,26,.95) 0%, rgba(9,14,26,.84) 36%, rgba(9,14,26,.3) 64%, rgba(9,14,26,0) 100%), linear-gradient(0deg, var(--ink) 0%, rgba(9,14,26,0) 30%); }
.hero-inner { position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding: 120px 24px 56px; }
.hero-where { margin: 0 0 18px; color: var(--pink); font-size: 14px; font-weight: 500; }
.hero-title { font-stretch: 125%; font-weight: 300; text-transform: uppercase; letter-spacing: .03em; line-height: 1.04; font-size: clamp(32px, 4.6vw, 64px); max-width: 16ch; margin: 0 0 22px; }
.hero-copy { max-width: 46ch; color: #D5DBE6; font-size: 17px; margin: 0 0 30px; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; }
.hero-facts { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 220px)); gap: 24px; }
.hero-facts li { border-top: 1px solid rgba(243,245,249,.3); padding-top: 12px; display: flex; flex-direction: column; }
.hero-facts strong { font-weight: 600; font-size: 15px; }
.hero-facts span { color: var(--mist); font-size: 13px; line-height: 1.45; }

/* Service tiles: the photo-led centerpiece */
.tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.tile { position: relative; display: block; aspect-ratio: 4 / 3; overflow: hidden; text-decoration: none; background: var(--panel); }
.tile-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .7s cubic-bezier(.2,.7,.2,1); }
.tile:hover .tile-img, .tile:focus-visible .tile-img { transform: scale(1.04); }
.tile-shade { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(9,14,26,.95) 0%, rgba(9,14,26,.55) 38%, rgba(9,14,26,0) 70%); }
.tile-flag { position: absolute; top: 16px; left: 16px; background: #FCD34D; color: #1D1408; font-size: 12px; font-weight: 700; padding: 6px 10px; }
.tile-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 24px; display: flex; flex-direction: column; gap: 6px; }
.tile-price { color: var(--sky); font-weight: 600; font-size: 14px; }
.tile-name { font-stretch: 125%; font-weight: 400; text-transform: uppercase; letter-spacing: .05em; font-size: clamp(20px, 2.4vw, 30px); line-height: 1.1; }
.tile-blurb { color: #CDD4E0; font-size: 14px; max-width: 44ch; }
.tile-cta { display: inline-flex; align-items: center; gap: 10px; margin-top: 8px; font-weight: 600; font-size: 14px; color: var(--pink); }
.tile-cta-icon { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; background: var(--pink); color: #160812; }

/* How it works: split photo + overlapping panel */
.how { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); align-items: center; background: var(--night); }
.how-photo { height: 100%; min-height: 560px; position: relative; }
.how-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; }
.how-panel { background: var(--panel); margin: 64px 0 64px -80px; padding: clamp(32px, 5vw, 56px); position: relative; max-width: 640px; border-left: 3px solid var(--pink); }
.steps { list-style: none; padding: 0; margin: 12px 0 24px; display: grid; gap: 20px; }
.steps li { display: grid; grid-template-columns: 40px 1fr; gap: 14px; align-items: start; }
.step-n { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-stretch: 125%; font-weight: 600; border: 1px solid var(--pink); color: var(--pink); }
.steps h3 { margin: 0 0 2px; font-size: 16px; font-weight: 600; }
.steps p { margin: 0; color: var(--mist); font-size: 14px; }
.how-note { color: var(--mist); font-size: 14px; margin: 0 0 24px; padding-top: 18px; border-top: 1px solid var(--line); }

/* Booking */
.booking { background: var(--ink); }
.booking-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 6fr); gap: 56px; align-items: start; }
.booking-intro { position: sticky; top: 100px; }
.booking-facts { margin: 32px 0 0; display: grid; gap: 0; }
.booking-facts div { padding: 14px 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: 140px 1fr; gap: 12px; }
.booking-facts dt { font-weight: 600; font-size: 14px; }
.booking-facts dd { margin: 0; color: var(--mist); font-size: 14px; }
.panel { background: var(--panel); border: 1px solid var(--line); }
.tabs { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid var(--line); }
.tab { background: none; border: 0; padding: 16px 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--mist); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab:hover { color: var(--paper); }
.tab.is-on { color: var(--paper); border-bottom-color: var(--pink); }
.form { padding: 28px; display: grid; gap: 14px; }
.label { font-size: 13px; color: var(--mist); font-weight: 500; margin-top: 4px; }
.seg { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.seg-btn { background: var(--panel-2); border: 1px solid transparent; padding: 11px 8px; cursor: pointer; font-size: 13px; color: var(--mist); display: flex; flex-direction: column; align-items: center; gap: 2px; line-height: 1.25; }
.seg-btn:hover { color: var(--paper); }
.seg-btn.is-on { border-color: var(--pink); color: var(--paper); background: rgba(244,114,182,.1); }
.seg-sub { font-size: 11px; color: #FCD34D; }
.pkgs { display: grid; gap: 6px; }
.pkg { display: flex; justify-content: space-between; align-items: center; gap: 12px; text-align: left; background: var(--panel-2); border: 1px solid transparent; padding: 14px 16px; cursor: pointer; }
.pkg:hover { border-color: var(--line); }
.pkg.is-on { border-color: var(--sky); background: rgba(125,211,252,.07); }
.pkg-main { display: flex; flex-direction: column; min-width: 0; }
.pkg-name { font-weight: 600; font-size: 15px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.pkg-tag { font-size: 11px; font-weight: 600; color: var(--pink); border: 1px solid rgba(244,114,182,.4); padding: 1px 6px; }
.pkg-note { color: var(--mist); font-size: 13px; }
.pkg-side { display: flex; flex-direction: column; align-items: flex-end; flex: none; }
.pkg-price { font-weight: 700; font-size: 17px; color: var(--sky); }
.pkg-dep { font-size: 12px; color: var(--ok); }
.row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.row .f-sm { }
.field { display: grid; gap: 6px; font-size: 13px; color: var(--mist); font-weight: 500; }
.field input, .field select, .field textarea { width: 100%; background: var(--ink); border: 1px solid var(--line); color: var(--paper); font: inherit; font-size: 16px; font-weight: 400; padding: 12px 12px; min-height: 48px; border-radius: 0; -webkit-appearance: none; appearance: none; }
.field select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23A3AEC2' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }
.field textarea { resize: vertical; line-height: 1.5; }
.field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--pink); }
.field input::placeholder, .field textarea::placeholder { color: #5E6A82; }
.deposit { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 16px; border: 1px solid rgba(74,222,128,.35); background: rgba(74,222,128,.06); }
.deposit strong { display: block; font-size: 15px; }
.deposit span { color: var(--mist); font-size: 13px; }
.deposit-amt { font-size: 28px !important; font-weight: 700; color: var(--ok) !important; }
.success { padding: 16px; border: 1px solid rgba(74,222,128,.4); background: rgba(74,222,128,.08); display: grid; gap: 4px; }
.success strong { color: var(--ok); }
.success span { color: #D5DBE6; font-size: 14px; }
.note-ok { margin: 0; color: var(--ok); font-size: 14px; }
.note-err { margin: 0; color: #FCA5A5; font-size: 14px; }
.fine { margin: 0; color: var(--mist); font-size: 12px; text-align: center; }
.call { text-align: center; justify-items: center; padding: 48px 28px; }
.call-big { font-stretch: 125%; font-weight: 300; font-size: clamp(28px, 4vw, 40px); margin: 0; letter-spacing: .02em; }

/* Pricing */
.pricing { background: var(--night); }
.pricing-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 48px; align-items: start; }
.pricing-media { position: sticky; top: 100px; aspect-ratio: 4 / 5; overflow: hidden; background: var(--panel); }
.pricing-img { width: 100%; height: 100%; object-fit: cover; }
.tabs-line { margin-bottom: 8px; }
.prices { list-style: none; margin: 0; padding: 0; }
.price { border-bottom: 1px solid var(--line); padding: 18px 0; }
.price-row { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
.price h3 { margin: 0; font-size: 17px; font-weight: 600; }
.price p { margin: 2px 0 0; color: var(--mist); font-size: 14px; }
.price-amt { font-stretch: 125%; font-weight: 500; font-size: 22px; color: var(--sky); white-space: nowrap; }
.price-toggle { background: none; border: 0; padding: 8px 0 0; cursor: pointer; color: var(--pink); font-size: 14px; font-weight: 500; text-decoration: underline; text-underline-offset: 3px; }
.price-detail { padding-top: 12px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 10px; }
.chips span { font-size: 12px; color: var(--sky); border: 1px solid rgba(125,211,252,.3); padding: 3px 8px; }
.tierup { color: var(--pink); font-size: 14px; margin: 0 0 8px; }
.checks { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.checks li { position: relative; padding-left: 22px; font-size: 14px; color: #CDD4E0; }
.checks li::before { content: ""; position: absolute; left: 2px; top: 8px; width: 10px; height: 6px; border-left: 2px solid var(--ok); border-bottom: 2px solid var(--ok); transform: rotate(-45deg); }
.pricing .fine { text-align: left; margin-top: 18px; }

/* Areas */
.area-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.area-list li { padding: 16px 18px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); font-size: 15px; }

/* CTA band with angled pink block */
.band { position: relative; background: var(--ink); overflow: hidden; padding: 72px 0; }
.band-slash { position: absolute; top: 0; bottom: 0; right: 0; width: 62%; background: var(--pink); clip-path: polygon(14% 0, 100% 0, 100% 100%, 0 100%); }
.band-inner { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.band .h2 { margin: 0; }
.band-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

/* Footer */
.footer { background: #060A13; padding: 64px 0 28px; font-size: 14px; }
.foot-grid { display: grid; grid-template-columns: minmax(0, 2fr) repeat(3, minmax(0, 1fr)); gap: 40px; }
.foot-about p { color: var(--mist); max-width: 42ch; margin: 18px 0 0; }
.footer h3 { font-size: 14px; font-weight: 600; margin: 0 0 12px; }
.footer ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; color: var(--mist); }
.footer ul a { text-decoration: none; color: var(--mist); }
.footer ul a:hover { color: var(--paper); }
.foot-legal { display: flex; justify-content: space-between; gap: 16px; margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--line); color: #6B7690; font-size: 12px; }
.foot-legal a { color: #6B7690; margin-left: 14px; }

/* Responsive */
@media (max-width: 960px) {
  .nav-links { display: none; }
  .booking-grid, .pricing-grid { grid-template-columns: 1fr; gap: 32px; }
  .booking-intro, .pricing-media { position: static; }
  .pricing-media { aspect-ratio: 16 / 9; }
  .how { grid-template-columns: 1fr; }
  .how-photo { min-height: 0; aspect-ratio: 4 / 3; }
  .how-panel { margin: -56px 16px 0; max-width: none; }
  .foot-grid { grid-template-columns: 1fr 1fr; }
  .area-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .wrap { padding: 0 16px; }
  .nav { padding: 10px 16px; }
  .nav-book, .hide-sm { display: none; }
  .nav .btn-label { padding: 0 12px; font-size: 13px; }
  .nav .btn-icon { width: 40px; }
  .nav .btn { min-height: 40px; }
  .hero { min-height: 92vh; }
  .hero-media img { object-position: 50% 40%; }
  .hero-shade { background: linear-gradient(0deg, var(--ink) 0%, rgba(9,14,26,.88) 45%, rgba(9,14,26,.25) 75%, rgba(9,14,26,.1) 100%); }
  .hero-inner { padding: 160px 16px 40px; }
  .hero-copy { font-size: 16px; }
  .hero-ctas .btn { width: 100%; justify-content: space-between; }
  .hero-facts { grid-template-columns: 1fr; gap: 12px; }
  .hero-facts li { flex-direction: row; gap: 10px; align-items: baseline; flex-wrap: wrap; }
  .section-head { grid-template-columns: 1fr; gap: 12px; margin-bottom: 28px; }
  .tiles { grid-template-columns: 1fr; }
  .tile { aspect-ratio: 4 / 5; }
  .how-panel { margin: -40px 0 0; border-left: 0; border-top: 3px solid var(--pink); }
  .form { padding: 20px 16px; }
  .seg { grid-template-columns: 1fr; }
  .seg-btn { flex-direction: row; justify-content: space-between; padding: 12px 14px; }
  .row { grid-template-columns: 1fr; }
  .booking-facts div { grid-template-columns: 1fr; gap: 2px; }
  .area-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .band-slash { width: 100%; clip-path: polygon(0 62%, 100% 42%, 100% 100%, 0 100%); }
  .band-ctas { width: 100%; }
  .band-ctas .btn { width: 100%; justify-content: space-between; }
  .foot-grid { grid-template-columns: 1fr; gap: 28px; }
  .foot-legal { flex-direction: column; }
  .foot-legal a { margin: 0 14px 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .hero-media img { animation: none; }
  .tile-img { transition: none; }
}

/* Niche-site additions */
button.tile { border: 0; padding: 0; width: 100%; text-align: left; cursor: pointer; color: inherit; font: inherit; }
.ideal { color: var(--mist); font-size: 13px; margin: 10px 0 0; }
.subhead { font-stretch: 125%; font-weight: 400; text-transform: uppercase; letter-spacing: .05em; font-size: 16px; margin: 40px 0 6px; }
.subnote { color: var(--mist); font-size: 14px; margin: 0 0 8px; }
.info { background: var(--ink); }
.info-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 40px; }
.info-grid li { border-top: 1px solid var(--line); padding: 20px 0 24px; }
.info-grid h3 { margin: 0 0 6px; font-size: 16px; font-weight: 600; }
.info-grid p { margin: 0; color: var(--mist); font-size: 14px; }
.callout { margin-top: 40px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 16px 40px; padding: 24px; border: 1px solid rgba(252,165,165,.3); background: rgba(252,165,165,.05); }
.callout h3 { margin: 0; font-size: 16px; font-weight: 600; color: #FCA5A5; }
.callout ul { margin: 0; padding: 0 0 0 18px; color: #CDD4E0; font-size: 14px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 24px; }
.callout p { grid-column: 1 / -1; margin: 0; color: var(--mist); font-size: 13px; }
.extra-box { margin-top: 28px; padding: 20px; border: 1px solid var(--line); background: var(--panel); }
.extra-box .price-row h3 { font-size: 16px; }
.extra-box ul { margin: 10px 0 0; padding: 0 0 0 18px; color: #CDD4E0; font-size: 14px; display: grid; gap: 2px; }
.member { background: var(--ink); }
.member-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.plan { background: var(--panel); border: 1px solid var(--line); padding: 28px; display: grid; gap: 10px; align-content: start; }
.plan.is-featured { border-color: var(--pink); }
.plan h3 { margin: 0; font-stretch: 125%; font-weight: 400; text-transform: uppercase; letter-spacing: .05em; font-size: 20px; }
.plan .plan-price { font-stretch: 125%; font-size: 34px; font-weight: 300; color: var(--sky); line-height: 1; }
.plan .plan-price small { font-size: 14px; color: var(--mist); font-stretch: 100%; margin-left: 4px; }
.plan p { margin: 0; color: var(--mist); font-size: 14px; }
.plan .checks { margin: 6px 0 10px; }
.member-fine { color: var(--mist); font-size: 13px; margin: 20px 0 0; }
@media (max-width: 960px) {
  .info-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .callout { grid-template-columns: 1fr; }
}
@media (max-width: 760px) {
  .info-grid, .member-grid { grid-template-columns: 1fr; }
  .callout ul { grid-template-columns: 1fr; }
}
.section.alt { background: var(--night); }
@media (max-width: 760px) {
  .hero-shade { background: linear-gradient(0deg, var(--ink) 0%, rgba(9,14,26,.9) 52%, rgba(9,14,26,.55) 74%, rgba(9,14,26,.25) 100%); }
}
.plan .btn { justify-self: start; margin-top: 6px; }
@media (max-width: 760px) {
  .nav .btn-label { white-space: nowrap; }
  .logo-sub { letter-spacing: .16em; }
  .hero-shade { background: linear-gradient(0deg, var(--ink) 0%, rgba(9,14,26,.9) 45%, rgba(9,14,26,.72) 66%, rgba(9,14,26,.45) 100%); }
}
@media (max-width: 380px) {
  .nav .btn-icon { display: none; }
}
.signup { max-width: 720px; margin: 24px 0 0; }
.signup-title { margin: 0; font-stretch: 125%; font-weight: 400; text-transform: uppercase; letter-spacing: .05em; font-size: 18px; }
.seg.seg-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.check { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: var(--paper); line-height: 1.5; cursor: pointer; }
.check input { width: 18px; height: 18px; margin-top: 2px; accent-color: var(--pink); flex: none; }
.link { background: none; border: 0; padding: 0; color: var(--pink); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; font: inherit; }
@media (max-width: 760px) { .seg.seg-2 { grid-template-columns: 1fr; } }
`;
