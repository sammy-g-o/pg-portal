document.addEventListener('DOMContentLoaded', () => {
    const userManagementContent = document.getElementById('user-management-content');
    const adminMainContent = document.getElementById('admin-main-content');
    const adminToggleSidebarBtn = document.getElementById('admin-toggle-sidebar');
    const adminUserEmailSpan = document.getElementById('admin-user-email');

    // Set user email
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (user) {
        adminUserEmailSpan.textContent = user.email || 'Admin User';
    }

    // Sidebar toggle logic
    adminToggleSidebarBtn.addEventListener('click', () => {
        const adminSidebar = document.getElementById('admin-sidebar');
        adminSidebar.classList.toggle('collapsed');
        adminMainContent.classList.toggle('expanded');
    });

    // Render the user management page
    renderUserManagement();
});

function renderUserManagement() {
    const userManagementContent = document.getElementById('user-management-content');
    
    userManagementContent.innerHTML = `
        <div class="standard-admin-welcome">
            <h2>User Management</h2>
            <p>Manage assigned users, reset passwords, unlock accounts, and update permissions</p>
        </div>

        <div class="standard-admin-stats-grid">
            <div class="standard-admin-stat-card primary">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <h3>456</h3>
                    <p>Total Users</p>
                    <span class="stat-subtitle">Under management</span>
                </div>
            </div>
            
            <div class="standard-admin-stat-card success">
                <div class="stat-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="stat-content">
                    <h3>423</h3>
                    <p>Active Users</p>
                    <span class="stat-subtitle">Currently active</span>
                </div>
            </div>
            
            <div class="standard-admin-stat-card danger">
                <div class="stat-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <div class="stat-content">
                    <h3>12</h3>
                    <p>Locked Users</p>
                    <span class="stat-subtitle">Require attention</span>
                </div>
            </div>
            
            <div class="standard-admin-stat-card info">
                <div class="stat-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="stat-content">
                    <h3>45</h3>
                    <p>New This Month</p>
                    <span class="stat-subtitle">Recently added</span>
                </div>
            </div>
        </div>

        <div class="standard-admin-overview-grid">
            <div class="standard-admin-card">
                <div class="card-header">
                    <h3>Quick Actions</h3>
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="quick-actions">
                    <button class="action-btn primary" onclick="bulkPasswordReset()">
                        <i class="fas fa-key"></i>
                        Bulk Password Reset
                    </button>
                    <button class="action-btn success" onclick="bulkAccountUnlock()">
                        <i class="fas fa-unlock"></i>
                        Bulk Account Unlock
                    </button>
                    <button class="action-btn info" onclick="generateUserReport()">
                        <i class="fas fa-chart-bar"></i>
                        Generate Report
                    </button>
                    <button class="action-btn warning" onclick="sendUserNotification()">
                        <i class="fas fa-bell"></i>
                        Send Notification
                    </button>
                </div>
            </div>

            <div class="standard-admin-card">
                <div class="card-header">
                    <h3>Recent Activities</h3>
                    <a href="#all-activities" class="view-all">View All</a>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon password">
                            <i class="fas fa-key"></i>
                        </div>
                        <div class="activity-content">
                            <h4>Password Reset</h4>
                            <p>john.doe@cuab.edu.ng</p>
                            <span class="activity-time">30 minutes ago</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon unlock">
                            <i class="fas fa-unlock"></i>
                        </div>
                        <div class="activity-content">
                            <h4>Account Unlocked</h4>
                            <p>mike.johnson@cuab.edu.ng</p>
                            <span class="activity-time">1 hour ago</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon create">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="activity-content">
                            <h4>User Created</h4>
                            <p>new.user@cuab.edu.ng</p>
                            <span class="activity-time">2 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="standard-admin-card">
            <div class="card-header">
                <h3>Assigned Users</h3>
                <div class="header-actions">
                    <input type="text" id="user-search" placeholder="Search users..." class="search-input">
                    <select id="status-filter" class="filter-select">
                        <option value="">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Locked">Locked</option>
                    </select>
                    <button class="btn btn-primary" onclick="refreshUsers()">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                </div>
            </div>
            <div class="users-grid">
                <div class="user-management-card">
                    <div class="user-header">
                        <div class="user-info">
                            <h4>John Doe</h4>
                            <p class="user-meta">
                                <strong>@john.doe</strong> • Student
                            </p>
                            <p class="user-details">
                                Computer Science • john.doe@cuab.edu.ng
                            </p>
                        </div>
                        <div class="user-badges">
                            <div class="user-status success">Active</div>
                        </div>
                    </div>
                    
                    <div class="user-body">
                        <div class="user-stats">
                            <div class="stat-item">
                                <span class="stat-label">Login Count:</span>
                                <span class="stat-value">245</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Last Login:</span>
                                <span class="stat-value">2024-01-26 14:30:00</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Failed Attempts:</span>
                                <span class="stat-value">0</span>
                            </div>
                        </div>
                        
                        <div class="permissions-section">
                            <strong>Permissions:</strong>
                            <div class="permissions-list">
                                <span class="permission-badge">Course Access</span>
                                <span class="permission-badge">Library Access</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-actions">
                        <button class="btn btn-primary" onclick="viewUserDetails(1)">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-info" onclick="resetPassword(1)">
                            <i class="fas fa-key"></i> Reset Password
                        </button>
                        <button class="btn btn-warning" onclick="updatePermissions(1)">
                            <i class="fas fa-user-shield"></i> Update Permissions
                        </button>
                        <select class="status-select" onchange="updateUserStatus(1, this.value)">
                            <option value="Active" selected>Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Locked">Locked</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Global functions for user actions
window.bulkPasswordReset = () => {
    console.log('Initiating bulk password reset');
    alert('Bulk password reset functionality would be implemented here');
};

window.bulkAccountUnlock = () => {
    console.log('Initiating bulk account unlock');
    alert('Bulk account unlock functionality would be implemented here');
};

window.generateUserReport = () => {
    console.log('Generating user report');
    alert('User report generation would be implemented here');
};

window.sendUserNotification = () => {
    console.log('Sending user notification');
    alert('User notification functionality would be implemented here');
};

window.viewUserDetails = (userId) => {
    console.log(`Viewing details for user ${userId}`);
    alert(`Viewing details for user ${userId}`);
};

window.resetPassword = (userId) => {
    console.log(`Resetting password for user ${userId}`);
    alert(`Password reset for user ${userId} would be implemented here`);
};

window.updatePermissions = (userId) => {
    console.log(`Updating permissions for user ${userId}`);
    alert(`Permission update for user ${userId} would be implemented here`);
};

window.updateUserStatus = (userId, newStatus) => {
    console.log(`Updating status for user ${userId} to ${newStatus}`);
    alert(`Status updated for user ${userId} to ${newStatus}`);
};

window.refreshUsers = () => {
    console.log('Refreshing user data');
    renderUserManagement();
};
