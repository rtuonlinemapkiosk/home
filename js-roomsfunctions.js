function toggleSearchOverlay() {
    var overlay = document.getElementById('searchOverlay');
    overlay.classList.toggle('active');




    var categories = document.getElementById('categories');
    categories.classList.toggle('active');




    // Toggle the left-align class
    var roomsContainer = document.querySelector('.rooms-container');
    if (roomsContainer) {
        roomsContainer.classList.toggle('active');
        roomsContainer.classList.toggle('left-align');
    }
}












function showBuildingDetails(buildingName, roomName, floor) {
    // Hide search overlay and categories
    var overlay = document.getElementById('searchOverlay');
    overlay.classList.remove('active');




    var categories = document.getElementById('categories');
    categories.classList.remove('active');




    // Show building details tab
    var buildingDetailsTab = document.getElementById('buildingDetailsTab');
    buildingDetailsTab.classList.add('active');




    // Clear previous floors and rooms
    var floorsRoomsPanel = document.getElementById('floorsRoomsPanel');
    floorsRoomsPanel.innerHTML = '';




    if (roomName) {
        var foundBuilding = '';
        var foundFloor = '';




        // Iterate through all buildings and their floors to find the building and floor where the room is located
        Object.keys(buildings).forEach(function (building) {
            Object.keys(buildings[building]).forEach(function (floor) {
                buildings[building][floor].forEach(function (room) {
                    if (room.name === roomName) {
                        foundBuilding = building;
                        foundFloor = floor;
                    }
                });
            });
        });




        // If the building and floor are found, show the building details for that building and floor
        if (foundBuilding && foundFloor) {
            var buildingNameElement = document.getElementById('buildingName');
            buildingNameElement.textContent = foundBuilding;
            var descriptionElement = document.getElementById('description');
            descriptionElement.textContent = getDescription(foundBuilding);




            // Create a button for the floor
            var floorButton = document.createElement('button');
            floorButton.textContent = foundFloor;
            floorButton.classList.add('floor');
            floorButton.onclick = function () {
                showRooms(foundBuilding, Object.keys(buildings[foundBuilding]).indexOf(foundFloor));
            };
            floorsRoomsPanel.appendChild(floorButton);




            // Show the rooms for the found building and floor
            showRooms(foundBuilding, Object.keys(buildings[foundBuilding]).indexOf(foundFloor));
        } else {
            // If the building and floor are not found, display an error message
            var errorMessage = document.createElement('p');
            errorMessage.textContent = 'Room not found!';
            floorsRoomsPanel.appendChild(errorMessage);
        }
    } else {
        // If no room name is provided, display the building details based on the building name
        var buildingNameElement = document.getElementById('buildingName');
        buildingNameElement.textContent = buildingName;
        var descriptionElement = document.getElementById('description');
        descriptionElement.textContent = getDescription(buildingName);




        // If floor information is provided, show it
        if (floor) {
            var floorButton = document.createElement('button');
            floorButton.textContent = floor;
            floorButton.classList.add('floor');
            floorButton.onclick = function () {
                showRooms(buildingName, Object.keys(buildings[buildingName]).indexOf(floor));
            };
            floorsRoomsPanel.appendChild(floorButton);
            // Show the rooms for the specific floor
            showRooms(buildingName, Object.keys(buildings[buildingName]).indexOf(floor));
        } else {
            // Get the floors of the building
            var buildingFloors = Object.keys(buildings[buildingName]);
            buildingFloors.forEach(function (floor, index) {
                var floorButton = document.createElement('button');
                floorButton.textContent = floor;
                floorButton.classList.add('floor');
                floorButton.onclick = function () {
                    showRooms(buildingName, index);
                };
                floorsRoomsPanel.appendChild(floorButton);




                var roomsListDiv = document.createElement('div');
                roomsListDiv.id = `${buildingName.replace(/\s+/g, '')}${index}-Rooms`;
                roomsListDiv.classList.add('rooms-container');
                floorsRoomsPanel.appendChild(roomsListDiv);
            });
        }
    }
}








function floorContainsRoom(buildingName, floor, roomName) {
    var rooms = fetchRoomsForFloorInBuilding(buildingName, floor);
    return rooms.some(function(room) {
        return room.name === roomName;
    });
}




function scrollToRoom(buildingName, roomName) {
    var floors = Object.keys(buildings[buildingName]);
    floors.forEach(function(floor, index) {
        if (floorContainsRoom(buildingName, floor, roomName)) {
            var roomsContainer = document.getElementById(`${buildingName.replace(/\s+/g, '')}${index}-Rooms`);
            roomsContainer.innerHTML = ''; // Clear out previous rooms
            var rooms = fetchRoomsForFloorInBuilding(buildingName, floor);
            var roomList = document.createElement('ul');
            roomList.classList.add('room-list');
            rooms.forEach(function(room) {
                var roomItem = document.createElement('li');
                var roomButton = document.createElement('button');
                roomButton.textContent = room.name + ': ' + room.description;
                roomItem.appendChild(roomButton);
                roomList.appendChild(roomItem);
            });
            roomsContainer.appendChild(roomList);
            roomsContainer.classList.add('active');
            roomsContainer.style.display = 'block';
        }
    });
}




























// Function to show rooms for a building and floor
function showRooms(buildingName, floorIndex) {
    var roomsContainer = document.getElementById(`${buildingName.replace(/\s+/g, '')}${floorIndex}-Rooms`);
















    // Toggle display of rooms container
    if (roomsContainer.style.display === 'block') {
        roomsContainer.style.display = 'none'; // Hide rooms container
    } else {
        roomsContainer.innerHTML = ''; // Clear out previous rooms
        var rooms = fetchRoomsForFloorInBuilding(buildingName, Object.keys(buildings[buildingName])[floorIndex]);
















        // Create an unordered list to contain room buttons
        var roomList = document.createElement('ul');
        roomList.classList.add('room-list');














// Iterate through rooms and create list items (li) for each room
rooms.forEach(function (room) {
    var roomItem = document.createElement('li'); // Create list item element for each room
    var roomButton = document.createElement('button'); // Create button element for each room
    roomButton.textContent = room.name + ': ' + room.description; // Set button text to room name and description
    // Remove the onclick event to remove the alert
    roomButton.onclick = function () {
        // Functionality when room button is clicked can be added here
        // No alert in this case
    };
    roomItem.appendChild(roomButton); // Append button to list item
    roomList.appendChild(roomItem); // Append list item to unordered list


    // Create icon element
    var icon = document.createElement('img');
    icon.src = 'https://icons.iconarchive.com/icons/iconsmind/outline/256/Turn-Down-2-icon.png'; // Replace with the icon URL
    icon.classList.add('room-icon'); // Add a class for styling if needed
    // Insert icon before the room button
    roomItem.insertBefore(icon, roomButton);
});










        roomsContainer.appendChild(roomList); // Append unordered list to rooms container
        roomsContainer.style.display = 'block'; // Show rooms container
    }
}
















//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ lAGAYAN NG ROOMS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */



//   ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺  ───────── ౨ lAGAYAN NG ROOMS ৎ ───────── ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦   */


var buildings = {
    'ITC Building': {
    'Ground': [
        {
            name: 'Room 101',
            description: 'Alumni Office'
        },
        {
            name: 'Room 102',
            description: 'Class Room'
        },
        {
            name: 'Room 103B',
            description: 'Computer Laboratory Head'
        },
        {
            name: 'Room 105',
            description: 'Class Room'
        },
        {
            name: 'Room 106',
            description: 'CEIT Accreditation Room'
        },
        {
            name: 'Room 107',
            description: 'Computer Department Office'
        },
        {
            name: 'Room 108',
            description: 'CEIT Planning & Extension Office'
        },
        {
            name: 'Room 109',
            description: 'Class Room'
        },
        {
            name: 'Room 110',
            description: 'CEIT Computer Laboratory Room'
        },
        {
            name: 'Room 110',
            description: 'CEIT Computer Laboratory Room'
        },
        {
            name: 'Room 111',
            description: 'CEIT Computer Laboratory Room'
        },
        {
            name: 'Room 112',
            description: 'Computer Engineering Faculty Office'
        },
        {
            name: 'Room 113',
            description: 'Civil Engineering Faculty Office'
        },
        {
            name: 'Room 114',
            description: 'Civil Engineering Laboratory Room'
        },
        {
            name: 'Room 115',
            description: 'Civil Engineering Work Station'
        },
        {
            name: 'Room 116',
            description: 'Class Room'
        },
        {
            name: 'Room 117',
            description: 'Electrical Workshop Room'
        },
        {
            name: 'Room 118',
            description: 'Electrical Engineering Technology Laboratory Room'
        },
        {
            name: 'Room 119',
            description: 'Electrical Engineering Laboratory'
        },
        {
            name: 'Room 118A',
            description: 'Electrical Department Office'
        },
        {
            name: 'Comfort Room',
            description: 'Female'
        },
        {
            name: 'Comfort Room',
            description: 'Male'
        }
    ],
    '2nd': [
        {
            name: 'Room 201',
            description: 'CEIT Class Room'
        },
        {
            name: 'Room 202',
            description: 'CEIT File Storage Room'
        },
        {
            name: 'Room 203',
            description: 'CEIT Research & Extension Center'
        },
        {
            name: 'Room 204-205',
            description: 'Dean’s Office'
        },
        {
            name: 'Room 206',
            description: 'Engineering Reading Center'
        },
        {
            name: 'Room 207',
            description: 'Engineering Female Faculty Room'
        },
        {
            name: 'Room 208',
            description: 'Class Room'
        },
        {
            name: 'Room 209',
            description: 'Class Room'
        },
        {
            name: 'Room 210',
            description: 'Sport Development Office'
        },
        {
            name: 'Room 210A',
            description: 'SDO Storage Room'
        },
        {
            name: 'Room 211',
            description: 'CEIT Room'
        },
        {
            name: 'Room 212',
            description: 'CEIT Room'
        },
        {
            name: 'Room 213',
            description: 'Grand Alumni Room'
        },
        {
            name: 'Room 214',
            description: 'AFSI'
        },
        {
            name: 'Room 215',
            description: 'IPE Storage Room'
        },
        {
            name: 'Room 216',
            description: 'Storage Room'
        },
        {
            name: 'L1',
            description: 'Class Room'
        },
        {
            name: 'L2',
            description: 'Class Room'
        },
        {
            name: 'L3',
            description: 'Class Room'
        },
        {
            name: 'L4',
            description: 'Class Room'
        }
    ],
    '3rd': [
        {
            name: 'Room 301',
            description: 'Class Room'
        },
        {
            name: 'Room 302',
            description: 'Class Room'
        },
        {
            name: 'Room 303',
            description: 'Class Room'
        },
        {
            name: 'Room 304',
            description: 'Class Room'
        },
    {
            name: 'Room 305',
            description: 'Class Room'
        },
        {
            name: 'Room 306',
            description: 'ECE Laboratory Storage'
        },
        {
            name: 'Room 307',
            description: 'Electronics Laboratory'
        },
        {
            name: 'Room 308',
            description: 'DOSTCAN Mini Learning Resource Center'
        },
        {
            name: 'Room 309',
            description: 'ECE Department Office'
        },
        {
            name: 'Room 309A',
            description: 'ECE Laboratory Room'
        },
        {
            name: 'Room 309B',
            description: 'ECE Laboratory Room'
        },
        {
            name: 'Room 310',
            description: 'ECE Storage Room'
        },
        {
            name: 'Room 311',
            description: 'COE Center'
        },
        {
            name: 'Room 312',
            description: 'Faculty Evaluation'
        },
        {
            name: 'Room 313',
            description: 'Drawing Room'
        },
        {
            name: 'Room 314',
            description: 'Drawing Room'
        },
        {
            name: 'Room 315',
            description: 'Drawing Room'
        },
        {
            name: 'Room 316',
            description: 'Drawing Room'
        },
        {
            name: 'Room 317',
            description: 'Drawing Room'
        }
    ],
    '4th': [
        {
            name: 'Room 401',
            description: 'Class Room'
        },
        {
            name: 'Room 402',
            description: 'Class Room'
        },
        {
            name: 'Room 403',
            description: 'Class Room'
        },
        {
            name: 'Room 404',
            description: 'Class Room'
        },
        {
            name: 'Room 405',
            description: 'Class Room'
        },
        {
            name: 'Room 406',
            description: 'Class Room'
        },
        {
            name: 'Room 407',
            description: 'Class Room'
        },
        {
            name: 'Room 408',
            description: 'Class Room'
        },
        {
            name: 'Room 409',
            description: 'Class Room'
        },
        {
            name: 'Room 410',
    description: 'Class Room'
        },
        {
            name: 'Room 411',
            description: 'Class Room'
        },
        {
            name: 'Room 412',
            description: 'Training Hall A - ECE Laboratory'
        },
        {
            name: 'Room 413',
            description: 'Training Hall B'
        },
        {
            name: 'Room 414',
            description: 'HRDC'
        }
    ],
    '5th': [
        {
            name: 'Plenary Hall',
            description: ''
        },
    ]
    },




    'Engineering Laboratory Building': {
    'Ground': [
        {
            name: 'Waiting Room',
            description: ''
        },
        {
            name: 'Comfort Room',
            description: ''
        }
    ],
    '2nd': [
        {
            name: 'Electrical Engineering Laboratory',
            description: ''
        },
    ],
    '3rd': [
        {
            name: 'Civil Engineering (CAD) Room',
            description: ''
        },
        {
            name: 'Architecture (CAD) Room',
            description: ''
        },
        {
            name: 'Comfort Room',
            description: ''
        },
    ],
        '4th': [
        {
            name: '‌Mechatronics Engineering Department',
            description: ''
        },
    ],
    '5th': [
        {
            name: 'Chemistry Room',
            description: ''
        },
        {
            name: 'Physics Room',
            description: ''
        },
    ],
    },
    'Dormitory Building': {
    'Ground': [
        {
            name: 'Dorm Rooms',
            description: ''
        },
        ],
    '2nd': [
        {
            name: 'Dorm Rooms',
            description: ''
        },
    ],
    '3nd': [
        {
            name: 'Dorm Rooms',
            description: ''
        },
    ],
    '4th': [
        {
            name: 'Dorm Rooms',
            description: ''
        },
    ],
    },
    'MAB Building': {
    'Ground': [
        {
            name: 'Scholarship and Grant Office',
            description: ''
        },
        {
            name: 'Center for Student Affairs',
            description: ''
        },
        {
            name: '‌Outdoor Parking',
            description: ''
        },
        {
            name: 'Registrars Office',
            description: ''
        },
    ],
    '2nd': [
        {
            name: 'Records Management Office',
            description: ''
        },
        {
            name: 'ROOM 212: DOST NCR-SATELLITE OFFICE (PAMAMARISAN CLUSTER)',
            description: ''
        },
        {
            name: 'Comfort Room',
            description: ''
        },
        {
            name: '‌CAS Dean’s Office',
            description: ''
        },
    ],
    '3nd': [
        {
            name: 'Room 3005',
            description: 'Life Long Learners'
        },
        {
            name: '‌Waiting Area TUP',
            description: ''
        },
        {
            name: 'Roo‌m 3006',
            description: 'Biology'
        },
        {
            name: 'Roo‌m 3007',
            description: 'Cas Library / Cas Reading Center'
        },
        {
            name: 'Roo‌m 3007',
            description: 'Stat & Bio'
        },
        {
            name: 'Roo‌m ‌3008',
            description: ''
        },
        {
            name: 'Roo‌m 3010',
            description: ''
        },
        {
            name: '‌Stock Room',
            description: ''
        },
        {
            name: 'Learning Development and Editorial Office (LDEO)',
            description: ''
        },
        {
            name: 'Comfort Room',
            description: ''
        },
        {
            name: 'Room ‌3021',
            description: 'Biology Laboratory Room'
        },
        {
            name: 'Room 3022',
            description: 'Physics Laboratory Room'
        },
        {
            name: 'Room ‌3023',
            description: 'Chemistry Laboratory Room'
        },
    ],
    '4th': [
        {
            name: 'Room‌ 4005',
            description: 'Student Center'
        },
        {
            name: 'Room‌ ‌4006',
    description: 'Student Center'
        },
        {
            name: 'Room ‌4007',
            description: 'Political Science'
        },
        {
            name: 'Room 4008',
            description: 'Waiting Area PUP'
        },
        {
            name: 'Room 4009',
            description: 'Political Science'
        },
        {
            name: 'Room 4010',
            description: 'Political Science'
        },
        {
            name: 'Comfort Room',
            description: ''
        },
        {
            name: 'Room 4020',
            description: 'Astronomy'
        },
        {
            name: 'Room 4021',
            description: 'Astronomy'
        },
        {
            name: 'Room ‌4022',
            description: 'E-customer Service Training Center / Com lab'
        },
        {
            name: 'Room 4023',
            description: 'Computer Laboratory'
        },
        {
            name: 'FLDEPD',
            description: 'Flexible Learning and Digital Education Programs Department'
        },
        {
            name: '‌Cas Speech Lab',
            description: ''
        },
        {
            name: '‌IHK Reading Center',
            description: ''
        },
        {
            name: '‌EDTMO(Educational Technology and Multimedia Office)',
            description: ''
        },
        {
            name: 'IFLDE (Institute of Flexible Learning and Digital Education)',
            description: ''
        },
        {
            name: '‌IHK Accreditation Room',
            description: ''
        },
        {
            name: 'Comfort Room',
            description: ''
        },
        {
            name: 'Room‌ ‌5012',
            description: 'Cas Accreditation Room'
        },
        {
            name: 'Room ‌5011',
            description: 'Cas Student Council Room'
        },
        {
            name: 'Room ‌5010',
            description: ''
        },
        {
            name: 'Room ‌5009',
            description: ''
        },
        {
            name: 'Room 5008',
            description: 'Psychology'
        },
        {
            name: 'Room 5007',
            description: 'Psychology'
        },
        {
            name: 'Room 5006',
            description: 'Psychology'
        },
        {
            name: 'Room 5005',
            description: 'Psychology'
        },
        ],
    '5th': [
    {
            name: 'Rooftop',
            description: ''
        },
    ],
    },
    'Wellness Building': {
    'Ground': [
        {
            name: 'Indoor Parking',
            description: ''
        },
        {
            name: 'Guard House',
            description: ''
        },
    ],
    '2nd': [
        {
            name: '‌Counseling Room',
            description: ''
        },
        {
            name: 'Guidance and Counseling Services Center',
            description: ''
        },
        {
            name: 'DRRMO',
            description: ''
        },
        {
            name: '‌Fire Exit',
            description: ''
        },
    ],
    '3rd': [
        {
            name: '‌CRGAS',
            description: ''
        },
        {
            name: '‌Cultural Affairs Unit',
            description: ''
        },
        {
            name: '‌Fitness Gym',
            description: ''
        },
        {
            name: '‌Conference Room (International Affairs and Linkages Office)',
            description: ''
        },
        {
            name: '‌IALO Office',
            description: ''
        },
        {
            name: '‌Comfort Room',
            description: 'Female'
        },
        {
            name: 'Comfort Room',
            description: 'Male'
        },
    ],
    '4th': [
        {
            name: 'RTU Kultura Rizalia Dance Troupe Dance Studio',
            description: ''
        },
        {
            name: '‌Comfort Room',
            description: 'Female'
        },
        {
            name: 'RTU Himig Rizalia Studio',
            description: ''
        },
        {
            name: 'RTU Dulaang Rizalia Studio',
            description: ''
        },
        {
            name: 'Comfort Room',
            description: 'Male'
        },
    ],
    '5th': [
        {
            name: '‌Table Tennis Court',
            description: ''
        },
        {
            name: '‌Badminton Court',
            description: ''
        },
    ],
    '6th': [
        {
            name: '‌Swimming Pool (for Athletes)',
    description: ''
        },
        {
            name: 'Comfort Room',
            description: ''
        },
    ],
    '7th': [
        {
            name: 'Basketball Court',
            description: ''
        },
    ],
    // add floor
    },


    'Gate-2': {
        'Ground': [
            {
                name: 'Exit',
                description: ''
            },
            {
                name: 'Entrance',
                description: ''
            },
        ],
        // add floor
        },


        'Gate-3': {
            'Ground': [
                {
                    name: 'Exit',
                    description: ''
                },
                {
                    name: 'Entrance',
                    description: ''
                },
            ],
            // add floor
            },


            'Gate-4': {
                'Ground': [
                    {
                        name: 'Exit',
                        description: ''
                    },
                    {
                        name: 'Entrance',
                        description: ''
                    },
                ],
                // add floor
                },


                'Gate-5': {
                    'Ground': [
                        {
                            name: 'Exit',
                            description: ''
                        },
                        {
                            name: 'Entrance',
                            description: ''
                        },
                    ],
                    // add floor
                    },


                    'Gate-1': {
                        'Ground': [
                            {
                                name: 'Exit',
                                description: ''
                            },
                            {
                                name: 'Entrance',
                                description: ''
                            },
                        ],
                        // add floor
                        },
           
                        'Medical & Dental Clinic Building': {
                            'Ground': [
                                {
                                    name: 'Exit',
                                    description: ''
                                },
                                {
                                    name: 'Entrance',
                                    description: ''
                                },
                            ],
                            // add floor
                            },


                            'University Gymnasium': {
                                'Ground': [
                                    {
                                        name: 'Exit',
                                        description: ''
                                    },
                                    {
                                        name: 'Entrance',
                                        description: ''
                                    },
                                ],
                                // add floor
                                },
                               
                                'University Quadrangle': {
                                    'Ground': [
                                        {
                                            name: 'Exit',
                                            description: ''
                                        },
                                        {
                                            name: 'Entrance',
                                            description: ''
                                        },
                                    ],
                                    // add floor
                                    },                  
    // Add additional buildings HERE
    'Snagah Building': {
    'Ground': [
        {
            name: 'Parking',
            description: ''
        },
        {
            name: 'Building Facilities Management Unit',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
    ],
    '2nd': [
        {
            name: '‌Room 201',
            description: 'University Library'
        },
        {
            name: 'Room 202',
            description: 'University Library'
        },
        {
            name: 'Room 203',
            description: 'University Library'
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 204',
            description: 'University Library'
        },
        {
            name: 'Room 205',
            description: 'University Library'
        },
       
    ],
    '3rd': [
        {
            name: '‌Room 301',
            description: 'CBEA Computer Laboratory'
        },
        {
            name: 'Room 302',
            description: 'CBEA Computer Laboratory'
        },
        {
            name: 'Room 303',
            description: 'Server Room'
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
    },
        {
            name: 'Room 304',
            description: 'Computer Laboratory'
        },
        {
            name: 'Room 305',
            description: ' Entrep-Tecno Laboratory'
        },
        {
            name: 'Room 306',
            description: 'AutoCAD Laboratory'
        },
        {
            name: 'Room 307',
            description: 'AutoCAD Laboratory'
        },
    ],
    '4th': [
        {
            name: '‌Room 401',
            description: 'CBEA Faculty'
        },
        {
            name: 'Room 402',
            description: ''
        },
        {
            name: 'Room 403',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 404',
            description: ''
        },
        {
            name: 'Room 405',
            description: ''
        },
        {
            name: 'Room 406',
            description: ''
        },
    ],
    '5th': [
        {
            name: 'Room 501',
            description: ''
        },
        {
            name: 'Room 502',
            description: ''
        },
        {
            name: 'Room 503',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 504',
            description: ''
        },
        {
            name: 'Room 505',
            description: ''
        },
        {
            name: 'Room 506',
            description: ''
        },
        {
            name: 'Room 507',
            description: ''
        },
        {
            name: 'Room 508',
            description: ''
        },
    ],
    '6th': [
        {
            name: '‌Room 601',
            description: ''
        },
        {
            name: 'Room 602',
            description: ''
        },
        {
            name: 'Room 603',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 604',
            description: ''
        },
        {
            name: 'Room 605',
            description: ''
        },
        {
            name: 'Room 606',
            description: ''
        },
        {
            name: 'Room 607',
            description: ''
        },
        {
            name: 'Room 608',
            description: ''
        },
    ],
    '7th': [
        {
            name: '‌Room 701',
            description: ''
        },
        {
            name: 'Room 702',
            description: ''
        },
        {
            name: 'Room 703',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 704',
            description: ''
        },
        {
            name: 'Room 705',
            description: ''
        },
        {
            name: 'Room 706',
            description: ''
        },
        {
            name: 'Room 707',
            description: ''
        },
        {
            name: 'Room 708',
            description: ''
        },
        {
            name: 'Fountain',
            description: ''
        },
    ],
    '8th': [
        {
            name: '‌Room 801',
        description: ''
        },
        {
            name: 'Room 802',
            description: ''
        },
        {
            name: 'Room 803',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 804',
            description: ' Department Head’s Office'
        },
        {
            name: 'Room 805',
            description: ''
        },
        {
            name: 'Room 806',
            description: ''
        },
        {
            name: 'Room 807',
            description: ''
        },
    ],
    '9th': [
        {
            name: '‌Room 901',
            description: ''
        },
        {
            name: 'Room 902',
            description: ''
        },
        {
            name: 'Room 903',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 904',
            description: 'Department Heads Office'
        },
        {
            name: 'Room 905',
            description: ''
        },
        {
            name: 'Room 906',
            description: ''
        },
        {
            name: 'Room 907',
            description: ''
        },
        {
            name: 'Room 908',
            description: ''
        },
    ],
    '9th': [
        {
            name: '‌Room 901',
            description: ''
        },
        {
            name: 'Room 902',
            description: ''
        },
        {
            name: 'Room 903',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
    description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 904',
            description: ''
        },
        {
            name: 'Room 905',
            description: ''
        },
        {
            name: 'Room 906',
            description: ''
        },
        {
            name: 'Room 907',
            description: ''
        },
        {
            name: 'Room 908',
            description: ''
        },
    ],
    '10th': [
        {
            name: '‌Room 1001',
            description: ''
        },
        {
            name: 'Room 1002',
            description: ''
        },
        {
            name: 'Room 1003',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Room 1004',
            description: ''
        },
        {
            name: 'Room 1005',
            description: ''
        },
        {
            name: 'Room 1006',
            description: ''
        },
        {
            name: 'Room 1007',
            description: ''
        },
    ],


    },
    'Old Building': {
    'Ground': [
        {
            name: 'ROTC Office',
            description: ''
        },
        {
            name: 'CNSTP',
            description: ''
        },
        {
            name: 'Computer Laboratory',
            description: ''
        },
        {
            name: 'Room 1',
            description: 'BAU (Business Affairs)'
        },
        {
            name: 'Room 2',
            description: 'BAU (Business Affairs)'
        },
    ],
    '2nd': [
    {
            name: 'CED 204',
            description: 'Faculty Room'
        },
        {
            name: 'Deans Office',
            description: ''
        },
        {
            name: 'Room 211',
            description: ''
        },
        {
            name: 'Room 212',
            description: ''
        },
        {
            name: 'Room 213',
            description: ''
        },
        {
            name: 'Room 214',
            description: ''
        },
        {
            name: 'Room 215',
            description: ''
        },
        {
            name: 'Room 216',
            description: ''
        },
        {
            name: 'Room 217',
            description: ''
        },
        {
            name: 'Room 218',
            description: ''
        },
        {
            name: 'Room 219',
            description: ''
        },
        {
            name: 'Room 220',
            description: ''
        },
    ],
    '3rd': [
        {
            name: 'Room 305',
            description: 'Laboratory School'
        },
        {
            name: 'Room 306',
            description: ''
        },
        {
            name: 'Room 307',
            description: ''
        },
        {
            name: 'Room 308',
            description: ''
        },
        {
            name: 'Room 309',
            description: ''
        },
        {
            name: 'Room 310',
            description: ''
        },
        {
            name: 'Room 311',
            description: ''
        },
        {
            name: 'Room 312',
            description: ''
        },
        {
            name: 'Room 313',
            description: ''
        },
        {
            name: 'Room 314',
            description: ''
        },
        {
            name: 'Room 315',
            description: ''
        },
        {
            name: 'Room 316',
            description: ''
        },
        {
            name: 'Room 317',
            description: ''
        },
        {
            name: 'Room 318',
            description: ''
    },
        {
            name: 'Room 319',
            description: ''
        },
        {
            name: 'Room 320',
            description: ''
        },
        {
            name: 'Room 321',
            description: ''
        },
        {
            name: 'Room 322',
            description: ''
        },
    ],
    },


    'Old Building (South Wing)': {
        'Ground': [
            {
                name: 'Room 1',
                description: ''
            },
            {
                name: 'Room 2',
                description: ''
            },
            {
                name: 'Room 3',
                description: ''
            },
            {
                name: 'Room 4',
                description: ''
            },
        ],
        '2nd': [
        {
                name: '209',
                description: ''
            },
            {
                name: '210',
                description: ''
            },
            {
                name: 'Room 211',
                description: ''
            },
            {
                name: 'Room 212',
                description: ''
            },
            {
                name: 'Room 213',
                description: ''
            },
            {
                name: 'Room 214',
                description: ''
            },
            {
                name: 'Room 215',
                description: ''
            },
            {
                name: 'Room 216',
                description: ''
            },
            {
                name: 'Room 217',
                description: ''
            },
            {
                name: 'Room 218',
                description: ''
            },
            {
                name: 'Room 219',
                description: ''
            },
            {
                name: 'Room 220',
                description: ''
            },
        ],
        '3rd': [
            {
                name: 'Room 305',
                description: ''
            },
            {
                name: 'Room 306',
                description: ''
            },
            {
                name: 'Room 307',
                description: ''
            },
            {
                name: 'Room 308',
                description: ''
            },
            {
                name: 'Room 309',
                description: ''
            },
            {
                name: 'Room 310',
                description: ''
            },
            {
                name: 'Room 311',
                description: ''
            },
            {
                name: 'Room 312',
                description: ''
            },
            {
                name: 'Room 313',
                description: ''
            },
            {
                name: 'Room 314',
                description: ''
            },
            {
                name: 'Room 315',
                description: ''
            },
            {
                name: 'Room 316',
                description: ''
            },
            {
                name: 'Room 317',
                description: ''
            },
            {
                name: 'Room 318',
                description: ''
        },
            {
                name: 'Room 319',
                description: ''
            },
            {
                name: 'Room 320',
                description: ''
            },
            {
                name: 'Room 321',
                description: ''
            },
            {
                name: 'Room 322',
                description: ''
            },
        ],
        },
    'R&D Building': {
    'Ground': [
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Room 2',
            description: 'Multimedia Lecture Room'
        },
        {
            name: 'Industrial Biotechnology Room',
            description: ''
        },
        {
            name: 'Room 100',
            description: ''
        },
        {
            name: 'Room 106',
            description: ''
        },
        {
            name: 'Room 103',
            description: 'Lecture & Laboratory Room'
        },
        {
            name: 'Room 104',
            description: 'Preparation/Sterilization'
        },
        {
            name: 'Room 105',
            description: 'Undergraduate Thesis Room'
        },
        {
            name: 'Room 106',
            description: 'Tissue Culture Lab'
        },
        {
            name: 'Room 107',
            description: 'Microbial & Mycological Biotechnology '
        },
        {
            name: 'Chapel',
            description: ''
        },
    ],
    '2nd': [
        {
            name: 'Mushroom Biotechnology Lab',
            description: ''
        },
        {
            name: 'Environmental Research Lab',
            description: ''
        },
        {
            name: 'Urban Agriculture Research and Developmental Center (Plant Biotechnology Division)',
            description: ''
        },
        {
            name: 'Plant Biotechnology Lab',
            description: ''
        },
        {
            name: 'Acclimatization Room',
            description: ''
        },
        {
            name: 'Elevator',
            description: ''
        },
        {
            name: 'Room (Unknown Room No.)',
            description: ''
        },
        {
            name: 'RND- A',
            description: ''
        },
        {
            name: 'RND- A',
            description: ''
        },
    ],
    '3rd': [
        {
            name: 'Room 301',
            description: ''
        },
        {
            name: 'Room 302',
            description: ''
        },
        {
            name: 'Room 303',
            description: ''
        },
        {
            name: 'Room 304',
            description: ''
        },
        {
            name: 'Room 305',
            description: 'Economic Enterprise Development Unit'
        },
        {
            name: 'Room 306',
            description: ''
        },
        {
            name: 'Room 307',
            description: ''
        },
        {
            name: 'Room 308',
            description: 'VP-RIES Office'
        },
        {
            name: 'Gender and Research Interactive Hub',
            description: ''
        },
        {
            name: 'Comfort Room: Female',
            description: ''
        },
        {
            name: 'Comfort Room: Male',
            description: ''
        },
        {
            name: 'Room 309',
            description: 'Research and Development Center'
        },
        {
            name: 'Conference Room (Blue Room)',
            description: ''
        },
    ],
    '4th': [
        {
            name: 'Graduate School Library',
            description: ''
        },
        {
            name: 'Research Ethics Review and Journal Publication Unit',
            description: ''
        },
        {
            name: 'ASHU: Anti-Sexual Harassment Unit',
            description: ''
        },
        {
            name: 'Room 407',
            description: 'Institute of Human Kinetics Directory Office'
        },
        {
            name: 'Room 401',
            description: 'Faculty Lounge'
    },
    {
        name: 'Room 402A',
        description: 'Accreditation Office'
    },
    {
        name: 'Room 403A',
        description: ''
    },
    {
        name: 'GS Guidance Counseling Center',
        description: ''
    },
    {
        name: 'Room 404A',
        description: ''
    },
    {
        name: 'Room 43B',
        description: ''
    },
    {
        name: 'Room 404B',
        description: ''
    },
    {
        name: 'Room 405',
        description: ''
    },
],
'5th': [
    {
        name: 'Room 504a',
        description: ''
    },
    {
        name: 'Room 503b',
        description: ''
    },
    {
        name: 'Room 504b',
        description: ''
    },
    {
        name: 'Room 505',
        description: ''
    },
    {
        name: 'Comfort Room',
        description: ''
    },








],
},
'ITB Building': {
'Ground': [
    {
        name: 'Room 101',
        description:'VPDA Management Information Center (MIC)'
    },
    {
        name: 'Room 105',
        description:'Office of the Vice President for Student Services (VPSS)'
    },
    {
        name: 'Room 106',
        description:'Office of the Director Financial Services'
    },
    {
        name: 'Room 106',
        description: 'Cashier A'
    },
    {
        name: 'Room 107',
        description: 'Cashier B'
    },
    {
        name: 'Room 106',
        description: ''
    },
    {
        name: 'Room 109',
        description: 'VPAA'
    },
],
'2nd': [
    {
        name: 'Room 201',
        description: 'COA Office (Office of the President)'
    },
    {
        name: 'Room 202',
        description: 'Auditor Office'
    },
    {
        name: 'Room 203',
        description: 'Accounting Office'
    },
    {
        name: 'Room 204',
        description: 'Personnel Office'
    },
    {
        name: 'Room 205',
        description: 'Budget Office'
    },
    {
        name: 'Room 206',
        description: 'Supply Office'
    },
    {
        name: 'Room 207',
        description: 'Office of the Director Administrative Services (DAS)'
    },
    {
        name: 'Room 208',
        description: 'Internal Audit Services'
    },
    {
        name: 'Room 209',
        description: 'Business Affairs Office'
    },
],
'3rd': [
    {
        name: 'Room 301',
        description: 'Scholarship Office'
    },
    {
        name: 'Room 302',
        description: 'Department of Student Affairs'
    },
    {
        name: 'Room 303',
        description: 'ECE/ECET Reading Center'
    },
    {
        name: 'Room 304',
        description: 'Electronic Workshop Laboratory'
    },
    {
        name: 'Room 305',
        description:'Class Rooms'
    },
    {
        name: 'Room 306',
        description:'Class Rooms'
    },
    {
        name: 'Room 307',
        description: 'IE/IT Department Office'
    },
    {
        name: 'Room 308',
        description: 'Computer Laboratory and Multimedia Room'
    },
    {
        name: 'Room 309',
        description: 'IE Laboratory'
    },
    {
        name: 'Room 310',
        description: ' Class Room'
    },
    {
        name: 'Room 311',
        description: ' Class Room'
    },
    {
        name: 'Room 312',
        description: 'Class Room'
    },
],
'4th': [
    {
        name: 'Room 401',
        description: 'Emerson Process Laboratory'
    },
    {
        name: 'Room 402',
        description: 'Electronic Laboratory'
    },
    {
        name: 'Room 403-A',
        description: 'Project Design Laboratory'
    },
    {
        name: 'Room 403-B',
        description: 'Electrical Laboratory'
    },
    {
        name: 'Room 404',
        description: 'Automatic Control and PLC Laboratory (Fluid Power Laboratory)'
    },
    {
        name: 'Room 405',
        description: 'PICS National Office (DICT Office)'
    },    
],
'5th': [
    {
        name: 'Room 501',
        description:'Physics Laboratory'
    },
    {
        name: 'Room 502',
        description: 'Stock Room'
    },
    {
        name: 'Room 502A',
        description: 'Chemistry Laboratory'
    },
    {
        name: 'Room 503',
        description: 'Class Room'
    },
    {
        name: 'Room 504',
        description: 'Class Room'
    },
    {
        name: 'Room 505',
        description: 'Class Room'
    },
    {
        name: 'Room 506',
        description: 'Class Room'
    },
    {
        name: 'Room 507',
        description: 'Class Room'
    },
    {
        name: 'Room 504',
        description: 'Chemistry Laboratory'
    },
    {
        name: 'Room 506',
        description: 'Cultural Affairs Office & Cultural Center (Mini Theater)'
    },
   


],
},
};








// Function to select a building and show its details
function selectBuilding(buildingName) {
    // Call the function to show building details
    showBuildingDetails(buildingName);
    // Show the building details tab
    var buildingDetailsTab = document.getElementById('buildingDetailsTab');
    buildingDetailsTab.classList.add('active');
}












// Function to handle click events for building buttons
document.addEventListener('DOMContentLoaded', function() {
    // Get all building buttons
    var buildingButtons = document.querySelectorAll('.square-button');








    // Add click event listener to each building button
    buildingButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the building name from the button's text content
            var buildingName = button.textContent.trim();
            // Call selectBuilding function with the building name
            selectBuilding(buildingName);
        });
    });
});












function fetchRoomsForFloorInBuilding(buildingName, floor) {
    var rooms = [];
    var building = buildings[buildingName];
    if (building) {
    rooms = building[floor] || [];
    }
    return rooms;
    }








    function getDescription(buildingName) {
        // Mock function to fetch description based on buildingName
        switch (buildingName) {
            case "ITC Building":
                return "ITC Building was built for engineering and architecture scholars (College of Engineering and Architecture), which abbreviated as (Industrial Technological Complex). The building was named after Dr. Josefina Estolas, it primarily has a color combination of blue and teal. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. From Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Snagah Building":
                return "Snagah Building was considered as the latest and neat infrastructure built among all buildings, its abbreviation is (Senator Neptalia Gonzales Academic Hall). Few of the rooms are accessible for High School students, and has the school's main library. Moreover, it has rooms for College of Education, and Laboratories for High School students. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Wellness Building":
                return "Wellness Building is where the school's administrative offices and authorize personnels (Office of the President, Vice President for: Academic Affairs, Student Services, and Development and Administration), every organizations selected rooms, athletes field and pools, and lastly has an underground floor that serves as a parking lot. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "R&D Building":
                return "R&D Building is dedicated to research and innovation activities, it has rooms accessible for Physical Education classes, offices for computer literate professors. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Old Building":
                return "Old Building used for offices in Reserve Training, has rooms for College of Business and Entrepreneurial Technology, and offices for Business (Uniforms). It also has an area for cafeterias and stores, and some rooms for organizations as well. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Engineering Laboratory Building":
                return "Engineering Laboratory Building has the facilities, equipment, laboratories exclusive for engineering scholars. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "MAB Building":
                return "MAB Building accommodates classrooms for CSA and faculty offices, scholarships, and enrollment stamping area. It has rooms for the Guidance and Counseling Center, Registrar's Office, College of Arts and Sciences, Institute of Physical Education, and Senior High Faculty Room. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "ITB Building":
                return "ITB Building has area for MIC (requesting slips for private letters and requirements), Cashier, Clinic, ICE and IE Department, laboratories. It also includes offices for professors from the engineering department. It was located right in front of the stage, after entering the School's Quadrangle. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Dormitory Building":
                return "Dormitory Building provides accommodation, shelter, and comfort for the school's scholars (Athletes). From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "University Gymnasium":
                return "University Gymnasium provides field, equipment, and materials to be used by athletes, most of the events are being held here. By Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "University Quadrangle":
                return "University Quadrangle was located in the center of the school, most of the time it's used in Physical Education to execute particular activities. Events such as departmental weeks are also being held here. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";    
            case "Old Building (South Wing)":
                return "Old Building (South Wing) provides classrooms for the school's scholars, most of the rooms are used by the engineering department. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Medical & Dental Clinic Building":
                return "Medical & Dental Clinic Building provides accommodation, care, and comfort related to health for the school's scholars. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Gate-1":
                return "Gate 1 primarily used as entrance and exit for parking. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";                      
            case "Gate-2":
                return "Gate 2 serves as the main entrance of the school, Identification Card and Registration Form are required upon entering the gate. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Gate-3":
                return "Gate 3 was specified to use only for school's employees, professors, and personnels. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Gate-4":
                return "Gate 4 was used only for student's exit, also used as entrance for vehicles such as bus, jeep, car, etc. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            case "Gate-5":
                return "Gate 5 was used as entrance and exit for the school's employee, and serves also as a gate for parking. From Monday to Thursday, it's open from 8:00 AM to 4:00 PM. While on Friday to Sunday, it's closed. Contact: (02) 8534 8267";
            default:
                return "Description for " + buildingName + " goes here.";
        }
    }










function closeBuildingDetails() {
    var searchOverlay = document.getElementById('searchOverlay');
    var buildingDetailsTab = document.getElementById('buildingDetailsTab');
    buildingDetailsTab.classList.remove('active');
































    // Optionally, you can clear the content of the building details here
    var buildingNameElement = document.getElementById('buildingName');
    buildingNameElement.textContent = '';
































    var descriptionElement = document.getElementById('description');
    descriptionElement.textContent = '';
































    var floorsRoomsPanel = document.getElementById('floorsRoomsPanel');
    floorsRoomsPanel.innerHTML = '';
































    // Show the search overlay again
    document.getElementById('searchOverlay').style.display = 'block';
































    // Show search overlay
    searchOverlay.classList.add('active');
    // Hide building details tab
    buildingDetailsTab.classList.remove('active');
































































    // Clear previous suggestions
    var suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
































































    // Restore search functionality
    var searchInput = document.getElementById('searchInput');
    searchInput.value = ''; // Clear search input
    searchInput.focus(); // Set focus back to the search input
    search(); // Trigger search function
































































    // Toggle the search overlay to ensure it's visible
    toggleSearchOverlay();
































































    // Ensure that the search tab is in its initial state
    var categories = document.getElementById('categories');
    categories.classList.remove('active');
































































    var roomsContainer = document.querySelector('.rooms-container');
    roomsContainer.classList.remove('active');
    roomsContainer.classList.remove('left-align');
































































     // Hide the contents of the building details tab
     var buildingDetailsContent = document.getElementById('buildingDetailsContent');
     buildingDetailsContent.innerHTML = '';
}
































































function toggleBuildingDetails() {
    var floorsRoomsPanel = document.getElementById('floorsRoomsPanel');
    if (floorsRoomsPanel.classList.contains('active')) {
    floorsRoomsPanel.classList.remove('active'); // Hide floors and rooms panel
    } else {
    floorsRoomsPanel.classList.add('active'); // Show floors and rooms panel
    }
    }






// Function to show rooms for a building and floor
function showRooms(buildingName, floorIndex) {
    var roomsContainer = document.getElementById(`${buildingName.replace(/\s+/g, '')}${floorIndex}-Rooms`);


    // Toggle display of rooms container
    if (roomsContainer.style.display === 'block') {
        roomsContainer.style.display = 'none'; // Hide rooms container
    } else {
        roomsContainer.innerHTML = ''; // Clear out previous rooms
        var rooms = fetchRoomsForFloorInBuilding(buildingName, Object.keys(buildings[buildingName])[floorIndex]);


        // Create an unordered list to contain room buttonsS
        var roomList = document.createElement('ul');
        roomList.classList.add('room-list');


        // Iterate through rooms and create list items (li) for each room
        rooms.forEach(function (room) {
            var roomItem = document.createElement('li'); // Create list item element for each room


            // Create icon element
            var icon = document.createElement('img');
            icon.src = 'https://icons.iconarchive.com/icons/iconsmind/outline/512/Turn-Down-2-icon.png'; // Replace with the icon URL
            icon.classList.add('room-icon'); // Add a class for styling if needed
            roomItem.appendChild(icon); // Append icon to list item


            var roomButton = document.createElement('button'); // Create button element for each room
            roomButton.textContent = room.name + ': ' + room.description; // Set button text to room name and description
            // Remove the onclick event to remove the alert
            roomButton.onclick = function () {
                // Functionality when room button is clicked can be added here
                // No alert in this case
            };
            roomItem.appendChild(roomButton); // Append button to list item
            roomList.appendChild(roomItem); // Append list item to unordered list
        });


        roomsContainer.appendChild(roomList); // Append unordered list to rooms container
        roomsContainer.style.display = 'block'; // Show rooms container
    }
}


// rooms-functions.js








// Function to handle the "Get Directions" button click event
function getDirections(buildingName) {
document.getElementById('to').value = buildingName; // Set the value of the 'to' input field to the buildingName
}








function search() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var suggestionsContainer = document.getElementById('suggestions');








    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';




    // Check if there is any input in the search field
    if (searchInput.trim() !== '') {
        // Search for matches in building names and room names
        var suggestions = [];
        Object.keys(buildings).forEach(function(buildingName) {
            // Check if the building name matches the search input
            if (buildingName.toLowerCase().includes(searchInput)) {
                suggestions.push(buildingName);
            }
            // Search for matches in room names
            Object.keys(buildings[buildingName]).forEach(function(floor) {
                buildings[buildingName][floor].forEach(function(room) {
                    // Check if the room name or description matches the search input
                    if (room.name.toLowerCase().includes(searchInput) || room.description.toLowerCase().includes(searchInput)) {
                        suggestions.push(buildingName + ' - ' + room.name);
                    }
                });
            });
        });
        // Filter suggestions to include only rooms that have a related letter with the searched room or building
        suggestions = suggestions.filter(function(suggestion) {
            var roomName = suggestion.split(' - ')[1];
            if (roomName) {
                return roomName.toLowerCase().includes(searchInput);
            }
            return true; // Include building names by default
        });
        // Display suggestions
        if (suggestions.length > 0) {
            displaySuggestions(suggestions);
        } else {
            suggestionsContainer.style.display = 'none'; // Hide suggestion list if there are no matches
        }
    } else {
        suggestionsContainer.style.display = 'none'; // Hide suggestion list if there is no input
    }
}








function displaySuggestions(suggestions) {
    var suggestionList = document.getElementById('suggestions');
    suggestionList.innerHTML = ''; // Clear previous suggestions
    var searchInput = document.getElementById('searchInput');
    // Create an unordered list to contain the suggestions
    var ul = document.createElement('ul');
    // Display all suggestions
    suggestions.forEach(function(suggestion) {
        var listItem = document.createElement('li');
        var textNode = document.createTextNode(suggestion);
        listItem.appendChild(textNode);
        listItem.addEventListener('click', function() {
            var buildingName = suggestion.split(' - ')[0];
            var roomName = suggestion.split(' - ')[1];
            var floor = suggestion.split(' - ')[2]; // Extract floor from suggestion
            if (roomName) {
                // Redirect to building details page or show room details
                showBuildingDetails(buildingName, roomName); // Pass buildingName and roomName
            } else if (floor) {
                // Show building details for the specific floor
                showBuildingDetails(buildingName, null, floor); // Pass buildingName and floor
            } else {
                // Show building details
                showBuildingDetails(buildingName);
            }
            searchInput.value = ''; // Clear search input after clicking
            suggestionList.innerHTML = ''; // Clear suggestion list after clicking
            showLandmarkIcon(buildingName);


            // Ensure that the building details tab is always opened
            var buildingDetailsTab = document.getElementById('buildingDetailsTab');
            buildingDetailsTab.classList.add('active');
        });
       
        // Make the suggestion clickable
        listItem.style.cursor = 'pointer';
        // Add hover effect to change background color to gray
        listItem.addEventListener('mouseover', function() {
            listItem.style.backgroundColor = '#f0f0f0'; // Gray color
        });
        // Remove hover effect when mouse leaves the suggestion
        listItem.addEventListener('mouseout', function() {
            listItem.style.backgroundColor = ''; // Revert to default background color
        });
        // Set custom bullet icon
        listItem.style.listStyleImage = 'url("https://www.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png")'; // Replace with your icon URL
        // Append the list item to the unordered list
        ul.appendChild(listItem);
    });
    // Append the unordered list to the suggestions container
    suggestionList.appendChild(ul);
    // Add CSS style for invisible scroll
    suggestionList.style.overflowY = 'auto';
    suggestionList.style.maxHeight = '200px'; // Adjust as needed
    // Show suggestion list
    suggestionList.style.display = 'block';
}










// Function to redirect to building details page
function redirectToBuilding(buildingName) {
    // Replace '#' with the actual link to the building details page
    console.log("Redirecting to building:", buildingName);
}












// Function to redirect to room details page
function redirectToRoom(buildingName, roomName) {
    // Replace '#' with the actual link to the room details page
    console.log("Redirecting to room:", buildingName, roomName);
}








// Add event listener to trigger search when search input changes
document.getElementById('searchInput').addEventListener('input', search);


















