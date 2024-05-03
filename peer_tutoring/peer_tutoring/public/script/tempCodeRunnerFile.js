/*const fname=document.getElementById('fname');
const lname=document.getElementById('lname');
const email=document.getElementById('email');
const password=document.getElementById('password');
const name_error=document.getElementById('name_error');

const form=document.getElementById('form');
form.addEventListener('submit',(e)=>
{
    if(fname.value ===''|| fname.value==null)
    {
        e.preventDefault();
        name_error.innerHTML="Name is required";
    }



})
*/



document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const cpassword = document.getElementById('cpassword');
    const nameError = document.getElementById('name_error');

 
    // Function to show error
   /* function showError(input, message) {
        const container = input.parentElement;
        container.style.position = 'relative';
        const error = document.createElement('span');
        error.id = 'error';
        error.style.color = 'red';
        error.style.position = 'absolute';
        error.style.top = '100%';
        error.textContent = message;
        if (!container.querySelector('#error')) {
            container.appendChild(error);
        }
    }
*/
function showError(input, message) {
    // Check if an existing error message is already displayed
    let error = input.nextElementSibling; // Assuming error message is always next to input
    if (error && error.classList.contains('error-message')) {
        // Update the message if error span already exists
        error.textContent = message;
    } else {
        // If no error message exists, create a new span for it
        error = document.createElement('span');
        error.classList.add('error-message'); // Use a class for styling
        error.style.color = 'red';
        error.textContent = message;
        // Insert the error message right after the input element
        input.parentNode.insertBefore(error, input.nextSibling);
    }
}

    // Function to remove the error
    function removeError(input) {
        const container = input.parentElement;
        const error = container.querySelector('#error');
        if (error) {
            container.removeChild(error);
        }
    }

    // Email validation regex
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', function(e) {
        // Prevent form submission
        e.preventDefault();

        let isValid = true;

        // First Name validation
        if (fname.value.trim() === '') {
            showError(fname, 'First name is required');
            isValid = false;
        } else {
            removeError(fname);
        }

        // Last Name validation
        if (lname.value.trim() === '') {
            showError(lname, 'Last name is required');
            isValid = false;
        } else {
            removeError(lname);
        }

        // Email validation
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }

        // Password validation
        if (password.value.trim() === '') {
            showError(password, 'Password is required');
            isValid = false;
        } else {
            removeError(password);
        }

        // Confirm Password validation
        if (cpassword.value.trim() === '') {
            showError(cpassword, 'Confirming your password is required');
            isValid = false;
        } else if (password.value !== cpassword.value) {
            showError(cpassword, 'Passwords do not match');
            isValid = false;
        } else {
            removeError(cpassword);
        }

        // If all inputs are valid, you can proceed with form submission or any other action
        if (isValid) {
            // Form submission or other action here
            // For demonstration, just log 'Form is valid'
            console.log('Form is valid');
            form.submit();  
        }
    });
});
