document.addEventListener('DOMContentLoaded', function() {
    var openAboutTabButton = document.getElementById('openAboutTab');
    var closeAboutTabButton = document.getElementById('closeAboutTab');
    var aboutTab = document.getElementById('aboutTab');

    // Function to populate the About tab with content
    function populateAboutTab() {
        // Clear existing content
        aboutTab.innerHTML = '';

        // Create elements for About tab content
        var closeButton = document.createElement('button');
        closeButton.id = 'closeAboutTab';
        closeButton.textContent = 'CLOSE';
        closeButton.addEventListener('click', function() {
            aboutTab.classList.remove('open'); // Hide the About tab when close button is clicked
        });

        var heading = document.createElement('h2');
        heading.textContent = 'About Us';

        var paragraph1 = document.createElement('p');
        paragraph1.textContent = 'Welcome to our website! We are dedicated to providing...';

        var paragraph2 = document.createElement('p');
        paragraph2.textContent = 'Contact us at: example@email.com';

        // Append elements to the About tab
        aboutTab.appendChild(closeButton);
        aboutTab.appendChild(heading);
        aboutTab.appendChild(paragraph1);
        aboutTab.appendChild(paragraph2);
    }

    // Function to open the About tab
    function openAboutTab() {
        populateAboutTab(); // Populate the About tab with content
        aboutTab.classList.add('open'); // Show the About tab
    }

    // Function to close the About tab
    function closeAboutTab() {
        aboutTab.classList.remove('open'); // Hide the About tab
    }

    // Add event listeners to open and close the About tab
    openAboutTabButton.addEventListener('click', openAboutTab);
    closeAboutTabButton.addEventListener('click', closeAboutTab);
});
