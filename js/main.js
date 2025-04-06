document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.querySelector('.calculate-btn');

    calcButton.addEventListener('click', () => {
        const initial = parseFloat(document.getElementById('initial-investment').value) || 0;
        const additional = parseFloat(document.getElementById('additional-investment').value) || 0;
        const interest = parseFloat(document.getElementById('monthly-interest').value) / 100 || 0;
        const months = parseInt(document.getElementById('months').value) || 0;

        let futureValue = initial * Math.pow(1 + interest, months);

        for (let i = 1; i <= months; i++) {
            futureValue += additional * Math.pow(1 + interest, months - i);
        }

        document.getElementById('future-money').value = `$${futureValue.toFixed(2)}`;
    });
});
