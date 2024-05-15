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
        heading.textContent = 'About The Site';




        var paragraph1 = document.createElement('p');
        paragraph1.textContent = 'Welcome to our website! We are thrilled to have you here and share a little about who we are and what we do.';
        paragraph1.style.fontFamily = 'Monaco'; // Modify font family
        paragraph1.style.fontSize = '13px'; // Modify font size




        var paragraph2 = document.createElement('p');
        paragraph2.textContent = 'Our Mission';
        paragraph2.style.fontWeight = 'bold'; // Make paragraph2 text bold
        paragraph2.style.fontFamily = 'Monaco'; // Modify font family
        paragraph2.style.fontSize = '16px'; // Modify font size




        var paragraph3 = document.createElement('p');
        paragraph3.textContent = 'Our mission is to provide an intuitive and user-friendly online web-based map that focuses on essential navigation and location-based information, excluding geological features. We aim to deliver a streamlined mapping experience that prioritizes simplicity, accuracy, and ease of use for our users, allowing them to navigate their surroundings with confidence and efficiency.';
        paragraph3.style.fontFamily = 'Monaco'; // Modify font family
        paragraph3.style.fontSize = '13px'; // Modify font size




        var paragraph4 = document.createElement('p'); // Create paragraph4
        paragraph4.textContent = 'Our Promise:';
        paragraph4.style.fontWeight = 'bold'; // Make paragraph4 text bold
        paragraph4.style.fontFamily = 'Monaco'; // Modify font family
        paragraph4.style.fontSize = '16px'; // Modify font size




        var paragraph5 = document.createElement('p');
        paragraph5.textContent = 'We promise to empower students, faculty, and visitors to navigate the campus environment with ease, efficiency, and confidence. Whether they are discovering academic buildings, locating facilities, or finding their way to events, we are committed to providing a seamless and enjoyable mapping experience tailored to the unique needs of our university community.';
        paragraph5.style.fontFamily = 'Monaco'; // Modify font family
        paragraph5.style.fontSize = '13px'; // Modify font size








        var paragraph6 = document.createElement('p'); // Create paragraph4
        paragraph6.textContent = 'Meet the Creators';
        paragraph6.style.fontWeight = 'bold'; // Make paragraph4 text bold
        paragraph6.style.fontFamily = 'Monaco'; // Modify font family
        paragraph6.style.fontSize = '16px'; // Modify font size




        var paragraph7 = document.createElement('p'); // Create paragraph4
        paragraph7.textContent =
        'In our partial fulfillment to our academic pursuit, we:';
        paragraph7.style.fontFamily = 'Monaco'; // Modify font family
        paragraph7.style.fontStyle = '13px'; // Make creator1 name bold
        paragraph7.style.fontStyle = 'italic'; // Make creator1 name bold
   
            // Create spans for each creator's name
            var creator1 = document.createElement('span');
            creator1.textContent = 'Althea Gwyneth D. Adame,';
            creator1.style.fontSize = '13px'; // Modify font size
            creator1.style.fontWeight = 'bold';
            creator1.style.fontStyle = 'italic'; // Make creator1 name bold




            // Create spans for each creator's name
            var creator2 = document.createElement('span');
            creator2.textContent = 'Ray Joshua U. Del Monte,';
            creator2.style.fontSize = '13px'; // Modify font size
            creator2.style.fontWeight = 'bold'; // Make creator1 name bold
            creator2.style.fontStyle = 'italic';




            var creator3 = document.createElement('span');
            creator3.textContent = 'Karl Louis D. Espejo,';
            creator3.style.fontSize = '13px'; // Modify font size
            creator3.style.fontWeight = 'bold';
            creator3.style.fontStyle = 'italic';




            var creator4 = document.createElement('span');
            creator4.textContent = 'Joshua A. Obane,';
            creator4.style.fontSize = '13px'; // Modify font size
            creator4.style.fontWeight = 'bold';
            creator4.style.fontStyle = 'italic';




            var creator5 = document.createElement('span');
            creator5.textContent = 'Sofia C. Leonardo,';
            creator5.style.fontSize = '13px'; // Modify font size
            creator5.style.fontWeight = 'bold';
            creator5.style.fontStyle = 'italic';








        var paragraph8 = document.createElement('p'); // Create paragraph4
        paragraph8.textContent =
        'A committed team of innovators, we combine our diverse expertise and enthusiasm to fuel progress and excellence. Originating from Rizal Technological University, we are currently in our second year pursuing a Bachelor of Science in Computer Engineering. ';
        paragraph8.style.fontFamily = 'Monaco'; // Modify font family
        paragraph8.style.fontSize = '13px'; // Modify font size
        paragraph8.style.marginBottom = '100px'; // Add extra space below the paragraph








        var paragraph9 = document.createElement('p'); // Create paragraph4
        paragraph9.textContent = 'Copyright © 2022';
        paragraph9.style.fontFamily = 'Monaco'; // Modify font family
        paragraph9.style.fontSize = '12px'; // Modify font size
        paragraph9.style.textAlign = 'center';




            var cw1 = document.createElement('span');
            cw1.textContent = 'Rizal Technological University';
            cw1.style.fontFamily = 'Monaco'; // Modify font family
            cw1.style.fontSize = '12px'; // Modify font size
            cw1.style.display = 'center'; // Make spans inline-block to center them
       
   
            var cw2 = document.createElement('span');
            cw2.textContent = 'Boni Campus';
            cw2.style.fontFamily = 'Monaco'; // Modify font family
            cw2.style.fontSize = '12px'; // Modify font size
       




            var cw3 = document.createElement('span');
            cw3.textContent = 'All Rights Reserved';
            cw3.style.fontFamily = 'Monaco'; // Modify font family
            cw3.style.fontSize = '12px'; // Modify font size
       




            var cw4 = document.createElement('span');
            cw4.textContent = 'College of Engineering and Architecture';
            cw4.style.fontFamily = 'Monaco'; // Modify font family
            cw4.style.fontSize = '12px'; // Modify font size


            var cw5 = document.createElement('span');
            cw4.textContent = 'Contact Us @ 09070198843';
            cw4.style.fontFamily = 'Monaco'; // Modify font family
            cw4.style.fontSize = '12px'; // Modify font size
       
       




        var paragraph10 = document.createElement('p'); // Create paragraph4
        paragraph10.textContent = '';
        paragraph10.style.marginBottom = '100px'; // Add extra space below the paragraph




           




        // Append elements to the About tab
        aboutTab.appendChild(closeButton);
        aboutTab.appendChild(heading);
        aboutTab.appendChild(paragraph1);
        aboutTab.appendChild(paragraph2);
        aboutTab.appendChild(paragraph3);
        aboutTab.appendChild(paragraph4); // Append paragraph4
        aboutTab.appendChild(paragraph5);
        aboutTab.appendChild(paragraph6);
        aboutTab.appendChild(paragraph7);
       
       
       
            paragraph7.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph7.appendChild(creator1);
            paragraph7.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph7.appendChild(creator2);
            paragraph7.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph7.appendChild(creator3);
            paragraph7.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph7.appendChild(creator4);
            paragraph7.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph7.appendChild(creator5);
       
        aboutTab.appendChild(paragraph8);
        aboutTab.appendChild(paragraph9);




            paragraph9.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph9.appendChild(cw1);
            paragraph9.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph9.appendChild(cw2);
            paragraph9.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph9.appendChild(cw3);
            paragraph9.appendChild(document.createElement('br')); // Add line break before creator1 name
            paragraph9.appendChild(cw4);
       
        aboutTab.appendChild(paragraph10);




       




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













