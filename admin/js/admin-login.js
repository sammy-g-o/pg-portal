document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.querySelector('.admin-login-form');
    const errorMessageDiv = document.querySelector('.error-message');
    const loginButton = document.querySelector('.admin-login-btn');

    const adminRoles = [
        { value: 'hod', label: 'Head of Department' },
        { value: 'dean', label: 'Dean' },
        { value: 'dean_pg_school', label: 'Dean of PG School' },
        { value: 'registrar', label: 'Secretary PG School' },
        { value: 'admissions', label: 'Admissions Officer' },
        { value: 'finance', label: 'Bursar & PG Account Officer' },
        { value: 'it_super_admin', label: 'IT Super Admin' },
        { value: 'standard_admin', label: 'Standard IT Admin' }
    ];

    // Populate the role select dropdown
    const roleSelect = document.getElementById('role');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (roleSelect) {
        adminRoles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.value;
            option.textContent = role.label;
            roleSelect.appendChild(option);
        });
    }


    const displayError = (message) => {
        if (errorMessageDiv) {
            errorMessageDiv.textContent = message;
            errorMessageDiv.style.display = 'block';
        }
    };

    const clearError = () => {
        if (errorMessageDiv) {
            errorMessageDiv.textContent = '';
            errorMessageDiv.style.display = 'none';
        }
    };

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearError();
            loginButton.disabled = true;
            loginButton.textContent = 'Signing In...';

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            // Basic validation
            if (!email || !password || !role) {
                displayError('Please fill in all fields');
                loginButton.disabled = false;
                loginButton.textContent = 'Sign In';
                return;
            }

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Store admin info in localStorage (replace with proper auth later)
                localStorage.setItem('adminUser', JSON.stringify({
                    email: email,
                    role: role,
                    isAuthenticated: true
                }));

                // Redirect based on role
                let redirectPath = '';
                switch (role) {
                    case 'hod':
                        redirectPath = '/admin/hod-dashboard.html';
                        break;
                    case 'dean':
                        redirectPath = '/admin/dean-dashboard.html';
                        break;
                    case 'dean_pg_school':
                        redirectPath = '/admin/dean-pg-school-dashboard.html';
                        break;
                    case 'registrar':
                        redirectPath = '/admin/registrar-dashboard.html';
                        break;
                    case 'admissions':
                        redirectPath = '/admin/admissions-dashboard.html';
                        break;
                    case 'finance':
                        redirectPath = '/admin/finance-dashboard.html';
                        break;
                    case 'it_super_admin':
                        redirectPath = '/admin/it-super-admin-dashboard.html';
                        break;
                    case 'standard_admin':
                        redirectPath = '/admin/standard-admin-dashboard.html';
                        break;
                    default:
                        redirectPath = '/admin/admin-login.html'; // Fallback or error page
                }
                window.location.href = redirectPath;

            } catch (err) {
                displayError('Login failed. Please check your credentials.');
            } finally {
                loginButton.disabled = false;
                loginButton.textContent = 'Sign In';
            }
        });
    }
});
