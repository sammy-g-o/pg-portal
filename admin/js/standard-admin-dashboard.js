document.addEventListener('DOMContentLoaded', () => {
    const standardAdminDashboardContent = document.getElementById('standard-admin-dashboard-content');
    const adminMainContent = document.getElementById('admin-main-content');
    const adminToggleSidebarBtn = document.getElementById('admin-toggle-sidebar');
    const adminUserEmailSpan = document.getElementById('admin-user-email');

    // Simulate fetching user data (from localStorage, similar to admin-common.js)
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

    let dashboardData = {
        assignedUsers: 0,
        supportTickets: 0,
        reportsGenerated: 0,
        tasksCompleted: 0,
        recentActivity: [],
        supportRequests: [],
        userManagement: [],
        systemStatus: {}
    };

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            assignedUsers: 456,
            supportTickets: 12,
            reportsGenerated: 8,
            tasksCompleted: 23,
            systemStatus: {
                userSystemAccess: 'available',
                reportingSystem: 'available',
                supportSystem: 'available',
                maintenanceMode: false
            },
            recentActivity: [
                { id: 1, action: 'User Password Reset', user: 'john.doe@cuab.edu.ng', type: 'support', time: '30 minutes ago' },
                { id: 2, action: 'Generated Monthly Report', user: 'system', type: 'report', time: '1 hour ago' },
                { id: 3, action: 'User Account Activated', user: 'jane.smith@cuab.edu.ng', type: 'user_mgmt', time: '2 hours ago' },
                { id: 4, action: 'Support Ticket Resolved', user: 'mike.johnson@cuab.edu.ng', type: 'support', time: '3 hours ago' }
            ],
            supportRequests: [
                { id: 1, user: 'Alice Johnson', issue: 'Cannot access course materials', priority: 'medium', status: 'open', time: '1 hour ago' },
                { id: 2, user: 'Bob Smith', issue: 'Login issues with student portal', priority: 'high', status: 'in_progress', time: '2 hours ago' },
                { id: 3, user: 'Carol Davis', issue: 'Grade submission problems', priority: 'low', status: 'open', time: '4 hours ago' },
                { id: 4, user: 'David Wilson', issue: 'Email not receiving notifications', priority: 'medium', status: 'resolved', time: '6 hours ago' }
            ],
            userManagement: [
                { id: 1, user: 'Emily Rodriguez', action: 'Account Creation', department: 'Computer Science', status: 'pending', time: '30 minutes ago' },
                { id: 2, user: 'James Wilson', action: 'Permission Update', department: 'Mathematics', status: 'completed', time: '1 hour ago' },
                { id: 3, user: 'Sarah Brown', action: 'Account Deactivation', department: 'Physics', status: 'pending', time: '2 hours ago' }
            ]
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="standard-admin-stat-card ${color}">
            <div class="stat-icon">
                <i class="${icon}"></i>
            </div>
            <div class="stat-content">
                <h3>${value}</h3>
                <p>${title}</p>
                ${subtitle ? `<span class="stat-subtitle">${subtitle}</span>` : ''}
            </div>
        </div>
    `;

    // Function to render ActivityItem
    const renderActivityItem = (activity) => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="${getActivityIcon(activity.action)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.action}</h4>
                <p>${activity.user}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `;

    // Function to render SupportRequest
    const renderSupportRequest = (request) => `
        <div class="support-request">
            <div class="request-content">
                <h4>${request.user}</h4>
                <p>${request.issue}</p>
                <span class="request-time">${request.time}</span>
            </div>
            <div class="request-meta">
                <span class="priority-badge ${request.priority}">${request.priority}</span>
                <span class="status-badge ${request.status}">${request.status.replace('_', ' ')}</span>
            </div>
            <div class="request-actions">
                <button class="btn-primary">View</button>
                ${request.status === 'open' ? `<button class="btn-success">Assign</button>` : ''}
            </div>
        </div>
    `;

    // Function to render UserManagementItem
    const renderUserManagementItem = (item) => `
        <div class="user-mgmt-item">
            <div class="user-info">
                <h4>${item.user}</h4>
                <p>${item.action} - ${item.department}</p>
                <span class="mgmt-time">${item.time}</span>
            </div>
            <div class="mgmt-status">
                <span class="mgmt-status-badge ${item.status}">${item.status}</span>
            </div>
            <div class="mgmt-actions">
                <button class="btn-info">Review</button>
                ${item.status === 'pending' ? `<button class="btn-success">Approve</button>` : ''}
            </div>
        </div>
    `;

    const getActivityIcon = (action) => {
        if (action.includes('Password')) return 'fas fa-key';
        if (action.includes('Report')) return 'fas fa-chart-bar';
        if (action.includes('Account')) return 'fas fa-user';
        if (action.includes('Support')) return 'fas fa-headset';
        return 'fas fa-info-circle';
    };

    const renderDashboard = () => {
        standardAdminDashboardContent.innerHTML = `
            <div class="standard-admin-welcome">
                <h2>Welcome back, Standard IT Administrator</h2>
                <p>User Support and Basic IT System Management</p>
            </div>

            <div class="standard-admin-stats-grid">
                ${renderStatCard("Assigned Users", dashboardData.assignedUsers, "fas fa-users", "Under your management", "primary")}
                ${renderStatCard("Support Tickets", dashboardData.supportTickets, "fas fa-headset", "Pending resolution", "warning")}
                ${renderStatCard("Reports Generated", dashboardData.reportsGenerated, "fas fa-chart-bar", "This month", "info")}
                ${renderStatCard("Tasks Completed", dashboardData.tasksCompleted, "fas fa-check-circle", "This week", "success")}
            </div>

            <div class="standard-admin-overview-grid">
                <div class="standard-admin-card">
                    <div class="card-header">
                        <h3>System Status</h3>
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <div class="system-status">
                        <div class="status-item">
                            <span class="status-label">User System</span>
                            <span class="status-indicator ${dashboardData.systemStatus.userSystemAccess}">
                                ${dashboardData.systemStatus.userSystemAccess}
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Reporting System</span>
                            <span class="status-indicator ${dashboardData.systemStatus.reportingSystem}">
                                ${dashboardData.systemStatus.reportingSystem}
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Support System</span>
                            <span class="status-indicator ${dashboardData.systemStatus.supportSystem}">
                                ${dashboardData.systemStatus.supportSystem}
                            </span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">Maintenance Mode</span>
                            <span class="status-indicator ${dashboardData.systemStatus.maintenanceMode ? 'active' : 'inactive'}">
                                ${dashboardData.systemStatus.maintenanceMode ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="standard-admin-card">
                    <div class="card-header">
                        <h3>Quick Actions</h3>
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="quick-actions">
                        <button class="action-btn primary">
                            <i class="fas fa-user-plus"></i>
                            Create User Account
                        </button>
                        <button class="action-btn success">
                            <i class="fas fa-key"></i>
                            Reset Password
                        </button>
                        <button class="action-btn info">
                            <i class="fas fa-chart-bar"></i>
                            Generate Report
                        </button>
                        <button class="action-btn warning">
                            <i class="fas fa-headset"></i>
                            Create Support Ticket
                        </button>
                        <button class="action-btn secondary">
                            <i class="fas fa-envelope"></i>
                            Send Notification
                        </button>
                        <button class="action-btn danger">
                            <i class="fas fa-user-slash"></i>
                            Suspend Account
                        </button>
                    </div>
                </div>
            </div>

            <div class="standard-admin-content-grid">
                <div class="standard-admin-card">
                    <div class="card-header">
                        <h3>Support Requests</h3>
                        <a href="#all-support" class="view-all">View All</a>
                    </div>
                    <div class="support-requests-list">
                        ${dashboardData.supportRequests.map(renderSupportRequest).join('')}
                    </div>
                </div>

                <div class="standard-admin-card">
                    <div class="card-header">
                        <h3>User Management Tasks</h3>
                        <a href="#all-user-mgmt" class="view-all">View All</a>
                    </div>
                    <div class="user-management-list">
                        ${dashboardData.userManagement.map(renderUserManagementItem).join('')}
                    </div>
                </div>
            </div>

            <div class="standard-admin-card">
                <div class="card-header">
                    <h3>Recent Activity</h3>
                    <a href="#all-activity" class="view-all">View All</a>
                </div>
                <div class="activity-list">
                    ${dashboardData.recentActivity.map(renderActivityItem).join('')}
                </div>
            </div>
        `;
    };

    fetchDashboardData(); // Initial data fetch and render
});
