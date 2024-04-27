document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Gather input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const roleSelect = document.getElementById("role");
        const role = roleSelect.options[roleSelect.selectedIndex].value;

        // Determine if the role is supervisor
        const isSupervisor = role === "supervisor";

        // Prepare request body
        const requestBody = {
            username: username,
            password: password,
            isSupervisor: isSupervisor
        };

        // Send POST request to localhost:3000/user/login
        fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json()) // Parse response body as JSON
        .then(data => {
            // Handle the data received from the server
            console.log(data); // Log the response data to the console
            if (data.message != "Unauthorised") {
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                
                // Redirect users based on their roles
                if (data.isSupervisor) {
                    window.location.href = "/supervisor-dashboard";
                } else {
                    window.location.href = "/operator-dashboard";
                }
            } else {
                // Handle error or unauthorized access
                alert("Invalid username or password");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle error
            alert("Error occurred during login");
        });
    });
});


// Authentication -> user ka credentials sahi hai , valid username and password 
// Authorisation -> What permissions does the authenticated user have ?