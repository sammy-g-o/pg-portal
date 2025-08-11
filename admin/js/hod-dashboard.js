document.addEventListener('DOMContentLoaded', () => {
    const hodDashboardContent = document.getElementById('hod-dashboard-content');
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

    // Simulate API call to fetch dashboard data
    const dashboardData = {
        totalStudents: 156,
        totalCourses: 24,
        totalFaculty: 12,
        pendingApplications: 8,
        recentActivities: [
            { id: 1, action: 'New student application', student: 'John Doe', time: '2 hours ago' },
            { id: 2, action: 'Course material updated', course: 'Advanced Statistics', time: '4 hours ago' },
            { id: 3, action: 'Faculty meeting scheduled', details: 'Department Review', time: '1 day ago' },
            { id: 4, action: 'Grade submission', course: 'Research Methodology', time: '2 days ago' }
        ],
        upcomingDeadlines: [
            { id: 1, task: 'Course Registration Deadline', date: '2024-01-15', priority: 'high' },
            { id: 2, task: 'Faculty Performance Review', date: '2024-01-20', priority: 'medium' },
            { id: 3, task: 'Budget Submission', date: '2024-01-25', priority: 'high' },
            { id: 4, task: 'Curriculum Review Meeting', date: '2024-02-01', priority: 'low' }
        ],
        departmentStats: {
            enrollmentTrend: '+12%',
            graduationRate: '94%',
            facultyRatio: '1:13',
            researchProjects: 8
        }
    };

    // Available options for dropdowns
    const sessions = ['2023/2024', '2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry'];

    // Function to render StatCard
    const renderStatCard = (title, value, icon, trend, color = 'primary') => `
        <div class="hod-stat-card ${color}">
            <div class="stat-icon">
                <i class="${icon}"></i>
            </div>
            <div class="stat-content">
                <h3>${value}</h3>
                <p>${title}</p>
                ${trend ? `<span class="stat-trend">${trend}</span>` : ''}
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

    // Main dashboard rendering
    hodDashboardContent.innerHTML = `
        <div class="hod-welcome">
            <h2>Welcome back, Dr. Smith</h2>
            <p>Here's what's happening in your department today.</p>
        </div>

        <div class="hod-stats-grid">
            ${renderStatCard("Total Students", dashboardData.totalStudents, "fas fa-user-graduate", dashboardData.departmentStats.enrollmentTrend, "primary")}
            ${renderStatCard("Active Courses", dashboardData.totalCourses, "fas fa-book", null, "success")}
            ${renderStatCard("Faculty Members", dashboardData.totalFaculty, "fas fa-users", null, "info")}
            ${renderStatCard("Pending Applications", dashboardData.pendingApplications, "fas fa-file-alt", null, "warning")}
        </div>

        <div class="hod-selection-section">
            <div class="hod-card">
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

        <div class="hod-overview-grid">
            <div class="hod-card">
                <div class="card-header">
                    <h3>Department Statistics</h3>
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="dept-stats">
                    <div class="dept-stat-item">
                        <span class="stat-label">Graduation Rate</span>
                        <span class="stat-value success">${dashboardData.departmentStats.graduationRate}</span>
                    </div>
                    <div class="dept-stat-item">
                        <span class="stat-label">Student-Faculty Ratio</span>
                        <span class="stat-value info">${dashboardData.departmentStats.facultyRatio}</span>
                    </div>
                    <div class="dept-stat-item">
                        <span class="stat-label">Active Research Projects</span>
                        <span class="stat-value primary">${dashboardData.departmentStats.researchProjects}</span>
                    </div>
                </div>
            </div>

            <div class="hod-card">
                <div class="card-header">
                    <h3>Quick Actions</h3>
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="quick-actions">
                    <button class="action-btn primary" id="recommend-student-btn">
                        <i class="fas fa-thumbs-up"></i>
                        Recommend Student
                    </button>
                    <button class="action-btn success" id="view-applications-btn">
                        <i class="fas fa-eye"></i>
                        View Applications
                    </button>
                    <button class="action-btn info">
                        <i class="fas fa-user-graduate"></i>
                        View Students
                    </button>
                    <button class="action-btn warning">
                        <i class="fas fa-file-export"></i>
                        Generate Report
                    </button>
                </div>
            </div>
        </div>

        <div class="hod-activity-grid">
            <div class="hod-card">
                <div class="card-header">
                    <h3>Recent Activities</h3>
                    <a href="#all-activities" class="view-all">View All</a>
                </div>
                <div class="activities-list">
                    ${dashboardData.recentActivities.map(renderActivityItem).join('')}
                </div>
            </div>

            <div class="hod-card">
                <div class="card-header">
                    <h3>Upcoming Deadlines</h3>
                    <a href="#all-deadlines" class="view-all">View All</a>
                </div>
                <div class="deadlines-list">
                    ${dashboardData.upcomingDeadlines.map(renderDeadlineItem).join('')}
                </div>
            </div>
        </div>

        <!-- Modals will be appended to body or a specific container -->
    `;

    // Modal elements and state
    let showRecommendModal = false;
    let showApplicationModal = false;

    const renderRecommendModal = () => `
        <div class="modal-overlay" id="recommend-modal-overlay" style="display: ${showRecommendModal ? 'flex' : 'none'};">
            <div class="modal-content" id="recommend-modal-content">
                <div class="modal-header">
                    <h3>Recommend Student</h3>
                    <button class="modal-close" id="recommend-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Student Name</label>
                        <select>
                            <option>Select Student</option>
                            <option>John Doe - CS001</option>
                            <option>Jane Smith - CS002</option>
                            <option>Mike Johnson - CS003</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Recommendation Type</label>
                        <select>
                            <option>Select Type</option>
                            <option value="admission">Admission Recommendation</option>
                            <option value="scholarship">Scholarship Recommendation</option>
                            <option value="academic">Academic Excellence</option>
                            <option value="research">Research Opportunity</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Recommendation Letter</label>
                        <textarea
                            rows="5"
                            placeholder="Write your recommendation letter here..."
                            style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px;"
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label>Priority Level</label>
                        <select>
                            <option>Select Priority</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" id="recommend-modal-cancel">Cancel</button>
                    <button class="btn-primary">Submit Recommendation</button>
                </div>
            </div>
        </div>
    `;

    const renderApplicationModal = () => `
        <div class="modal-overlay" id="application-modal-overlay" style="display: ${showApplicationModal ? 'flex' : 'none'};">
            <div class="modal-content" id="application-modal-content">
                <div class="modal-header">
                    <h3>Current Applicants</h3>
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
                                <button class="btn-success">Recommend</button>
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
                                <button class="btn-success">Recommend</button>
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
                                <button class="btn-success">Recommend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append modals to the body
    document.body.insertAdjacentHTML('beforeend', renderRecommendModal());
    document.body.insertAdjacentHTML('beforeend', renderApplicationModal());

    // Get modal elements after they are rendered
    const recommendModalOverlay = document.getElementById('recommend-modal-overlay');
    const recommendModalCloseBtn = document.getElementById('recommend-modal-close');
    const recommendModalCancelBtn = document.getElementById('recommend-modal-cancel');
    const recommendStudentBtn = document.getElementById('recommend-student-btn');

    const applicationModalOverlay = document.getElementById('application-modal-overlay');
    const applicationModalCloseBtn = document.getElementById('application-modal-close');
    const viewApplicationsBtn = document.getElementById('view-applications-btn');

    // Event listeners for modals
    if (recommendStudentBtn) {
        recommendStudentBtn.addEventListener('click', () => {
            showRecommendModal = true;
            recommendModalOverlay.style.display = 'flex';
        });
    }

    if (recommendModalOverlay) {
        recommendModalOverlay.addEventListener('click', (e) => {
            if (e.target === recommendModalOverlay) {
                showRecommendModal = false;
                recommendModalOverlay.style.display = 'none';
            }
        });
    }

    if (recommendModalCloseBtn) {
        recommendModalCloseBtn.addEventListener('click', () => {
            showRecommendModal = false;
            recommendModalOverlay.style.display = 'none';
        });
    }

    if (recommendModalCancelBtn) {
        recommendModalCancelBtn.addEventListener('click', () => {
            showRecommendModal = false;
            recommendModalOverlay.style.display = 'none';
        });
    }

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
});
