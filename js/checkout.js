// Import Firebase Auth from your config file
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// redirect if user is not logged in
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "buy.html";
  } else {
    console.log("User authenticated:", user.email);
  }
});

// Stripe Payment Button Logic
document.getElementById("pay-btn")?.addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in to continue.");
    return;
  }

  try {
    const idToken = await user.getIdToken();

    const response = await fetch("https://your-server.com/create-checkout-session", {
      // ⛔️ REPLACE this URL with your actual deployed backend URL
      // Example: "https://api.jtl-autocopier.com/create-checkout-session"

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        // ✅ REPLACE this with your actual Stripe product identifier or metadata
        // You can also include plan type, user UID, etc.
        email: user.email,
        plan: "jtlmonthly_license"
      })
    });

    if (!response.ok) throw new Error("Failed to create Stripe session");

    const { checkoutUrl } = await response.json();

    // Redirect user to Stripe Checkout
    window.location.href = checkoutUrl;

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Error during checkout. Please try again.");
  }
});
