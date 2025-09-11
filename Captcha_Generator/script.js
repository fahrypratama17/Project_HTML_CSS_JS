document.addEventListener('DOMContentLoaded', function() {
    const captchaText = document.getElementById('captcha-text');
    const captchaInput = document.getElementById('captcha-input');
    const refreshBtn = document.getElementById('refresh-btn');
    const submitBtn = document.getElementById('submit-btn');
    const message = document.getElementById('message');

    let currentCaptcha = '';

    // Generate random CAPTCHA
    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
        let result = '';
        const length = 6;

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Apply some visual distortion
        let distorted = '';
        for (let i = 0; i < result.length; i++) {
            // Randomly change case for some Letters 
            if (Math.random() > 0.5 && isNaN(result[i])) {
                distorted += Math.random() > 0.5 ? result[i].toUpperCase() : result[i].toUpperCase();
            } else {
                distorted += result[i];
            }
        }

        currentCaptcha = result; // Store the original for validation
        captchaText.textContent = distorted;
        captchaInput.value = '';
        message.style.display = 'none';
    }

    // Validate CAPTCHA
    function validateCaptcha() {
        const userInput = captchaInput.value.trim();

        if (userInput === '') {
            showMessage('Please enter the CAPTCHA', 'error'); 
            return;
        }

        if (userInput === currentCaptcha) {
            showMessage('CAPTCHA verification successful', 'success');
            // Here you would typically proceed with form submission
        } else {
            showMessage('CAPTCHA verification failed. Please try again.', 'error');
            generateCaptcha();
        }
    }

    // Show Message
    function showMessage(msg, type) {
        message.textContent = msg;
        message.className = 'message ' + type;
        message.style.display = 'block';
    }

    // Event Listeners
    refreshBtn.addEventListener('click', generateCaptcha);
    submitBtn.addEventListener('click', validateCaptcha);

    // Generate initial CAPTCHA
    generateCaptcha();
});