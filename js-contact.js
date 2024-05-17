document.addEventListener('DOMContentLoaded', function() {
    var openContactTabButton = document.getElementById('openContactTab');
    var contactTab = document.getElementById('contactTab');
    var openAboutTabButton = document.getElementById('openAboutTab');
    var aboutTab = document.getElementById('aboutTab');

    // Check if the elements exist
    if (!openContactTabButton || !contactTab || !openAboutTabButton || !aboutTab) {
        console.error('Required elements are missing from the DOM');
        return;
    }

    // Function to populate the Contact tab with content
    function populateContactTab() {
        // Clear existing content
        contactTab.innerHTML = '';

        // Create elements for Contact tab content
        var closeButton = document.createElement('button');
        closeButton.id = 'closeContactTab';
        closeButton.textContent = 'CLOSE';
        closeButton.addEventListener('click', function() {
            contactTab.classList.remove('open'); // Hide the Contact tab when close button is clicked
        });

        var heading = document.createElement('h2');
        heading.textContent = 'Contact Us';

        var paragraph1 = document.createElement('p');
        paragraph1.textContent = 'To reach us, simply click here to compose a message via email.';
        paragraph1.style.fontFamily = 'Monaco';
        paragraph1.style.fontSize = '13px';

        // Create an anchor tag for the email address
        var emailLink = document.createElement('a');
        emailLink.textContent = 'rtuonlinemapkiosk@gmail.com';
        emailLink.href = 'https://mail.google.com/mail/u/0/#inbox?compose=new&to=rtuonlinemapkiosk@gmail.com'; // Set the href attribute with the recipient email address
        emailLink.style.fontFamily = 'Monaco';
        emailLink.style.fontSize = '13px';
        emailLink.target = '_blank'; // Open the link in a new tab

        // Append elements to the Contact tab
        contactTab.appendChild(closeButton);
        contactTab.appendChild(heading);
        contactTab.appendChild(paragraph1);
        contactTab.appendChild(emailLink); // Append the email anchor tag
    }

    // Function to open the Contact tab
    function openContactTab() {
        closeAboutTab(); // Close the About tab if it's open
        populateContactTab(); // Populate the Contact tab with content
        contactTab.classList.add('open'); // Show the Contact tab
        contactTab.style.zIndex = '3'; // Set z-index to overlay other tabs
    }

    // Add event listener to the Contact button
    openContactTabButton.addEventListener('click', openContactTab);

    // Function to close the About tab
    function closeAboutTab() {
        aboutTab.classList.remove('open'); // Hide the About tab
    }

    // Function to close the Contact tab
    function closeContactTab() {
        contactTab.classList.remove('open'); // Hide the Contact tab
    }
});
