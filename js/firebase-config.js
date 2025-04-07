import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvsHDJ3n1WQyZv__rAK_A1AAFy838G_kI",
  authDomain: "jtl-autocopier.firebaseapp.com",
  projectId: "jtl-autocopier",
  storageBucket: "jtl-autocopier.appspot.com",
  messagingSenderId: "324599208207",
  appId: "1:324599208207:web:6574fed6fcc050dee1067a",
  measurementId: "G-GP1MXSGCVK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
