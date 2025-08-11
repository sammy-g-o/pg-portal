document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('adminUser'));
  if (!user) {
    window.location.href = '/admin/admin-login.html';
    return;
  }

  const sidebar = document.getElementById('admin-sidebar');
  if (sidebar) {
    const menuItems = getMenuItems(user.role);
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

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/admin-login.html';
    });
  }
});

function getMenuItems(role) {
  const commonItems = [
    { href: `/admin/${role}-dashboard.html`, icon: "fas fa-tachometer-alt", text: "Dashboard" },
  ];

  const roleSpecificItems = {
    hod: [
      { href: "hod-submissions.html", icon: "fas fa-file-alt", text: "View Submissions" },
      { href: "hod-old-students.html", icon: "fas fa-user-graduate", text: "View Old Students" },
      { href: "hod-current-applicants.html", icon: "fas fa-users", text: "View Current Applicants" },
      { href: "hod-admitted-students.html", icon: "fas fa-user-check", text: "View Admitted Students" },
      { href: "hod-recommend.html", icon: "fas fa-thumbs-up", text: "Recommend Student" },
    ],
    dean: [
        { href: "dean-submissions.html", icon: "fas fa-file-alt", text: "View Submissions" },
        { href: "dean-old-students.html", icon: "fas fa-user-graduate", text: "View Old Students" },
        { href: "dean-current-applicants.html", icon: "fas fa-users", text: "View Current Applicants" },
        { href: "dean-admitted-students.html", icon: "fas fa-user-check", text: "View Admitted Students" },
        { href: "dean-departments.html", icon: "fas fa-building", text: "Departments" },
        { href: "dean-reports.html", icon: "fas fa-chart-bar", text: "Reports" },
    ],
    dean_pg_school: [
        { href: "dean-pg-school-submissions.html", icon: "fas fa-file-alt", text: "View Submissions" },
        { href: "dean-pg-school-old-students.html", icon: "fas fa-user-graduate", text: "View Old Students" },
        { href: "dean-pg-school-current-applicants.html", icon: "fas fa-users", text: "View Current Applicants" },
        { href: "dean-pg-school-admitted-students.html", icon: "fas fa-user-check", text: "View Admitted Students" },
        { href: "dean-pg-school-programmes.html", icon: "fas fa-graduation-cap", text: "PG Programmes" },
        { href: "dean-pg-school-reports.html", icon: "fas fa-chart-bar", text: "Reports" },
    ],
    registrar: [
        { href: "registrar-students.html", icon: "fas fa-user-graduate", text: "Students" },
        { href: "registrar-courses.html", icon: "fas fa-book", text: "Courses" },
        { href: "registrar-transcripts.html", icon: "fas fa-file-alt", text: "Transcripts" },
        { href: "registrar-schedule.html", icon: "fas fa-calendar", text: "Schedule" },
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
        { href: "it-super-admin-users.html", icon: "fas fa-users", text: "Users" },
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
