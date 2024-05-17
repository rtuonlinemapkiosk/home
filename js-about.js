document.addEventListener('DOMContentLoaded', function() {
    var openAboutTabButton = document.getElementById('openAboutTab');
    var aboutTab = document.getElementById('aboutTab');
    var openContactTabButton = document.getElementById('openContactTab');
    var contactTab = document.getElementById('contactTab');

    // Check if the elements exist
    if (!openAboutTabButton || !aboutTab || !openContactTabButton || !contactTab) {
        console.error('Required elements are missing from the DOM');
        return;
    }


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
        heading.textContent = 'About The Site';

        var paragraph1 = document.createElement('p');
        paragraph1.textContent = 'Welcome to our website! We are thrilled to have you here and share a little about who we are and what we do.';
        paragraph1.style.fontFamily = 'Monaco';
        paragraph1.style.fontSize = '13px';

        var paragraph2 = document.createElement('p');
        paragraph2.textContent = 'Our Mission';
        paragraph2.style.fontWeight = 'bold';
        paragraph2.style.fontFamily = 'Monaco';
        paragraph2.style.fontSize = '16px';
        paragraph2.style.borderBottom = '1px solid #000'; // Add bottom border style
        paragraph2.style.textAlign = 'center'; // Center align the text

        var paragraph3 = document.createElement('p');
        paragraph3.textContent = 'Our mission is to provide an intuitive and user-friendly online web-based map that focuses on essential navigation and location-based information, excluding geological features. We aim to deliver a streamlined mapping experience that prioritizes simplicity, accuracy, and ease of use for our users, allowing them to navigate their surroundings with confidence and efficiency.';
        paragraph3.style.fontFamily = 'Monaco';
        paragraph3.style.fontSize = '13px';

        var paragraph4 = document.createElement('p');
        paragraph4.textContent = 'Our Promise';
        paragraph4.style.fontWeight = 'bold';
        paragraph4.style.fontFamily = 'Monaco';
        paragraph4.style.fontSize = '16px';
        paragraph4.style.borderBottom = '1px solid #000'; // Add bottom border style
        paragraph4.style.textAlign = 'center'; // Center align the text
        

        var paragraph5 = document.createElement('p');
        paragraph5.textContent = 'We promise to empower students, faculty, and visitors to navigate the campus environment with ease, efficiency, and confidence. Whether they are discovering academic buildings, locating facilities, or finding their way to events, we are committed to providing a seamless and enjoyable mapping experience tailored to the unique needs of our university community.';
        paragraph5.style.fontFamily = 'Monaco';
        paragraph5.style.fontSize = '13px';

        var paragraph6 = document.createElement('p');
        paragraph6.textContent = 'Creators';
        paragraph6.style.fontWeight = 'bold';
        paragraph6.style.fontFamily = 'Monaco';
        paragraph6.style.fontSize = '16px';
        paragraph6.style.borderBottom = '1px solid #000'; // Add bottom border style
        paragraph6.style.textAlign = 'center'; // Center align the text

        var paragraph7 = document.createElement('p');
        paragraph7.textContent = 'In our partial fulfillment to our academic pursuit, we:';
        paragraph7.style.fontFamily = 'Monaco';
        paragraph7.style.fontSize = '13px';
        paragraph7.style.fontStyle = 'italic';

        // Create spans for each creator's name
        var creators = [
            'Althea Gwyneth D. Adame,',
            'Ray Joshua U. Del Monte,',
            'Karl Louis D. Espejo,',
            'Joshua A. Obane,',
            'Sofia C. Leonardo,'
        ];

        creators.forEach(function(creator) {
            var creatorSpan = document.createElement('span');
            creatorSpan.textContent = creator;
            creatorSpan.style.fontSize = '13px';
            creatorSpan.style.fontWeight = 'bold';
            creatorSpan.style.fontStyle = 'italic';
            paragraph7.appendChild(document.createElement('br'));
            paragraph7.appendChild(creatorSpan);
        });

        var paragraph8 = document.createElement('p');
        paragraph8.textContent = 'A committed team of innovators, we combine our diverse expertise and enthusiasm to fuel progress and excellence. Originating from Rizal Technological University, we are currently in our second year pursuing a Bachelor of Science in Computer Engineering.';
        paragraph8.style.fontFamily = 'Monaco';
        paragraph8.style.fontSize = '13px';
        paragraph8.style.marginBottom = '100px';

        var paragraph9 = document.createElement('p');
        paragraph9.textContent = 'Copyright © 2024';
        paragraph9.style.fontFamily = 'Monaco';
        paragraph9.style.fontSize = '15px';
        paragraph9.style.textAlign = 'center';
        paragraph9.style.marginBottom = '10px';

        var cw1 = document.createElement('span');
        cw1.textContent = 'Rizal Technological University';
        cw1.style.fontFamily = 'Monaco';
        cw1.style.fontSize = '12px';

        var cw2 = document.createElement('span');
        cw2.textContent = 'Boni Campus';
        cw2.style.fontFamily = 'Monaco';
        cw2.style.fontSize = '12px';
        
        var cw3 = document.createElement('span');
        cw3.textContent = 'All Rights Reserved';
        cw3.style.fontFamily = 'Monaco';
        cw3.style.fontSize = '12px';


        var cw4 = document.createElement('span');
        cw4.textContent = 'College of Engineering and Architecture';
        cw4.style.fontFamily = 'Monaco';
        cw4.style.fontSize = '12px';


        var paragraph10 = document.createElement('p');
        paragraph10.style.marginBottom = '1px';

        // Append elements to the About tab
        aboutTab.appendChild(closeButton);
        aboutTab.appendChild(heading);
        aboutTab.appendChild(paragraph1);
        aboutTab.appendChild(paragraph2);
        aboutTab.appendChild(paragraph3);
        aboutTab.appendChild(paragraph4);
        aboutTab.appendChild(paragraph5);
        aboutTab.appendChild(paragraph6);
        aboutTab.appendChild(paragraph7);
        aboutTab.appendChild(paragraph8);
        aboutTab.appendChild(paragraph9);

        // Append copyright spans to paragraph9
        paragraph9.appendChild(document.createElement('br'));
        paragraph9.appendChild(cw1);
        paragraph9.appendChild(document.createElement('br'));
        paragraph9.appendChild(cw2);
        paragraph9.appendChild(document.createElement('br'));
        paragraph9.appendChild(cw3);
        paragraph9.appendChild(document.createElement('br'));
        paragraph9.appendChild(cw4);
      

        aboutTab.appendChild(paragraph10);
    }

    function openAboutTab() {
        closeContactTab(); // Close the Contact tab if it's open
        populateAboutTab(); // Populate the About tab with content
        aboutTab.classList.add('open'); // Show the About tab
        aboutTab.style.zIndex = '3'; // Set z-index to overlay other tabs
    }
        // Add event listener to open the About tab
    openAboutTabButton.addEventListener('click', openAboutTab);

    // Function to close the Contact tab
    function closeContactTab() {
        contactTab.classList.remove('open'); // Hide the Contact tab
    }

    // Function to close the About tab
    function closeAboutTab() {
        aboutTab.classList.remove('open'); // Hide the About tab
    }
});
