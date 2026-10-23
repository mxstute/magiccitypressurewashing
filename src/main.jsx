import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { Analytics } from "@vercel/analytics/react"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
setTimeout(loadCallRailSwap, 300)

// CallRail dynamic number insertion (website pool for Google Ads visitors).
// Loaded after React has painted so swap.js can find the phone numbers it renders.
function loadCallRailSwap() {
  if (document.querySelector('script[data-callrail-swap]')) return
  const s = document.createElement("script")
  s.src = "https://cdn.callrail.com/companies/191771820/793a3a0fcf70f36abce3/12/swap.js"
  s.async = true
  s.dataset.callrailSwap = "1"
  document.body.appendChild(s)
  // Re-swap later in case sections render after the script runs
  ;[2500, 6000].forEach((ms) => setTimeout(() => { try { window.CallTrk && window.CallTrk.swap && window.CallTrk.swap() } catch (e) {} }, ms))
}
