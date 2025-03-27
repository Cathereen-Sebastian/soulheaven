document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email.trim() !== "" && password.trim() !== "") {
            // Redirect to the dashboard page or any other file you want
            window.location.href = "dashboard.html"; // Change to your actual file
        } else {
            alert("Please enter both email and password.");
        }
    });
});
