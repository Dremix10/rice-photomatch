// IMPORTANT: Replace this URL with your Google Apps Script web app URL
// You'll get this URL after deploying the Google Apps Script (see SETUP.md)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwGXIfj2YveCGb94jkEGtoYoaM0Z8dyyjTaI15Fh3nPTgp1uVtOHRZ-oScvix3a6aY/exec';

// Handle conditional portfolio fields
document.getElementById('hasInstagram').addEventListener('change', function() {
    const field = document.getElementById('instagramField');
    field.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) document.getElementById('instagram').value = '';
});

document.getElementById('hasWebsite').addEventListener('change', function() {
    const field = document.getElementById('websiteField');
    field.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) document.getElementById('website').value = '';
});

document.getElementById('hasPixieset').addEventListener('change', function() {
    const field = document.getElementById('pixiesetField');
    field.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) document.getElementById('pixieset').value = '';
});

document.getElementById('hasOther').addEventListener('change', function() {
    const field = document.getElementById('otherField');
    field.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) document.getElementById('otherPortfolio').value = '';
});

document.getElementById('photographerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form elements
    const submitBtn = this.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Check if at least one portfolio option is selected
    const hasAnyPortfolio = document.getElementById('hasInstagram').checked ||
                           document.getElementById('hasWebsite').checked ||
                           document.getElementById('hasPixieset').checked ||
                           document.getElementById('hasOther').checked;

    if (!hasAnyPortfolio) {
        alert('Please select at least one portfolio location.');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    // Collect form data
    const portfolioData = {};
    if (document.getElementById('hasInstagram').checked) {
        portfolioData.instagram = document.getElementById('instagram').value;
    }
    if (document.getElementById('hasWebsite').checked) {
        portfolioData.website = document.getElementById('website').value;
    }
    if (document.getElementById('hasPixieset').checked) {
        portfolioData.pixieset = document.getElementById('pixieset').value;
    }
    if (document.getElementById('hasOther').checked) {
        portfolioData.other = document.getElementById('otherPortfolio').value;
    }

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        portfolio: portfolioData,
        photoTypes: document.getElementById('photoTypes').value,
        mobility: document.querySelector('input[name="mobility"]:checked').value,
        packages: document.getElementById('packages').value,
        availability: document.getElementById('availability').value,
        additionalInfo: document.getElementById('additionalInfo').value,
        timestamp: new Date().toISOString()
    };

    try {
        // Check if URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            throw new Error('Google Apps Script URL not configured. Please see SETUP.md');
        }

        // Send data to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: no-cors mode doesn't allow reading the response, so we assume success
        // Show success message
        successMessage.style.display = 'block';

        // Reset form
        this.reset();

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
});

// Add Instagram @ symbol if user forgets it
document.getElementById('instagram').addEventListener('blur', function() {
    if (this.value && !this.value.startsWith('@')) {
        this.value = '@' + this.value;
    }
});
