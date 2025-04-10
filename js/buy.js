// buy.js

// Import Firebase functions from your config file
import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// --- SIGNUP --- //
document.getElementById("signup-btn")?.addEventListener("click", async () => {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date().toISOString()
    });

    // Redirect to checkout.html after signup
    window.location.href = "checkout.html";
  } catch (error) {
    alert(`Signup error: ${error.message}`);
  }
});

// --- LOGIN --- //
document.getElementById("login-btn")?.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Check which page we're on to decide redirect
    const currentPage = window.location.pathname;
    if (currentPage.includes("login.html")) {
      window.location.href = "account.html"; // if on login page, go to account
    } else {
      window.location.href = "checkout.html"; // otherwise (buy page), continue checkout
    }
  } catch (error) {
    alert(`Login error: ${error.message}`);
  }
});

