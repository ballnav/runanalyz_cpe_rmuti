function toggleScroll() {
    const scrollButton = document.getElementById('scrollButton');
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        // If at bottom, scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        scrollButton.innerHTML = '↓'; // Change button icon to down arrow
    } else {
        // If not at bottom, scroll to bottom
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        scrollButton.innerHTML = '↑'; // Change button icon to up arrow
    }
}

// Update button icon on scroll
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollButton');
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        scrollButton.innerHTML = '↑';
    } else {
        scrollButton.innerHTML = '↓';
    }
});
