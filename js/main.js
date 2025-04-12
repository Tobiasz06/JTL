document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.querySelector('.calculate-btn');

    const formatWithCommas = (num) => {
        return num.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        });
    };

    const cleanNumber = (val) => {
        return parseFloat(val.replace(/,/g, '')) || 0;
    };

    // Add formatting on blur, remove commas on input
    ['initial-investment', 'additional-investment'].forEach(id => {
        const input = document.getElementById(id);

        input.addEventListener('input', () => {
            // strip commas while typing
            input.value = input.value.replace(/,/g, '');
        });

        input.addEventListener('blur', () => {
            const raw = input.value.replace(/,/g, '');
            if (raw && !isNaN(raw)) {
                input.value = formatWithCommas(parseFloat(raw));
            }
        });
    });

    // Calculation logic
    calcButton.addEventListener('click', () => {
        const initial = cleanNumber(document.getElementById('initial-investment').value);
        const additional = cleanNumber(document.getElementById('additional-investment').value);
        const interest = parseFloat(document.getElementById('monthly-interest').value) / 100 || 0;
        const months = parseInt(document.getElementById('months').value) || 0;

        let futureValue = initial * Math.pow(1 + interest, months);

        for (let i = 1; i <= months; i++) {
            futureValue += additional * Math.pow(1 + interest, months - i);
        }

        document.getElementById('future-money').value = `$${futureValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    });
});


// Collapsible menu
const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');

      // Close others if desired
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
    });
});

// Password hide toggle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-password').forEach(icon => {
      icon.addEventListener('click', () => {
        const targetId = icon.getAttribute('data-target');
        const input = document.getElementById(targetId);
  
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });
    });
});

// buy page login/sign up toggle
document.addEventListener("DOMContentLoaded", () => {
  const tabLogin = document.getElementById("tab-login");
  const tabSignup = document.getElementById("tab-signup");
  const formLogin = document.getElementById("form-login");
  const formSignup = document.getElementById("form-signup");
  const switchToSignup = document.getElementById("switch-to-signup");
  const switchToLogin = document.getElementById("switch-to-login");
  const formTitle = document.querySelector(".checkout-title"); // Title element

  const showLogin = () => {
    formLogin.classList.add("active");
    formSignup.classList.remove("active");
    tabLogin.classList.add("active-tab");
    tabSignup.classList.remove("active-tab");
    if (formTitle) formTitle.textContent = "LOGIN";
  };

  const showSignup = () => {
    formSignup.classList.add("active");
    formLogin.classList.remove("active");
    tabSignup.classList.add("active-tab");
    tabLogin.classList.remove("active-tab");
    if (formTitle) formTitle.textContent = "SIGN UP";
  };

  tabLogin?.addEventListener("click", showLogin);
  tabSignup?.addEventListener("click", showSignup);
  switchToSignup?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignup();
  });
  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
  });

  // Set default state
  showLogin();
});

// Slide animations
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 500, 
    once: true,
  });
});

// For snap pages to fix footer
const snapContainer = document.querySelector('.snap-container');
if (snapContainer) {
    snapContainer.addEventListener('scroll', function() {
        const scrollBottom = this.scrollHeight - this.scrollTop - this.clientHeight;
        if (scrollBottom < 1) { // At bottom
            this.classList.add('at-bottom');
        } else {
            this.classList.remove('at-bottom');
        }
    });
}

// For error handling in form and success popup
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".question-form form");
  const fields = form.querySelectorAll(".field");
  const successPopup = document.getElementById("successPopup");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let hasError = false;

    fields.forEach((field) => {
      const input = field.querySelector("input, textarea");
      const error = field.querySelector(".error-message");

      if (!input.value.trim()) {
        error.style.display = "block";
        hasError = true;
      } else {
        error.style.display = "none";
      }
    });

    if (hasError) return;

    // All valid, send using fetch to FormSubmit
    const formData = new FormData(form);
    fetch("https://formsubmit.co/ajax/TobiaszBremer01@gmail.com", {
      method: "POST",
      body: formData
    })
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then(() => {
        // Show popup instantly and fade after 2s
        successPopup.style.display = "block";
        setTimeout(() => {
          successPopup.classList.add("show");

          setTimeout(() => {
            successPopup.classList.remove("show");

            setTimeout(() => {
              successPopup.style.display = "none";
              form.reset();
            }, 300); // match CSS transition
          }, 2000);
        }, 10); // tiny delay to allow CSS transition to trigger
      })
      .catch(() => {
        alert("Something went wrong. Please try again later.");
      });
  });

  // Live error hiding
  fields.forEach((field) => {
    const input = field.querySelector("input, textarea");
    const error = field.querySelector(".error-message");

    input.addEventListener("input", () => {
      if (input.value.trim()) {
        error.style.display = "none";
      }
    });
  });
});
