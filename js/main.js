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

