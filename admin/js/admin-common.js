document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('adminUser'));
  if (!user) {
    window.location.href = '/admin/admin-login.html';
    return;
  }

  // Add mobile sidebar overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';
  document.body.appendChild(overlay);
  console.log('Mobile sidebar overlay created');

  const sidebar = document.getElementById('admin-sidebar');
  if (sidebar) {
    const menuItems = getMenuItems(user.role);
    
    // Check if items have groups (for Standard IT Admin)
    const hasGroups = menuItems.some(item => item.group);
    
    if (hasGroups) {
      // Render grouped sidebar for Standard IT Admin
      const groupedItems = groupMenuItems(menuItems);
      sidebar.innerHTML = `
        <div class="admin-sidebar-header">
          <div class="admin-logo">
            <img src="../../img/logo.jpg" alt="University Logo" />
          </div>
          <h3>Admin Portal</h3>
          <p>${getRoleDisplayName(user.role)}</p>
        </div>
        <div class="admin-sidebar-menu">
          ${groupedItems.map(group => `
            <div class="menu-group">
              <div class="menu-group-header" onclick="toggleMenuGroup('${group.id}')">
                <i class="${group.icon}"></i>
                <span class="group-title">${group.title}</span>
                <i class="fas fa-chevron-down group-toggle"></i>
              </div>
              <div class="menu-group-items" id="group-${group.id}">
                ${group.items.map(item => `
                  <a href="${item.href}" class="admin-menu-link ${window.location.pathname === item.href ? 'active' : ''}">
                    <div class="admin-menu-item">
                      <i class="${item.icon}"></i>
                      <span class="menu-text">${item.text}</span>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="admin-sidebar-footer">
          <button class="admin-logout-btn" id="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      `;
    } else {
      // Render regular sidebar for other roles
      sidebar.innerHTML = `
        <div class="admin-sidebar-header">
          <div class="admin-logo">
            <img src="../../img/logo.jpg" alt="University Logo" />
          </div>
          <h3>Admin Portal</h3>
          <p>${getRoleDisplayName(user.role)}</p>
        </div>
        <div class="admin-sidebar-menu">
          ${menuItems.map(item => `
            <a href="${item.href}" class="admin-menu-link ${window.location.pathname === item.href ? 'active' : ''}">
              <div class="admin-menu-item">
                <i class="${item.icon}"></i>
                <span class="menu-text">${item.text}</span>
              </div>
            </a>
          `).join('')}
        </div>
        <div class="admin-sidebar-footer">
          <button class="admin-logout-btn" id="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      `;
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/admin-login.html';
    });

    // Auto-expand the group containing the current page
    if (hasGroups) {
      const currentPath = window.location.pathname;
      const currentItem = menuItems.find(item => item.href && currentPath.includes(item.href));
      if (currentItem && currentItem.group) {
        // Auto-expand the group after a short delay to ensure DOM is ready
        setTimeout(() => {
          toggleMenuGroup(currentItem.group);
        }, 100);
      }
    }
    
    // Setup mobile sidebar functionality after sidebar content is ready
    setTimeout(() => {
      console.log('Setting up mobile sidebar...');
      setupMobileSidebar();
    }, 100);
  }
});

function getMenuItems(role) {
  const commonItems = [
    { href: `/admin/${role}-dashboard.html`, icon: "fas fa-tachometer-alt", text: "Dashboard" },
  ];

  const roleSpecificItems = {
    hod: [
      { href: "hod-submissions.html", icon: "fas fa-users", text: "View Students Registered for Courses" },
      { href: "hod-old-students.html", icon: "fas fa-user-graduate", text: "View Old Applicants" },
      { href: "hod-current-applicants.html", icon: "fas fa-users", text: "View Current Applicants" },
      { href: "hod-admitted-students.html", icon: "fas fa-user-check", text: "View Admitted Students" },
      { href: "hod-recommend.html", icon: "fas fa-thumbs-up", text: "Recommend Student" },
    ],
    dean: [
        { href: "dean-all-students.html", icon: "fas fa-users", text: "All Students Management" },
        { href: "dean-submissions.html", icon: "fas fa-users", text: "View Students Registered for Courses" },
        { href: "dean-old-students.html", icon: "fas fa-user-graduate", text: "View Old Applicants" },
        { href: "dean-current-applicants.html", icon: "fas fa-users", text: "View Current Applicants" },
        { href: "dean-admitted-students.html", icon: "fas fa-user-check", text: "View Admitted Students" },
        { href: "dean-view-recommended-applications.html", icon: "fas fa-eye", text: "View Recommended Applications" },
        { href: "dean-approve-admission.html", icon: "fas fa-check-circle", text: "Approve Admission" },
        { href: "dean-departments.html", icon: "fas fa-building", text: "Departments" },
        { href: "dean-reports.html", icon: "fas fa-chart-bar", text: "Reports" },
    ],
    dean_pg_school: [
        { href: "dean-pg-school-submissions.html", icon: "fas fa-file-alt", text: "View Submissions" },
        { href: "dean-pg-school-old-students.html", icon: "fas fa-user-graduate", text: "View Old Students" },
        { href: "dean-pg-school-current-applicants.html", icon: "fas fa-users", text: "View Current Applicants" },
        { href: "dean-pg-school-admitted-students.html", icon: "fas fa-user-check", text: "View Admitted Students" },
        { href: "dean-pg-school-approve-admission.html", icon: "fas fa-check-circle", text: "Approve Admission" },
        { href: "dean-pg-school-programmes.html", icon: "fas fa-graduation-cap", text: "PG Programmes" },
        { href: "dean-pg-school-reports.html", icon: "fas fa-chart-bar", text: "Reports" },
    ],
    registrar: [
        { href: "registrar-students.html", icon: "fas fa-user-graduate", text: "Students" },
        { href: "registrar-courses.html", icon: "fas fa-book", text: "Courses" },
        { href: "registrar-transcripts.html", icon: "fas fa-file-alt", text: "Transcripts" },
        { href: "registrar-schedule.html", icon: "fas fa-calendar", text: "Schedule" },
        { href: "registrar-view-recommended-applications.html", icon: "fas fa-eye", text: "View Recommended Applications" },
        { href: "registrar-approve-admission.html", icon: "fas fa-check-circle", text: "Approve Admission" },
        { href: "registrar-reports.html", icon: "fas fa-chart-bar", text: "Reports" },
        { href: "registrar-graduation.html", icon: "fas fa-graduation-cap", text: "Graduation" },
    ],
    admissions: [
        { href: "admissions-applications.html", icon: "fas fa-file-alt", text: "Applications" },
        { href: "admissions-review.html", icon: "fas fa-search", text: "Review" },
        { href: "admissions-criteria.html", icon: "fas fa-list", text: "Criteria" },
        { href: "admissions-enrollment.html", icon: "fas fa-user-plus", text: "Enrollment" },
    ],
    it_super_admin: [
        // User Management Group
        { href: "it-super-admin-users.html", icon: "fas fa-users", text: "User Management", group: "user-management" },
        { href: "it-super-admin-user-creation.html", icon: "fas fa-user-plus", text: "Create Users", group: "user-management" },
        { href: "it-super-admin-user-bulk-import.html", icon: "fas fa-upload", text: "Bulk Import", group: "user-management" },
        { href: "it-super-admin-user-roles.html", icon: "fas fa-user-tag", text: "Role Management", group: "user-management" },
        { href: "it-super-admin-user-permissions.html", icon: "fas fa-user-shield", text: "Permission Matrix", group: "user-management" },
        
        // System Administration Group
        { href: "it-super-admin-system-config.html", icon: "fas fa-cogs", text: "System Configuration", group: "system-admin" },
        { href: "it-super-admin-database-admin.html", icon: "fas fa-database", text: "Database Admin", group: "system-admin" },
        { href: "it-super-admin-server-management.html", icon: "fas fa-server", text: "Server Management", group: "system-admin" },
        { href: "it-super-admin-backup-restore.html", icon: "fas fa-hdd", text: "Backup & Restore", group: "system-admin" },
        { href: "it-super-admin-system-updates.html", icon: "fas fa-sync-alt", text: "System Updates", group: "system-admin" },
        
        // Security & Compliance Group
        { href: "it-super-admin-security-policy.html", icon: "fas fa-shield-alt", text: "Security Policies", group: "security" },
        { href: "it-super-admin-audit-logs.html", icon: "fas fa-clipboard-list", text: "Audit Logs", group: "security" },
        { href: "it-super-admin-compliance-reports.html", icon: "fas fa-file-contract", text: "Compliance Reports", group: "security" },
        { href: "it-super-admin-firewall-config.html", icon: "fas fa-fire", text: "Firewall Config", group: "security" },
        { href: "it-super-admin-encryption-keys.html", icon: "fas fa-key", text: "Encryption Keys", group: "security" },
        
        // Network & Infrastructure Group
        { href: "it-super-admin-network-monitoring.html", icon: "fas fa-network-wired", text: "Network Monitoring", group: "infrastructure" },
        { href: "it-super-admin-load-balancing.html", icon: "fas fa-balance-scale", text: "Load Balancing", group: "infrastructure" },
        { href: "it-super-admin-dns-management.html", icon: "fas fa-globe", text: "DNS Management", group: "infrastructure" },
        { href: "it-super-admin-vpn-config.html", icon: "fas fa-shield-virus", text: "VPN Configuration", group: "infrastructure" },
        { href: "it-super-admin-api-management.html", icon: "fas fa-code", text: "API Management", group: "infrastructure" },
        
        // Integration & Development Group
        { href: "it-super-admin-third-party-integrations.html", icon: "fas fa-plug", text: "Third-party Integrations", group: "integration" },
        { href: "it-super-admin-webhook-management.html", icon: "fas fa-link", text: "Webhook Management", group: "integration" },
        { href: "it-super-admin-api-documentation.html", icon: "fas fa-book", text: "API Documentation", group: "integration" },
        { href: "it-super-admin-development-tools.html", icon: "fas fa-tools", text: "Development Tools", group: "integration" },
        { href: "it-super-admin-testing-environment.html", icon: "fas fa-vial", text: "Testing Environment", group: "integration" },
        
        // Advanced Monitoring Group
        { href: "it-super-admin-performance-analytics.html", icon: "fas fa-chart-line", text: "Performance Analytics", group: "monitoring" },
        { href: "it-super-admin-error-tracking.html", icon: "fas fa-bug", text: "Error Tracking", group: "monitoring" },
        { href: "it-super-admin-alert-management.html", icon: "fas fa-bell", text: "Alert Management", group: "monitoring" },
        { href: "it-super-admin-log-aggregation.html", icon: "fas fa-file-alt", text: "Log Aggregation", group: "monitoring" },
        { href: "it-super-admin-metrics-dashboard.html", icon: "fas fa-tachometer-alt", text: "Metrics Dashboard", group: "monitoring" },
        
        // Disaster Recovery Group
        { href: "it-super-admin-disaster-recovery.html", icon: "fas fa-exclamation-triangle", text: "Disaster Recovery", group: "recovery" },
        { href: "it-super-admin-business-continuity.html", icon: "fas fa-business-time", text: "Business Continuity", group: "recovery" },
        { href: "it-super-admin-incident-response.html", icon: "fas fa-ambulance", text: "Incident Response", group: "recovery" },
        { href: "it-super-admin-recovery-testing.html", icon: "fas fa-vial", text: "Recovery Testing", group: "recovery" },
        { href: "it-super-admin-failover-config.html", icon: "fas fa-exchange-alt", text: "Failover Config", group: "recovery" },
        
        // Compliance & Governance Group
        { href: "it-super-admin-compliance-framework.html", icon: "fas fa-gavel", text: "Compliance Framework", group: "governance" },
        { href: "it-super-admin-policy-management.html", icon: "fas fa-file-signature", text: "Policy Management", group: "governance" },
        { href: "it-super-admin-risk-assessment.html", icon: "fas fa-exclamation-circle", text: "Risk Assessment", group: "governance" },
        { href: "it-super-admin-vendor-management.html", icon: "fas fa-handshake", text: "Vendor Management", group: "governance" },
        { href: "it-super-admin-contract-management.html", icon: "fas fa-file-contract", text: "Contract Management", group: "governance" },
        
        // Advanced Reporting Group
        { href: "it-super-admin-executive-reports.html", icon: "fas fa-chart-pie", text: "Executive Reports", group: "reporting" },
        { href: "it-super-admin-custom-reports.html", icon: "fas fa-chart-bar", text: "Custom Reports", group: "reporting" },
        { href: "it-super-admin-data-analytics.html", icon: "fas fa-chart-area", text: "Data Analytics", group: "reporting" },
        { href: "it-super-admin-report-scheduling.html", icon: "fas fa-clock", text: "Report Scheduling", group: "reporting" },
        { href: "it-super-admin-report-export.html", icon: "fas fa-download", text: "Report Export", group: "reporting" },
        
        // System Architecture Group
        { href: "it-super-admin-architecture-overview.html", icon: "fas fa-sitemap", text: "Architecture Overview", group: "architecture" },
        { href: "it-super-admin-system-design.html", icon: "fas fa-drafting-compass", text: "System Design", group: "architecture" },
        { href: "it-super-admin-scalability-planning.html", icon: "fas fa-expand-arrows-alt", text: "Scalability Planning", group: "architecture" },
        { href: "it-super-admin-technology-stack.html", icon: "fas fa-layer-group", text: "Technology Stack", group: "architecture" },
        { href: "it-super-admin-system-roadmap.html", icon: "fas fa-route", text: "System Roadmap", group: "architecture" },
        
        // Advanced Settings Group
        { href: "it-super-admin-global-settings.html", icon: "fas fa-sliders-h", text: "Global Settings", group: "settings" },
        { href: "it-super-admin-environment-config.html", icon: "fas fa-leaf", text: "Environment Config", group: "settings" },
        { href: "it-super-admin-feature-flags.html", icon: "fas fa-toggle-on", text: "Feature Flags", group: "settings" },
        { href: "it-super-admin-system-parameters.html", icon: "fas fa-cogs", text: "System Parameters", group: "settings" },
        { href: "it-super-admin-configuration-templates.html", icon: "fas fa-copy", text: "Config Templates", group: "settings" },
    ],
    standard_admin: [
        // User Management Group
        { href: "standard-admin-users.html", icon: "fas fa-users", text: "User Management", group: "user-management" },
        { href: "standard-admin-passwords.html", icon: "fas fa-key", text: "Password Management", group: "user-management" },
        { href: "standard-admin-accounts.html", icon: "fas fa-user-cog", text: "Account Status", group: "user-management" },
        { href: "standard-admin-user-reports.html", icon: "fas fa-chart-pie", text: "User Reports", group: "user-management" },
        
        // Support & Help Desk Group
        { href: "standard-admin-tickets.html", icon: "fas fa-headset", text: "Support Tickets", group: "support" },
        { href: "standard-admin-create-ticket.html", icon: "fas fa-plus-circle", text: "Create Ticket", group: "support" },
        { href: "standard-admin-ticket-queue.html", icon: "fas fa-list-ol", text: "Ticket Queue", group: "support" },
        { href: "standard-admin-help-desk.html", icon: "fas fa-question-circle", text: "Help Desk", group: "support" },
        { href: "standard-admin-knowledge-base.html", icon: "fas fa-book", text: "Knowledge Base", group: "support" },
        
        // System Monitoring Group
        { href: "standard-admin-system-status.html", icon: "fas fa-server", text: "System Status", group: "monitoring" },
        { href: "standard-admin-performance.html", icon: "fas fa-tachometer-alt", text: "Performance Metrics", group: "monitoring" },
        { href: "standard-admin-uptime.html", icon: "fas fa-clock", text: "Uptime Reports", group: "monitoring" },
        { href: "standard-admin-health-checks.html", icon: "fas fa-heartbeat", text: "Health Checks", group: "monitoring" },
        
        // Security & Access Group
        { href: "standard-admin-security.html", icon: "fas fa-shield-alt", text: "Security Center", group: "security" },
        { href: "standard-admin-security-alerts.html", icon: "fas fa-exclamation-circle", text: "Security Alerts", group: "security" },
        { href: "standard-admin-failed-logins.html", icon: "fas fa-ban", text: "Failed Logins", group: "security" },
        { href: "standard-admin-account-lockouts.html", icon: "fas fa-lock", text: "Account Lockouts", group: "security" },
        { href: "standard-admin-access-control.html", icon: "fas fa-user-lock", text: "Access Control", group: "security" },
        { href: "standard-admin-user-permissions.html", icon: "fas fa-user-shield", text: "User Permissions", group: "security" },
        
        // Reports & Analytics Group
        { href: "standard-admin-reports.html", icon: "fas fa-chart-bar", text: "Reports", group: "reports" },
        { href: "standard-admin-user-activity.html", icon: "fas fa-user-clock", text: "User Activity", group: "reports" },
        { href: "standard-admin-support-analytics.html", icon: "fas fa-chart-area", text: "Support Analytics", group: "reports" },
        { href: "standard-admin-system-performance.html", icon: "fas fa-chart-line", text: "System Performance", group: "reports" },
        { href: "standard-admin-export-data.html", icon: "fas fa-download", text: "Export Data", group: "reports" },
        
        // Activity & Logs Group
        { href: "standard-admin-activity-logs.html", icon: "fas fa-history", text: "Activity Logs", group: "logs" },
        { href: "standard-admin-login-history.html", icon: "fas fa-sign-in-alt", text: "Login History", group: "logs" },
        { href: "standard-admin-system-access.html", icon: "fas fa-door-open", text: "System Access", group: "logs" },
        { href: "standard-admin-failed-attempts.html", icon: "fas fa-exclamation-triangle", text: "Failed Attempts", group: "logs" },
        { href: "standard-admin-recent-activities.html", icon: "fas fa-clock", text: "Recent Activities", group: "logs" },
        
        // Bulk Operations Group
        { href: "standard-admin-bulk-operations.html", icon: "fas fa-tasks", text: "Bulk Operations", group: "bulk" },
        { href: "standard-admin-password-resets.html", icon: "fas fa-key", text: "Password Resets", group: "bulk" },
        { href: "standard-admin-user-notifications.html", icon: "fas fa-bell", text: "User Notifications", group: "bulk" },
        { href: "standard-admin-account-updates.html", icon: "fas fa-user-edit", text: "Account Updates", group: "bulk" },
        { href: "standard-admin-import-export.html", icon: "fas fa-exchange-alt", text: "Import/Export", group: "bulk" },
        
        // Maintenance Group
        { href: "standard-admin-maintenance.html", icon: "fas fa-tools", text: "Maintenance", group: "maintenance" },
        { href: "standard-admin-maintenance-schedule.html", icon: "fas fa-calendar-alt", text: "Maintenance Schedule", group: "maintenance" },
        { href: "standard-admin-system-notices.html", icon: "fas fa-bullhorn", text: "System Notices", group: "maintenance" },
        { href: "standard-admin-backup-status.html", icon: "fas fa-database", text: "Backup Status", group: "maintenance" },
        { href: "standard-admin-log-management.html", icon: "fas fa-file-alt", text: "Log Management", group: "maintenance" },
        
        // Notifications Group
        { href: "standard-admin-notifications.html", icon: "fas fa-bell", text: "Notifications", group: "notifications" },
        { href: "standard-admin-system-announcements.html", icon: "fas fa-bullhorn", text: "System Announcements", group: "notifications" },
        { href: "standard-admin-maintenance-alerts.html", icon: "fas fa-exclamation-triangle", text: "Maintenance Alerts", group: "notifications" },
        { href: "standard-admin-email-templates.html", icon: "fas fa-envelope-open-text", text: "Email Templates", group: "notifications" },
        
        // Settings Group
        { href: "standard-admin-settings.html", icon: "fas fa-cog", text: "Settings", group: "settings" },
        { href: "standard-admin-system-configuration.html", icon: "fas fa-sliders-h", text: "System Configuration", group: "settings" },
        { href: "standard-admin-email-settings.html", icon: "fas fa-envelope", text: "Email Settings", group: "settings" },
        { href: "standard-admin-interface-options.html", icon: "fas fa-palette", text: "Interface Options", group: "settings" },
        { href: "standard-admin-notification-preferences.html", icon: "fas fa-bell-slash", text: "Notification Preferences", group: "settings" },
        
        // Profile Group
        { href: "standard-admin-profile.html", icon: "fas fa-user", text: "Profile", group: "profile" },
        { href: "standard-admin-personal-settings.html", icon: "fas fa-user-cog", text: "Personal Settings", group: "profile" },
        { href: "standard-admin-password-change.html", icon: "fas fa-key", text: "Password Change", group: "profile" },
        { href: "standard-admin-preferences.html", icon: "fas fa-cog", text: "Preferences", group: "profile" },
        { href: "standard-admin-session-management.html", icon: "fas fa-clock", text: "Session Management", group: "profile" },
    ],
    finance: [
        { href: "finance-fees.html", icon: "fas fa-money-bill", text: "Fee Management" },
        { href: "finance-payments.html", icon: "fas fa-credit-card", text: "Payments" },
        { href: "finance-scholarships.html", icon: "fas fa-award", text: "Scholarships" },
        { href: "finance-reports.html", icon: "fas fa-chart-line", text: "Financial Reports" },
    ],
    // Add other roles here
  };

  return [...commonItems, ...(roleSpecificItems[role] || [])];
}

// Helper function to group menu items
function groupMenuItems(menuItems) {
  const groups = {
    // Standard Admin Groups
    'user-management': {
      id: 'user-management',
      title: 'User Management',
      icon: 'fas fa-users',
      items: []
    },
    'support': {
      id: 'support',
      title: 'Support & Help Desk',
      icon: 'fas fa-headset',
      items: []
    },
    'monitoring': {
      id: 'monitoring',
      title: 'System Monitoring',
      icon: 'fas fa-server',
      items: []
    },
    'security': {
      id: 'security',
      title: 'Security & Access',
      icon: 'fas fa-shield-alt',
      items: []
    },
    'reports': {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: 'fas fa-chart-bar',
      items: []
    },
    'logs': {
      id: 'logs',
      title: 'Activity & Logs',
      icon: 'fas fa-history',
      items: []
    },
    'bulk': {
      id: 'bulk',
      title: 'Bulk Operations',
      icon: 'fas fa-tasks',
      items: []
    },
    'maintenance': {
      id: 'maintenance',
      title: 'Maintenance',
      icon: 'fas fa-tools',
      items: []
    },
    'notifications': {
      id: 'notifications',
      title: 'Notifications',
      icon: 'fas fa-bell',
      items: []
    },
    'settings': {
      id: 'settings',
      title: 'Settings',
      icon: 'fas fa-cog',
      items: []
    },
    'profile': {
      id: 'profile',
      title: 'Profile',
      icon: 'fas fa-user',
      items: []
    },
    
    // IT Super Admin Groups
    'system-admin': {
      id: 'system-admin',
      title: 'System Administration',
      icon: 'fas fa-cogs',
      items: []
    },
    'infrastructure': {
      id: 'infrastructure',
      title: 'Network & Infrastructure',
      icon: 'fas fa-network-wired',
      items: []
    },
    'integration': {
      id: 'integration',
      title: 'Integration & Development',
      icon: 'fas fa-plug',
      items: []
    },
    'recovery': {
      id: 'recovery',
      title: 'Disaster Recovery',
      icon: 'fas fa-exclamation-triangle',
      items: []
    },
    'governance': {
      id: 'governance',
      title: 'Compliance & Governance',
      icon: 'fas fa-gavel',
      items: []
    },
    'reporting': {
      id: 'reporting',
      title: 'Advanced Reporting',
      icon: 'fas fa-chart-pie',
      items: []
    },
    'architecture': {
      id: 'architecture',
      title: 'System Architecture',
      icon: 'fas fa-sitemap',
      items: []
    }
  };

  // Group items by their group property
  menuItems.forEach(item => {
    if (item.group && groups[item.group]) {
      groups[item.group].items.push(item);
    }
  });

  // Return only groups that have items
  return Object.values(groups).filter(group => group.items.length > 0);
}

// Global function to toggle menu groups
window.toggleMenuGroup = function(groupId) {
  const groupItems = document.getElementById(`group-${groupId}`);
  const groupHeader = groupItems.previousElementSibling;
  const toggleIcon = groupHeader.querySelector('.group-toggle');
  
  if (groupItems.style.display === 'none') {
    groupItems.style.display = 'block';
    toggleIcon.style.transform = 'rotate(0deg)';
    groupHeader.classList.add('expanded');
  } else {
    groupItems.style.display = 'none';
    toggleIcon.style.transform = 'rotate(-90deg)';
    groupHeader.classList.remove('expanded');
  }
};

function getRoleDisplayName(role) {
  const roleNames = {
    hod: 'Head of Department',
    dean: 'Dean',
    dean_pg_school: 'Dean of PG School',
    registrar: 'Secretary PG School',
    admissions: 'Admissions Officer',
    finance: 'Bursar & PG Account Officer',
    it_super_admin: 'IT Super Admin',
    standard_admin: 'Standard IT Admin'
  };
  return roleNames[role] || role;
}

// Mobile sidebar functionality
function setupMobileSidebar() {
  console.log('setupMobileSidebar called');
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('admin-toggle-sidebar');
  
  console.log('Elements found:', { sidebar: !!sidebar, overlay: !!overlay, toggleBtn: !!toggleBtn });
  
  if (!sidebar || !overlay || !toggleBtn) {
    console.warn('Mobile sidebar elements not found:', { sidebar: !!sidebar, overlay: !!overlay, toggleBtn: !!toggleBtn });
    return;
  }

  // Remove existing event listeners to prevent duplicates
  const newToggleBtn = toggleBtn.cloneNode(true);
  toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
  
  // Toggle sidebar on button click
  newToggleBtn.addEventListener('click', (e) => {
    console.log('Toggle button clicked!');
    e.preventDefault();
    e.stopPropagation();
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
    console.log('Sidebar toggled:', sidebar.classList.contains('mobile-open'));
    console.log('Sidebar classes:', sidebar.className);
    console.log('Overlay classes:', overlay.className);
  });

  // Close sidebar when clicking overlay
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close sidebar when clicking on a menu item (mobile)
  const menuLinks = sidebar.querySelectorAll('.admin-menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close sidebar on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  console.log('Mobile sidebar setup completed');
}

// Mobile sidebar functionality is now called from the main DOMContentLoaded event
