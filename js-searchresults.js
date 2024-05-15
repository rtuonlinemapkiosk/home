const slideKeyframes = `
    @keyframes slide {
        0% {
            opacity: 0;
            transform: translateY(-50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add the animation to the styles
const styleElement = document.createElement('style');
styleElement.innerHTML = slideKeyframes;
document.head.appendChild(styleElement);

function loadDirectionsTab(destination) {
    fetch('html-directionstab.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        let container = document.getElementById('buildingDetailsTab');
        container.innerHTML = data;
        let searchForm = container.querySelector('#searchForm');
        let from = container.querySelector('#from');
        let to = container.querySelector('#to');
        let backButton = container.querySelector('#backButton');
        let categories = container.querySelector('#categories');
        let resultContent = document.getElementById("resultContent");

        if (!searchForm || !from || !to || !backButton || !categories || !resultContent) {
            throw new Error('Failed to initialize elements');
        }

        to.value = destination;
        backButton.addEventListener('click', function() {
            // Clear result content and adjust visibility immediately
            resultContent.innerHTML = '';
            categories.style.display = 'block';
            searchForm.style.display = 'block';
            backButton.style.display = 'none';
            document.getElementById('returnButton').style.display = 'block';

            // Apply slide transition
            container.style.animation = 'slide 0.5s ease';
            container.addEventListener('animationend', function animationEndCallback() {
                container.removeEventListener('animationend', animationEndCallback);
                // Reset container styles after animation
                container.style.opacity = 1;
                container.style.transform = 'translateY(0)';
                container.style.animation = 'none';
            });
        });

        document.getElementById('returnButton').addEventListener('click', function() {
            window.location.href = 'index.html';
        });

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let result = calculateResult(from.value.toLowerCase(), to.value.toLowerCase(), from, to);
            displayResult(result, categories, from, to);
            
            // Apply slide from top animation to search results
            resultContent.style.animation = 'slide 0.5s ease';
            resultContent.addEventListener('animationend', function animationEndCallback() {
                resultContent.removeEventListener('animationend', animationEndCallback);
                // Reset resultContent styles after animation
                resultContent.style.opacity = 1;
                resultContent.style.transform = 'translateY(0)';
                resultContent.style.animation = 'none';
            });
        });

        document.getElementById('searchOverlay').style.display = 'none';

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'css-searchresults.css';
        document.head.appendChild(linkElement);
    })
    .catch(error => console.error('Error loading directions tab:', error));
}


function displayResult(result, categories, from, to) {
    var resultContent = document.getElementById("resultContent");
    resultContent.innerHTML = "";
    var resultList = document.createElement("ul");
    resultList.classList.add("search-results");
   
    // Create a list item for the estimated time
    var timeItem = document.createElement("li");
    timeItem.innerHTML = "<span style='color: #808080; font-size: 0.7em;'>Time to destination:</span><br><span style='font-weight: bold;'>" + result.time + " minutes</span>"; // Update how you display the estimated time
    timeItem.classList.add("estimated-time");
    resultList.appendChild(timeItem);
   
    var divider = document.createElement("hr");
    divider.classList.add("divider");
    resultList.appendChild(divider);

     //  ✦ . 　⁺ 　 . ───────── ౨ ICON LINKS ৎ ─────────  . 　⁺ 　 . ✦   */
     // Turn right : 
     //"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png"
     // Turn left : 
     //"https://cdn-icons-png.flaticon.com/512/724/724999.png"
     // Walk straight : 
    // "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"
     // No available route : 
     //"https://static.thenounproject.com/png/333710-200.png"
     // Arrive : 
     //"https://static.thenounproject.com/png/868367-200.png"


    //  ✦ . 　⁺ 　 . ───────── ౨ DITO PALITAN NG ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
   
    // Icon mapping for each item in the result array
    var iconMapping = {
       
                     //  ✦ . 　⁺ 　 . ───────── ౨ ITC ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
       
              //  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
              "Leave ITC Building and walk straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
              "Turn left at R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
              "Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",
      
          
              
              //  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
             
                   "Leave ITC Building and walk straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
                   //  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
                  
                   "Leave ITC Building and walk straight passed the Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",
           
          
           
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
                  
                    "Leave ITC Building and walk straight passed the Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",
            
                      //. ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
                  
                   "Leave ITC Building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "You see Stage": "https://cdn-icons-png.flaticon.com/512/1082/1082748.png",
                   "Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",
           
          
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                  
                  "Leave ITC Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Walk straight passed the OLD Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",
           
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave ITC Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed the OLD Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",
           
          
            
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                  "Leave ITC Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",
                    
                  
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave ITC Building and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Arrive at Dormitory Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave ITC Building and turn left passed the Dormitory Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: MDC Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave ITC Building and walk straight passed the ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
              
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave ITC Building and Turn right passed the OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed the MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",
              
                    
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave ITC Building walk straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed the Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",
                    
                    
                    
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave ITC Building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave ITC Building and Turn right passed the OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed the University Gymnasium": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave ITC Building and Turn right to OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Turn left to MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed the Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITC Building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave ITC Building and Turn right to OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn left to MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight passed the MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right to Gate-1": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",
              
                                      //  ✦ . 　⁺ 　 . ───────── ౨ SNAGAH ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
                    
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn right at OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight and passed the ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",
              
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn left at Old Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight at MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn left to the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                       //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                       "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                       "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                       "Turn right to OLD Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                       "Walk straight passed the Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                       "Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
                      
                       //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
                       "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                       "Turn right to R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                       "Walk straight passed the R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                       "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                       "Arrive at OLD Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
                        //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
                        "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                        "Turn left at Snagah Entrance": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                        "Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
                          //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                          "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                          "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                          "Walk straight passed the Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                          "Walk straight passed the ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                          "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                          "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                          "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                          "Arrive at Dormitory Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
                           //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                           "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Walk straight passed the Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Walk straight passed the ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Walk straight passed the Dormitory Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",
                        
                        
                      
          
                        
                           //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                           "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Turn right passed the Old Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
                           //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
                           "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Turn left passed the Old Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Turn left at MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Walk straight passed the MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",
           
           
                            //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
                            "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                            "Turn left passed the Old Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                            "Turn left at MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                            "Walk straight passed the Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                            "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",
           
           
                            //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
                            "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                            "Turn left passed the Old Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Walk straight passed the University Gymnasium": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                            "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",
           
           
                            //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
                            "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                            "Turn right passed the ITB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                            "Walk straight to ITC Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                            "Turn left passed the ITC Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                            "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",
           
           
                            //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
                            "Leave Snagah Building and Walk straight passed the Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                            "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                            "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",
           
           
                             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: University Gymnasium Building ৎ ─────────  . 　⁺ 　 . ✦   */
                           "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Turn left passed the Old Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Arrive at University Gymnasium Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
                            //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: University Quadrangle Building ৎ ─────────  . 　⁺ 　 . ✦   */
                           "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                           "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                           "Walk straight to the open area": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                           "Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",
           
           
                              //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
                              "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                              "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                              "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                              "Walk straight to the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                              "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                              "Arrive at  Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",
           
           
                               //.  ✦ . 　⁺ 　 . ───────── ౨ From: Snagah Building To: Medical & Dental Clinic Buildingৎ ─────────  . 　⁺ 　 . ✦   */
                              "Leave Snagah Building and Turn left to R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                              "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                              "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                              "Walk straight to the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                              "Turn right passed Old Building (South Wing)": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                              "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                              "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
                              "Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",
      
      
      
                                     //  ✦ . 　⁺ 　 . ───────── ౨ R&D ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
                    
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave R&D Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn left at OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight and passed the Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Walk straight and passed the ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png",
              
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave R&D Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight at MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn left to the MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Arrive at Wellness Building":"https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave R&D Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn left to OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight passed the Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Arrive at ITB Building":"https://static.thenounproject.com/png/868367-200.png",
           
           
                      
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave R&D Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn right passed the R&D Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Arrive at OLD Building":"https://static.thenounproject.com/png/868367-200.png",
           
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave R&D Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Turn left at Snagah Entrance":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Arrive at Snagah Building":"https://static.thenounproject.com/png/868367-200.png",
           
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn left passed at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight passed the Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Walk straight passed the ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Arrive at Dormitory Building":"https://static.thenounproject.com/png/868367-200.png",
      
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn left passed at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight passed the Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Walk straight passed the ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight passed the Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at Engineering Laboratory Building":"https://static.thenounproject.com/png/868367-200.png",
                
                
              
      
                
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right passed Old Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Arrive at MAB Building":"https://static.thenounproject.com/png/868367-200.png",
      
      
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left passed Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight passed MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at Gate-1":"https://static.thenounproject.com/png/868367-200.png",
      
      
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Wellness Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-2":"https://static.thenounproject.com/png/868367-200.png",
      
      
      
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right passed Old Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed the University Gymnasium":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-3":"https://static.thenounproject.com/png/868367-200.png",
      
      
      
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right at Old Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight passed ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-4":"https://static.thenounproject.com/png/868367-200.png",
      
      
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave R&D Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight passed Snagah Building Entrance":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-5":"https://static.thenounproject.com/png/868367-200.png",
      
      
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: University Gymnasium Building ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right passed Old Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Arrive at University Gymnasium Building":"https://static.thenounproject.com/png/868367-200.png",
      
      
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: University Quadrangle Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight to the open area":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png",
      
      
                  //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
                  "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Arrive at  Old Building (South Wing)":"https://static.thenounproject.com/png/868367-200.png",
      
      
      
                  //.  ✦ . 　⁺ 　 . ───────── ౨ From: R&d building To: Medical & Dental Clinic Buildingৎ ─────────  . 　⁺ 　 . ✦   */
                  "Leave R&D Building and Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left passed the R&D Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                  "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                  "Walk straight passed Old Building (South Wing)":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                  "Arrive at Medical & Dental Clinic Building":"https://static.thenounproject.com/png/868367-200.png",
           

                              //  ✦ . 　⁺ 　 . ───────── ౨ OLD ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */


                       //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */


 "Leave Old Building and walk past the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png" ,
         "Walk straight and take the staircase":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png" ,
         "Turn left at the ground floor of ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png" ,
         "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png" ,
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: WELLNESS Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk straight between Food Kiosk and Promenade":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight and take the staircase":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left and walk halfway through MAB Building ":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right at the entrance of MAB Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Arrive at Wellness Building":"https://static.thenounproject.com/png/868367-200.png" ,
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and turn right at University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk halfway through University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left and take the ITB Building staircase":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Arrive at ITB Building":"https://static.thenounproject.com/png/868367-200.png" ,
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk past the promenade":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png" ,
         "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png" ,
         "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png" ,
         "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png"
,
         "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
         "Walk straight past the R&D Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
         "Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
         "Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
         "Arrive at Snagah Building":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk past the promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Arrive at R&D Building":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk past the University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
         "Walk straight and take the staircase":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
         "Walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
         "Arrive at Dormitory Building":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: ENGINEERING LABORATORY Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk past the University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight and take the staircase":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight past Doprmitory Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Engineering Laboratory Building":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight and take the staircase":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left and walk halfway through MAB Building ":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn left at the entrance of MAB Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Arrive at MAB Building":     "https://static.thenounproject.com/png/868367-200.png",
 
         //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: GATE-1 ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight and take the staircase":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at MAB Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk straight past the MAB Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Arrive at Gate-1":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: GATE-2 ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight and take the staircase":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at MAB Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right at Wellness Building":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight past the Wellness Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Gate-2":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: GATE-3 ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight and take the staircase":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at MAB Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right at Wellness Building":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight past the Wellness Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn right at Gate-2":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Arrive at Gate-3":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: GATE-4 ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and walk straight at Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at the corner of ITC Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk straight between Food Kiosk and ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Gate-4":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: GATE-5 ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and walk past the promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight past the R&D Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"
,
             "Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Turn right at Snagah Building entrance":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk straight past Snagah Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Gate-5":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: UNIVERSITY GYMNASIUM ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and walk between Promenade and Food Kiosk":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at University Gymnasium":     "https://static.thenounproject.com/png/868367-200.png",  
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: UNIVERSITY QUADRANGLE ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Old Building and turn left at the staircase":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk straight and take the staircase":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk straight to the open area":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: OLD BUILDING (SOUTH WING) ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and walk past Promenade":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk straight past the Old Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Arrive at  Old Building (South Wing)":     "https://static.thenounproject.com/png/868367-200.png",
 
        //  ✦ . 　⁺ 　 . ───────── ౨ From: OLD Building To: MEDICAL & DENTAL CLINIC BUILDING ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Old Building and walk past Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk straight past the Old Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk past the Old Building (South Wing)":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Medical & Dental Clinic Building":     "https://static.thenounproject.com/png/868367-200.png",
        
        
        
                          //  ✦ . 　⁺ 　 . ───────── ౨ DORMITORY ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
        
    
             //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */


         "Leave Dormitory Building and turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png" ,
                 "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png" ,
                 "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: WELLNESS Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png" ,
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight between Promenade and Food Kiosk":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Arrive at Wellness Building":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Old Building and turn right at University Quadrangle":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at ITB Building":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past R&D Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Arrive at Snagah Building":"https://static.thenounproject.com/png/868367-200.png",
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Arrive at R&D Building":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: Dormitory Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Old Building":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: Dormitory Building To: ENGINEERING LABORATORY Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png"       ,
                     "Walk straight":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"         ,
                     "Arrive at Engineering Laboratory Building":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
          "Leave Dormitory Building and walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"        ,
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"        ,
                     "Walk straight past University Gymnasium ":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"        ,
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png"        ,
                     "Arrive at MAB Building":"https://static.thenounproject.com/png/868367-200.png"        ,
         
         
         
                 //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: GATE-1 ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Dormitory Building and walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"         ,
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"        ,
                     "Walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"        ,
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png"        ,
                     "Walk straight past MAB Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"        ,
                     "Arrive at Gate-1":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: GATE-2 ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Dormitory Building and walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right at Wellness Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight past the Wellness Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-2":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: GATE-3 ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight between Food Kiosk and Promenade":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right at Wellness Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight past the Wellness Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at Gate-2":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Arrive at Gate-3":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: GATE-4 ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Dormitory Building and walk straight past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at the corner of ITC Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight between Food Kiosk and ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-4":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: GATE-5 ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past R&D Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at Snagah Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past Snagah Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-5":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: UNIVERSITY GYMNASIUM ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Dormitory Building and walk past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight past University Quadrangle":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at University Gymnasium":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: UNIVERSITY QUADRANGLE ৎ ─────────  . 　⁺ 　 . ✦   */ 
         "Leave Dormitory Building and walk past ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight to the open area":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png",
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: OLD BUILDING (SOUTH WING) ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight past ITB Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Walk straight past Medical & Dental Clinic Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"         ,
                     "Arrive at  Old Building (South Wing)":"https://static.thenounproject.com/png/868367-200.png"         ,
         
         
         
                //  ✦ . 　⁺ 　 . ───────── ౨ From: DORMITORY Building To: MEDICAL & DENTAL CLINIC BUILDING ৎ ─────────  . 　⁺ 　 . ✦   */
         "Leave Dormitory Building and walk straight to ITC Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png"         ,
                     "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png"        ,
                     "Walk straight past ITB Building":     "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Medical & Dental Clinic Building":"https://static.thenounproject.com/png/868367-200.png",
                 


                       //  ✦ . 　⁺ 　 . ───────── ౨ MAB ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */

  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
  "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
  "Turn Left passed the Gate-2": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the University Gymnasium": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the University Gymnasium": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the  University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the ITC Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Arrive at Dormitory Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the Dormitory Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right passed the ITB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right passed the ITB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight passed the R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",


  //.  ✦ . 　⁺ 　 . ───────── ౨ From: MAB Building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
  "Leave MAB Building and turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
  "Walk Straight passed the R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight passed the Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
  "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
  "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",

             
  
                //  ✦ . 　⁺ 　 . ───────── ౨ WELLNESS ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */

             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",
            
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight ": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",
  
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight ": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight ": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",  
            
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Gymnasium": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",
            
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk Straight passed the ITC Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk Straight passed the ITC Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Dormitory Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the Medical & Dental Clinic Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the Old Building (South Wing)": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",
 
 
             //.  ✦ . 　⁺ 　 . ───────── ౨ From: Wellness Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
             "Leave Wellness Building and Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.p",
             "Turn Left passed the MAB Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the Old Building (South Wing)": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
             "Walk Straight passed the R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Turn Left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
             "Walk Straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",


                   //  ✦ . 　⁺ 　 . ───────── ౨ ENGINEERING LABORAROTY ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
 
         //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Engineering Laboratory building and walk past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
        "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png",

       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: WELLNESS Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight between Promenade and Food Kiosk":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Turn right":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Arrive at Wellness Building":"https://static.thenounproject.com/png/868367-200.png",

       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at ITB Building":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past R&D Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
             "Arrive at Snagah Building":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
"Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at R&D Building":"https://static.thenounproject.com/png/868367-200.png",

       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
"Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Old Building":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
"Leave engineering laboratory building and walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at Dormitory Building":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */ 
"Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Gymnasium ":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at MAB Building":"https://static.thenounproject.com/png/868367-200.png",


        //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: GATE-1 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight between Food Kiosk and Promenade":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-1":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: GATE-2 ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight between Food Kiosk and Promenade":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Turn right at Wellness Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight past the Wellness Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-2":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: GATE-3 ৎ ─────────  . 　⁺ 　 . ✦   */ 
"Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight between Food Kiosk and Promenade":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Turn right at Wellness Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight past the Wellness Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right at Gate-2":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Arrive at Gate-3":"https://static.thenounproject.com/png/868367-200.png",

       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: GATE-4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Engineering Laboratory and walk straight past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right at the corner of ITC Building":"https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight between Food Kiosk and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-4":"https://static.thenounproject.com/png/868367-200.png",


       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: GATE-5 ৎ ─────────  . 　⁺ 　 . ✦   */ 
"Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past R&D Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at Snagah Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past Snagah Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-5":"https://static.thenounproject.com/png/868367-200.png",





       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: UNIVERSITY GYMNASIUM ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Engineering Laboratory building and walk past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at University Gymnasium":"https://static.thenounproject.com/png/868367-200.png",  





       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: UNIVERSITY QUADRANGLE ৎ ─────────  . 　⁺ 　 . ✦   */ 
 "Leave Engineering Laboratory building and walk past Dormitory and ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight to the open area":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png",





       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: OLD BUILDING (SOUTH WING) ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight past Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at  Old Building (South Wing)":"https://static.thenounproject.com/png/868367-200.png",



       //  ✦ . 　⁺ 　 . ───────── ౨ FROM: ENGINEERING LABORATORY Building To: MEDICAL & DENTAL CLINIC BUILDING ৎ ─────────  . 　⁺ 　 . ✦   */
 "Leave Engineering Laboratory building and walk straight past Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left at ITC Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight past ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Medical & Dental Clinic Building":"https://static.thenounproject.com/png/868367-200.png",

                
            //  ✦ . 　⁺ 　 . ───────── ౨ ITB ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
                    

       //  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
       "Leave ITB Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight passed Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn right to Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
       "Turn left passed Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
       "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Arrive at Snagah Building":"https://static.thenounproject.com/png/868367-200.png",

          
              
              //  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
             
       "Leave ITB Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight passed Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn right to Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
       "Turn left passed Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
       "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Arrive at R&D Building":"https://static.thenounproject.com/png/868367-200.png",
           
                   //  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave ITB Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at OLD Building":"https://static.thenounproject.com/png/868367-200.png", 
          
           
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
                  
        "Leave ITB Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
        "Walk straight passed Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
        "Arrive at  Old Building (South Wing)":"https://static.thenounproject.com/png/868367-200.png", 
          
            
                      //. ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
                  
        "Leave ITB Building and walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png", 
           
          
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                  
                   "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn left passed the OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Arrive at MAB Building":"https://static.thenounproject.com/png/868367-200.png", 
           
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn right passed Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at University Gymnasium Building":"https://static.thenounproject.com/png/868367-200.png", 
           
          
            
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave ITB Building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight passed ITB Building ":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png", 
                    
                  
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave ITB Building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right passed ITC Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at Dormitory Building": "https://static.thenounproject.com/png/868367-200.png",
           
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
        "Leave ITB Building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
        "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Turn right passed ITC Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
        "Walk straight passed Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: MDC Building ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave ITB Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
              
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn left passed the OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight at MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left to the MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",
                    
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave ITB Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight passed Medical & Dental Clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right to Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn left passed Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left at Snagah Entrance":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight passed Snagah Building Entrance":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",
                    
                    
                    
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight passed ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Turn right passed Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed the University Gymnasium":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn right passed MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Wellness Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",
           
           
           
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: ITB Building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave ITB Building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight passed MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",




             //  ✦ . 　⁺ 　 . ───────── ౨ MDC ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
                    

       //  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
       "Leave  Medical & Dental Clinic Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight passed OLD Building (South Wing)":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn right to Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
       "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight passed R&D Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Arrive at Snagah Building":"https://static.thenounproject.com/png/868367-200.png",
          
              
              //  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
             
              "Leave  Medical & Dental Clinic Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
              "Walk straight passed OLD Building (South Wing)":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Turn right to Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
              "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Turn left passed Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
              "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
              "Arrive at R&D Building":"https://static.thenounproject.com/png/868367-200.png",
           
                   //  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave  Medical & Dental Clinic Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight passed OLD Building (South Wing)":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at OLD Building":"https://static.thenounproject.com/png/868367-200.png",
          
           
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave  Medical & Dental Clinic Building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Arrive at  Old Building (South Wing)":"https://static.thenounproject.com/png/868367-200.png",
            
                      //. ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
                  
        "Leave Medical & dental building and walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png", 
           
          
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
                  
            "Leave Medical & dental building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left passed the OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at MAB Building":"https://static.thenounproject.com/png/868367-200.png", 
           
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave Medical & dental building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left passed the OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at University Gymnasium Building":"https://static.thenounproject.com/png/868367-200.png",
           
          
            
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave Medical & dental building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight passed ITB building ":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png", 
                    
                  
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Medical & dental building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed ITC building ":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Arrive at Dormitory Building":"https://static.thenounproject.com/png/868367-200.png", 

                    //. ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Medical & dental building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed ITC building ":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Engineering Laboratory Building":"https://static.thenounproject.com/png/868367-200.png", 
           
           
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave Medical & dental building and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",
           
           
    
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
                 
                 
                   "Leave Medical & Dental Clinic Building and Turn right at ITB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight passed ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn left at the OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight passed at OLD Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",
                
                    
                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave Medical & dental building and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight passed OLD Building (South Wing)":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right at Snagah Entrance": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed Snagah Building Entrance":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",
                    
                    
                    
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave Medical & dental building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight passed ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",
           
           
                 //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave Medical & dental building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right passed Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed the University Gymnasium":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",
           
        

                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Medical & dental building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn right passed MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Wellness Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",
           
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: Medical & dental building To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave Medical & dental building and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight passed MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",

                
                
                
                      //  ✦ . 　⁺ 　 . ───────── ౨ .OLD BUILDING (SOUTH WING) ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */

       //  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
       "Leave Old building (South Wing) and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn right to Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
       "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Walk straight passed R&D Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
       "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
       "Arrive at Snagah Building":"https://static.thenounproject.com/png/868367-200.png",
           
              
              //  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
             
              "Leave Old building (South Wing) and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
              "Walk straight at OLD Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Walk straight passsed OLD Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
              "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
              "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
              "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
              "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
              "Arrive at R&D Building":"https://static.thenounproject.com/png/868367-200.png",

           
                   //  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave Old building (South Wing) and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Arrive at OLD Building":"https://static.thenounproject.com/png/868367-200.png",
          
           

                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: MDC ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Old building (South Wing) and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Arrive at  Medical & dental clinic Building":"https://static.thenounproject.com/png/868367-200.png",
            
                      //. ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
                  
        "Leave Old building (South Wing) and walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
        "Arrive at University Quadrangle":"https://static.thenounproject.com/png/868367-200.png", 
          
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */

            "Leave Old building (South Wing) and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight passed the OLD Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
            "Arrive at MAB Building":"https://static.thenounproject.com/png/868367-200.png", 
           
                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave Old building (South Wing) and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right passed Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Arrive at University Gymnasium Building":"https://static.thenounproject.com/png/868367-200.png",
            
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
                   "Leave Old building (South Wing) and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight passed ITB Building ":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at ITC Building":"https://static.thenounproject.com/png/868367-200.png", 
                
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Old building (South Wing) and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Arrive at Dormitory Building":"https://static.thenounproject.com/png/868367-200.png", 

     
                    //. ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Old building (South Wing) and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Dormitory Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Engineering Laboratory Building":"https://static.thenounproject.com/png/868367-200.png", 
                
            
                   //. ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave Old building (South Wing) and Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight passed Medical & dental clinic Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",
           
           

                  
                   //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
                 
                 
                   "Leave Old building (South Wing) and Turn right at ITB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight passed ITB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Turn left at the OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Walk straight passed at OLD Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                   "Turn right passed the MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                   "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                   "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",
                



                     //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Gate-5 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave Old building (South Wing) and Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at OLD Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn left":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                     "Turn right at Snagah Entrance": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed Snagah Building Entrance":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-5": "https://static.thenounproject.com/png/868367-200.png",
                    
                    

                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Gate-4 ৎ ─────────  . 　⁺ 　 . ✦   */
            "Leave Old building (South Wing) and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
            "Walk straight passed ITC Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
            "Arrive at Gate-4": "https://static.thenounproject.com/png/868367-200.png",
           
           
                 //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Gate-3 ৎ ─────────  . 　⁺ 　 . ✦   */
                     "Leave Old building (South Wing) and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Turn right passed Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                     "Walk straight passed the University Gymnasium":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                     "Arrive at Gate-3": "https://static.thenounproject.com/png/868367-200.png",
           
                    
                    //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Gate-2 ৎ ─────────  . 　⁺ 　 . ✦   */
                    "Leave Old building (South Wing) and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                    "Turn right passed MAB Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                    "Walk straight passed Wellness Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                    "Arrive at Gate-2": "https://static.thenounproject.com/png/868367-200.png",
             
           
                      //.  ✦ . 　⁺ 　 . ───────── ౨ From: Old building (South Wing) To: Gate-1 ৎ ─────────  . 　⁺ 　 . ✦   */
                      "Leave Old building (South Wing) and walk straight passed University Quadrangle":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Walk straight passed Old Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn left at MAB Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
                      "Walk straight passed MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
                      "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
                      "Arrive at Gate-1": "https://static.thenounproject.com/png/868367-200.png",

                      
                      //  ✦ . 　⁺ 　 . ───────── ౨ UNIVERSITY QUADRANGLE ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */

//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */

"Leave University Quadrangle and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight near ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight near ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Gate 1 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 1": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Gate 2 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 2": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Gate 3 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 3": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Gate 4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight near ITC Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate 4": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: University Quadrangle To: Gate 5 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Quadrangle and walk straight near ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building (South Wing)": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 5": "https://static.thenounproject.com/png/868367-200.png",

      
                      //  ✦ . 　⁺ 　 . ───────── ౨ GATE-1 ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight again": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MDCB": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Gate 2 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate 2": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Gate 3 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right near Gate 2": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 3": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Gate 4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, and University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at Gate 4": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 1 To: Gate 5 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 1 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight at Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 5": "https://static.thenounproject.com/png/868367-200.png",

                    //  ✦ . 　⁺ 　 . ───────── ౨ GATE-2 ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then Univeristy Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight again": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building and Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MDCB": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Gate 1 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 1": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Gate 3 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate 3": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Gate 4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, and University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at Gate 4": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 2 To: Gate 5 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 2 and walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight at Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 5": "https://static.thenounproject.com/png/868367-200.png",

       //  ✦ . 　⁺ 　 . ───────── ౨ GATE-3 ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then Univeristy Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight again": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building and Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, then University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MDCB": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Gate 1 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 1": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Gate 2 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 2": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Gate 4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building, and University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at Gate 4": "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 3 To: Gate 5 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 3 turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Old Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at R&D Building": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight at Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 5": "https://static.thenounproject.com/png/868367-200.png",

     //  ✦ . 　⁺ 　 . ───────── ౨ GATE-4 ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */


    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight passed University Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Walk straight again passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left at R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight passed University Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Walk straight again passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight passed ITC Building and Dormitory Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight at center of Univeristy Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight at Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight passed University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight facing ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",
   
    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight passed University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight facing ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight passed MDCB": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight passed University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",




    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Gate 1 ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Arrive at Gate 1": "https://static.thenounproject.com/png/868367-200.png",
   
    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Gate 2 ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Arrive at Gate 2": "https://static.thenounproject.com/png/868367-200.png",

    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Gate 3 ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Arrive at Gate 3": "https://static.thenounproject.com/png/868367-200.png",


    //  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 4 To: Gate 5 ৎ ─────────  . 　⁺ 　 . ✦   */
    "Leave Gate 4 walk straight passed University Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Walk straight again passed the Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn left at R&D Building": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
    "Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
    "Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
    "Arrive at Gate 5": "https://static.thenounproject.com/png/868367-200.png",

         //  ✦ . 　⁺ 　 . ───────── ౨ GATE-5 ICONS PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: ITC Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed MDCB and ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at ITC Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Snagah Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Wellness Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Wellness Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at R&D Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Engineering Laboratory Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MDCB and ITB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight passed Dormitory Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Engineering Laboratory Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at MAB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MDCB": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at ITB Building": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: University Gymnasium ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at University Gymnasium": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Medical & Dental Clinic Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Medical & Dental Clinic Building": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Old Building (South Wing) ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building (South Wing)": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: University Quadrangle ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at University Quadrangle": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Gate 1 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate 1": "https://static.thenounproject.com/png/868367-200.png",

//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Gate 2 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate 2": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Gate 3 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed Old Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left": "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight passed MAB Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed Wellness Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate 3": "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ From: Gate 5 To: Gate 4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave Gate 5 walk straight leave Snagah Building": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right": "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight passed R&D Building and University Quadrangle": "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate 4": "https://static.thenounproject.com/png/868367-200.png",

                 //  ✦ . 　⁺ 　 . ───────── ౨ UNIVERSITY GYMNASIUM PER STEPS ৎ ─────────  . 　⁺ 　 . ✦   */
                 
//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: WELLNESS Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past University Gymnasium":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right at the entrance of MAB Building":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Wellness Building":     "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: ITB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and turn right at University Quadrangle":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk halfway through University Quadrangle":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left and take the ITB Building staircase":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at ITB Building":     "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: Snagah Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk past the promenade":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at Old Building":"https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past the R&D Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Snagah Building":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: R&D Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk past the promenade":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at R&D Building":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: Old Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk straight":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Old Building":     "https://static.thenounproject.com/png/868367-200.png",  


//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: dormitory Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave university gymnasium and walk past the University Quadrangle":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight past ITC Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Dormitory Building":     "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: MAB Building ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past University Gymnasium":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Arrive at MAB Building":     "https://static.thenounproject.com/png/868367-200.png",




//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: GATE-1 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past University Gymnasium":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight past the MAB Building":"https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate-1":     "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: GATE-2 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past University Gymnasium":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at MAB Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right at Wellness Building":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past the Wellness Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate-2":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: GATE-3 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past University Gymnasium":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at MAB Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right at Wellness Building":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past the Wellness Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right at Gate-2":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Arrive at Gate-3":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: GATE-4 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk straight at Quadrangle":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at the corner of ITC Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight between Food Kiosk and ITC Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate-4":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: GATE-5 ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk past the promenade":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight past Old Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn right":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight past the R&D Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Turn right at Snagah Building entrance":     "https://cdn2.iconfinder.com/data/icons/arrows-56/98/14-arrow-go-right-512.png",
"Walk straight past Snagah Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Gate-5":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: ENGINEERING LABORATORY BUILDING ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk past the University Quadrangle":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight past ITC Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Walk straight past Doprmitory Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Engineering Laboratory Building":     "https://static.thenounproject.com/png/868367-200.png",


//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: UNIVERSITY QUADRANGLE ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk straight to the open area":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at University Quadrangle":     "https://static.thenounproject.com/png/868367-200.png",



   //  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: OLD BUILDING (SOUTH WING) ৎ ─────────  . 　⁺ 　 . ✦   */
   "Leave University Gymnasium and walk past the promenade":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight past the Old Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
   "Arrive at  Old Building (South Wing)":     "https://static.thenounproject.com/png/868367-200.png",



//  ✦ . 　⁺ 　 . ───────── ౨ FROM: UNIVERSITY GYMNASIUM To: MEDICAL & DENTAL CLINIC BUILDING ৎ ─────────  . 　⁺ 　 . ✦   */
"Leave University Gymnasium and walk past the promenade":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left at Old Building":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk straight past the Old Building":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Turn left":     "https://cdn-icons-png.flaticon.com/512/724/724999.png",
"Walk past the Old Building (South Wing)":    "https://cdn1.iconfinder.com/data/icons/education-set-7/512/arrow6-up-512.png",
"Arrive at Medical & Dental Clinic Building":     "https://static.thenounproject.com/png/868367-200.png",



};





    result.steps.forEach(function (step) {
        var listItem = document.createElement("li");
        var icon = document.createElement("img");
        icon.classList.add("icon", "custom-icon");
        if (iconMapping[step]) {
            icon.src = iconMapping[step];
        } else {
            icon.src = "https://static.thenounproject.com/png/333710-200.png";
        }
        listItem.appendChild(icon);
        var textNode = document.createTextNode(step);
        listItem.appendChild(textNode);
        resultList.appendChild(listItem);
    });

    resultContent.appendChild(resultList);
    var searchForm = document.getElementById('searchForm');
    searchForm.style.display = 'none';
    resultContent.style.display = 'block';
    categories.style.display = 'none';
    var backButton = document.getElementById('backButton');
    backButton.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="Back">';
    backButton.style.display = 'block';
    document.getElementById('returnButton').style.display = 'none';
}

//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ DIRECTIONS AREA ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   //


function calculateResult(from, to, fromElement, toElement) {
    console.log("From:", from);
    console.log("To:", to);
   
   

       //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ ITC DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


       if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "snagah building") {
        return {
            steps: [
                "Leave ITC Building and walk straight passed the Old Building",
                "Turn right at R&D Building",
                "Turn left at R&D Building",
                "Arrive at Snagah Building",
            ],
            time: 3 // Change the estimated time for this combination
        };
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "wellness building") {
        return {
            steps: [
            "Leave ITC Building and Turn Right passed the Old Building",
            "Walk straight",
            "Turn left passed the MAB  Building",
            "Turn right",
            "Arrive at Wellness Building",

            ],
            time: 6 // Change the estimated time for this combination     
        };
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "itb building") {
        return {
            steps: [
            "Leave ITC Building and walk straight",
            "Turn left",
            "Turn right",
            "Arrive at ITB Building",
        ], // Array containing "daming tanong"
        time: 2 // Change the estimated time for this combination     
    };
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "old building") {
        return {
           steps: [
      "Leave ITC Building and walk straight passed the Medical & Dental Clinic Building",
      "Turn right",
      "Walk straight",
      "Turn left",
      "Walk straight",
      "Turn right",
      "Arrive at Old Building"
    ], // Array containing "daming tanong"
    time: 5 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "r&d building") {
        return {
            steps: [
        "Leave ITC Building and walk straight passed the Old Building",
        "Turn right",
        "Walk straight",
        "Turn left",
        "Turn right",
        "Arrive at R&D Building",
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "dormitory building") {
        return {
            steps: [
            "Leave ITC Building and turn left",
            "Walk straight",
            "Turn right",
            "Arrive at Dormitory Building",
        ], // Array containing "daming tanong"
        time: 1 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "engineering laboratory building") {
        return {
            steps: [
            "Leave ITC Building and turn left passed the Dormitory Building",
            "Arrive at Engineering Laboratory Building",
        ], // Array containing "daming tanong"
        time: 1 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "mab building") {
        return {
            steps: [
            "Leave ITC Building and walk straight",
            "Turn left",
            "Walk straight passed the OLD Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
        ], // Array containing "daming tanong"
        time: 3 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "gate-1") {
        return {
            steps: [
            "Leave ITC Building and Turn right to OLD Building",
            "Turn left to MAB Building",
            "Walk straight passed the MAB Building",
            "Turn right to Gate-1",
            "Arrive at Gate-1",
        ], // Array containing "daming tanong"
        time: 4// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "gate-2") {
        return {
            steps: [
            "Leave ITC Building and Turn right to OLD Building",
            "Turn left to MAB Building",
            "Turn right passed the MAB Building",
            "Walk straight passed the Wellness Building",
            "Arrive at Gate-2",
        ], // Array containing "daming tanong"
        time: 4// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "gate-3") {
        return {
            steps: [
            "Leave ITC Building and walk straight passed the Old Building",
            "Walk straight passed the University Gymnasium",
            "Arrive at Gate-3",
        ], // Array containing "daming tanong"
        time: 4// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "gate-4") {
        return {
            steps: [
            "Leave ITC Building and Turn right",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Arrive at Gate-4"
        ], // Array containing "daming tanong"
        time: 4// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "gate-5") {
        return {
            steps: [
            "Leave ITC Building and walk straight passed the Old Building",
            "Walk straight",
            "Turn left",
            "Turn right passed the R&D Building",
            "Walk straight passed the Snagah Building",
            "Arrive at Gate-5",
        ], // Array containing "daming tanong"
        time: 7// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "university gymnasium") {
        return {
            steps: [
            "Leave ITC Building and Walk straight",
            "Turn left passed the OLD Building",
            "Walk Straight",
            "Turn right",
            "Arrive at University Gymnasium",
        ], // Array containing "daming tanong"
        time: 3// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "university quadrangle") {
        return {
            steps: [
            "Leave ITC Building and Turn right",
            "You see Stage",
            "Arrive at University Quadrangle",
        ], // Array containing "daming tanong"
        time: 1// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "old building (south wing)") {
        return {
            steps: [
            "Leave ITC Building and walk straight passed the Medical & Dental Clinic Building",
            "Turn left",
            "Arrive at Old Building (South Wing)",
        ], // Array containing "daming tanong"
        time: 3 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "itc building" && to.trim().toLowerCase() === "medical & dental clinic building") {
        return {
            steps: [
            "Leave ITC Building and walk straight passed the ITB Building",
            "Turn left",
            "Arrive at Medical & Dental Clinic Building",
        ], // Array containing "daming tanong"
        time: 3 // Change the estimated time for this combination 
  };


   //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ SNAGAH DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


} else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "itc building") {
        return {
            steps: [
            "Leave Snagah Building and Turn left to R&D Building",
            "Turn right passed the R&D Building",
            "Turn right at OLD Building",
            "Walk straight and passed the ITB Building",
            "Arrive at ITC Building",

            ],
            time: 4 // Change the estimated time for this combination
        };
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "wellness building") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left at Old Building",
                "Turn right passed the OLD Building",
                "Walk straight at MAB Building",
                "Turn left to the MAB Building",
                "Turn right passed the MAB Building",
                "Walk straight",
                "Arrive at Wellness Building",
            ],
            time: 8 // Change the estimated time for this combination     
        };
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "itb building") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn right to OLD Building",
                "Walk straight passed the Medical & Dental Clinic Building",
                "Arrive at ITB Building",  
        ], // Array containing "daming tanong"
        time: 2 // Change the estimated time for this combination     
    };
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "old building") {
        return {
           steps: [
            "Leave Snagah Building and Turn left to R&D Building",
            "Turn right to R&D Building",
            "Walk straight passed the R&D Building",
            "Turn left",
            "Turn right",
            "Turn left",
            "Walk straight",
            "Turn right",
            "Walk straight",
            "Turn right",
            "Arrive at OLD Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "r&d building") {
        return {
            steps: [
            "Leave Snagah Building and Turn left to R&D Building",
            "Turn left at Snagah Entrance",
            "Arrive at R&D Building",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "dormitory building") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Walk straight passed the Medical & Dental Clinic Building",
                "Walk straight passed the ITB Building",
                "Turn right",
                "Walk straight",
                "Turn right",
                "Arrive at Dormitory Building",   
        ], // Array containing "daming tanong"
        time: 4// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "engineering laboratory building") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Walk straight passed the Medical & Dental Clinic Building",
                "Walk straight passed the ITB Building",
                "Turn right",
                "Walk straight passed the Dormitory Building",
                "Arrive at Engineering Laboratory Building",
  
        ], // Array containing "daming tanong"
        time: 4 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "mab building") {
        return {
            steps: [
            "Leave Snagah Building and Turn left to R&D Building",
            "Turn right passed the R&D Building",
            "Walk straight",
            "Turn right",
            "Turn left",
            "Walk straight",
            "Turn right passed Old Building",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
        ], // Array containing "daming tanong"
        time: 3 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "gate-1") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left passed the Old Building",
                "Walk straight",
                "Turn left at MAB Building",
                "Walk straight passed the MAB Building",
                "Arrive at Gate-1",
        ], // Array containing "daming tanong"
        time: 6 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "gate-2") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left passed the Old Building",
                "Walk straight",
                "Turn left at MAB Building",
                "Turn right passed the MAB Building",
                "Walk straight passed the Wellness Building",
                "Arrive at Gate-2",
        ], // Array containing "daming tanong"
        time: 6// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "gate-3") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left passed the Old Building",
                "Walk straight passed the University Gymnasium",
                "Arrive at Gate-3",

        ], // Array containing "daming tanong"
        time: 6// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "gate-4") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn right passed the ITB Building",
                "Walk straight to ITC Building",
                "Turn left passed the ITC Building",
                "Turn right",
                "Arrive at Gate-4",
        ], // Array containing "daming tanong"
        time: 6 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "gate-5") {
        return {
            steps: [
                "Leave Snagah Building and Walk straight passed the Snagah Building",
                "Turn left",
                "Arrive at Gate-5",
        ], // Array containing "daming tanong"
        time: 1// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "university gymnasium") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left passed the Old Building",
                "Turn right",
                "Arrive at University Gymnasium Building",  
        ], // Array containing "daming tanong"
        time: 3// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "university quadrangle") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left",
                "Walk straight to the open area",
                "Arrive at University Quadrangle",
        ], // Array containing "daming tanong"
        time: 2// Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "old building (south wing)") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left",
                "Walk straight to the Old Building",
                "Turn right",
                "Arrive at  Old Building (South Wing)",
        ], // Array containing "daming tanong"
        time: 3 // Change the estimated time for this combination 
}; 
    } else if (from.trim().toLowerCase() === "snagah building" && to.trim().toLowerCase() === "medical & dental clinic building") {
        return {
            steps: [
                "Leave Snagah Building and Turn left to R&D Building",
                "Turn right passed the R&D Building",
                "Turn left",
                "Walk straight to the Old Building",
                "Turn right passed Old Building (South Wing)",
                "Walk straight",
                "Turn left",
                "Arrive at Medical & Dental Clinic Building",
        ], // Array containing "daming tanong"
        time: 3 // Change the estimated time for this combination 
};   

//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ R&D DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave R&D Building and Turn left",
        "Turn right passed the R&D Building",
        "Turn left at OLD Building",
        "Turn left",
        "Walk straight and passed the Medical & Dental Clinic Building",
        "Walk straight and passed the ITB Building",
        "Arrive at ITC Building",

        ],
        time: 5 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave R&D Building and Turn left",
            "Turn right passed the R&D Building",
            "Turn left at Old Building",
            "Turn right passed the OLD Building",
            "Walk straight at MAB Building",
            "Turn left to the MAB Building",
            "Turn right passed the MAB Building",
            "Walk straight",
            "Arrive at Wellness Building",
        ],
        time: 8 // Change the estimated time for this combination     
    };
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave R&D Building and Turn left",
            "Turn right passed the R&D Building",
            "Turn left to OLD Building",
            "Turn left",
            "Walk straight passed the Medical & Dental Clinic Building",
            "Arrive at ITB Building",  
    ], // Array containing "daming tanong"
    time: 2 // Change the estimated time for this combination     
};
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "old building") {
    return {
       steps: [
        "Leave R&D Building and Turn left",
        "Turn right passed the R&D Building",
        "Turn left",
        "Walk straight",
        "Turn right",
        "Walk straight",
        "Turn right",
        "Arrive at OLD Building",
], // Array containing "daming tanong"
time: 1 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "snagah building") {
    return {
        steps: [
        "Leave R&D Building and Turn left",
        "Turn left at Snagah Entrance",
        "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Turn left passed the R&D Building",
            "Turn left passed at Old Building",
            "Turn left",
            "Walk straight passed the Medical & Dental Clinic Building",
            "Walk straight passed the ITB Building",
            "Turn right",
            "Walk straight",
            "Turn right",
            "Arrive at Dormitory Building",   
    ], // Array containing "daming tanong"
    time: 5// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Turn left passed the R&D Building",
            "Turn left passed at Old Building",
            "Turn left",
            "Walk straight passed the Medical & Dental Clinic Building",
            "Walk straight passed the ITB Building",
            "Turn right",
            "Walk straight passed the Dormitory Building",
            "Arrive at Engineering Laboratory Building",

    ], // Array containing "daming tanong"
    time: 5// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Turn left passed the R&D Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn right passed Old Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 5 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Walk straight passed MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight passed Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn right passed Old Building",
            "Walk straight passed the University Gymnasium",
            "Arrive at Gate-3",

    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Walk straight",
            "Turn right at Old Building",
            "Walk straight",
            "Turn left",
            "Walk straight passed ITC Building",
            "Turn left",
            "Walk straight",
            "Turn right",
            "Walk straight",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave R&D Building and Turn left",
            "Walk straight passed Snagah Building Entrance",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 2// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Walk straight",
            "Turn left",
            "Walk straight",
            "Turn right passed Old Building",
            "Turn right",
            "Arrive at University Gymnasium Building",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Walk straight to the open area",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 2// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Turn right",
            "Walk straight",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "r&d building" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave R&D Building and Turn right",
            "Walk straight",
            "Turn left passed the R&D Building",
            "Turn right",
            "Walk straight",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Walk straight passed Old Building (South Wing)",
            "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination 
};


//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ ITB DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave ITB Building and Turn right",
        "Walk straight passed ITB Building ",
        "Arrive at ITC Building",

        ],
        time: 1 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Turn left passed the OLD Building",
            "Turn left",
            "Walk straight at MAB Building",
            "Turn left to the MAB Building",
            "Turn right passed the MAB Building",
            "Walk straight",
            "Arrive at Wellness Building",
        ],
        time: 5 // Change the estimated time for this combination     
    };
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave ITB Building and Turn left",
            "Walk straight passed Medical & Dental Clinic Building",
            "Turn right to Old Building",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight",
            "Arrive at R&D Building",  
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination     
};
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "old building") {
    return {
       steps: [
        "Leave ITB Building and Turn left",
        "Turn right",
        "Walk straight",
        "Turn right",
        "Walk straight",
        "Turn right",
        "Arrive at OLD Building",
], // Array containing "daming tanong"
time: 3 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "snagah building") {
    return {
        steps: [
            "Leave ITB Building and Turn left",
            "Walk straight passed Medical & Dental Clinic Building",
            "Turn right to Old Building",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 5// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
            "Leave ITB Building and Turn right",
            "Walk straight",
            "Turn right passed ITC Building",
            "Walk straight",
            "Turn left",
            "Arrive at Dormitory Building",   
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave ITB Building and Turn right",
            "Walk straight",
            "Turn right passed ITC Building",
            "Walk straight passed Dormitory Building",
            "Arrive at Engineering Laboratory Building",

    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Turn left passed the OLD Building",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 5 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Walk straight passed MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Turn right passed MAB Building",
            "Walk straight passed Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Turn right passed Old Building",
            "Walk straight passed the University Gymnasium",
            "Arrive at Gate-3",

    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave ITB Building and Turn left",
            "Walk straight passed Medical & Dental Clinic Building",
            "Turn right to Old Building",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight",
            "Turn left at Snagah Entrance",
            "Walk straight passed Snagah Building Entrance",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 8// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave ITB Building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Turn right passed Old Building",
            "Arrive at University Gymnasium Building",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave ITB Building and walk straight",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave ITB Building and Turn left",
            "Walk straight passed Medical & Dental Clinic Building",
            "Turn left",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "itb building" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave ITB Building and Turn left",
            "Walk straight",
            "Turn left",
            "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 
};   

 //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ ENGINEERING LABORATORY BUILDING DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave Engineering Laboratory building and walk past Dormitory Building",
        "Turn right",
        "Arrive at ITC Building",
        ],
        time: 2 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Promenade and Food Kiosk",
            "Turn left at MAB Building",
            "Turn right",
            "Arrive at Wellness Building",
        ],
        time: 3 // Change the estimated time for this combination    
    };
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Arrive at ITB Building",
    ], // Array containing "daming tanong"
    time: 2 // Change the estimated time for this combination    
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "snagah building") {
    return {
       steps: [
        "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Turn left at Old Building",
            "Walk straight past R&D Building",
             "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Turn left at Old Building",
            "Arrive at R&D Building",
], // Array containing "daming tanong"
time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "old building") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Arrive at Old Building",
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
            "Leave engineering laboratory building and walk straight",
            "Turn left",
            "Arrive at Dormitory Building", 
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight past University Gymnasium ",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Food Kiosk and Promenade",
            "Turn left",
            "Walk straight past MAB Building",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Food Kiosk and Promenade",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Food Kiosk and Promenade",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Turn right at Gate-2",
            "Arrive at Gate-3",
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave Engineering Laboratory and walk straight past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Turn right at the corner of ITC Building",
            "Walk straight between Food Kiosk and ITC Building",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Turn left at Old Building",
            "Walk straight past R&D Building",
            "Turn left at Snagah Building",
            "Walk straight past Snagah Building",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk past Dormitory and ITC Building",
            "Walk straight past University Quadrangle",
            "Arrive at University Gymnasium",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk past Dormitory and ITC Building",
            "Walk straight to the open area",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past ITB Building",
            "Walk straight past Medical & Dental Clinic Building",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "engineering laboratory building" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave Engineering Laboratory building and walk straight past Dormitory Building",
            "Turn left at ITC Building",
            "Walk straight past ITB Building",
            "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};  




 //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ DORMITORY DIRECTIONS AREAৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave Dormitory Building and turn left",
        "Turn right",
        "Arrive at ITC Building",
        ],
        time: 2 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight past ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Promenade and Food Kiosk",
            "Turn left at MAB Building",
            "Turn right",
            "Arrive at Wellness Building",
        ],
        time: 3 // Change the estimated time for this combination    
    };
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Arrive at ITB Building",
    ], // Array containing "daming tanong"
    time: 2 // Change the estimated time for this combination    
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "snagah building") {
    return {
       steps: [
        "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Turn left at Old Building",
            "Walk straight past R&D Building",
             "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Turn left at Old Building",
            "Arrive at R&D Building",
], // Array containing "daming tanong"
time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "old building") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Arrive at Old Building",
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave Dormitory Building and turn right",
            "Walk straight",
            "Arrive at Engineering Laboratory Building", 
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight past ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight past University Gymnasium ",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight past ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Food Kiosk and Promenade",
            "Turn left",
            "Walk straight past MAB Building",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight past ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Food Kiosk and Promenade",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight past ITC Building",
            "Walk straight past University Quadrangle",
            "Walk straight between Food Kiosk and Promenade",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Turn right at Gate-2",
            "Arrive at Gate-3",
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight past ITC Building",
            "Walk straight past University Quadrangle",
            "Turn right at the corner of ITC Building",
            "Walk straight between Food Kiosk and ITC Building",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past University Quadrangle",
            "Turn left at Old Building",
            "Walk straight past R&D Building",
            "Turn left at Snagah Building",
            "Walk straight past Snagah Building",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave Dormitory Building and walk past ITC Building",
            "Walk straight past University Quadrangle",
            "Arrive at University Gymnasium",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave Dormitory Building and walk past ITC Building",
            "Walk straight to the open area",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past ITB Building",
            "Walk straight past Medical & Dental Clinic Building",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "dormitory building" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave Dormitory Building and walk straight to ITC Building",
            "Turn left at ITC Building",
            "Walk straight past ITB Building",
            "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};  



 //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ OLD DIRECTIONS AREA ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave Old Building and walk past the University Quadrangle",
        "Walk straight and take the staircase",
        "Turn left at the ground floor of ITC Building",
        "Arrive at ITC Building",
        ],
        time: 2 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave Old Building and walk straight between Food Kiosk and Promenade",
            "Walk straight and take the staircase",
            "Turn left and walk halfway through MAB Building ",
            "Turn right at the entrance of MAB Building",
            "Arrive at Wellness Building",
        ],
        time: 3 // Change the estimated time for this combination    
    };
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave Old Building and turn right at University Quadrangle",
            "Walk halfway through University Quadrangle",
            "Turn left and take the ITB Building staircase",
            "Arrive at ITB Building",
    ], // Array containing "daming tanong"
    time: 2 // Change the estimated time for this combination    
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "snagah building") {
    return {
       steps: [
        "Leave Old Building and walk past the promenade",
        "Turn left at Old Building",
        "Turn right",
        "Turn left",
        "Turn right",
        "Walk straight past the R&D Building",
        "Turn left",
        "Turn right",
        "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave Old Building and walk past the promenade",
            "Turn left at Old Building",
            "Turn right",
            "Turn left",
            "Turn right",
            "Arrive at R&D Building",
], // Array containing "daming tanong"
time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
        "Leave Old Building and walk past the University Quadrangle",
        "Walk straight and take the staircase",
        "Walk straight past ITC Building",
        "Arrive at Dormitory Building", 
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave Old Building and walk past the University Quadrangle",
            "Walk straight and take the staircase",
            "Walk straight past ITC Building",
            "Walk straight past Doprmitory Building",
            "Arrive at Engineering Laboratory Building", 
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave Old Building and walk straight between Food Kiosk and Promenade",
            "Walk straight and take the staircase",
            "Turn left and walk halfway through MAB Building ",
            "Turn left at the entrance of MAB Building",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave Old Building and walk straight between Food Kiosk and Promenade",
            "Walk straight and take the staircase",
            "Turn left at MAB Building",
            "Walk straight past the MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave Old Building and walk straight between Food Kiosk and Promenade",
            "Walk straight and take the staircase",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave Old Building and walk straight between Food Kiosk and Promenade",
            "Walk straight and take the staircase",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Turn right at Gate-2",
            "Arrive at Gate-3",
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave Old Building and walk straight at Quadrangle",
            "Turn left at the corner of ITC Building",
            "Walk straight between Food Kiosk and ITC Building",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave Old Building and walk past the promenade",
            "Turn left at Old Building",
            "Turn right",
            "Turn left",
            "Turn right",
            "Walk straight past the R&D Building",
            "Turn left",
            "Turn right at Snagah Building entrance",
            "Walk straight past Snagah Building",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave Old Building and walk between Promenade and Food Kiosk",
            "Arrive at University Gymnasium",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave Old Building and turn left at the staircase",
            "Walk straight and take the staircase",
            "Walk straight to the open area",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave Old Building and walk past Promenade",
            "Turn left at Old Building",
            "Walk straight past the Old Building",
            "Turn left",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "old building" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave Old Building and walk past Promenade",
            "Turn left at Old Building",
            "Walk straight past the Old Building",
            "Turn left",
            "Walk past the Old Building (South Wing)",
            "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};  



//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ WELLNESS DIRECTIONS AREA ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


} else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Turn Left",
        "Arrive at ITC Building",
    ],
    time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "snagah building") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Turn Right",
        "Walk Straight passed the Old Building (South Wing)",
        "Walk Straight",
        "Turn Left",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the R&D Building",
        "Turn Left",
        "Walk Straight",
        "Arrive at Snagah Building",
    ],
    time:3
        };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "itb building") {
       
        return {
        steps:[
            "Leave Wellness Building and Turn Right",
            "Walk straight",
            "Turn Left passed the MAB Building",
            "Walk Straight passed the Old Building",
            "Walk Straight passed the University Quadrangle",
            "Arrive at ITB Building",
       
        ],
        time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "old building") {
        return {
            steps:[
            "Leave Wellness Building and Turn Right",
            "Walk straight",
            "Turn Left passed the MAB Building",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Gymnasium",
            "Arrive at Old Building",
                ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "r&d building") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Turn Right",
        "Walk Straight passed the Old Building (South Wing)",
        "Walk Straight",
        "Turn Left",
        "Walk Straight",
        "Turn Right",
        "Walk Straight",
        "Arrive at R&D Building",
    ],
    time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "dormitory building") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Walk Straight passed the ITC Building",
        "Arrive at Dormitory Building",
    ],
    time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "engineering laboratory building") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Walk Straight passed the ITC Building",
        "Arrive at Engineering Laboratory Building",
    ],
    time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "mab building") {
        return {
            steps:[
            "Leave Wellness Building and Turn Right",
            "Walk straight",
            "Arrive at MAB Building",
        ],
        time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "gate-1") {
        return {
            steps:[
            "Leave Wellness Building and Turn left",
             "Walk Straight ",
             "Turn Left",
             "Arrive at Gate-1",
            ],
            time:3
                }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "gate-2") {
        return {
            steps:[
            "Leave Wellness Building and Turn left",
            "Walk Straight",
            "Arrive at Gate-2",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "gate-3") {
        return {
            steps:[
            "Leave Wellness Building and Turn left",
            "Walk Straight",
            "Turn right",
            "Arrive at Gate-3",
        ], 
        time:3
           };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "gate-4") {
        return {
            steps:[
            "Leave Wellness Building and Turn Right",
            "Walk straight",
            "Turn Left passed the MAB Building",
            "Walk Straight passed the Old Building",
            "Walk Straight passed the University Quadrangle",
            "Turn Left",
            "Walk Straight ",
            "Arrive at Gate-4",

        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "gate-5") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight passed the Old Building",
        "Turn Right",
        "Walk Straight",
        "Turn Left",
        "Turn Right",
        "Walk Straight",
        "Turn Left",
        "Walk Straight",
        "Turn Left",
        "Walk Straight",
        "Turn Right",
        "Walk Straight",
        "Arrive at Gate-5",              
       
    ],
    time:3
        };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "university gymnasium") {
        return {
            steps:[
            "Leave Wellness Building and Turn Right",
            "Walk straight",
            "Turn Left passed the MAB Building",
            "Walk Straight",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Arrive at University Gymnasium",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "university quadrangle") {
        return {
            steps:[
            "Leave Wellness Building and Turn Right",
            "Walk straight",
            "Turn Left passed the MAB Building",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the Old Building",
            "Arrive at University Quadrangle",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "old building (south wing)") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Turn Right",
        "Walk Straight passed the Medical & Dental Clinic Building",
        "Arrive at Old Building (South Wing)",
    ],
    time:3
        }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "wellness building" && to.trim().toLowerCase() === "medical & dental clinic building") {
        return {
            steps:[
        "Leave Wellness Building and Turn Right",
        "Walk straight",
        "Turn Left passed the MAB Building",
        "Walk Straight",
        "Turn Right",
        "Walk Straight passed the University Quadrangle",
        "Turn Right",
        "Walk Straight",
        "Turn Left",
        "Walk Straight",
        "Arrive at Medical & Dental Clinic Building",
    ],
    time:3
        }; // Array containing "daming tanong"




 //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ MAB DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the  University Quadrangle",
            "Turn Left",
            "Arrive at ITC Building",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "wellness building") {
        return {
            steps:[
            "Leave MAB Building and walk straight",
            "Turn Left",
            "Walk Straight",
            "Arrive at Wellness Building",
        ],
        time:3
            };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "itb building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Quadrangle",
            "Arrive at ITB Building",
        ],
        time:3
            };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "old building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Gymnasium",
            "Arrive at Old Building",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "r&d building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the Old Building",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Walk Straight",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Walk Straight",
            "Turn Left",
            "Arrive at R&D Building",
        ],
        time:3
            };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "dormitory building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the ITC Building",
            "Turn Right",
            "Arrive at Dormitory Building",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "engineering laboratory building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the Dormitory Building",
            "Arrive at Engineering Laboratory Building",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "snagah building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the Old Building",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Walk Straight",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Walk Straight",
            "Turn Left",
            "Walk Straight passed the R&D Building",
            "Turn Right",
            "Walk Straight",
            "Arrive at Snagah Building",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "gate-1") {
        return {
            steps:[
            "Leave MAB Building and walk straight",
            "Turn Left passed the Gate-2",
            "Walk Straight",
            "Arrive at Gate-1",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "gate-2") {
        return {
            steps:[
            "Leave MAB Building and walk straight",
            "Arrive at Gate-2",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "gate-3") {
        return {
            steps:[
            "Leave MAB Building and walk straight",
            "Turn Right",
            "Walk Straight",
            "Arrive at Gate-3",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "gate-4") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Quadrangle",
            "Turn Left",
            "Walk Straight",
            "Arrive at Gate-4",
           
        ],
        time:3
            };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "gate-5") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the Old Building",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Walk Straight",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Walk Straight",
            "Turn Left",
            "Walk Straight passed the R&D Building",
            "Turn Right",
            "Walk Straight passed the Snagah Building",
            "Turn Right",
            "Walk Straight",
            "Arrive at Gate-5",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "university gymnasium") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight",
            "Turn Left",
            "Arrive at University Gymnasium",
        ],
        time:3
            }; // Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "university quadrangle") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Gymnasium",
            "Arrive at University Quadrangle",


        ],
        time:3
            };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "old building (south wing)") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Quadrangle",
            "Turn Right passed the ITB Building",
            "Walk Straight Medical & Dental Clinic Building",
            "Arrive at Old Building (South Wing)",
        ],
        time:3
            };// Array containing "daming tanong"
    } else if (from.trim().toLowerCase() === "mab building" && to.trim().toLowerCase() === "medical & dental clinic building") {
        return {
            steps:[
            "Leave MAB Building and turn right",
            "Walk Straight",
            "Turn Right",
            "Walk Straight passed the University Quadrangle",
            "Turn Right passed the ITB Building",
            "Walk Straight",
            "Turn Left",
            "Arrive at Medical & Dental Clinic Building",
        ],
        time:3
    };


    //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ MDC DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */

} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave Medical & Dental Clinic Building and Turn right",
        "Walk straight passed ITB Building ",
        "Arrive at ITC Building",

        ],
        time: 1 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave Medical & Dental Clinic Building and Turn right at ITB Building",
            "Walk straight passed ITB Building",
            "Turn right",
            "Turn left at the OLD Building",
            "Walk straight passed at OLD Building",
            "Turn left at MAB Building",
            "Turn right passed the MAB Building",
            "Walk straight",
            "Arrive at Wellness Building",
        ],
        time: 5 // Change the estimated time for this combination     
    };
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave  Medical & Dental Clinic Building and Turn left",
            "Walk straight passed OLD Building (South Wing)",
            "Turn right to Old Building",
            "Walk straight",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Arrive at R&D Building",  
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination     
};
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "old building") {
    return {
       steps: [
        "Leave  Medical & Dental Clinic Building and Turn left",
        "Walk straight passed OLD Building (South Wing)",
        "Turn right",
        "Arrive at OLD Building",
], // Array containing "daming tanong"
time: 2 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "snagah building") {
    return {
        steps: [
            "Leave  Medical & Dental Clinic Building and Turn left",
            "Walk straight passed OLD Building (South Wing)",
            "Turn right to Old Building",
            "Walk straight passed Old Building",
            "Turn left",
            "Walk straight passed R&D Building",
            "Turn left",
            "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 5// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
            "Leave Medical & dental building and Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at Dormitory Building",   
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave Medical & dental building and Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight passed Dormitory Building",
            "Arrive at Engineering Laboratory Building",

    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn left passed the OLD Building",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 5 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Walk straight passed MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Turn right passed MAB Building",
            "Walk straight passed Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn right passed Old Building",
            "Walk straight passed the University Gymnasium",
            "Arrive at Gate-3",

    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right",
            "Walk straight passed ITC Building",
            "Walk straight",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave Medical & dental building and Turn left",
            "Walk straight passed OLD Building (South Wing)",
            "Turn right at OLD Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Turn right at Snagah Entrance",
            "Walk straight passed Snagah Building Entrance",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 7// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn right passed Old Building",
            "Arrive at University Gymnasium Building",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave Medical & dental building and Turn left",
            "Walk straight",
            "Turn left",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 
}; 

} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave Medical & Dental Clinic Building and Turn right",
        "Walk straight passed ITB Building ",
        "Arrive at ITC Building",

        ],
        time: 1 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave Medical & Dental Clinic Building and Turn right at ITB Building",
            "Walk straight passed ITB Building",
            "Turn right",
            "Turn left at the OLD Building",
            "Walk straight passed at OLD Building",
            "Turn left at MAB Building",
            "Turn right passed the MAB Building",
            "Walk straight",
            "Arrive at Wellness Building",
        ],
        time: 5 // Change the estimated time for this combination     
    };
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave  Medical & Dental Clinic Building and Turn left",
            "Walk straight passed OLD Building (South Wing)",
            "Turn right to Old Building",
            "Walk straight",
            "Turn left passed Old Building",
            "Walk straight",
            "Turn left",
            "Arrive at R&D Building",  
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination     
};
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "old building") {
    return {
       steps: [
        "Leave  Medical & Dental Clinic Building and Turn left",
        "Walk straight passed OLD Building (South Wing)",
        "Turn right",
        "Arrive at OLD Building",
], // Array containing "daming tanong"
time: 2 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "snagah building") {
    return {
        steps: [
            "Leave  Medical & Dental Clinic Building and Turn left",
            "Walk straight passed OLD Building (South Wing)",
            "Turn right to Old Building",
            "Walk straight passed Old Building",
            "Turn left",
            "Walk straight passed R&D Building",
            "Turn left",
            "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 5// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
            "Leave Medical & dental building and Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at Dormitory Building",   
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave Medical & dental building and Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight passed Dormitory Building",
            "Arrive at Engineering Laboratory Building",

    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn left passed the OLD Building",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 5 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Walk straight passed MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Turn right passed MAB Building",
            "Walk straight passed Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn right passed Old Building",
            "Walk straight passed the University Gymnasium",
            "Arrive at Gate-3",

    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right",
            "Walk straight passed ITC Building",
            "Walk straight",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave Medical & dental building and Turn left",
            "Walk straight passed OLD Building (South Wing)",
            "Turn right at OLD Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Turn right at Snagah Entrance",
            "Walk straight passed Snagah Building Entrance",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 7// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn right passed Old Building",
            "Arrive at University Gymnasium Building",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave Medical & dental building and walk straight",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave Medical & dental building and Turn left",
            "Walk straight",
            "Turn left",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 

};
} else if (from.trim().toLowerCase() === "medical & dental building" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave Medical & dental building and Turn right",
            "Walk straight",
            "Turn right",
            "Arrive at ITB Building",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 
};   
        
   //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ .OLD BUILDING (SOUTH WING) DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave Old building (South Wing) and Turn right",
        "Walk straight passed ITB Building ",
        "Arrive at ITC Building",
        ],
        time: 2 // Change the estimated time for this combination
    };

} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn right at ITB Building",
            "Walk straight passed ITB Building",
            "Turn right",
            "Turn left at the OLD Building",
            "Walk straight passed at OLD Building",
            "Turn left at MAB Building",
            "Turn right passed the MAB Building",
            "Walk straight",
            "Arrive at Wellness Building",
        ],
        time: 6 // Change the estimated time for this combination     
    };
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn left",
            "Walk straight at OLD Building",
            "Walk straight passsed OLD Building",
            "Turn right",
            "Walk straight",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at R&D Building",  
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination     
};
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "old building") {
    return {
       steps: [
        "Leave Old building (South Wing) and Turn left",
        "Walk straight",
        "Turn right",
        "Arrive at OLD Building",
], // Array containing "daming tanong"
time: 1 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "snagah building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn left",
            "Walk straight",
            "Turn right to Old Building",
            "Walk straight passed Old Building",
            "Turn left",
            "Walk straight passed R&D Building",
            "Turn left",
            "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 5// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at Dormitory Building",   
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn right",
            "Walk straight passed ITC Building",
            "Turn right",
            "Walk straight passed Dormitory Building",
            "Arrive at Engineering Laboratory Building",

    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed the OLD Building",
            "Turn left",
            "Walk straight",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Walk straight passed MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight passed Old Building",
            "Turn left at MAB Building",
            "Turn right passed MAB Building",
            "Walk straight passed Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn right passed Old Building",
            "Walk straight passed the University Gymnasium",
            "Arrive at Gate-3",

    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight passed University Quadrangle",
            "Turn right",
            "Walk straight passed ITC Building",
            "Walk straight",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 7 // Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn left",
            "Walk straight",
            "Turn right at OLD Building",
            "Walk straight",
            "Turn left",
            "Turn right",
            "Walk straight",
            "Turn left",
            "Turn right at Snagah Entrance",
            "Walk straight passed Snagah Building Entrance",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 7// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight passed University Quadrangle",
            "Turn right at Old Building",
            "Walk straight",
            "Turn right passed Old Building",
            "Arrive at University Gymnasium Building",  
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave Old building (South Wing) and walk straight",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination 
}; 
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn right",
            "Walk straight",
            "Turn left",
            "Arrive at  Medical & dental clinic Building",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 
};
} else if (from.trim().toLowerCase() === "old building (south wing)" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave Old building (South Wing) and Turn right",
            "Walk straight passed Medical & dental clinic Building",
            "Turn right",
            "Arrive at ITB Building",
    ], // Array containing "daming tanong"
    time: 1 // Change the estimated time for this combination 
    
    };

    //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ UNIVERSITY QUADRANGLE DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "snagah building") {
    return {
        steps: [
        "Leave University Quadrangle and walk straight passed Old Building",
        "Turn left",
        "Turn right at R&D Building",
        "Turn left",
        "Arrive at Snagah Building",
],// Separate strings for "ulol" and "gago"
time: 1 // Change the estimated time for this combination  
};   


} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
  "Leave University Quadrangle and walk straight passed the Old Building",
   "Turn left",
   "Turn right",
   "Turn left",
   "Arrive at Wellness Building",
],// Separate strings for "ulol" and "gago"
time: 3 // Change the estimated time for this combination  
}; 


} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
   "Leave University Quadrangle and walk straight",
   "Arrive at ITB Building",
],// Separate strings for "ulol" and "gago"
time: 2 // Change the estimated time for this combination  
}; 

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "old building") {
    return {
        steps: [
        "Leave University Quadrangle and turn left",
        "Walk straight",
        "Arrive at Old Building",
    ],// Separate strings for "ulol" and "gago"
    time: 2 // Change the estimated time for this combination  
    }; 

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
        "Leave University Quadrangle and walk straight",
        "Turn right",
        "Arrive at R&D Building",
    ],// Separate strings for "ulol" and "gago"
    time: 5 // Change the estimated time for this combination  
    };

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "dormitory building") {
   return {
        steps: [
    "Leave University Quadrangle and walk straight passed the Old Building",
    "Turn right",
    "Arrive at Dormitory Building",
],// Separate strings for "ulol" and "gago"
time: 3 // Change the estimated time for this combination  
};

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
        "Leave University Quadrangle and walk straight",
        "Turn left",
        "Walk straight",
        "Arrive at Engineering Laboratory Building",
    ],// Separate strings for "ulol" and "gago"
    time: 3 // Change the estimated time for this combination  
    };

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
   "Leave University Quadrangle and turn left",
   "Walk straight",
   "Turn left",
   "Walk straight",
   "Arrive at MAB Building",

],// Separate strings for "ulol" and "gago"
time: 4 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
   "Leave University Quadrangle and turn left",
   "Walk straight passed Old Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Arrive at Gate 1",
],// Separate strings for "ulol" and "gago"
time: 5 // Change the estimated time for this combination  
};

} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
   "Leave University Quadrangle and turn left",
   "Walk straight passed Old Building",
   "Turn left",
   "Walk straight passed Wellness Building",
   "Turn right",
   "Arrive at Gate 2",
],// Separate strings for "ulol" and "gago"
time: 5 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
        "Leave University Quadrangle and turn left",
   "Walk straight passed Old Building",
   "Turn left",
   "Turn right",
   "Walk straight passed Wellness Building",
   "Turn right",
   "Arrive at Gate 3",
],// Separate strings for "ulol" and "gago"
time: 5 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
        "Leave University Quadrangle and turn left",
        "Walk straight near ITC Building",
        "Arrive at Gate 4",
    ],// Separate strings for "ulol" and "gago"
    time: 5 // Change the estimated time for this combination  
    };
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
   "Leave University Quadrangle and walk straight near ITB Building",
   "Turn right",
   "Walk straight passed Old Building (South Wing)",
   "Turn left at R&D Building",
   "Turn right",
   "Walk straight passed Snagah Building",
   "Turn right",
   "Arrive at Gate 5",
],// Separate strings for "ulol" and "gago"
time: 5 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "university gymnasium") {
    return {
        steps: [
   "Leave University Quadrangle and turn left",
   "Walk straight passed the Old Building",
   "Turn right",
   "Arrive at University Gymnasium",
],// Separate strings for "ulol" and "gago"
time: 5 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
    "Leave University Quadrangle and walk straight",
   "Turn left",
   "Arrive at ITC Building",
],// Separate strings for "ulol" and "gago"
time: 1 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
   "Leave University Quadrangle and walk straight near ITB Building",
   "Turn right",
   "Walk straight",
   "Arrive at Old Building (South Wing)",
],// Separate strings for "ulol" and "gago"
time: 2 // Change the estimated time for this combination  
};
} else if (from.trim().toLowerCase() === "university quadrangle" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
    "Leave University Quadrangle and walk straight near ITB Building",
   "Turn right",
   "Walk straight",
   "Arrive at Medical & Dental Clinic Building",
],// Separate strings for "ulol" and "gago"
time: 1 // Change the estimated time for this combination  
};

//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ GATE-1 DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "itc building") {
    return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Turn left",
   "Arrive at ITC Building",
    ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "snagah building") {
   return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight",
   "Turn right at Old Building",
   "Turn left",
   "Walk straight",
   "Turn right at R&D Building",
   "Walk straight",
   "Turn right",
   "Arrive at Snagah Building",
], // Separate strings for "ulol" and "gago"
   time:5
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "wellness building") {
   return {
    steps:[


        "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn left",
   "Arrive at Wellness Building",
    ], // Array containing "daming tanong"
time:2
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "itb building") {
   return {
    steps:[


        "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Arrive at ITB Building",
    ], // Array containing "daming tanong"
time:3
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "old building") {
   return {
    steps:[


        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Arrive at Old Building",
    ], // Array containing "daming tanong"
time:2
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "r&d building") {
    return {
    steps:[


        "Leave Gate 1 and walk straight",
        "Turn left",
        "Walk straight passed MAB Building",
        "Turn right",
        "Walk straight",
        "Turn right at Old Building",
        "Turn left",
        "Walk straight",
        "Turn right",
        "Arrive at R&D Building",
    ], // Array containing "daming tanong"
time:5
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "dormitory building") {
   return {
    steps:[


    "Leave University Quadrangle and walk straight passed the Old Building",
    "Turn right",
    "Arrive at Dormitory Building",
    ], // Array containing "daming tanong"
time:4
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
    steps:[


        "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Walk straight again",
   "Arrive at Engineering Laboratory Building",
    ], // Array containing "daming tanong"
time:4
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "mab building") {
    return {
    steps:[


        "Leave Gate 2 and walk straight passed Wellness Building",
   "Arrive at MAB Building",

    ], // Array containing "daming tanong"
time:1
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "university quadrangle") {
    return {
    steps:[


        "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building",
   "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
time:2
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "gate-2") {
   return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn left",
   "Walk straight passed Wellness Building",
   "Arrive at Gate 2",
    ], // Array containing "daming tanong"
time:1
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps:[
        "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn left",
   "Walk straight passed Wellness Building",
   "Turn right near Gate 2",
   "Arrive at Gate 3",
    ], // Array containing "daming tanong"
time:1
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "gate-4") {
   return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, and University Quadrangle",
   "Turn left",
   "Arrive at Gate 4",
    ], // Array containing "daming tanong"
time:2
};

} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "gate-5") {
   return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight",
   "Turn right at Old Building",
   "Turn left",
   "Walk straight",
   "Turn right at R&D Building",
   "Walk straight at Snagah Building",
   "Turn right",
   "Walk straight",
   "Turn right",
   "Arrive at Gate 5",
    ], // Array containing "daming tanong"
time:6
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "university gymnasium") {
   return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn left",
   "Arrive at University Gymnasium",
    ], // Array containing "daming tanong"
time:2
};

} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Turn right",
   "Walk straight passed MDCB",
   "Arrive at Old Building (South Wing)",
    ], // Array containing "daming tanong"
time:4
};


} else if (from.trim().toLowerCase() === "gate-1" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
    steps:[
   "Leave Gate 1 and walk straight",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Turn right",
   "Walk straight",
   "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
time:4
};

//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ GATE-2 DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "itc building") {
    return {
    steps:[


        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Turn left",
   "Arrive at ITC Building",
    ], // Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "snagah building") {
    return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight",
   "Turn right at Old Building",
   "Turn left",
   "Walk straight",
   "Turn right at R&D Building",
   "Walk straight",
   "Turn right",
   "Arrive at Snagah Building",
], // Separate strings for "ulol" and "gago"
   time:5
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "wellness building") {
    return {
    steps:[
        "Leave Gate 2 and walk straight",
   "Arrive at Wellness Building",
    ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "itb building") {
    return {
    steps:[
        "Leave Gate 3 turn right",
        "Walk straight passed Wellness Building",
        "Turn left",
        "Walk straight passed MAB Building",
        "Turn right",
        "Walk straight passed Old Building, then University Quadrangle",
        "Arrive at ITB Building",
    ], // Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "old building") {
    return {
    steps:[
        "Leave Gate 2 and walk straight",
   "Turn left",
   "Walk straight passed MAB Building",
   "Arrive at Old Building",
    ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "r&d building") {
    return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight",
   "Turn right at Old Building",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Arrive at R&D Building",
    ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "dormitory building") {
   return {
    steps:[
    "Leave University Quadrangle and walk straight passed the Old Building",
    "Turn right",
    "Arrive at Dormitory Building",
    ], // Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "engineering laboratory building") {
   return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
  "Turn left",
  "Walk straight",
  "Turn right",
  "Walk straight passed MAB Building",
  "Turn right",
  "Walk straight passed Old Building, then University Quadrangle",
  "Walk straight again",
  "Arrive at Engineering Laboratory Building",
    ], // Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "mab building") {
    return {
    steps:[
        "Leave Gate 2 and walk straight",
   "Turn left",
   "Walk straight",
   "Arrive at MAB Building",

    ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "university quadrangle") {
   return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building",
   "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "gate-1") {
   return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn right",
   "Walk straight",
   "Turn right",
   "Arrive at Gate 1",
    ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "gate-3") {
   return {
    steps:[
        "Leave Gate 2 and walk straight",
        "Turn left",
        "Walk straight",
        "Arrive at Gate 3",
    ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "gate-4") {
    return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight",
   "Turn right",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, and University Quadrangle",
   "Turn left",
   "Arrive at Gate 4",
    ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "gate-5") {
  return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight",
   "Turn right at Old Building",
   "Turn left",
   "Walk straight",
   "Turn right at R&D Building",
   "Walk straight at Snagah Building",
   "Turn right",
   "Walk straight",
   "Turn right",
   "Arrive at Gate 5",
    ], // Array containing "daming tanong"
time:5
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "university gymnasium") {
   return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
  "Turn left",
  "Walk straight passed MAB Building and Old Building",
  "Turn left",
  "Arrive at University Gymnasium",
    ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
    steps:[
        "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Turn right",
   "Walk straight passed MDCB",
   "Arrive at Old Building (South Wing)",
    ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "gate-2" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
    steps:[
   "Leave Gate 2 and walk straight passed Wellness Building",
   "Turn left",
   "Walk straight passed MAB Building",
   "Turn right",
   "Walk straight passed Old Building, then University Quadrangle",
   "Turn right",
   "Walk straight",
   "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
time:4
};
 //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ GATE-3 DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "itc building") {
    return {
   steps:[


       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight",
 "Turn right",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight passed Old Building, then University Quadrangle",
 "Turn left",
 "Arrive at ITC Building",
 ],// Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "snagah building") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight",
 "Turn right at Old Building",
 "Turn left",
 "Walk straight",
 "Turn right at R&D Building",
 "Walk straight",
 "Turn right",
 "Arrive at Snagah Building",
], // Separate strings for "ulol" and "gago"
  time:5
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "wellness building") {
   return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight",
 "Arrive at Wellness Building",
 ],// Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "itb building") {
   return {
   steps:[
       "Leave Gate 2 and walk straight passed Wellness Building",
  "Turn left",
  "Walk straight",
  "Turn right",
  "Walk straight passed MAB Building",
  "Turn right",
  "Walk straight passed Old Building, then University Quadrangle",
  "Arrive at ITB Building",
 ],// Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "old building") {
   return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Arrive at Old Building",
 ],// Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "r&d building") {
   return {
   steps:[
       "Leave Gate 3 turn right",
       "Walk straight passed Wellness Building",
       "Turn left",
       "Walk straight passed MAB Building",
       "Turn right",
       "Walk straight",
       "Turn right at Old Building",
       "Turn left",
       "Walk straight",
       "Turn right",
       "Arrive at R&D Building",
 ],// Array containing "daming tanong"
time:5
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "dormitory building") {
   return {
   steps:[
   "Leave University Quadrangle and walk straight passed the Old Building",
   "Turn right",
   "Arrive at Dormitory Building",
 ],// Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "engineering laboratory building") {
   return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight passed Old Building, then University Quadrangle",
 "Walk straight again",
 "Arrive at Engineering Laboratory Building",
 ],// Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "mab building") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Arrive at MAB Building",

 ],// Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "university quadrangle") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight passed Old Building",
 "Arrive at University Quadrangle",
 ],// Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "gate-1") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn right",
 "Walk straight",
 "Turn right",
 "Arrive at Gate 1",
 ],// Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "gate-2") {
   return {
   steps:[
       "Leave Gate 3 turn right",
 "Arrive at Gate 2",
 ],// Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "gate-4") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight passed Old Building, and University Quadrangle",
 "Turn left",
 "Arrive at Gate 4",
 ],// Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "gate-5") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight",
 "Turn right at Old Building",
 "Turn left",
 "Walk straight",
 "Turn right at R&D Building",
 "Walk straight at Snagah Building",
 "Turn right",
 "Walk straight",
 "Turn right",
 "Arrive at Gate 5",
 ],// Array containing "daming tanong"
time:5
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "university gymnasium") {
   return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building and Old Building",
 "Turn left",
 "Arrive at University Gymnasium",
 ],// Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "old building (south wing)") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight passed Old Building, then University Quadrangle",
 "Turn right",
 "Walk straight passed MDCB",
 "Arrive at Old Building (South Wing)",
 ],// Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "gate-3" && to.trim().toLowerCase() === "medical & dental clinic building") {
  return {
   steps:[
       "Leave Gate 3 turn right",
 "Walk straight passed Wellness Building",
 "Turn left",
 "Walk straight passed MAB Building",
 "Turn right",
 "Walk straight passed Old Building, then University Quadrangle",
 "Turn right",
 "Walk straight",
 "Arrive at Medical & Dental Clinic Building",
 ],// Array containing "daming tanong"
time:4
};
 //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ GATE-4 DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */

} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "snagah building") {
    return {
   steps:[
       "Leave Gate 4 walk straight passed University Building",
 "Walk straight again passed the Old Building",
 "Turn left at R&D Building",
 "Walk straight",
 "Arrive at Snagah Building",
], // Separate strings for "ulol" and "gago"
  time:4
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "wellness building") {
   return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight passed Old Building",
 "Turn left",
 "Walk straight",
 "Arrive at Wellness Building",
   ], // Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "itb building") {
   return {
   steps:[
       "Leave Gate 4 walk straight at center of Univeristy Quadrangle",
 "Turn left",
 "Walk straight",
 "Arrive at ITB Building",
   ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "old building") {
   return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight",
 "Arrive at Old Building",
   ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "r&d building") {
  return {
   steps:[
       "Leave Gate 4 walk straight passed University Building",
 "Walk straight again passed Old Building",
 "Arrive at R&D Building",
   ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "dormitory building") {
   return {
   steps:[
   "Leave University Quadrangle and walk straight passed the Old Building",
   "Turn right",
   "Arrive at Dormitory Building",
   ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "engineering laboratory building") {
   return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn left",
 "Walk straight passed ITC Building and Dormitory Building",
 "Arrive at Engineering Laboratory Building",
   ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "mab building") {
  return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight passed Old Building",
 "Turn left",
 "Arrive at MAB Building",

   ], // Array containing "daming tanong"
time:3
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "gate-1") {
   return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight passed Old Building",
 "Turn left",
 "Walk straight passed Wellness Building",
 "Turn right",
 "Arrive at Gate 1",
   ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "gate-2") {
  return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight passed Old Building",
 "Turn left",
 "Walk straight passed Wellness Building",
 "Arrive at Gate 2",
   ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "gate-3") {
  return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight passed Old Building",
 "Turn left",
 "Walk straight passed Wellness Building",
 "Turn right",
 "Arrive at Gate 3",
   ], // Array containing "daming tanong"
time:4
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "university quadrangle") {
  return {
   steps:[
       "Leave Gate 4 walk straight passed University Quadrangle",
 "Arrive at University Quadrangle",
   ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "gate-5") {
  return {
   steps:[
       "Leave Gate 4 walk straight passed University Building",
 "Walk straight again passed the Old Building",
 "Turn left at R&D Building",
 "Walk straight",
 "Turn right",
 "Arrive at Gate 5",
   ], // Array containing "daming tanong"
time:5
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "university gymnasium") {
  return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn right",
 "Walk straight at Old Building",
 "Arrive at University Gymnasium",
   ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "itc building") {
  return {
   steps:[
       "Leave Gate 4 walk straight",
 "Turn left",
 "Walk straight",
 "Turn left",
 "Arrive at ITC Building",
   ], // Array containing "daming tanong"
time:1
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "old building (south wing)") {
  return {
   steps:[
       "Leave Gate 4 walk straight passed University Quadrangle",
 "Turn left",
 "Walk straight facing ITB Building",
 "Turn right",
 "Walk straight passed MDCB",
 "Arrive at Old Building (South Wing)",
   ], // Array containing "daming tanong"
time:2
};
} else if (from.trim().toLowerCase() === "Gate 4" && to.trim().toLowerCase() === "medical & dental clinic building") {
  return {
   steps:[
       "Leave Gate 4 walk straight passed University Quadrangle",
       "Turn left",
       "Walk straight facing ITB Building",
       "Turn right",
       "Walk straight",
       "Arrive at Medical & Dental Clinic Building",
   ], // Array containing "daming tanong"
time:2
};
  
     //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ GATE-5 DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "itc building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed MDCB and ITB Building",
       "Arrive at ITC Building",
        ],// Array containing "daming tanong"
time:4
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "snagah building") {
        return {
		steps:[
            "Leave Gate 5 walk straight",
       "Arrive at Snagah Building",
    ],// Separate strings for "ulol" and "gago"
       time:1
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "wellness building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Turn left",
       "Walk straight passed Old Building",
       "Turn left",
       "Walk straight passed MAB Building",
       "Arrive at Wellness Building",
        ],// Array containing "daming tanong"
time:5
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "itb building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn left",
       "Walk straight passed R&D Building",
       "Turn right",
       "Turn left",
       "Walk straight passed MDCB",
       "Arrive at ITB Building",
        ],// Array containing "daming tanong"
time:3
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "old building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Turn left",
       "Walk straight",
       "Arrive at Old Building",
        ],// Array containing "daming tanong"
time:3
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "r&d building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight",
       "Arrive at R&D Building",
        ],// Array containing "daming tanong"
time:1
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "dormitory building") {
        return {
		steps:[
        "Leave University Quadrangle and walk straight passed the Old Building",
        "Turn right",
        "Arrive at Dormitory Building",
        ],// Array containing "daming tanong"
time:3
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "engineering laboratory building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
            "Turn left",
            "Walk straight passed R&D Building",
            "Turn right",
            "Turn left",
            "Walk straight passed MDCB and ITB Building",
            "Walk straight passed Dormitory Building",
            "Arrive at Engineering Laboratory Building",
        ],// Array containing "daming tanong"
time:3
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "mab building") {
       return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Turn left",
       "Walk straight passed Old Building",
       "Turn left",
       "Arrive at MAB Building",
   
        ],// Array containing "daming tanong"
time:4
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "university quadrangle") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Arrive at University Quadrangle",
        ],// Array containing "daming tanong"
time:2
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "gate-1") {
        return {
		steps:[
            "Leave Gate 5 walk straight",
       "Turn right",
       "Walk straight passed Old Building",
       "Turn left",
       "Walk straight passed Wellness Building",
       "Turn right",
       "Arrive at Gate 1",
        ],// Array containing "daming tanong"
time:5
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "gate-2") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Turn left",
       "Walk straight passed Old Building",
       "Turn left",
       "Walk straight passed MAB Building",
       "Turn right",
       "Walk straight passed Wellness Building",
       "Arrive at Gate 2",
        ],// Array containing "daming tanong"
time:5
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "gate-4") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building and University Quadrangle",
       "Arrive at Gate 4",
        ],// Array containing "daming tanong"
time: 3
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "gate-3") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Turn left",
       "Walk straight passed Old Building",
       "Turn left",
       "Walk straight passed MAB Building",
       "Turn right",
       "Walk straight passed Wellness Building",
       "Arrive at Gate 3",
        ],// Array containing "daming tanong"
time:5
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "university gymnasium") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn right",
       "Walk straight passed R&D Building",
       "Turn left",
       "Walk straight passed Old Building",
       "Arrive at University Gymnasium",
        ],// Array containing "daming tanong"
time:4
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "old building (south wing)") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn left",
       "Walk straight passed R&D Building",
       "Turn right",
       "Turn left",
       "Walk straight",
       "Arrive at Old Building (South Wing)",
        ],// Array containing "daming tanong"
time:3
};
    } else if (from.trim().toLowerCase() === "gate-5" && to.trim().toLowerCase() === "medical & dental clinic building") {
        return {
		steps:[
            "Leave Gate 5 walk straight leave Snagah Building",
       "Turn left",
       "Walk straight passed R&D Building",
       "Turn right",
       "Turn left",
       "Walk straight",
       "Arrive at Medical & Dental Clinic Building",
        ],// Array containing "daming tanong"
time:3
};
  //   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ UNIVERSITY GYMNASIUM DIRECTIONS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "itc building") {
    return {
        steps: [
        "Leave University Gymnasium and walk past the University Quadrangle",
        "Walk straight and take the staircase",
        "Turn left at the ground floor of ITC Building",
        "Arrive at ITC Building",
        ],
        time: 2 // Change the estimated time for this combination
    };
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "wellness building") {
    return {
        steps: [
            "Leave University Gymnasium and turn right",
            "Walk straight past University Gymnasium",
            "Turn left",
            "Turn right at the entrance of MAB Building",
            "Arrive at Wellness Building",
        ],
        time: 3 // Change the estimated time for this combination    
    };
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "itb building") {
    return {
        steps: [
            "Leave University Gymnasium and turn right at University Quadrangle",
            "Walk halfway through University Quadrangle",
            "Turn left and take the ITB Building staircase",
            "Arrive at ITB Building",
    ], // Array containing "daming tanong"
    time: 2 // Change the estimated time for this combination    
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "snagah building") {
    return {
       steps: [
        "Leave University Gymnasium and walk past the promenade",
        "Turn left at Old Building",
        "Turn right",
        "Turn left",
        "Turn right",
        "Walk straight past the R&D Building",
        "Turn left",
        "Turn right",
        "Arrive at Snagah Building",
], // Array containing "daming tanong"
time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "r&d building") {
    return {
        steps: [
            "Leave University Gymnasium and walk past the promenade",
            "Turn left at Old Building",
            "Turn right",
            "Turn left",
            "Turn right",
            "Arrive at R&D Building",
], // Array containing "daming tanong"
time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "dormitory building") {
    return {
        steps: [
        "Leave university gymnasium and walk past the University Quadrangle",
        "Walk straight past ITC Building",
        "Turn right",
        "Arrive at Dormitory Building", 
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "engineering laboratory building") {
    return {
        steps: [
            "Leave University Gymnasium and walk past the University Quadrangle",
            "Walk straight past ITC Building",
            "Walk straight past Doprmitory Building",
            "Arrive at Engineering Laboratory Building", 
    ], // Array containing "daming tanong"
    time: 4 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "mab building") {
    return {
        steps: [
            "Leave University Gymnasium and turn right",
            "Walk straight past University Gymnasium",
            "Turn left",
            "Arrive at MAB Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "gate-1") {
    return {
        steps: [
            "Leave University Gymnasium and turn right",
            "Walk straight past University Gymnasium",
            "Turn left",
            "Walk straight past the MAB Building",
            "Turn right",
            "Arrive at Gate-1",
    ], // Array containing "daming tanong"
    time: 6 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "gate-2") {
    return {
        steps: [
            "Leave University Gymnasium and turn right",
            "Walk straight past University Gymnasium",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Arrive at Gate-2",
    ], // Array containing "daming tanong"
    time: 6// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "gate-3") {
    return {
        steps: [
            "Leave University Gymnasium and turn right",
            "Walk straight past University Gymnasium",
            "Turn left at MAB Building",
            "Turn right at Wellness Building",
            "Walk straight past the Wellness Building",
            "Turn right at Gate-2",
            "Arrive at Gate-3",
    ], // Array containing "daming tanong"
    time: 4// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "gate-4") {
    return {
        steps: [
            "Leave University Gymnasium and walk straight at Quadrangle",
            "Turn left at the corner of ITC Building",
            "Walk straight between Food Kiosk and ITC Building",
            "Arrive at Gate-4",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "gate-5") {
    return {
        steps: [
            "Leave University Gymnasium and walk past the promenade",
            "Turn left at Old Building",
            "Walk straight past Old Building",
            "Turn right",
            "Turn left",
            "Walk straight past the R&D Building",
            "Turn left",
            "Turn right at Snagah Building entrance",
            "Walk straight past Snagah Building",
            "Arrive at Gate-5",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "old building") {
    return {
        steps: [
            "Leave University Gymnasium and walk straight",
            "Arrive at Old Building",  
    ], // Array containing "daming tanong"
    time: 3// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "university quadrangle") {
    return {
        steps: [
            "Leave University Gymnasium and walk straight to the open area",
            "Arrive at University Quadrangle",
    ], // Array containing "daming tanong"
    time: 1// Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "old building (south wing)") {
    return {
        steps: [
            "Leave University Gymnasium and walk past the promenade",
            "Turn left at Old Building",
            "Walk straight past the Old Building",
            "Turn left",
            "Arrive at  Old Building (South Wing)",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};
} else if (from.trim().toLowerCase() === "university gymnasium" && to.trim().toLowerCase() === "medical & dental clinic building") {
    return {
        steps: [
            "Leave University Gymnasium and walk past the promenade",
            "Turn left at Old Building",
            "Walk straight past the Old Building",
            "Turn left",
            "Walk past the Old Building (South Wing)",
            "Arrive at Medical & Dental Clinic Building",
    ], // Array containing "daming tanong"
    time: 3 // Change the estimated time for this combination
};

} else  {
        return {
            steps: ["No available routes."],
            time: 0
        };
    }
}
// Function to handle the "Get Directions" button click event
function getDirections() {
    // Get the building name from the currently displayed building details
    var buildingName = document.getElementById('buildingName').innerText;
    // Load the directions tab with the building name as the destination
    loadDirectionsTab(buildingName);
}





