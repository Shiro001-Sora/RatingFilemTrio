// auth.js - Authentication functions

// Admin credentials (in a real app, this would be stored securely on the server)
const adminCredentials = {
    username: "admin",
    password: "1"
};

// Check if admin is logged in
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Set admin login status
function setAdminLoginStatus(status) {
    localStorage.setItem('adminLoggedIn', status.toString());
}

// Verify admin credentials
function verifyAdminCredentials(username, password) {
    return username === adminCredentials.username && password === adminCredentials.password;
}

// Redirect if not logged in for admin pages
function requireAuth() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// Redirect if already logged in (for login page)
function redirectIfLoggedIn() {
    if (isAdminLoggedIn()) {
        window.location.href = 'admin-dashboard.html';
        return true;
    }
    return false;
}

// Login function to handle form submission
function handleLogin(event) {
    // Prevent form submission if called from a form
    if (event) event.preventDefault();
    
    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Verify credentials
    if (verifyAdminCredentials(username, password)) {
        // Set login status
        setAdminLoginStatus(true);
        
        // Redirect to admin dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        // Show error message
        alert('Invalid username or password. Please try again.');
        
        // Clear password field
        document.getElementById('password').value = '';
    }
}

// Logout function
function handleLogout() {
    // Clear login status
    localStorage.removeItem('adminLoggedIn');
    
    // Redirect to login page
    window.location.href = 'admin-login.html';
}

// Initialize authentication on page load
function initAuth() {
    // Check if we're on the login page
    if (window.location.pathname.includes('admin-login.html')) {
        // Redirect if already logged in
        redirectIfLoggedIn();
        
        // Add event listener to login form
        const loginForm = document.getElementById('login-form');
        const loginButton = document.getElementById('login-button');
        
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        if (loginButton) {
            loginButton.addEventListener('click', handleLogin);
        }
    } 
    // Check if we're on an admin page
    else if (window.location.pathname.includes('admin-')) {
        // Require authentication
        requireAuth();
        
        // Add event listener to logout button if it exists
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    }
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}
// Export functions for use in other modules (if using ES6 modules)
// export { isAdminLoggedIn, setAdminLoginStatus, verifyAdminCredentials, requireAuth, redirectIfLoggedIn, login, logout };