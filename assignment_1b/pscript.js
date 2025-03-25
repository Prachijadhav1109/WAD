document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const userTableBody = document.getElementById("userTableBody");

    // Handle user registration
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const userData = { firstName, lastName, email, password };

            // Simulate AJAX POST Request
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => {
                console.log("User Registered:", data);

                // Store in Local Storage
                let users = JSON.parse(localStorage.getItem("users")) || [];
                users.push(userData);
                localStorage.setItem("users", JSON.stringify(users));

                alert("User registered successfully!");
                form.reset();
            })
            .catch(error => console.error("Error:", error));
        });
    }

    // Handle displaying registered users
    if (userTableBody) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
            `;
            userTableBody.appendChild(row);
        });
    }
});
