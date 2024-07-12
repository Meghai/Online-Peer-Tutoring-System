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
