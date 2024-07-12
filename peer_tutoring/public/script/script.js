// // let toggleBtn = document.getElementById('toggle-btn');
// // let body = document.body;
// // let darkMode = localStorage.getItem('dark-mode');

// // const enableDarkMode = () =>{
// //    toggleBtn.classList.replace('fa-sun', 'fa-moon');
// //    body.classList.add('dark');
// //    localStorage.setItem('dark-mode', 'enabled');
// // }

// // const disableDarkMode = () =>{
// //    toggleBtn.classList.replace('fa-moon', 'fa-sun');
// //    body.classList.remove('dark');
// //    localStorage.setItem('dark-mode', 'disabled');
// // }

// // if(darkMode === 'enabled'){
// //    enableDarkMode();
// // }

// // toggleBtn.onclick = (e) =>{
// //    darkMode = localStorage.getItem('dark-mode');
// //    if(darkMode === 'disabled'){
// //       enableDarkMode();
// //    }else{
// //       disableDarkMode();
// //    }
// // }

// // let profile = document.querySelector('.header .flex .profile');

// // document.querySelector('#user-btn').onclick = () =>{
// //    profile.classList.toggle('active');
// //    search.classList.remove('active');
// // }

// // let search = document.querySelector('.header .flex .search-form');

// // document.querySelector('#search-btn').onclick = () =>{
// //    search.classList.toggle('active');
// //    profile.classList.remove('active');
// // }

// // let sideBar = document.querySelector('.side-bar');

// // document.querySelector('#menu-btn').onclick = () =>{
// //    sideBar.classList.toggle('active');
// //    body.classList.toggle('active');
// // }

// // document.querySelector('#close-btn').onclick = () =>{
// //    sideBar.classList.remove('active');
// //    body.classList.remove('active');
// // }

// // window.onscroll = () =>{
// //    profile.classList.remove('active');
// //    search.classList.remove('active');

// //    if(window.innerWidth < 1200){
// //       sideBar.classList.remove('active');
// //       body.classList.remove('active');
// //    }
// // }



// document.addEventListener("DOMContentLoaded", function() {
//    const form = document.getElementById('form');
//    const fname = document.getElementById('sfname');
//    const lname = document.getElementById('slname');
//    const email = document.getElementById('email');
//    const password = document.getElementById('password');
//    const cpassword = document.getElementById('cpassword');
//    const nameError = document.getElementById('name_error');



// function showError(input, message) {
//    // Check if an existing error message is already displayed
//    let error = input.nextElementSibling; // Assuming error message is always next to input
//    if (error && error.classList.contains('error-message')) {
//        // Update the message if error span already exists
//        error.textContent = message;
//    } else {
//        // If no error message exists, create a new span for it
//        error = document.createElement('span');
//        error.classList.add('error-message'); // Use a class for styling
//        error.style.color = 'red';
//        error.textContent = message;
//        // Insert the error message right after the input element
//        input.parentNode.insertBefore(error, input.nextSibling);
//    }
// }

//    // Function to remove the error
//    function removeError(input) {
//        const container = input.parentElement;
//        const error = container.querySelector('#error');
//        if (error) {
//            container.removeChild(error);
//        }
//    }

//    // Email validation regex
//    function validateEmail(email) {
//        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//        return re.test(String(email).toLowerCase());
//    }

//    form.addEventListener('submit', function(e) {
//        // Prevent form submission
//        e.preventDefault();

//        let isValid = true;

//        // First Name validation
//        if (fname.value.trim() === '') {
//            showError(fname, '\nFirst name is required');
//            isValid = false;
//        } else {
//            removeError(fname);
//        }

//        // Last Name validation
//        if (lname.value.trim() === '') {
//            showError(lname, 'Last name is required');
//            isValid = false;
//        } else {
//            removeError(lname);
//        }

//        // Email validation
//        if (email.value.trim() === '') {
//            showError(email, '   Email is required');
//            isValid = false;
//        } else if (!validateEmail(email.value)) {
//            showError(email, 'Please enter a valid email');
//            isValid = false;
//        } else {
//            removeError(email);
//        }

//        // Password validation
//        if (password.value.trim() === '') {
//            showError(password, 'Password is required');
//            isValid = false;
//        } else {
//            removeError(password);
//        }

//        // Confirm Password validation
//        if (cpassword.value.trim() === '') {
//            showError(cpassword, 'Confirming your password is required');
//            isValid = false;
//        } else if (password.value !== cpassword.value) {
//            showError(cpassword, 'Passwords do not match');
//            isValid = false;
//        } else {
//            removeError(cpassword);
//        }

//        // If all inputs are valid, you can proceed with form submission or any other action
//        if (isValid) {
//            // Form submission or other action here
//            // For demonstration, just log 'Form is valid'
//            console.log('Form is valid');
//            form.submit();  
//        }
//    });
// });


