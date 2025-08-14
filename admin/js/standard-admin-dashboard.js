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
        systemStatus: {},
        // New security data
        securityAlerts: [],
        failedLogins: [],
        suspiciousActivity: [],
        accountLockouts: [],
        // New system monitoring data
        systemMetrics: {},
        serviceStatus: {},
        // New bulk operations data
        bulkOperations: []
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
            // Enhanced system metrics
            systemMetrics: {
                cpuUsage: 45,
                memoryUsage: 62,
                diskUsage: 78,
                networkBandwidth: 23,
                databaseConnections: 156,
                activeSessions: 89,
                serverUptime: '99.8%',
                responseTime: '120ms'
            },
            // Service status
            serviceStatus: {
                emailServer: { status: 'operational', uptime: '99.9%' },
                fileServer: { status: 'operational', uptime: '99.7%' },
                backupSystem: { status: 'operational', uptime: '99.5%' },
                securityServices: { status: 'operational', uptime: '99.8%' },
                databaseServer: { status: 'operational', uptime: '99.6%' },
                webServer: { status: 'operational', uptime: '99.4%' }
            },
            // Security alerts
            securityAlerts: [
                { id: 1, type: 'failed_login', user: 'john.doe@cuab.edu.ng', severity: 'medium', time: '5 minutes ago', status: 'investigating' },
                { id: 2, type: 'suspicious_activity', user: 'unknown', severity: 'high', time: '15 minutes ago', status: 'blocked' },
                { id: 3, type: 'account_lockout', user: 'jane.smith@cuab.edu.ng', severity: 'low', time: '1 hour ago', status: 'resolved' },
                { id: 4, type: 'multiple_failed_attempts', user: 'mike.johnson@cuab.edu.ng', severity: 'medium', time: '2 hours ago', status: 'monitoring' }
            ],
            failedLogins: [
                { user: 'john.doe@cuab.edu.ng', attempts: 5, lastAttempt: '5 minutes ago', ipAddress: '192.168.1.100' },
                { user: 'mike.johnson@cuab.edu.ng', attempts: 3, lastAttempt: '2 hours ago', ipAddress: '192.168.1.101' },
                { user: 'unknown', attempts: 10, lastAttempt: '15 minutes ago', ipAddress: '203.45.67.89' }
            ],
            suspiciousActivity: [
                { type: 'unusual_login_time', user: 'admin@cuab.edu.ng', details: 'Login at 3:45 AM', time: '1 hour ago' },
                { type: 'multiple_sessions', user: 'jane.smith@cuab.edu.ng', details: '5 active sessions', time: '30 minutes ago' },
                { type: 'data_access_pattern', user: 'unknown', details: 'Bulk data download', time: '15 minutes ago' }
            ],
            accountLockouts: [
                { user: 'john.doe@cuab.edu.ng', reason: 'Multiple failed attempts', lockoutTime: '5 minutes ago', duration: '30 minutes' },
                { user: 'mike.johnson@cuab.edu.ng', reason: 'Suspicious activity', lockoutTime: '2 hours ago', duration: '1 hour' }
            ],
            recentActivity: [
                { id: 1, action: 'User Password Reset', user: 'john.doe@cuab.edu.ng', type: 'support', time: '30 minutes ago' },
                { id: 2, action: 'Generated Monthly Report', user: 'system', type: 'report', time: '1 hour ago' },
                { id: 3, action: 'User Account Activated', user: 'jane.smith@cuab.edu.ng', type: 'user_mgmt', time: '2 hours ago' },
                { id: 4, action: 'Support Ticket Resolved', user: 'mike.johnson@cuab.edu.ng', type: 'support', time: '3 hours ago' }
            ],
            supportRequests: [
                { id: 1, user: 'Alice Johnson', issue: 'Cannot access course materials', priority: 'medium', status: 'open', time: '1 hour ago', category: 'access_issue', assignedTo: 'unassigned' },
                { id: 2, user: 'Bob Smith', issue: 'Login issues with student portal', priority: 'high', status: 'in_progress', time: '2 hours ago', category: 'login_issue', assignedTo: 'IT Support' },
                { id: 3, user: 'Carol Davis', issue: 'Grade submission problems', priority: 'low', status: 'open', time: '4 hours ago', category: 'system_issue', assignedTo: 'unassigned' },
                { id: 4, user: 'David Wilson', issue: 'Email not receiving notifications', priority: 'medium', status: 'resolved', time: '6 hours ago', category: 'email_issue', assignedTo: 'IT Support' }
            ],
            userManagement: [
                { id: 1, user: 'Emily Rodriguez', action: 'Account Creation', department: 'Computer Science', status: 'pending', time: '30 minutes ago' },
                { id: 2, user: 'James Wilson', action: 'Permission Update', department: 'Mathematics', status: 'completed', time: '1 hour ago' },
                { id: 3, user: 'Sarah Brown', action: 'Account Deactivation', department: 'Physics', status: 'pending', time: '2 hours ago' }
            ],
            // Bulk operations
            bulkOperations: [
                { id: 1, type: 'bulk_user_creation', status: 'completed', usersAffected: 25, time: '2 hours ago' },
                { id: 2, type: 'bulk_password_reset', status: 'in_progress', usersAffected: 15, time: '1 hour ago' },
                { id: 3, type: 'bulk_permission_update', status: 'pending', usersAffected: 50, time: '30 minutes ago' }
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
                <div class="request-details">
                    <span class="category-badge ${request.category}">${request.category.replace('_', ' ')}</span>
                    <span class="assigned-badge">${request.assignedTo}</span>
                </div>
            </div>
            <div class="request-meta">
                <span class="priority-badge ${request.priority}">${request.priority}</span>
                <span class="status-badge ${request.status}">${request.status.replace('_', ' ')}</span>
            </div>
            <div class="request-actions">
                <button class="btn-primary">View</button>
                ${request.status === 'open' ? `<button class="btn-success">Assign</button>` : ''}
                <button class="btn-info">Escalate</button>
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
                <button class="btn-warning">Reject</button>
            </div>
        </div>
    `;

    // Function to render Security Alert
    const renderSecurityAlert = (alert) => `
        <div class="security-alert ${alert.severity}">
            <div class="alert-icon">
                <i class="${getSecurityIcon(alert.type)}"></i>
            </div>
            <div class="alert-content">
                <h4>${getSecurityTitle(alert.type)}</h4>
                <p>${alert.user}</p>
                <span class="alert-time">${alert.time}</span>
            </div>
            <div class="alert-meta">
                <span class="severity-badge ${alert.severity}">${alert.severity}</span>
                <span class="status-badge ${alert.status}">${alert.status}</span>
            </div>
            <div class="alert-actions">
                <button class="btn-primary">Investigate</button>
                <button class="btn-warning">Block</button>
                <button class="btn-success">Resolve</button>
            </div>
        </div>
    `;

    // Function to render System Metric
    const renderSystemMetric = (metric, value, unit = '') => `
        <div class="system-metric">
            <div class="metric-header">
                <span class="metric-label">${metric}</span>
                <span class="metric-value">${value}${unit}</span>
            </div>
            <div class="metric-bar">
                <div class="metric-fill" style="width: ${getMetricPercentage(value, metric)}%"></div>
            </div>
        </div>
    `;

    // Function to render Service Status
    const renderServiceStatus = (service, data) => `
        <div class="service-status-item">
            <div class="service-info">
                <h4>${service}</h4>
                <p>Uptime: ${data.uptime}</p>
            </div>
            <div class="service-indicator ${data.status}">
                <i class="fas fa-circle"></i>
                <span>${data.status}</span>
            </div>
        </div>
    `;

    // Function to render Bulk Operation
    const renderBulkOperation = (operation) => `
        <div class="bulk-operation">
            <div class="operation-info">
                <h4>${operation.type.replace('_', ' ').toUpperCase()}</h4>
                <p>${operation.usersAffected} users affected</p>
                <span class="operation-time">${operation.time}</span>
            </div>
            <div class="operation-status">
                <span class="status-badge ${operation.status}">${operation.status.replace('_', ' ')}</span>
            </div>
            <div class="operation-actions">
                <button class="btn-info">View Details</button>
                <button class="btn-warning">Cancel</button>
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

    const getSecurityIcon = (type) => {
        switch (type) {
            case 'failed_login': return 'fas fa-exclamation-triangle';
            case 'suspicious_activity': return 'fas fa-shield-alt';
            case 'account_lockout': return 'fas fa-lock';
            case 'multiple_failed_attempts': return 'fas fa-ban';
            default: return 'fas fa-exclamation-circle';
        }
    };

    const getSecurityTitle = (type) => {
        switch (type) {
            case 'failed_login': return 'Failed Login Attempt';
            case 'suspicious_activity': return 'Suspicious Activity Detected';
            case 'account_lockout': return 'Account Locked';
            case 'multiple_failed_attempts': return 'Multiple Failed Attempts';
            default: return 'Security Alert';
        }
    };

    const getMetricPercentage = (value, metric) => {
        if (metric.includes('Usage') || metric.includes('cpu') || metric.includes('memory') || metric.includes('disk')) {
            return value;
        }
        return Math.min((value / 200) * 100, 100); // For other metrics
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
                ${renderStatCard("Security Alerts", dashboardData.securityAlerts.length, "fas fa-shield-alt", "Require attention", "danger")}
                ${renderStatCard("System Uptime", dashboardData.systemMetrics.serverUptime, "fas fa-server", "Current status", "success")}
            </div>

            <!-- Enhanced System Monitoring -->
            <div class="standard-admin-overview-grid">
                <div class="standard-admin-card">
                    <div class="card-header">
                        <h3>System Performance</h3>
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <div class="system-performance">
                        ${renderSystemMetric('CPU Usage', dashboardData.systemMetrics.cpuUsage, '%')}
                        ${renderSystemMetric('Memory Usage', dashboardData.systemMetrics.memoryUsage, '%')}
                        ${renderSystemMetric('Disk Usage', dashboardData.systemMetrics.diskUsage, '%')}
                        ${renderSystemMetric('Network', dashboardData.systemMetrics.networkBandwidth, ' Mbps')}
                        ${renderSystemMetric('Database Connections', dashboardData.systemMetrics.databaseConnections)}
                        ${renderSystemMetric('Active Sessions', dashboardData.systemMetrics.activeSessions)}
                    </div>
                </div>

                <div class="standard-admin-card">
                    <div class="card-header">
                        <h3>Service Status</h3>
                        <i class="fas fa-server"></i>
                    </div>
                    <div class="service-status">
                        ${Object.entries(dashboardData.serviceStatus).map(([service, data]) => 
                            renderServiceStatus(service.replace(/([A-Z])/g, ' $1').trim(), data)
                        ).join('')}
                    </div>
                </div>
            </div>

            <!-- Security Dashboard -->
            <div class="standard-admin-card">
                <div class="card-header">
                    <h3>Security Dashboard</h3>
                    <a href="#security-center" class="view-all">Security Center</a>
                </div>
                <div class="security-dashboard">
                    <div class="security-overview">
                        <div class="security-stat">
                            <span class="stat-number">${dashboardData.failedLogins.length}</span>
                            <span class="stat-label">Failed Logins</span>
                        </div>
                        <div class="security-stat">
                            <span class="stat-number">${dashboardData.suspiciousActivity.length}</span>
                            <span class="stat-label">Suspicious Activities</span>
                        </div>
                        <div class="security-stat">
                            <span class="stat-number">${dashboardData.accountLockouts.length}</span>
                            <span class="stat-label">Account Lockouts</span>
                        </div>
                    </div>
                    <div class="security-alerts-list">
                        ${dashboardData.securityAlerts.map(renderSecurityAlert).join('')}
                    </div>
                </div>
            </div>

            <!-- Bulk Operations -->
            <div class="standard-admin-card">
                <div class="card-header">
                    <h3>Bulk Operations</h3>
                    <button class="btn-primary" onclick="initiateBulkOperation()">
                        <i class="fas fa-plus"></i> New Bulk Operation
                    </button>
                </div>
                <div class="bulk-operations-list">
                    ${dashboardData.bulkOperations.map(renderBulkOperation).join('')}
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

        setupEventListeners();
    };

    const setupEventListeners = () => {
        // Add event listeners for new interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary') || e.target.closest('.btn-primary')) {
                handlePrimaryAction(e);
            }
            if (e.target.classList.contains('btn-success') || e.target.closest('.btn-success')) {
                handleSuccessAction(e);
            }
            if (e.target.classList.contains('btn-warning') || e.target.closest('.btn-warning')) {
                handleWarningAction(e);
            }
        });
    };

    const handlePrimaryAction = (e) => {
        // Handle primary button actions
        console.log('Primary action triggered');
    };

    const handleSuccessAction = (e) => {
        // Handle success button actions
        console.log('Success action triggered');
    };

    const handleWarningAction = (e) => {
        // Handle warning button actions
        console.log('Warning action triggered');
    };

    // Global function for bulk operations
    window.initiateBulkOperation = () => {
        // Show bulk operation modal
        console.log('Initiating bulk operation');
        // This would open a modal for bulk operations
    };

    fetchDashboardData(); // Initial data fetch and render
});
