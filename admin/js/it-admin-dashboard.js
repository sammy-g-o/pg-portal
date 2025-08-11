document.addEventListener('DOMContentLoaded', () => {
    const itAdminDashboardContent = document.getElementById('it-admin-dashboard-content');
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
        totalUsers: 0,
        activeUsers: 0,
        systemUptime: 0,
        pendingTickets: 0,
        systemHealth: {},
        recentActivity: [],
        userStats: {},
        securityAlerts: [],
        systemResources: {}
    };

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalUsers: 3247,
            activeUsers: 2891,
            systemUptime: 99.8,
            pendingTickets: 12,
            systemHealth: {
                serverStatus: 'healthy',
                databaseStatus: 'healthy',
                backupStatus: 'completed',
                lastBackup: '2024-01-14 02:00 AM',
                diskUsage: 67,
                memoryUsage: 45,
                cpuUsage: 23
            },
            userStats: {
                students: 2847,
                faculty: 89,
                staff: 156,
                admins: 155,
                newUsersToday: 8,
                loginSuccessRate: '98.5%'
            },
            recentActivity: [
                { id: 1, action: 'User Login', user: 'john.doe@cuab.edu.ng', type: 'student', time: '2 minutes ago' },
                { id: 2, action: 'Password Reset', user: 'jane.smith@cuab.edu.ng', type: 'faculty', time: '15 minutes ago' },
                { id: 3, action: 'New User Created', user: 'mike.johnson@cuab.edu.ng', type: 'student', time: '1 hour ago' },
                { id: 4, action: 'System Backup', user: 'system', type: 'automated', time: '2 hours ago' }
            ],
            securityAlerts: [
                { id: 1, type: 'Failed Login Attempts', severity: 'medium', count: 5, user: 'unknown', time: '30 minutes ago' },
                { id: 2, type: 'Unusual Access Pattern', severity: 'low', count: 1, user: 'sarah.wilson@cuab.edu.ng', time: '2 hours ago' },
                { id: 3, type: 'Password Policy Violation', severity: 'low', count: 3, user: 'multiple', time: '4 hours ago' }
            ],
            systemResources: {
                totalStorage: 2000,
                usedStorage: 1340,
                totalBandwidth: 1000,
                usedBandwidth: 234,
                activeConnections: 1247,
                maxConnections: 5000
            }
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="it-stat-card ${color}">
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

    // Function to render SecurityAlert
    const renderSecurityAlert = (alert) => `
        <div class="security-alert ${alert.severity}">
            <div class="alert-content">
                <h4>${alert.type}</h4>
                <p>${alert.user} ${alert.count > 1 ? `(${alert.count} instances)` : ''}</p>
                <span class="alert-time">${alert.time}</span>
            </div>
            <div class="alert-severity ${alert.severity}">
                ${alert.severity}
            </div>
        </div>
    `;

    const getActivityIcon = (action) => {
        switch (action) {
            case 'User Login': return 'fas fa-sign-in-alt';
            case 'Password Reset': return 'fas fa-key';
            case 'New User Created': return 'fas fa-user-plus';
            case 'System Backup': return 'fas fa-database';
            default: return 'fas fa-info-circle';
        }
    };

    // Function to render ResourceBar
    const renderResourceBar = (label, used, total, unit = 'GB') => {
        const percentage = (used / total) * 100;
        const getColor = () => {
            if (percentage > 80) return 'danger';
            if (percentage > 60) return 'warning';
            return 'success';
        };

        return `
            <div class="resource-bar">
                <div class="resource-header">
                    <span class="resource-label">${label}</span>
                    <span class="resource-value">${used}${unit} / ${total}${unit}</span>
                </div>
                <div class="resource-progress">
                    <div 
                        class="resource-fill ${getColor()}"
                        style="width: ${percentage}%;"
                    ></div>
                </div>
                <span class="resource-percentage">${percentage.toFixed(1)}%</span>
            </div>
        `;
    };

    const renderDashboard = () => {
        itAdminDashboardContent.innerHTML = `
            <div class="it-welcome">
                <h2>Welcome back, IT Administrator</h2>
                <p>System Management and User Administration</p>
            </div>

            <div class="it-stats-grid">
                ${renderStatCard("Total Users", dashboardData.totalUsers.toLocaleString(), "fas fa-users", `${dashboardData.activeUsers} active`, "primary")}
                ${renderStatCard("System Uptime", `${dashboardData.systemUptime}%`, "fas fa-server", "Last 30 days", "success")}
                ${renderStatCard("Pending Tickets", dashboardData.pendingTickets, "fas fa-ticket-alt", "Support requests", "warning")}
                ${renderStatCard("Security Alerts", dashboardData.securityAlerts.length, "fas fa-shield-alt", "Requires attention", "danger")}
            </div>

            <div class="it-overview-grid">
                <div class="it-card">
                    <div class="card-header">
                        <h3>System Health</h3>
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    <div class="system-health">
                        <div class="health-item">
                            <span class="health-label">Server Status</span>
                            <span class="health-status ${dashboardData.systemHealth.serverStatus}">
                                ${dashboardData.systemHealth.serverStatus}
                            </span>
                        </div>
                        <div class="health-item">
                            <span class="health-label">Database Status</span>
                            <span class="health-status ${dashboardData.systemHealth.databaseStatus}">
                                ${dashboardData.systemHealth.databaseStatus}
                            </span>
                        </div>
                        <div class="health-item">
                            <span class="health-label">Backup Status</span>
                            <span class="health-status ${dashboardData.systemHealth.backupStatus}">
                                ${dashboardData.systemHealth.backupStatus}
                            </span>
                        </div>
                        <div class="health-item">
                            <span class="health-label">Last Backup</span>
                            <span class="health-value">${dashboardData.systemHealth.lastBackup}</span>
                        </div>
                    </div>
                </div>

                <div class="it-card">
                    <div class="card-header">
                        <h3>User Statistics</h3>
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <div class="user-stats">
                        <div class="user-stat-item">
                            <span class="stat-label">Students</span>
                            <span class="stat-value">${dashboardData.userStats.students}</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="stat-label">Faculty</span>
                            <span class="stat-value">${dashboardData.userStats.faculty}</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="stat-label">Staff</span>
                            <span class="stat-value">${dashboardData.userStats.staff}</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="stat-label">Administrators</span>
                            <span class="stat-value">${dashboardData.userStats.admins}</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="stat-label">New Users Today</span>
                            <span class="stat-value success">${dashboardData.userStats.newUsersToday}</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="stat-label">Login Success Rate</span>
                            <span class="stat-value success">${dashboardData.userStats.loginSuccessRate}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="it-card">
                <div class="card-header">
                    <h3>Quick Actions</h3>
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="quick-actions">
                    <button class="action-btn primary">
                        <i class="fas fa-user-plus"></i>
                        Add User
                    </button>
                    <button class="action-btn success">
                        <i class="fas fa-database"></i>
                        Run Backup
                    </button>
                    <button class="action-btn info">
                        <i class="fas fa-cogs"></i>
                        System Settings
                    </button>
                    <button class="action-btn warning">
                        <i class="fas fa-key"></i>
                        Reset Password
                    </button>
                    <button class="action-btn secondary">
                        <i class="fas fa-chart-line"></i>
                        View Logs
                    </button>
                    <button class="action-btn danger">
                        <i class="fas fa-shield-alt"></i>
                        Security Scan
                    </button>
                </div>
            </div>

            <div class="it-card">
                <div class="card-header">
                    <h3>System Resources</h3>
                    <i class="fas fa-tachometer-alt"></i>
                </div>
                <div class="system-resources">
                    ${renderResourceBar("Storage Usage", dashboardData.systemResources.usedStorage, dashboardData.systemResources.totalStorage, "GB")}
                    ${renderResourceBar("Bandwidth Usage", dashboardData.systemResources.usedBandwidth, dashboardData.systemResources.totalBandwidth, "Mbps")}
                    ${renderResourceBar("Active Connections", dashboardData.systemResources.activeConnections, dashboardData.systemResources.maxConnections, "")}
                    <div class="resource-metrics">
                        <div class="metric">
                            <span class="metric-label">CPU Usage</span>
                            <span class="metric-value">${dashboardData.systemHealth.cpuUsage}%</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Memory Usage</span>
                            <span class="metric-value">${dashboardData.systemHealth.memoryUsage}%</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Disk Usage</span>
                            <span class="metric-value">${dashboardData.systemHealth.diskUsage}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="it-content-grid">
                <div class="it-card">
                    <div class="card-header">
                        <h3>Recent Activity</h3>
                        <a href="#all-activity" class="view-all">View All</a>
                    </div>
                    <div class="activity-list">
                        ${dashboardData.recentActivity.map(renderActivityItem).join('')}
                    </div>
                </div>

                <div class="it-card">
                    <div class="card-header">
                        <h3>Security Alerts</h3>
                        <a href="#all-alerts" class="view-all">View All</a>
                    </div>
                    <div class="security-alerts-list">
                        ${dashboardData.securityAlerts.map(renderSecurityAlert).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    fetchDashboardData(); // Initial data fetch and render
});
