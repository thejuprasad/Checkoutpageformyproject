// Set your Stripe API key
Stripe.setPublishableKey('pk_test_1234567890');

// Handle form submission
document.querySelector('#payment-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Disable submit button to prevent multiple submissions
  var submitBtn = document.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';
  
  // Collect card details from form
  var cardNumber = document.querySelector('#card-number').value;
  var cardExpiry = document.querySelector('#card-expiry').value;
  var cardCvc = document.querySelector('#card-cvc').value;
  
  // Create a token with Stripe.js
  Stripe.card.createToken({
    number: cardNumber,
    exp: cardExpiry,
    cvc: cardCvc
  }, function(status, response) {
    if (response.error) {
      // Display error message to user
      var errorElement = document.querySelector('#payment-errors');
      errorElement.textContent = response.error.message;
      
      // Enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Pay Now';
    } else {
      // Send token to your server for processing
      var token = response.id;
      var formData = new FormData(document.querySelector('#payment-form'));
      formData.append('stripeToken', token);
      
      // Use AJAX to submit form data to your server
      // Example using jQuery AJAX:
      $.ajax({
        url: '/charge',
        type: 'POST',
        data: formData,
        processData: false,
      
