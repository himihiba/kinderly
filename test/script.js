// script.js

const stars = document.querySelectorAll('.star-input');
const submitButton = document.querySelector('.submit-rating');
let userRating = 0;

// Event listener for selecting stars
stars.forEach(star => {
    star.addEventListener('click', function () {
        userRating = parseInt(this.getAttribute('data-value')); // Get the selected star value
        // Reset all stars
        stars.forEach(s => s.classList.remove('selected'));
        // Highlight selected stars up to the clicked star
        for (let i = 0; i < userRating; i++) {
            stars[i].classList.add('selected');
        }
    });
});

// Event listener for submitting rating
submitButton.addEventListener('click', function () {
    if (userRating > 0) {
        updateRating(userRating);
    } else {
        alert('Please select a rating before submitting.');
    }
});

// Function to update the rating display
function updateRating(userRating) {
    // Fetch existing ratings data (example: from local storage or server)
    let currentTotalRatings = 10; // Example: total number of ratings
    let currentRatingSum = 40;    // Example: sum of all ratings

    // Update ratings with new user's rating
    currentTotalRatings++;
    currentRatingSum += userRating;

    // Calculate new average rating
    let newAverageRating = (currentRatingSum / currentTotalRatings).toFixed(1);

    // Update the product card with the new average rating
    document.querySelector('.average-rating').innerText = newAverageRating;
    document.querySelector('.stars').innerText = '⭐'.repeat(Math.floor(newAverageRating)) + (newAverageRating % 1 ? '✰' : '');
    document.querySelector('.total-ratings').innerText = `(${currentTotalRatings} ratings)`;

    alert(`Thank you for your rating! The new average rating is ${newAverageRating}`);
}
