// profile.js

// Handle the profile form submission
document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const profileUsername = document.getElementById('profileUsername').value;
    const profileEmail = document.getElementById('profileEmail').value;
    const profilePassword = document.getElementById('profilePassword').value;

    if (profileUsername && profileEmail && profilePassword) {
        fetch('http://localhost:3000/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: profileUsername,
                email: profileEmail,
                password: profilePassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill out all fields.');
    }
});
// diseaseDetection.js

// Handle the disease detection form submission
document.getElementById('diseaseDetectionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    const uploadImage = document.getElementById('uploadImage').files[0];
    const cameraInput = document.getElementById('cameraInput').files[0];

    if (uploadImage) {
        formData.append('image', uploadImage);
    }
    if (cameraInput) {
        formData.append('image', cameraInput);
    }

    fetch('http://localhost:3000/disease-detection', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
