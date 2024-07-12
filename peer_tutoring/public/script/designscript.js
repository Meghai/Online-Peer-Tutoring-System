let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}
document.getElementById('studentForm').addEventListener('submit', function(event) {
   event.preventDefault();

   const formData = {
       name: document.getElementById('name').value,
       email: document.getElementById('email').value
   };

   fetch('/add-student', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData)
   })
   .then(response => response.json())
   .then(data => {
       console.log('Success:', data);
       alert('Student added successfully!');
   })
   .catch((error) => {
       console.error('Error:', error);
       alert('Failed to add student.');
   });
});


async function fetchAssignments() {
   try {
       const response = await fetch('/assignments');
       const assignments = await response.json();
       const container = document.getElementById("assignmentLinks");
       assignments.forEach(assignment => {
           const link = document.createElement("a");
           link.href = `/download/${assignment.file}`;
           const icon = document.createElement("i");
           icon.className = "fas fa-file-download";
           const span = document.createElement("span");
           span.textContent = `Download ${assignment.name}`;
           link.appendChild(icon);
           link.appendChild(span);
           container.appendChild(link);
           container.appendChild(document.createElement("br")); // Add line break for better spacing
       });
   } catch (error) {
       console.error('Error fetching assignments:', error);
   }
}

// Call the function to fetch assignments when the page loads
window.onload = fetchAssignments;
// Function to dynamically add download links for assignments
function addAssignmentLinks() {
   const container = document.getElementById("assignmentLinks");
   assignments.forEach(assignment => {
       const link = document.createElement("a");
       link.href = assignment.file;
       link.download = assignment.file.split('/').pop(); // Setting the filename for download
       const icon = document.createElement("i");
       icon.className = "fas fa-file-download";
       const span = document.createElement("span");
       span.textContent = `Download ${assignment.name}`;
       link.appendChild(icon);
       link.appendChild(span);
       container.appendChild(link);
       container.appendChild(document.createElement("br")); // Add line break for better spacing
   });
}

// Call the function to add the links when the page loads
window.onload = addAssignmentLinks;

// async function fetchTutorials() {
//    try {
//        const response = await fetch('/tutorials');
//        const tutorials = await response.json();
//        const container = document.getElementById("tutorialLinks");

//        tutorials.forEach(tutorial => {
//            const link = document.createElement("a");
//            link.href = `/download/${tutorial.file}`;
//            link.setAttribute('download', tutorial.file.split('/').pop()); // Suggesting the download file name

//            const icon = document.createElement("i");
//            icon.className = "fas fa-file-download";

//            const span = document.createElement("span");
//            span.textContent = `Download ${tutorial.name}`;

//            link.appendChild(icon);
//            link.appendChild(span);
//            container.appendChild(link);
//            container.appendChild(document.createElement("br")); // Add line break for better spacing
//        });
//    } catch (error) {
//        console.error('Error fetching tutorials:', error);
//    }
// }

// window.onload = fetchTutorials; // Ensuring the function runs when the document is loaded
// function addTutorialLinks() {
//    const container = document.getElementById("tutorialLinks"); // Ensure this ID matches your HTML element for tutorials
//    tutorials.forEach(tutorial => {
//        const link = document.createElement("a");
//        link.href = tutorial.file;
//        link.download = tutorial.file.split('/').pop(); // Suggesting the download file name

//        const icon = document.createElement("i");
//        icon.className = "fas fa-file-download";

//        const span = document.createElement("span");
//        span.textContent = `Download ${tutorial.name}`;


//        link.appendChild(icon);
//        link.appendChild(span);
//        container.appendChild(link);
//        container.appendChild(document.createElement("br")); // Adding a line break for better spacing
//    });
// }
// window.onload = addTutorialLinks;
// async function fetchTutorials() {
//    try {
//        const response = await fetch('/tutorials');
//        const tutorials = await response.json();
//        const container = document.getElementById("tutorial_links");

//        tutorials.forEach(tutorial => {
//            const link = document.createElement("a");
//            link.href = `/tutorial/${encodeURIComponent(tutorial.file)}`;
//            link.setAttribute('download', tutorial.file.split('/').pop());

//            const icon = document.createElement("i");
//            icon.className = "fas fa-file-download";

//            const span = document.createElement("span");
//            span.textContent = `Download ${tutorial.name}`;

//            link.appendChild(icon);
//            link.appendChild(span);
//            container.appendChild(link);
//            container.appendChild(document.createElement("br"));
//        });
//    } catch (error) {
//        console.error('Error fetching tutorials:', error);
//    }
// }

// document.addEventListener('DOMContentLoaded', fetchTutorials);




const assignments = [
   { id: 1, name: "Assignment 1" },
   { id: 2, name: "Assignment 2" },
   { id: 3, name: "Assignment 3" }
];



// Select the ul element to which assignments will be appended
const assignmentList = document.getElementById('assignmentList');

// Function to populate the assignments dynamically
function populateAssignments(assignments) {
    // Clear any existing items
    assignmentList.innerHTML = '';

    // Iterate through assignments and create list items
    assignments.forEach((assignment) => {
        // Create li element
        const li = document.createElement('li');
        li.textContent = assignment.name;

        // Create edit link
        const editLink = document.createElement('a');
        editLink.href = `#`;  // Replace with actual edit link
        editLink.textContent = 'Edit';

        // Create delete link
        const deleteLink = document.createElement('a');
        deleteLink.href = `#`;  // Replace with actual delete link
        deleteLink.textContent = 'Delete';

        // Append edit and delete links to li
        li.appendChild(editLink);
        li.appendChild(deleteLink);

        // Append li to ul
        assignmentList.appendChild(li);
    });
}

// Call the function with the initial assignments array
populateAssignments(assignments);
