// Client-side Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('review-form');
    form.addEventListener('submit', function(event) {
      const rating = form.querySelector('#user-rating');
      const review = form.querySelector('#user-review');
      let valid = true;
  
      // Validate rating
      if (rating.value < 1 || rating.value > 5) {
        rating.classList.add('is-invalid');
        valid = false;
      } else {
        rating.classList.remove('is-invalid');
      }
      
      // Validate review text
      if (review.value.length < 10 || review.value.length > 5000) {
        review.classList.add('is-invalid');
        valid = false;
      } else {
        review.classList.remove('is-invalid');
      }
  
      if (!valid) {
        event.preventDefault(); // Prevent form submission
        event.stopPropagation();
      }
    });
  });
  