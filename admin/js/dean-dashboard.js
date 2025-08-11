document.addEventListener('DOMContentLoaded', () => {
    const deanDashboardContent = document.getElementById('dean-dashboard-content');
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
        totalDepartments: 0,
        totalStudents: 0,
        totalFaculty: 0,
        pendingApplications: 0,
        departmentPerformance: [],
        recentApprovals: [],
        collegeStats: {},
        recentActivities: [],
        upcomingDeadlines: []
    };

    // Available options for dropdowns
    const sessions = ['2023/2024', '2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalDepartments: 8,
            totalStudents: 1247,
            totalFaculty: 89,
            pendingApplications: 45,
            departmentPerformance: [
                { name: 'Computer Science', students: 245, faculty: 18, performance: 92 },
                { name: 'Mathematics', students: 189, faculty: 15, performance: 88 },
                { name: 'Physics', students: 156, faculty: 12, performance: 85 },
                { name: 'Chemistry', students: 198, faculty: 16, performance: 90 },
                { name: 'Biology', students: 167, faculty: 14, performance: 87 }
            ],
            recentApprovals: [
                { id: 1, type: 'Faculty Hiring', department: 'Computer Science', item: 'Assistant Professor', status: 'pending' },
                { id: 2, type: 'Research Grant', department: 'Mathematics', item: 'Statistics Research', status: 'approved' },
                { id: 3, type: 'Department Request', department: 'Physics', item: 'Lab Upgrade', status: 'pending' },
                { id: 4, type: 'Academic Program', department: 'Chemistry', item: 'New Curriculum', status: 'approved' }
            ],
            recentActivities: [
                { id: 1, action: 'New student application', student: 'Alice Johnson', time: '2 hours ago' },
                { id: 2, action: 'Faculty meeting scheduled', details: 'College Review', time: '4 hours ago' },
                { id: 3, action: 'Department submission', course: 'Research Proposal', time: '6 hours ago' },
                { id: 4, action: 'Student admission', details: 'Computer Science', time: '1 day ago' }
            ],
            upcomingDeadlines: [
                { id: 1, task: 'Faculty Performance Review', date: '2024-01-20', priority: 'high' },
                { id: 2, task: 'Academic Calendar Planning', date: '2024-01-25', priority: 'medium' },
                { id: 3, task: 'Curriculum Review Meeting', date: '2024-02-01', priority: 'high' },
                { id: 4, task: 'Student Admission Deadline', date: '2024-02-15', priority: 'medium' }
            ],
            collegeStats: {
                graduationRate: '96%',
                employmentRate: '94%',
                researchPublications: 156,
                activeProjects: 23
            }
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="dean-stat-card ${color}">
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

    // Function to render DepartmentCard
    const renderDepartmentCard = (department) => `
        <div class="department-card">
            <div class="dept-header">
                <h4>${department.name}</h4>
                <span class="performance-badge ${department.performance >= 90 ? 'excellent' : department.performance >= 85 ? 'good' : 'average'}">
                    ${department.performance}%
                </span>
            </div>
            <div class="dept-stats">
                <div class="dept-stat">
                    <span class="stat-label">Students</span>
                    <span class="stat-value">${department.students}</span>
                </div>
                <div class="dept-stat">
                    <span class="stat-label">Faculty</span>
                    <span class="stat-value">${department.faculty}</span>
                </div>
            </div>
        </div>
    `;

    // Function to render ActivityItem
    const renderActivityItem = (activity) => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-bell"></i>
            </div>
            <div class="activity-content">
                <p><strong>${activity.action}</strong></p>
                <p class="activity-details">${activity.student || activity.course || activity.details}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `;

    // Function to render DeadlineItem
    const renderDeadlineItem = (deadline) => `
        <div class="deadline-item priority-${deadline.priority}">
            <div class="deadline-content">
                <h4>${deadline.task}</h4>
                <p>${deadline.date}</p>
            </div>
            <div class="deadline-priority ${deadline.priority}">
                ${deadline.priority}
            </div>
        </div>
    `;

    // Function to render ApprovalItem
    const renderApprovalItem = (approval) => `
        <div class="approval-item">
            <div class="approval-content">
                <h4>${approval.item}</h4>
                <p>${approval.type} - ${approval.department}</p>
            </div>
            <div class="approval-status ${approval.status}">
                ${approval.status}
            </div>
        </div>
    `;

    // Modals state
    let showApplicationModal = false;
    let showApprovalModal = false;

    const renderApplicationModal = () => `
        <div class="modal-overlay" id="application-modal-overlay" style="display: ${showApplicationModal ? 'flex' : 'none'};">
            <div class="modal-content" id="application-modal-content">
                <div class="modal-header">
                    <h3>Current Applicants - College Wide</h3>
                    <button class="modal-close" id="application-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="application-list">
                        <div class="application-item-modal">
                            <div class="applicant-info">
                                <h4>John Doe</h4>
                                <p>Computer Science Program</p>
                                <span class="gpa">GPA: 3.8</span>
                                <span class="status">Status: Under Review</span>
                            </div>
                            <div class="application-actions">
                                <button class="btn-info">View Details</button>
                                <button class="btn-success">Forward to HOD</button>
                            </div>
                        </div>
                        <div class="application-item-modal">
                            <div class="applicant-info">
                                <h4>Jane Smith</h4>
                                <p>Data Science Program</p>
                                <span class="gpa">GPA: 3.9</span>
                                <span class="status">Status: Pending Review</span>
                            </div>
                            <div class="application-actions">
                                <button class="btn-info">View Details</button>
                                <button class="btn-success">Forward to HOD</button>
                            </div>
                        </div>
                        <div class="application-item-modal">
                            <div class="applicant-info">
                                <h4>Mike Johnson</h4>
                                <p>Mathematics Program</p>
                                <span class="gpa">GPA: 3.7</span>
                                <span class="status">Status: Documents Submitted</span>
                            </div>
                            <div class="application-actions">
                                <button class="btn-info">View Details</button>
                                <button class="btn-success">Forward to HOD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderApprovalModal = () => `
        <div class="modal-overlay" id="approval-modal-overlay" style="display: ${showApprovalModal ? 'flex' : 'none'};">
            <div class="modal-content" id="approval-modal-content">
                <div class="modal-header">
                    <h3>Pending Approvals</h3>
                    <button class="modal-close" id="approval-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="approval-list">
                        ${dashboardData.recentApprovals.map(approval => `
                            <div class="approval-item-modal">
                                <div class="approval-info">
                                    <h4>${approval.item}</h4>
                                    <p>${approval.type} - ${approval.department}</p>
                                    <span class="status ${approval.status}">${approval.status}</span>
                                </div>
                                <div class="approval-actions">
                                    <button class="btn-success">Approve</button>
                                    <button class="btn-danger">Reject</button>
                                    <button class="btn-info">Review</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderDashboard = () => {
        deanDashboardContent.innerHTML = `
            <div class="dean-welcome">
                <h2>Welcome back, Dean Johnson</h2>
                <p>College of Science and Technology Overview</p>
            </div>

            <div class="dean-stats-grid">
                ${renderStatCard("Departments", dashboardData.totalDepartments, "fas fa-building", null, "primary")}
                ${renderStatCard("Total Students", dashboardData.totalStudents.toLocaleString(), "fas fa-user-graduate", "Across all departments", "success")}
                ${renderStatCard("Faculty Members", dashboardData.totalFaculty, "fas fa-users", null, "info")}
                ${renderStatCard("Pending Applications", dashboardData.pendingApplications, "fas fa-file-alt", "Requires review", "warning")}
            </div>

            <div class="dean-selection-section">
                <div class="dean-card">
                    <div class="card-header">
                        <h3>Academic Information</h3>
                        <i class="fas fa-cog"></i>
                    </div>
                    <div class="selection-controls">
                        <div class="selection-group">
                            <label htmlFor="session-select">Session</label>
                            <select id="session-select" class="selection-dropdown">
                                <option value="">Select Session</option>
                                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
                            </select>
                        </div>

                        <div class="selection-group">
                            <label htmlFor="semester-select">Semester</label>
                            <select id="semester-select" class="selection-dropdown">
                                <option value="">Select Semester</option>
                                ${semesters.map(semester => `<option value="${semester}">${semester}</option>`).join('')}
                            </select>
                        </div>

                        <div class="selection-group">
                            <label htmlFor="programme-select">Programme</label>
                            <select id="programme-select" class="selection-dropdown">
                                <option value="">Select Programme</option>
                                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dean-overview-grid">
                <div class="dean-card">
                    <div class="card-header">
                        <h3>College Performance</h3>
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="college-stats">
                        <div class="college-stat-item">
                            <span class="stat-label">Graduation Rate</span>
                            <span class="stat-value success">${dashboardData.collegeStats.graduationRate}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">Employment Rate</span>
                            <span class="stat-value success">${dashboardData.collegeStats.employmentRate}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">Research Publications</span>
                            <span class="stat-value info">${dashboardData.collegeStats.researchPublications}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">Active Projects</span>
                            <span class="stat-value primary">${dashboardData.collegeStats.activeProjects}</span>
                        </div>
                    </div>
                </div>

                <div class="dean-card">
                    <div class="card-header">
                        <h3>Quick Actions</h3>
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="quick-actions">
                        <button class="action-btn primary" id="view-applications-btn">
                            <i class="fas fa-eye"></i>
                            View Applications
                        </button>
                        <button class="action-btn success" id="review-approvals-btn">
                            <i class="fas fa-check"></i>
                            Review Approvals
                        </button>
                        <button class="action-btn info">
                            <i class="fas fa-user-graduate"></i>
                            View Students
                        </button>
                        <button class="action-btn warning">
                            <i class="fas fa-file-export"></i>
                            Generate Report
                        </button>
                        <button class="action-btn secondary">
                            <i class="fas fa-calendar"></i>
                            Schedule Meeting
                        </button>
                        <button class="action-btn danger">
                            <i class="fas fa-chart-bar"></i>
                            College Analytics
                        </button>
                    </div>
                </div>
            </div>

            <div class="dean-content-grid">
                <div class="dean-card">
                    <div class="card-header">
                        <h3>Recent Activities</h3>
                        <a href="#all-activities" class="view-all">View All</a>
                    </div>
                    <div class="activities-list">
                        ${dashboardData.recentActivities.map(renderActivityItem).join('')}
                    </div>
                </div>

                <div class="dean-card">
                    <div class="card-header">
                        <h3>Upcoming Deadlines</h3>
                        <a href="#all-deadlines" class="view-all">View All</a>
                    </div>
                    <div class="deadlines-list">
                        ${dashboardData.upcomingDeadlines.map(renderDeadlineItem).join('')}
                    </div>
                </div>
            </div>

            <div class="dean-card">
                <div class="card-header">
                    <h3>Department Performance</h3>
                    <a href="#all-departments" class="view-all">View All</a>
                </div>
                <div class="departments-grid">
                    ${dashboardData.departmentPerformance.map(renderDepartmentCard).join('')}
                </div>
            </div>
        `;

        // Append modals to the body
        document.body.insertAdjacentHTML('beforeend', renderApplicationModal());
        document.body.insertAdjacentHTML('beforeend', renderApprovalModal());

        // Get modal elements after they are rendered
        const applicationModalOverlay = document.getElementById('application-modal-overlay');
        const applicationModalCloseBtn = document.getElementById('application-modal-close');
        const viewApplicationsBtn = document.getElementById('view-applications-btn');

        const approvalModalOverlay = document.getElementById('approval-modal-overlay');
        const approvalModalCloseBtn = document.getElementById('approval-modal-close');
        const reviewApprovalsBtn = document.getElementById('review-approvals-btn');

        // Event listeners for modals
        if (viewApplicationsBtn) {
            viewApplicationsBtn.addEventListener('click', () => {
                showApplicationModal = true;
                applicationModalOverlay.style.display = 'flex';
            });
        }

        if (applicationModalOverlay) {
            applicationModalOverlay.addEventListener('click', (e) => {
                if (e.target === applicationModalOverlay) {
                    showApplicationModal = false;
                    applicationModalOverlay.style.display = 'none';
                }
            });
        }

        if (applicationModalCloseBtn) {
            applicationModalCloseBtn.addEventListener('click', () => {
                showApplicationModal = false;
                applicationModalOverlay.style.display = 'none';
            });
        }

        if (reviewApprovalsBtn) {
            reviewApprovalsBtn.addEventListener('click', () => {
                showApprovalModal = true;
                approvalModalOverlay.style.display = 'flex';
            });
        }

        if (approvalModalOverlay) {
            approvalModalOverlay.addEventListener('click', (e) => {
                if (e.target === approvalModalOverlay) {
                    showApprovalModal = false;
                    approvalModalOverlay.style.display = 'none';
                }
            });
        }

        if (approvalModalCloseBtn) {
            approvalModalCloseBtn.addEventListener('click', () => {
                showApprovalModal = false;
                approvalModalOverlay.style.display = 'none';
            });
        }
    };

    fetchDashboardData(); // Initial data fetch and render
});
