document.addEventListener('DOMContentLoaded', () => {
    const registrarDashboardContent = document.getElementById('registrar-dashboard-content');
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
        totalStudents: 0,
        activeCourses: 0,
        pendingRegistrations: 0,
        transcriptRequests: 0,
        semesterStats: {},
        recentRegistrations: [],
        upcomingDeadlines: [],
        academicCalendar: [],
        graduationCandidates: 0
    };

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalStudents: 2847,
            activeCourses: 156,
            pendingRegistrations: 23,
            transcriptRequests: 12,
            graduationCandidates: 89,
            semesterStats: {
                currentSemester: 'Spring 2024',
                enrolledStudents: 2847,
                completedCourses: 1234,
                averageGPA: 3.42,
                graduationRate: '94%'
            },
            recentRegistrations: [
                { id: 1, student: 'Alice Johnson', course: 'Advanced Statistics', status: 'approved', time: '2 hours ago' },
                { id: 2, student: 'Bob Smith', course: 'Research Methodology', status: 'pending', time: '4 hours ago' },
                { id: 3, student: 'Carol Davis', course: 'Data Analysis', status: 'approved', time: '6 hours ago' },
                { id: 4, student: 'David Wilson', course: 'Machine Learning', status: 'pending', time: '8 hours ago' }
            ],
            upcomingDeadlines: [
                { id: 1, event: 'Course Registration Deadline', date: '2024-01-15', type: 'registration' },
                { id: 2, event: 'Add/Drop Period Ends', date: '2024-01-22', type: 'academic' },
                { id: 3, event: 'Mid-term Exam Period', date: '2024-02-15', type: 'exam' },
                { id: 4, event: 'Graduation Application Deadline', date: '2024-03-01', type: 'graduation' }
            ],
            academicCalendar: [
                { id: 1, event: 'Spring Semester Begins', date: '2024-01-08', status: 'completed' },
                { id: 2, event: 'Late Registration Period', date: '2024-01-15', status: 'active' },
                { id: 3, event: 'Presidents Day Holiday', date: '2024-02-19', status: 'upcoming' },
                { id: 4, event: 'Spring Break', date: '2024-03-11', status: 'upcoming' }
            ]
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="registrar-stat-card ${color}">
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

    // Function to render RegistrationItem
    const renderRegistrationItem = (registration) => `
        <div class="registration-item">
            <div class="registration-content">
                <h4>${registration.student}</h4>
                <p>${registration.course}</p>
                <span class="registration-time">${registration.time}</span>
            </div>
            <div class="registration-status ${registration.status}">
                ${registration.status}
            </div>
        </div>
    `;

    // Function to render DeadlineItem
    const renderDeadlineItem = (deadline) => `
        <div class="deadline-item ${deadline.type}">
            <div class="deadline-content">
                <h4>${deadline.event}</h4>
                <p>${deadline.date}</p>
            </div>
            <div class="deadline-type ${deadline.type}">
                ${deadline.type}
            </div>
        </div>
    `;

    // Function to render CalendarItem
    const renderCalendarItem = (event) => `
        <div class="calendar-item ${event.status}">
            <div class="calendar-date">
                ${new Date(event.date).getDate()}
                <span>${new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
            <div class="calendar-content">
                <h4>${event.event}</h4>
                <span class="calendar-status ${event.status}">${event.status}</span>
            </div>
        </div>
    `;

    const renderDashboard = () => {
        registrarDashboardContent.innerHTML = `
            <div class="registrar-welcome">
                <h2>Welcome back, Secretary Thompson</h2>
                <p>Postgraduate School Academic Records Management</p>
            </div>

            <div class="registrar-stats-grid">
                ${renderStatCard("Total Students", dashboardData.totalStudents.toLocaleString(), "fas fa-user-graduate", "All programs", "primary")}
                ${renderStatCard("Active Courses", dashboardData.activeCourses, "fas fa-book", "This semester", "success")}
                ${renderStatCard("Pending Registrations", dashboardData.pendingRegistrations, "fas fa-clock", null, "warning")}
                ${renderStatCard("Transcript Requests", dashboardData.transcriptRequests, "fas fa-file-alt", null, "info")}
            </div>

            <div class="registrar-overview-grid">
                <div class="registrar-card">
                    <div class="card-header">
                        <h3>Semester Overview</h3>
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="semester-stats">
                        <div class="semester-header">
                            <h4>${dashboardData.semesterStats.currentSemester}</h4>
                        </div>
                        <div class="semester-metrics">
                            <div class="semester-metric">
                                <span class="metric-label">Enrolled Students</span>
                                <span class="metric-value">${dashboardData.semesterStats.enrolledStudents?.toLocaleString()}</span>
                            </div>
                            <div class="semester-metric">
                                <span class="metric-label">Completed Courses</span>
                                <span class="metric-value">${dashboardData.semesterStats.completedCourses?.toLocaleString()}</span>
                            </div>
                            <div class="semester-metric">
                                <span class="metric-label">Average GPA</span>
                                <span class="metric-value">${dashboardData.semesterStats.averageGPA}</span>
                            </div>
                            <div class="semester-metric">
                                <span class="metric-label">Graduation Rate</span>
                                <span class="metric-value success">${dashboardData.semesterStats.graduationRate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="registrar-card">
                    <div class="card-header">
                        <h3>Quick Actions</h3>
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="quick-actions">
                        <button class="action-btn primary">
                            <i class="fas fa-user-plus"></i>
                            Register Student
                        </button>
                        <button class="action-btn success">
                            <i class="fas fa-check"></i>
                            Approve Registration
                        </button>
                        <button class="action-btn info">
                            <i class="fas fa-file-export"></i>
                            Generate Transcript
                        </button>
                        <button class="action-btn warning">
                            <i class="fas fa-graduation-cap"></i>
                            Process Graduation
                        </button>
                        <button class="action-btn secondary">
                            <i class="fas fa-calendar"></i>
                            Update Schedule
                        </button>
                        <button class="action-btn danger">
                            <i class="fas fa-chart-bar"></i>
                            Academic Report
                        </button>
                    </div>
                </div>
            </div>

            <div class="registrar-content-grid">
                <div class="registrar-card">
                    <div class="card-header">
                        <h3>Recent Registrations</h3>
                        <a href="#all-registrations" class="view-all">View All</a>
                    </div>
                    <div class="registrations-list">
                        ${dashboardData.recentRegistrations.map(renderRegistrationItem).join('')}
                    </div>
                </div>

                <div class="registrar-card">
                    <div class="card-header">
                        <h3>Academic Calendar</h3>
                        <a href="#full-calendar" class="view-all">View Full Calendar</a>
                    </div>
                    <div class="calendar-list">
                        ${dashboardData.academicCalendar.map(renderCalendarItem).join('')}
                    </div>
                </div>
            </div>

            <div class="registrar-card">
                <div class="card-header">
                    <h3>Upcoming Academic Deadlines</h3>
                    <a href="#all-deadlines" class="view-all">View All</a>
                </div>
                <div class="deadlines-grid">
                    ${dashboardData.upcomingDeadlines.map(renderDeadlineItem).join('')}
                </div>
            </div>
        `;
    };

    fetchDashboardData(); // Initial data fetch and render
});
