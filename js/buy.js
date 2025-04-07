// buy.js
document.addEventListener("DOMContentLoaded", () => {
  const tabLogin = document.getElementById("tab-login");
  const tabSignup = document.getElementById("tab-signup");
  const formLogin = document.getElementById("form-login");
  const formSignup = document.getElementById("form-signup");
  const switchToSignup = document.getElementById("switch-to-signup");
  const switchToLogin = document.getElementById("switch-to-login");

  const showLogin = () => {
    formLogin.classList.add("active");
    formSignup.classList.remove("active");
    tabLogin.classList.add("active-tab");
    tabSignup.classList.remove("active-tab");
  };

  const showSignup = () => {
    formSignup.classList.add("active");
    formLogin.classList.remove("active");
    tabSignup.classList.add("active-tab");
    tabLogin.classList.remove("active-tab");
  };

  tabLogin.addEventListener("click", showLogin);
  tabSignup.addEventListener("click", showSignup);
  switchToSignup?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignup();
  });
  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
  });

  // Initial state
  showLogin();
});
