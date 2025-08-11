document.addEventListener('DOMContentLoaded', () => {
    const itSuperAdminDashboardContent = document.getElementById('it-super-admin-dashboard-content');
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
        securityAlerts: 0,
        systemHealth: {},
        recentActivity: [],
        userStats: {},
        securityEvents: [],
        systemResources: {},
        adminPermissions: []
    };

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalUsers: 3247,
            activeUsers: 2891,
            systemUptime: 99.8,
            securityAlerts: 5,
            systemHealth: {
                serverStatus: 'healthy',
                databaseStatus: 'healthy',
                backupStatus: 'completed',
                lastBackup: '2024-01-14 02:00 AM',
                diskUsage: 67,
                memoryUsage: 45,
                cpuUsage: 23,
                networkStatus: 'optimal'
            },
            userStats: {
                students: 2847,
                faculty: 89,
                staff: 156,
                admins: 155,
                newUsersToday: 8,
                loginSuccessRate: '98.5%',
                failedLogins: 23,
                suspendedAccounts: 3
            },
            recentActivity: [
                { id: 1, action: 'System Configuration Changed', user: 'super.admin@cuab.edu.ng', type: 'system', time: '5 minutes ago', severity: 'high' },
                { id: 2, action: 'User Permissions Modified', user: 'admin.user@cuab.edu.ng', type: 'security', time: '15 minutes ago', severity: 'medium' },
                { id: 3, action: 'Database Backup Completed', user: 'system', type: 'automated', time: '1 hour ago', severity: 'low' },
                { id: 4, action: 'Security Scan Initiated', user: 'super.admin@cuab.edu.ng', type: 'security', time: '2 hours ago', severity: 'medium' }
            ],
            securityEvents: [
                { id: 1, type: 'Multiple Failed Login Attempts', severity: 'high', count: 15, source: 'External IP', time: '10 minutes ago', status: 'investigating' },
                { id: 2, type: 'Privilege Escalation Attempt', severity: 'critical', count: 1, source: 'Internal User', time: '30 minutes ago', status: 'blocked' },
                { id: 3, type: 'Unusual Data Access Pattern', severity: 'medium', count: 3, source: 'Faculty Account', time: '1 hour ago', status: 'monitoring' }
            ],
            systemResources: {
                totalStorage: 2000,
                usedStorage: 1340,
                totalBandwidth: 1000,
                usedBandwidth: 234,
                activeConnections: 1247,
                maxConnections: 5000,
                serverLoad: 45,
                databaseConnections: 89
            },
            adminPermissions: [
                { admin: 'john.admin@cuab.edu.ng', role: 'Standard IT Admin', lastLogin: '2 hours ago', permissions: ['read', 'write'], status: 'active' },
                { admin: 'mary.admin@cuab.edu.ng', role: 'Standard IT Admin', lastLogin: '1 day ago', permissions: ['read'], status: 'active' },
                { admin: 'tech.support@cuab.edu.ng', role: 'Standard IT Admin', lastLogin: '3 hours ago', permissions: ['read', 'support'], status: 'active' }
            ]
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="it-super-stat-card ${color}">
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
        <div class="activity-item ${activity.severity}">
            <div class="activity-icon ${activity.type}">
                <i class="${getActivityIcon(activity.action)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.action}</h4>
                <p>${activity.user}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
            <div class="activity-severity ${activity.severity}">
                ${activity.severity}
            </div>
        </div>
    `;

    // Function to render SecurityEvent
    const renderSecurityEvent = (event) => `
        <div class="security-event ${event.severity}">
            <div class="event-content">
                <h4>${event.type}</h4>
                <p>Source: ${event.source} ${event.count > 1 ? `(${event.count} instances)` : ''}</p>
                <span class="event-time">${event.time}</span>
            </div>
            <div class="event-status">
                <span class="status-badge ${event.status}">${event.status}</span>
                <span class="severity-badge ${event.severity}">${event.severity}</span>
            </div>
        </div>
    `;

    // Function to render AdminPermissionItem
    const renderAdminPermissionItem = (admin) => `
        <div class="admin-permission-item">
            <div class="admin-info">
                <h4>${admin.admin}</h4>
                <p>${admin.role}</p>
                <span class="last-login">Last login: ${admin.lastLogin}</span>
            </div>
            <div class="admin-permissions">
                <div class="permissions-list">
                    ${admin.permissions.map(perm => `<span class="permission-badge">${perm}</span>`).join('')}
                </div>
                <span class="admin-status ${admin.status}">${admin.status}</span>
            </div>
            <div class="admin-actions">
                <button class="btn-info">Edit</button>
                <button class="btn-warning">Suspend</button>
            </div>
        </div>
    `;

    const getActivityIcon = (action) => {
        if (action.includes('Configuration')) return 'fas fa-cogs';
        if (action.includes('Permissions')) return 'fas fa-key';
        if (action.includes('Backup')) return 'fas fa-database';
        if (action.includes('Security')) return 'fas fa-shield-alt';
        return 'fas fa-info-circle';
    };

    const renderDashboard = () => {
        itSuperAdminDashboardContent.innerHTML = `
            <div class="it-super-welcome">
                <h2>Welcome back, IT Super Administrator</h2>
                <p>Complete System Control and Security Management</p>
            </div>

            <div class="it-super-stats-grid">
                ${renderStatCard("Total Users", dashboardData.totalUsers.toLocaleString(), "fas fa-users", `${dashboardData.activeUsers} active`, "primary")}
                ${renderStatCard("System Uptime", `${dashboardData.systemUptime}%`, "fas fa-server", "Last 30 days", "success")}
                ${renderStatCard("Security Alerts", dashboardData.securityAlerts, "fas fa-shield-alt", "Requires immediate attention", "danger")}
                ${renderStatCard("Failed Logins", dashboardData.userStats.failedLogins, "fas fa-exclamation-triangle", "Last 24 hours", "warning")}
            </div>

            <div class="it-super-overview-grid">
                <div class="it-super-card">
                    <div class="card-header">
                        <h3>Advanced System Health</h3>
                        <i class="fas fa-heartbeat"></i>
                    </div>
                    <div class="system-health">
                        <div class="health-grid">
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
                                <span class="health-label">Network Status</span>
                                <span class="health-status ${dashboardData.systemHealth.networkStatus}">
                                    ${dashboardData.systemHealth.networkStatus}
                                </span>
                            </div>
                            <div class="health-item">
                                <span class="health-label">Backup Status</span>
                                <span class="health-status ${dashboardData.systemHealth.backupStatus}">
                                    ${dashboardData.systemHealth.backupStatus}
                                </span>
                            </div>
                        </div>
                        <div class="system-metrics">
                            <div class="metric">
                                <span class="metric-label">Server Load</span>
                                <span class="metric-value">${dashboardData.systemResources.serverLoad}%</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">DB Connections</span>
                                <span class="metric-value">${dashboardData.systemResources.databaseConnections}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="it-super-card">
                    <div class="card-header">
                        <h3>Super Admin Controls</h3>
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="super-admin-controls">
                        <button class="control-btn critical">
                            <i class="fas fa-power-off"></i>
                            System Shutdown
                        </button>
                        <button class="control-btn warning">
                            <i class="fas fa-sync"></i>
                            Force Restart
                        </button>
                        <button class="control-btn info">
                            <i class="fas fa-database"></i>
                            Emergency Backup
                        </button>
                        <button class="control-btn danger">
                            <i class="fas fa-ban"></i>
                            Lockdown Mode
                        </button>
                        <button class="control-btn success">
                            <i class="fas fa-shield-alt"></i>
                            Security Scan
                        </button>
                        <button class="control-btn primary">
                            <i class="fas fa-cogs"></i>
                            System Config
                        </button>
                    </div>
                </div>
            </div>

            <div class="it-super-content-grid">
                <div class="it-super-card">
                    <div class="card-header">
                        <h3>Critical Security Events</h3>
                        <a href="#all-security" class="view-all">View All</a>
                    </div>
                    <div class="security-events-list">
                        ${dashboardData.securityEvents.map(renderSecurityEvent).join('')}
                    </div>
                </div>

                <div class="it-super-card">
                    <div class="card-header">
                        <h3>Admin Permissions Management</h3>
                        <a href="#all-admins" class="view-all">Manage All</a>
                    </div>
                    <div class="admin-permissions-list">
                        ${dashboardData.adminPermissions.map(renderAdminPermissionItem).join('')}
                    </div>
                </div>
            </div>

            <div class="it-super-card">
                <div class="card-header">
                    <h3>Recent System Activity</h3>
                    <a href="#all-activity" class="view-all">View All Logs</a>
                </div>
                <div class="system-activity-list">
                    ${dashboardData.recentActivity.map(renderActivityItem).join('')}
                </div>
            </div>
        `;
    };

    fetchDashboardData(); // Initial data fetch and render
});
