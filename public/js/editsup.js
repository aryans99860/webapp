// editsup.js
document.addEventListener('DOMContentLoaded', function() {
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordFields = document.getElementById('changePasswordFields');
    const profileForm = document.getElementById('profileForm');

    changePasswordBtn.addEventListener('click', function() {
        changePasswordFields.style.display = changePasswordFields.style.display == 'none' ? "block" : 'none';
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform form submission logic here (e.g., send data to server)
        // After successful submission, redirect to supervisor dashboard and display a message alert('Changes are saved.')
        window.location.href = '../pages/supervisor-dashboard.html'; // Replace supervisor_dashboard.html with the actual URL of the dashboard page
        alert('Changes are saved.');
    });
});
