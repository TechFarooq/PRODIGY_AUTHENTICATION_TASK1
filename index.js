let isLoginForm = false;
function toggleForm() {
    const formTitle = document.getElementById("formTitle");
    const confirmPassword = document.getElementById("confirmPassword");
    const toggleLink = document.getElementById("toggleLink");
    
    if (isLoginForm) {
        formTitle.innerText = "Register";
        confirmPassword.style.display = "block";
        toggleLink.innerText = "Already have an account? Log in here";
    } else {
        formTitle.innerText = "Log In";
        confirmPassword.style.display = "none";
        toggleLink.innerText = "Don’t have an account? Register here";
    }
    isLoginForm = !isLoginForm;
}

async function handleFormSubmit() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!isLoginForm) {
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        localStorage.setItem(username, JSON.stringify({ password: hashedPassword, role: "user" }));
        alert("Registration successful!");
        toggleForm();
    } else {
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (!storedUser) {
            alert("User does not exist. Please register first.");
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, storedUser.password);
        if (isPasswordMatch) {
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("userRole", storedUser.role);
            alert("Login successful!");
            window.location.href = "protected.html"; 
        } else {
            alert("Incorrect password.");
        }
    }
}
