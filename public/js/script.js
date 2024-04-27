$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault(); // prevent default form submission
        var username = $('#username').val();
        var password = $('#password').val();
        var role = $('#role').val(); // get selected role
        var userData = {
            supervisor: {
                username: 'admin',
                password: 'admin',
                role: 'supervisor'
            },
            operator: {
                username: 'user',
                password: 'user',
                role: 'operator'
            }
        };

        if (userData[role] && userData[role].username === username && userData[role].password === password) {
            if (username === 'admin' && password === 'admin' && role === 'supervisor') {
                window.location.href = '/supervisor-dashboard'; // Redirect to supervisor dashboard
            } else if (username === 'user' && password === 'user' && role === 'operator') {
                window.location.href = '/operator-dashboard'; // Redirect to operator dashboard
            }
        } else {
            alert('Invalid Credentials');
        }
    });
});
