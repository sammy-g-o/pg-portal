document.addEventListener('DOMContentLoaded', () => {
    const deanPgSchoolDashboardContent = document.getElementById('dean-dashboard-content'); // Reusing the same ID as dean-dashboard for content injection
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
        totalPgProgrammes: 0,
        totalPgStudents: 0,
        totalPgFaculty: 0,
        pendingApplications: 0,
        programmePerformance: [],
        recentApprovals: [],
        pgSchoolStats: {},
        recentActivities: [],
        upcomingDeadlines: []
    };

    // Available options for dropdowns
    const sessions = ['2023/2024', '2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['M.Sc Computer Science', 'M.Sc Data Science', 'Ph.D Computer Science', 'M.Sc Mathematics', 'Ph.D Mathematics', 'MBA'];

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalPgProgrammes: 12,
            totalPgStudents: 456,
            totalPgFaculty: 34,
            pendingApplications: 28,
            programmePerformance: [
                { name: 'M.Sc Computer Science', students: 89, faculty: 8, performance: 94 },
                { name: 'Ph.D Computer Science', students: 23, faculty: 6, performance: 96 },
                { name: 'M.Sc Data Science', students: 67, faculty: 5, performance: 91 },
                { name: 'MBA', students: 145, faculty: 12, performance: 88 },
                { name: 'M.Sc Mathematics', students: 45, faculty: 7, performance: 92 }
            ],
            recentApprovals: [
                { id: 1, type: 'Thesis Defense', programme: 'Ph.D Computer Science', item: 'John Doe Defense', status: 'approved' },
                { id: 2, type: 'Research Proposal', programme: 'M.Sc Data Science', item: 'AI Research Project', status: 'pending' },
                { id: 3, type: 'Programme Update', programme: 'MBA', item: 'Curriculum Revision', status: 'approved' },
                { id: 4, type: 'Faculty Assignment', programme: 'M.Sc Mathematics', item: 'New Supervisor', status: 'pending' }
            ],
            recentActivities: [
                { id: 1, activity: 'New PG student admission approved', time: '2 hours ago', type: 'admission' },
                { id: 2, activity: 'Thesis defense scheduled for Ph.D student', time: '4 hours ago', type: 'academic' },
                { id: 3, activity: 'Research grant application submitted', time: '1 day ago', type: 'research' },
                { id: 4, activity: 'PG programme curriculum updated', time: '2 days ago', type: 'academic' },
                { id: 5, activity: 'Faculty meeting scheduled', time: '3 days ago', type: 'meeting' }
            ],
            upcomingDeadlines: [
                { id: 1, task: 'Thesis submission deadline', date: '2024-02-15', priority: 'high' },
                { id: 2, task: 'Research proposal review', date: '2024-02-20', priority: 'medium' },
                { id: 3, task: 'PG admission interviews', date: '2024-02-25', priority: 'high' },
                { id: 4, task: 'Faculty evaluation reports', date: '2024-03-01', priority: 'medium' }
            ],
            pgSchoolStats: {
                graduationRate: '96.8%',
                researchPublications: 145,
                averageGPA: '3.7',
                employmentRate: '94.2%',
                internationalStudents: 67
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

    // Function to render ProgrammePerformanceItem
    const renderProgrammePerformanceItem = (programme) => `
        <div class="programme-performance-item">
            <div class="programme-info">
                <h4>${programme.name}</h4>
                <p>${programme.students} students • ${programme.faculty} faculty</p>
            </div>
            <div class="performance-score">
                <div class="score-circle">
                    <span>${programme.performance}%</span>
                </div>
            </div>
        </div>
    `;

    // Function to render ApprovalItem
    const renderApprovalItem = (approval) => `
        <div class="approval-item">
            <div class="approval-content">
                <h4>${approval.item}</h4>
                <p>${approval.type} - ${approval.programme}</p>
            </div>
            <div class="approval-status ${approval.status}">
                ${approval.status}
            </div>
        </div>
    `;

    // Function to render ActivityItem
    const renderActivityItem = (activity) => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="${
                    activity.type === 'admission' ? 'fas fa-user-plus' :
                    activity.type === 'academic' ? 'fas fa-graduation-cap' :
                    activity.type === 'research' ? 'fas fa-flask' :
                    activity.type === 'meeting' ? 'fas fa-calendar' :
                    'fas fa-info-circle'
                }"></i>
            </div>
            <div class="activity-content">
                <p><strong>${activity.activity}</strong></p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `;

    // Function to render DeadlineItem
    const renderDeadlineItem = (deadline) => `
        <div class="deadline-item">
            <div class="deadline-content">
                <h4>${deadline.task}</h4>
                <span class="deadline-date">${deadline.date}</span>
            </div>
            <div class="deadline-priority ${deadline.priority}">
                ${deadline.priority}
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
                    <h3>View PG Applications</h3>
                    <button class="modal-close" id="application-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="filter-section">
                        <div class="filter-group">
                            <label>Session:</label>
                            <select id="modal-session-select">
                                <option value="">Select Session</option>
                                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Semester:</label>
                            <select id="modal-semester-select">
                                <option value="">Select Semester</option>
                                ${semesters.map(semester => `<option value="${semester}">${semester}</option>`).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Programme:</label>
                            <select id="modal-programme-select">
                                <option value="">Select Programme</option>
                                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="applications-list">
                        <p>Applications will be displayed here based on selected filters.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderApprovalModal = () => `
        <div class="modal-overlay" id="approval-modal-overlay" style="display: ${showApprovalModal ? 'flex' : 'none'};">
            <div class="modal-content" id="approval-modal-content">
                <div class="modal-header">
                    <h3>Review Approvals</h3>
                    <button class="modal-close" id="approval-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="approvals-list">
                        ${dashboardData.recentApprovals.map(approval => `
                            <div class="approval-item-modal">
                                <div class="approval-info">
                                    <h4>${approval.item}</h4>
                                    <p>${approval.type} - ${approval.programme}</p>
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
        deanPgSchoolDashboardContent.innerHTML = `
            <div class="dean-welcome">
                <h2>Welcome back, Dean of Postgraduate School</h2>
                <p>Postgraduate Academic Programs and Research Management</p>
            </div>

            <div class="dean-stats-grid">
                ${renderStatCard("PG Programmes", dashboardData.totalPgProgrammes, "fas fa-graduation-cap", null, "primary")}
                ${renderStatCard("PG Students", dashboardData.totalPgStudents.toLocaleString(), "fas fa-user-graduate", "Across all programmes", "success")}
                ${renderStatCard("PG Faculty", dashboardData.totalPgFaculty, "fas fa-users", null, "info")}
                ${renderStatCard("Pending Applications", dashboardData.pendingApplications, "fas fa-file-alt", "Requires review", "warning")}
            </div>

            <div class="dean-card">
                <div class="card-header">
                    <h3>Programme Performance</h3>
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="programme-performance-list">
                    ${dashboardData.programmePerformance.map(renderProgrammePerformanceItem).join('')}
                </div>
            </div>

            <div class="dean-overview-grid">
                <div class="dean-card">
                    <div class="card-header">
                        <h3>PG School Performance</h3>
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="college-stats">
                        <div class="college-stat-item">
                            <span class="stat-label">Graduation Rate</span>
                            <span class="stat-value success">${dashboardData.pgSchoolStats.graduationRate}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">Employment Rate</span>
                            <span class="stat-value success">${dashboardData.pgSchoolStats.employmentRate}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">Research Publications</span>
                            <span class="stat-value info">${dashboardData.pgSchoolStats.researchPublications}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">Average GPA</span>
                            <span class="stat-value primary">${dashboardData.pgSchoolStats.averageGPA}</span>
                        </div>
                        <div class="college-stat-item">
                            <span class="stat-label">International Students</span>
                            <span class="stat-value warning">${dashboardData.pgSchoolStats.internationalStudents}</span>
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
                            <i class="fas fa-flask"></i>
                            Research Overview
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
