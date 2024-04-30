document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        let hasError = false;
        const title = document.getElementById('title');
        const author = document.getElementById('author');
        const genre = document.getElementById('genre');
        const ratings = document.querySelectorAll('[name^="reviews["][name$="][rating]"]');
        const reviewTexts = document.querySelectorAll('[name^="reviews["][name$="][text]"]');

        // Validation for title
        if (!title.value.trim()) {
            showError(title, 'Title is required.');
            hasError = true;
        }

        // Validation for author
        if (!author.value.trim()) {
            showError(author, 'Author is required.');
            hasError = true;
        }

        // Validation for genre
        if (!genre.value.trim()) {
            showError(genre, 'Genre is required.');
            hasError = true;
        }

        // Additional validations for ratings and review texts
        ratings.forEach(rating => {
            if (rating.value < 1 || rating.value > 5) {
                showError(rating, 'Rating must be between 1 and 5.');
                hasError = true;
            }
        });

        reviewTexts.forEach(text => {
            if (text.value.trim().length < 10 || text.value.trim().length > 5000) {
                showError(text, 'Review text must be between 10 and 5000 characters.');
                hasError = true;
            }
        });

        if (hasError) {
            event.preventDefault(); // Prevent form submission
        }
    });

    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = message;
        errorDiv.className = 'error-message'; // Add CSS class for styling
        if(element.nextElementSibling) {
            element.parentNode.insertBefore(errorDiv, element.nextElementSibling);
        } else {
            element.parentNode.appendChild(errorDiv);
        }
    }
});
