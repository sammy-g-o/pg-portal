// IT Super Admin Users Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let users = [];
    let filteredUsers = [];
    let selectedRole = '';
    let selectedStatus = '';
    let selectedDepartment = '';
    let searchTerm = '';
    let showUserModal = false;
    let selectedUser = null;
    let isEditing = false;
    let userForm = {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        department: '',
        status: 'Active',
        permissions: [],
        password: '',
        confirmPassword: ''
    };

    // Available options for filters
    const roles = ['HOD', 'Dean', 'Dean PG School', 'Secretary PG School', 'Admissions Officer', 'Bursar & PG Account Officer', 'Standard IT Admin', 'IT Super Admin'];
    const statuses = ['Active', 'Inactive', 'Suspended', 'Pending Activation'];
    const departments = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Business Administration', 'Registry', 'Admissions', 'Bursary', 'IT Department'];
    const permissionCategories = ['User Management', 'Course Management', 'Student Records', 'Financial Management', 'System Administration', 'Reports & Analytics', 'Security Management'];

    function init() {
        loadUsers();
        setupEventListeners();
    }

    function loadUsers() {
        // Mock data for users
        users = [
            {
                id: 1,
                username: 'smith.johnson',
                email: 'smith.johnson@university.edu.ng',
                firstName: 'Smith',
                lastName: 'Johnson',
                role: 'HOD',
                department: 'Computer Science',
                status: 'Active',
                lastLogin: '2024-01-26 14:30:00',
                createdDate: '2023-09-01',
                loginCount: 245,
                permissions: ['Course Management', 'Student Records', 'Reports & Analytics'],
                profilePicture: null,
                phoneNumber: '+234-801-111-2222',
                officeLocation: 'CS Building, Room 201',
                employeeId: 'EMP/CS/001',
                sessionActivity: 'Online',
                lastPasswordChange: '2023-12-15',
                failedLoginAttempts: 0,
                accountLocked: false
            },
            {
                id: 2,
                username: 'mary.wilson',
                email: 'mary.wilson@university.edu.ng',
                firstName: 'Mary',
                lastName: 'Wilson',
                role: 'Dean',
                department: 'Business Administration',
                status: 'Active',
                lastLogin: '2024-01-25 16:45:00',
                createdDate: '2023-08-15',
                loginCount: 189,
                permissions: ['Course Management', 'Student Records', 'Reports & Analytics', 'Financial Management'],
                profilePicture: null,
                phoneNumber: '+234-802-222-3333',
                officeLocation: 'Admin Building, Room 301',
                employeeId: 'EMP/BA/002',
                sessionActivity: 'Offline',
                lastPasswordChange: '2024-01-10',
                failedLoginAttempts: 0,
                accountLocked: false
            },
            {
                id: 3,
                username: 'lisa.anderson',
                email: 'lisa.anderson@university.edu.ng',
                firstName: 'Lisa',
                lastName: 'Anderson',
                role: 'Dean PG School',
                department: 'Mathematics',
                status: 'Active',
                lastLogin: '2024-01-26 09:15:00',
                createdDate: '2023-08-20',
                loginCount: 167,
                permissions: ['Course Management', 'Student Records', 'Reports & Analytics'],
                profilePicture: null,
                phoneNumber: '+234-803-333-4444',
                officeLocation: 'Math Building, Room 101',
                employeeId: 'EMP/MATH/003',
                sessionActivity: 'Online',
                lastPasswordChange: '2024-01-05',
                failedLoginAttempts: 0,
                accountLocked: false
            },
            {
                id: 4,
                username: 'james.taylor',
                email: 'james.taylor@university.edu.ng',
                firstName: 'James',
                lastName: 'Taylor',
                role: 'Standard IT Admin',
                department: 'IT Department',
                status: 'Active',
                lastLogin: '2024-01-26 11:20:00',
                createdDate: '2023-07-10',
                loginCount: 312,
                permissions: ['System Administration', 'Security Management', 'User Management'],
                profilePicture: null,
                phoneNumber: '+234-804-444-5555',
                officeLocation: 'IT Building, Room 401',
                employeeId: 'EMP/IT/004',
                sessionActivity: 'Online',
                lastPasswordChange: '2024-01-20',
                failedLoginAttempts: 0,
                accountLocked: false
            },
            {
                id: 5,
                username: 'sarah.mitchell',
                email: 'sarah.mitchell@university.edu.ng',
                firstName: 'Sarah',
                lastName: 'Mitchell',
                role: 'Admissions Officer',
                department: 'Admissions',
                status: 'Suspended',
                lastLogin: '2024-01-20 13:45:00',
                createdDate: '2023-09-15',
                loginCount: 98,
                permissions: ['Student Records', 'Reports & Analytics'],
                profilePicture: null,
                phoneNumber: '+234-805-555-6666',
                officeLocation: 'Admissions Building, Room 201',
                employeeId: 'EMP/ADM/005',
                sessionActivity: 'Offline',
                lastPasswordChange: '2024-01-15',
                failedLoginAttempts: 3,
                accountLocked: true,
                suspensionReason: 'Multiple failed login attempts'
            }
        ];

        filteredUsers = [...users];
        renderPage();
    }

    function renderPage() {
        const content = document.getElementById('users-page-content');
        content.innerHTML = `
            <!-- Page Header -->
            <div class="page-header">
                <h2>User Management</h2>
                <p>Manage system users, roles, permissions, and access control</p>
            </div>

            <!-- Filters Section -->
            <div class="filters-section">
                <div class="filters-grid">
                    <div class="filter-group">
                        <label>Role:</label>
                        <select id="role-filter">
                            <option value="">All Roles</option>
                            ${roles.map(role => `<option value="${role}">${role}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Status:</label>
                        <select id="status-filter">
                            <option value="">All Statuses</option>
                            ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Department:</label>
                        <select id="department-filter">
                            <option value="">All Departments</option>
                            ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="search-filter" placeholder="Search users...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-success" id="add-user">
                            <i class="fas fa-plus"></i> Add User
                        </button>
                        <button class="btn btn-primary" id="export-users">
                            <i class="fas fa-download"></i> Export Users
                        </button>
                    </div>
                </div>
            </div>

            <!-- Results Summary -->
            <div class="results-summary">
                <p>Showing ${filteredUsers.length} of ${users.length} users</p>
                <div class="summary-stats">
                    <span class="stat-item success">
                        Active: ${users.filter(u => u.status === 'Active').length}
                    </span>
                    <span class="stat-item secondary">
                        Inactive: ${users.filter(u => u.status === 'Inactive').length}
                    </span>
                    <span class="stat-item danger">
                        Suspended: ${users.filter(u => u.status === 'Suspended').length}
                    </span>
                    <span class="stat-item warning">
                        Pending: ${users.filter(u => u.status === 'Pending Activation').length}
                    </span>
                    <span class="stat-item success">
                        Online: ${users.filter(u => u.sessionActivity === 'Online').length}
                    </span>
                </div>
            </div>

            <!-- Users List -->
            <div class="users-list" id="users-list">
                ${renderUsersList()}
            </div>

            <!-- User Modal -->
            <div id="user-modal" class="modal-overlay" style="display: none;">
                <div class="modal-content user-modal">
                    <div class="modal-header">
                        <h3 id="modal-title">Add User</h3>
                        <button id="close-user-modal">&times;</button>
                    </div>
                    <form id="user-form" class="modal-body">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Username:</label>
                                <input type="text" id="username" placeholder="Enter username" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" id="email" placeholder="Enter email address" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>First Name:</label>
                                <input type="text" id="firstName" placeholder="Enter first name" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Last Name:</label>
                                <input type="text" id="lastName" placeholder="Enter last name" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Role:</label>
                                <select id="role" required>
                                    <option value="">Select Role</option>
                                    ${roles.map(role => `<option value="${role}">${role}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Department:</label>
                                <select id="department" required>
                                    <option value="">Select Department</option>
                                    ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Status:</label>
                            <select id="status">
                                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Permissions:</label>
                            <div class="permissions-checklist" id="permissions-checklist">
                                ${permissionCategories.map(permission => `
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="${permission}">
                                        ${permission}
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="form-row" id="password-fields">
                            <div class="form-group">
                                <label>Password:</label>
                                <input type="password" id="password" placeholder="Enter password">
                            </div>
                            
                            <div class="form-group">
                                <label>Confirm Password:</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm password">
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" class="btn btn-secondary" id="cancel-user">Cancel</button>
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-save"></i> <span id="submit-text">Create User</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        setupModalEventListeners();
    }

    function renderUsersList() {
        if (filteredUsers.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-users"></i>
                    <h3>No users found</h3>
                    <p>Try adjusting your filters or add a new user</p>
                </div>
            `;
        }

        return filteredUsers.map(user => `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-header">
                    <div class="user-info">
                        <h4>${user.firstName} ${user.lastName}</h4>
                        <p class="user-meta">
                            <strong>@${user.username}</strong> • ${user.employeeId}
                        </p>
                        <p class="user-details">
                            ${user.role} • ${user.department}
                        </p>
                    </div>
                    <div class="user-badges">
                        <div class="user-status ${getStatusColor(user.status)}">
                            ${user.status}
                        </div>
                        <div class="session-status ${getSessionColor(user.sessionActivity)}">
                            <i class="fas fa-circle"></i> ${user.sessionActivity}
                        </div>
                    </div>
                </div>
                
                <div class="user-body">
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${user.email}</span>
                        </div>
                        ${user.phoneNumber ? `
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>${user.phoneNumber}</span>
                            </div>
                        ` : ''}
                        ${user.officeLocation ? `
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${user.officeLocation}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-label">Login Count:</span>
                            <span class="stat-value">${user.loginCount}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Last Login:</span>
                            <span class="stat-value">${user.lastLogin || 'Never'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Created:</span>
                            <span class="stat-value">${user.createdDate}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Password Changed:</span>
                            <span class="stat-value">${user.lastPasswordChange}</span>
                        </div>
                    </div>
                    
                    <div class="permissions-section">
                        <strong>Permissions:</strong>
                        <div class="permissions-list">
                            ${user.permissions.map(permission => 
                                `<span class="permission-badge">${permission}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    ${user.failedLoginAttempts > 0 ? `
                        <div class="security-alerts">
                            <div class="alert-item warning">
                                <i class="fas fa-exclamation-triangle"></i>
                                Failed Login Attempts: ${user.failedLoginAttempts}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${user.accountLocked ? `
                        <div class="security-alerts">
                            <div class="alert-item danger">
                                <i class="fas fa-lock"></i>
                                Account Locked
                            </div>
                        </div>
                    ` : ''}
                    
                    ${user.suspensionReason ? `
                        <div class="suspension-info">
                            <strong>Suspension Reason:</strong> ${user.suspensionReason}
                        </div>
                    ` : ''}
                </div>
                
                <div class="user-actions">
                    <button class="btn btn-primary edit-user" data-user-id="${user.id}">
                        <i class="fas fa-edit"></i> Edit User
                    </button>
                    <select class="status-select" data-user-id="${user.id}">
                        ${statuses.map(status => 
                            `<option value="${status}" ${status === user.status ? 'selected' : ''}>${status}</option>`
                        ).join('')}
                    </select>
                    <button class="btn btn-info">
                        <i class="fas fa-key"></i> Reset Password
                    </button>
                    <button class="btn btn-warning">
                        <i class="fas fa-unlock"></i> Unlock Account
                    </button>
                    <button class="btn btn-success">
                        <i class="fas fa-history"></i> Activity Log
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-user-shield"></i> Security Settings
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Role filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'role-filter') {
                selectedRole = e.target.value;
                applyFilters();
            }
        });

        // Status filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'status-filter') {
                selectedStatus = e.target.value;
                applyFilters();
            }
        });

        // Department filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'department-filter') {
                selectedDepartment = e.target.value;
                applyFilters();
            }
        });

        // Search filter
        document.addEventListener('input', function(e) {
            if (e.target.id === 'search-filter') {
                searchTerm = e.target.value;
                applyFilters();
            }
        });

        // Clear filters
        document.addEventListener('click', function(e) {
            if (e.target.id === 'clear-filters') {
                clearFilters();
            }
        });

        // Add user button
        document.addEventListener('click', function(e) {
            if (e.target.id === 'add-user') {
                handleAddUser();
            }
        });

        // Edit user buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('edit-user') || e.target.closest('.edit-user')) {
                const button = e.target.classList.contains('edit-user') ? e.target : e.target.closest('.edit-user');
                const userId = parseInt(button.dataset.userId);
                handleEditUser(userId);
            }
        });

        // Status update
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('status-select')) {
                const userId = parseInt(e.target.dataset.userId);
                const newStatus = e.target.value;
                handleStatusUpdate(userId, newStatus);
            }
        });

        // User form submission
        document.addEventListener('submit', function(e) {
            if (e.target.id === 'user-form') {
                e.preventDefault();
                handleSubmitUser();
            }
        });
    }

    function setupModalEventListeners() {
        const modal = document.getElementById('user-modal');
        const closeBtn = document.getElementById('close-user-modal');
        const cancelBtn = document.getElementById('cancel-user');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function applyFilters() {
        filteredUsers = users.filter(user => {
            const matchesRole = !selectedRole || user.role === selectedRole;
            const matchesStatus = !selectedStatus || user.status === selectedStatus;
            const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
            const matchesSearch = !searchTerm || 
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesRole && matchesStatus && matchesDepartment && matchesSearch;
        });

        renderPage();
    }

    function clearFilters() {
        selectedRole = '';
        selectedStatus = '';
        selectedDepartment = '';
        searchTerm = '';
        document.getElementById('role-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('search-filter').value = '';
        applyFilters();
    }

    function handleAddUser() {
        isEditing = false;
        selectedUser = null;
        userForm = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            role: '',
            department: '',
            status: 'Active',
            permissions: [],
            password: '',
            confirmPassword: ''
        };
        
        document.getElementById('modal-title').textContent = 'Add User';
        document.getElementById('submit-text').textContent = 'Create User';
        document.getElementById('password-fields').style.display = 'flex';
        document.getElementById('password').required = true;
        document.getElementById('confirmPassword').required = true;
        
        document.getElementById('user-modal').style.display = 'flex';
        populateUserForm();
    }

    function handleEditUser(userId) {
        isEditing = true;
        selectedUser = users.find(u => u.id === userId);
        if (selectedUser) {
            userForm = {
                username: selectedUser.username,
                email: selectedUser.email,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                role: selectedUser.role,
                department: selectedUser.department,
                status: selectedUser.status,
                permissions: [...selectedUser.permissions],
                password: '',
                confirmPassword: ''
            };
            
            document.getElementById('modal-title').textContent = 'Edit User';
            document.getElementById('submit-text').textContent = 'Update User';
            document.getElementById('password-fields').style.display = 'none';
            document.getElementById('password').required = false;
            document.getElementById('confirmPassword').required = false;
            
            document.getElementById('user-modal').style.display = 'flex';
            populateUserForm();
        }
    }

    function populateUserForm() {
        document.getElementById('username').value = userForm.username;
        document.getElementById('email').value = userForm.email;
        document.getElementById('firstName').value = userForm.firstName;
        document.getElementById('lastName').value = userForm.lastName;
        document.getElementById('role').value = userForm.role;
        document.getElementById('department').value = userForm.department;
        document.getElementById('status').value = userForm.status;
        document.getElementById('password').value = userForm.password;
        document.getElementById('confirmPassword').value = userForm.confirmPassword;
        
        // Reset checkboxes
        const checkboxes = document.querySelectorAll('#permissions-checklist input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = userForm.permissions.includes(checkbox.value);
        });
    }

    function handleSubmitUser() {
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            role: document.getElementById('role').value,
            department: document.getElementById('department').value,
            status: document.getElementById('status').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };

        // Get selected permissions
        const checkboxes = document.querySelectorAll('#permissions-checklist input[type="checkbox"]:checked');
        formData.permissions = Array.from(checkboxes).map(cb => cb.value);

        // Validation
        if (!isEditing && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (isEditing) {
            // Update existing user
            const userIndex = users.findIndex(u => u.id === selectedUser.id);
            if (userIndex !== -1) {
                users[userIndex] = {
                    ...users[userIndex],
                    ...formData,
                    permissions: formData.permissions
                };
            }
        } else {
            // Create new user
            const newUser = {
                id: users.length + 1,
                ...formData,
                permissions: formData.permissions,
                lastLogin: null,
                createdDate: new Date().toISOString().split('T')[0],
                loginCount: 0,
                profilePicture: null,
                phoneNumber: '',
                officeLocation: '',
                employeeId: `EMP/${formData.department.substring(0, 3).toUpperCase()}/${String(users.length + 1).padStart(3, '0')}`,
                sessionActivity: 'Offline',
                lastPasswordChange: new Date().toISOString().split('T')[0],
                failedLoginAttempts: 0,
                accountLocked: false
            };
            users.unshift(newUser);
        }

        filteredUsers = [...users];
        document.getElementById('user-modal').style.display = 'none';
        renderPage();
        
        alert(isEditing ? 'User updated successfully!' : 'User created successfully!');
    }

    function handleStatusUpdate(userId, newStatus) {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex].status = newStatus;
            filteredUsers = [...users];
            renderPage();
        }
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Active': return 'success';
            case 'Inactive': return 'secondary';
            case 'Suspended': return 'danger';
            case 'Pending Activation': return 'warning';
            default: return 'secondary';
        }
    }

    function getSessionColor(activity) {
        switch (activity) {
            case 'Online': return 'success';
            case 'Offline': return 'secondary';
            case 'Away': return 'warning';
            default: return 'secondary';
        }
    }

    // Initialize the page
    init();
});
