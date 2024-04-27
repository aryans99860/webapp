document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const email = document.getElementById("email").value;
        const role = document.getElementById("role").value;
        const isSupervisor = role === "Supervisor";

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Create user object
        const user = {
            name: name,
            username: username,
            password: password,
            email: email,
            isSupervisor: isSupervisor
        };

        // Make POST request to server
        fetch("http://localhost:3000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("User signed up successfully");
            // Redirect to login page or do something else
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred, please try again later");
        });
    });
});
