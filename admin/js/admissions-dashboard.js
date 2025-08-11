document.addEventListener('DOMContentLoaded', () => {
    const admissionsDashboardContent = document.getElementById('admissions-dashboard-content');
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
        totalApplications: 0,
        pendingReview: 0,
        acceptedApplications: 0,
        rejectedApplications: 0,
        enrollmentTarget: 0,
        currentEnrollment: 0,
        recentApplications: [],
        applicationsByProgram: [],
        admissionStats: {},
        upcomingTasks: []
    };

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalApplications: 1247,
            pendingReview: 89,
            acceptedApplications: 756,
            rejectedApplications: 402,
            enrollmentTarget: 800,
            currentEnrollment: 623,
            admissionStats: {
                acceptanceRate: '60.7%',
                enrollmentRate: '82.4%',
                averageGPA: 3.65,
                averageTestScore: 1420,
                internationalStudents: '23%'
            },
            recentApplications: [
                { id: 1, name: 'Sarah Johnson', program: 'Computer Science', status: 'pending', submitted: '2 hours ago', gpa: 3.8 },
                { id: 2, name: 'Michael Chen', program: 'Data Science', status: 'under_review', submitted: '4 hours ago', gpa: 3.9 },
                { id: 3, name: 'Emily Rodriguez', program: 'Mathematics', status: 'pending', submitted: '6 hours ago', gpa: 3.7 },
                { id: 4, name: 'James Wilson', program: 'Physics', status: 'interview_scheduled', submitted: '1 day ago', gpa: 3.85 }
            ],
            applicationsByProgram: [
                { program: 'Computer Science', total: 345, accepted: 198, pending: 25, rejected: 122 },
                { program: 'Data Science', total: 289, accepted: 167, pending: 18, rejected: 104 },
                { program: 'Mathematics', total: 198, accepted: 134, pending: 12, rejected: 52 },
                { program: 'Physics', total: 156, accepted: 89, pending: 15, rejected: 52 },
                { program: 'Chemistry', total: 134, accepted: 78, pending: 11, rejected: 45 },
                { program: 'Biology', total: 125, accepted: 90, pending: 8, rejected: 27 }
            ],
            upcomingTasks: [
                { id: 1, task: 'Review Computer Science Applications', deadline: '2024-01-15', priority: 'high', count: 25 },
                { id: 2, task: 'Conduct Virtual Interviews', deadline: '2024-01-18', priority: 'medium', count: 12 },
                { id: 3, task: 'Send Acceptance Letters', deadline: '2024-01-20', priority: 'high', count: 45 },
                { id: 4, task: 'Update Admission Criteria', deadline: '2024-01-25', priority: 'low', count: 1 }
            ]
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="admissions-stat-card ${color}">
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

    // Function to render ApplicationItem
    const renderApplicationItem = (application) => `
        <div class="application-item">
            <div class="application-content">
                <h4>${application.name}</h4>
                <p>${application.program}</p>
                <div class="application-meta">
                    <span class="gpa">GPA: ${application.gpa}</span>
                    <span class="submitted">${application.submitted}</span>
                </div>
            </div>
            <div class="application-status ${application.status}">
                ${application.status.replace('_', ' ')}
            </div>
        </div>
    `;

    // Function to render ProgramCard
    const renderProgramCard = (program) => {
        const acceptanceRate = ((program.accepted / program.total) * 100).toFixed(1);
        return `
            <div class="program-card">
                <div class="program-header">
                    <h4>${program.program}</h4>
                    <span class="acceptance-rate">${acceptanceRate}% accepted</span>
                </div>
                <div class="program-stats">
                    <div class="program-stat">
                        <span class="stat-label">Total</span>
                        <span class="stat-value">${program.total}</span>
                    </div>
                    <div class="program-stat">
                        <span class="stat-label">Accepted</span>
                        <span class="stat-value accepted">${program.accepted}</span>
                    </div>
                    <div class="program-stat">
                        <span class="stat-label">Pending</span>
                        <span class="stat-value pending">${program.pending}</span>
                    </div>
                    <div class="program-stat">
                        <span class="stat-label">Rejected</span>
                        <span class="stat-value rejected">${program.rejected}</span>
                    </div>
                </div>
            </div>
        `;
    };

    // Function to render TaskItem
    const renderTaskItem = (task) => `
        <div class="task-item priority-${task.priority}">
            <div class="task-content">
                <h4>${task.task}</h4>
                <p>Deadline: ${task.deadline}</p>
                ${task.count > 1 ? `<span class="task-count">${task.count} items</span>` : ''}
            </div>
            <div class="task-priority ${task.priority}">
                ${task.priority}
            </div>
        </div>
    `;

    const renderDashboard = () => {
        const enrollmentProgress = ((dashboardData.currentEnrollment / dashboardData.enrollmentTarget) * 100).toFixed(1);

        admissionsDashboardContent.innerHTML = `
            <div class="admissions-welcome">
                <h2>Welcome back, Admissions Director</h2>
                <p>Application Review and Enrollment Management</p>
            </div>

            <div class="admissions-stats-grid">
                ${renderStatCard("Total Applications", dashboardData.totalApplications.toLocaleString(), "fas fa-file-alt", "This cycle", "primary")}
                ${renderStatCard("Pending Review", dashboardData.pendingReview, "fas fa-clock", "Requires action", "warning")}
                ${renderStatCard("Accepted", dashboardData.acceptedApplications, "fas fa-check-circle", `${dashboardData.admissionStats.acceptanceRate} acceptance rate`, "success")}
                ${renderStatCard("Enrollment Progress", `${enrollmentProgress}%`, "fas fa-user-graduate", `${dashboardData.currentEnrollment}/${dashboardData.enrollmentTarget} target`, "info")}
            </div>

            <div class="admissions-overview-grid">
                <div class="admissions-card">
                    <div class="card-header">
                        <h3>Admission Statistics</h3>
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <div class="admission-stats">
                        <div class="admission-stat-item">
                            <span class="stat-label">Acceptance Rate</span>
                            <span class="stat-value success">${dashboardData.admissionStats.acceptanceRate}</span>
                        </div>
                        <div class="admission-stat-item">
                            <span class="stat-label">Enrollment Rate</span>
                            <span class="stat-value info">${dashboardData.admissionStats.enrollmentRate}</span>
                        </div>
                        <div class="admission-stat-item">
                            <span class="stat-label">Average GPA</span>
                            <span class="stat-value primary">${dashboardData.admissionStats.averageGPA}</span>
                        </div>
                        <div class="admission-stat-item">
                            <span class="stat-label">Average Test Score</span>
                            <span class="stat-value secondary">${dashboardData.admissionStats.averageTestScore}</span>
                        </div>
                        <div class="admission-stat-item">
                            <span class="stat-label">International Students</span>
                            <span class="stat-value warning">${dashboardData.admissionStats.internationalStudents}</span>
                        </div>
                    </div>
                </div>

                <div class="admissions-card">
                    <div class="card-header">
                        <h3>Quick Actions</h3>
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="quick-actions">
                        <button class="action-btn primary">
                            <i class="fas fa-search"></i>
                            Review Applications
                        </button>
                        <button class="action-btn success">
                            <i class="fas fa-check"></i>
                            Send Acceptance
                        </button>
                        <button class="action-btn info">
                            <i class="fas fa-video"></i>
                            Schedule Interview
                        </button>
                        <button class="action-btn warning">
                            <i class="fas fa-envelope"></i>
                            Send Notifications
                        </button>
                        <button class="action-btn secondary">
                            <i class="fas fa-cog"></i>
                            Update Criteria
                        </button>
                        <button class="action-btn danger">
                            <i class="fas fa-chart-line"></i>
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>

            <div class="admissions-content-grid">
                <div class="admissions-card">
                    <div class="card-header">
                        <h3>Recent Applications</h3>
                        <a href="#all-applications" class="view-all">View All</a>
                    </div>
                    <div class="applications-list">
                        ${dashboardData.recentApplications.map(renderApplicationItem).join('')}
                    </div>
                </div>

                <div class="admissions-card">
                    <div class="card-header">
                        <h3>Upcoming Tasks</h3>
                        <a href="#all-tasks" class="view-all">View All</a>
                    </div>
                    <div class="tasks-list">
                        ${dashboardData.upcomingTasks.map(renderTaskItem).join('')}
                    </div>
                </div>
            </div>

            <div class="admissions-card">
                <div class="card-header">
                    <h3>Applications by Program</h3>
                    <a href="#program-details" class="view-all">View Details</a>
                </div>
                <div class="programs-grid">
                    ${dashboardData.applicationsByProgram.map(renderProgramCard).join('')}
                </div>
            </div>
        `;
    };

    fetchDashboardData(); // Initial data fetch and render
});
