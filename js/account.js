import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('welcome-msg').innerText = `Welcome, ${user.email}`;
  } else {
    // Redirect to login if not logged in
    window.location.href = 'login.html';
  }
});

document.getElementById('logout-btn')?.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
});
