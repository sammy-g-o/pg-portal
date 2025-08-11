// HOD Submissions Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let submissions = [];
    let filteredSubmissions = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedStatus = '';
    let searchTerm = '';

    // Available options for filters
    const sessions = ['2023/2024', '2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry'];
    const statuses = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Requires Revision'];

    // Initialize the page
    function init() {
        loadSubmissions();
        renderPage();
        setupEventListeners();
    }

    // Load submissions data
    function loadSubmissions() {
        // Simulate API call to fetch submissions
        const mockSubmissions = [
            {
                id: 1,
                studentName: 'John Doe',
                studentId: 'CS/2023/001',
                programme: 'Computer Science',
                session: '2023/2024',
                semester: 'First Semester',
                submissionType: 'Project Proposal',
                title: 'AI-Based Student Management System',
                submissionDate: '2024-01-15',
                status: 'Pending',
                supervisor: 'Dr. Smith Johnson',
                description: 'Development of an intelligent student management system using machine learning algorithms.'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                studentId: 'DS/2023/002',
                programme: 'Data Science',
                session: '2023/2024',
                semester: 'First Semester',
                submissionType: 'Thesis Draft',
                title: 'Big Data Analytics in Healthcare',
                submissionDate: '2024-01-12',
                status: 'Under Review',
                supervisor: 'Prof. Mary Wilson',
                description: 'Analysis of large healthcare datasets to improve patient outcomes and operational efficiency.'
            },
            {
                id: 3,
                studentName: 'Michael Brown',
                studentId: 'CS/2022/003',
                programme: 'Computer Science',
                session: '2023/2024',
                semester: 'Second Semester',
                submissionType: 'Final Project',
                title: 'Blockchain-Based Voting System',
                submissionDate: '2024-01-10',
                status: 'Approved',
                supervisor: 'Dr. Robert Davis',
                description: 'Secure and transparent voting system implementation using blockchain technology.'
            },
            {
                id: 4,
                studentName: 'Sarah Wilson',
                studentId: 'MATH/2023/004',
                programme: 'Mathematics',
                session: '2023/2024',
                semester: 'First Semester',
                submissionType: 'Research Proposal',
                title: 'Advanced Statistical Methods in Finance',
                submissionDate: '2024-01-08',
                status: 'Requires Revision',
                supervisor: 'Dr. Lisa Anderson',
                description: 'Application of advanced statistical techniques for financial risk assessment and modeling.'
            },
            {
                id: 5,
                studentName: 'David Lee',
                studentId: 'PHY/2023/005',
                programme: 'Physics',
                session: '2023/2024',
                semester: 'First Semester',
                submissionType: 'Lab Report',
                title: 'Quantum Mechanics Experiments',
                submissionDate: '2024-01-05',
                status: 'Rejected',
                supervisor: 'Prof. James Taylor',
                description: 'Comprehensive analysis of quantum mechanical phenomena through laboratory experiments.'
            }
        ];
        
        submissions = mockSubmissions;
        filteredSubmissions = mockSubmissions;
    }

    // Render the page content
    function renderPage() {
        const content = document.getElementById('hod-submissions-content');
        content.innerHTML = `
            <div class="hod-submissions-container">
                <div class="hod-submissions-header">
                    <h2>Student Submissions</h2>
                    <p>Manage and review student submissions for your department</p>
                </div>

                <!-- Filters Section -->
                <div class="hod-filters-section">
                    <div class="hod-filters-grid">
                        <div class="hod-filter-group">
                            <label for="session-filter">Session:</label>
                            <select id="session-filter" class="hod-filter-select">
                                <option value="">All Sessions</option>
                                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
                            </select>
                        </div>
                        <div class="hod-filter-group">
                            <label for="semester-filter">Semester:</label>
                            <select id="semester-filter" class="hod-filter-select">
                                <option value="">All Semesters</option>
                                ${semesters.map(semester => `<option value="${semester}">${semester}</option>`).join('')}
                            </select>
                        </div>
                        <div class="hod-filter-group">
                            <label for="programme-filter">Programme:</label>
                            <select id="programme-filter" class="hod-filter-select">
                                <option value="">All Programmes</option>
                                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                            </select>
                        </div>
                        <div class="hod-filter-group">
                            <label for="status-filter">Status:</label>
                            <select id="status-filter" class="hod-filter-select">
                                <option value="">All Statuses</option>
                                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="hod-search-section">
                        <div class="hod-search-box">
                            <input type="text" id="search-input" placeholder="Search by student name, ID, or title..." class="hod-search-input">
                            <button class="hod-search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <button id="clear-filters-btn" class="hod-clear-filters-btn">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                    </div>
                </div>

                <!-- Submissions List -->
                <div class="hod-submissions-list" id="submissions-list">
                    ${renderSubmissionsList()}
                </div>
            </div>
        `;
    }

    // Render submissions list
    function renderSubmissionsList() {
        if (filteredSubmissions.length === 0) {
            return `
                <div class="hod-no-submissions">
                    <i class="fas fa-inbox"></i>
                    <h3>No submissions found</h3>
                    <p>No submissions match the current filters.</p>
                </div>
            `;
        }

        return filteredSubmissions.map(submission => `
            <div class="hod-submission-card" data-id="${submission.id}">
                <div class="hod-submission-header">
                    <div class="hod-submission-title">
                        <h3>${submission.title}</h3>
                        <span class="hod-submission-type">${submission.submissionType}</span>
                    </div>
                    <div class="hod-submission-status">
                        <span class="hod-status-badge hod-status-${submission.status.toLowerCase().replace(' ', '-')}">
                            ${submission.status}
                        </span>
                    </div>
                </div>
                <div class="hod-submission-details">
                    <div class="hod-submission-info">
                        <div class="hod-info-row">
                            <span class="hod-info-label">Student:</span>
                            <span class="hod-info-value">${submission.studentName} (${submission.studentId})</span>
                        </div>
                        <div class="hod-info-row">
                            <span class="hod-info-label">Programme:</span>
                            <span class="hod-info-value">${submission.programme}</span>
                        </div>
                        <div class="hod-info-row">
                            <span class="hod-info-label">Session:</span>
                            <span class="hod-info-value">${submission.session} - ${submission.semester}</span>
                        </div>
                        <div class="hod-info-row">
                            <span class="hod-info-label">Supervisor:</span>
                            <span class="hod-info-value">${submission.supervisor}</span>
                        </div>
                        <div class="hod-info-row">
                            <span class="hod-info-label">Submitted:</span>
                            <span class="hod-info-value">${formatDate(submission.submissionDate)}</span>
                        </div>
                    </div>
                    <div class="hod-submission-description">
                        <p>${submission.description}</p>
                    </div>
                </div>
                <div class="hod-submission-actions">
                    <button class="hod-action-btn hod-view-btn" onclick="viewSubmission(${submission.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="hod-action-btn hod-download-btn" onclick="downloadSubmission(${submission.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <div class="hod-status-actions">
                        <select class="hod-status-select" onchange="updateStatus(${submission.id}, this.value)">
                            <option value="">Change Status</option>
                            ${statuses.map(status => `<option value="${status}" ${status === submission.status ? 'selected' : ''}>${status}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter change events
        document.getElementById('session-filter').addEventListener('change', function(e) {
            selectedSession = e.target.value;
            applyFilters();
        });

        document.getElementById('semester-filter').addEventListener('change', function(e) {
            selectedSemester = e.target.value;
            applyFilters();
        });

        document.getElementById('programme-filter').addEventListener('change', function(e) {
            selectedProgramme = e.target.value;
            applyFilters();
        });

        document.getElementById('status-filter').addEventListener('change', function(e) {
            selectedStatus = e.target.value;
            applyFilters();
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', function(e) {
            searchTerm = e.target.value;
            applyFilters();
        });

        // Clear filters
        document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);
    }

    // Apply filters
    function applyFilters() {
        filteredSubmissions = submissions.filter(submission => {
            const matchesSession = !selectedSession || submission.session === selectedSession;
            const matchesSemester = !selectedSemester || submission.semester === selectedSemester;
            const matchesProgramme = !selectedProgramme || submission.programme === selectedProgramme;
            const matchesStatus = !selectedStatus || submission.status === selectedStatus;
            const matchesSearch = !searchTerm || 
                submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.title.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesSession && matchesSemester && matchesProgramme && matchesStatus && matchesSearch;
        });

        document.getElementById('submissions-list').innerHTML = renderSubmissionsList();
    }

    // Clear all filters
    function clearFilters() {
        selectedSession = '';
        selectedSemester = '';
        selectedProgramme = '';
        selectedStatus = '';
        searchTerm = '';

        document.getElementById('session-filter').value = '';
        document.getElementById('semester-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';

        filteredSubmissions = submissions;
        document.getElementById('submissions-list').innerHTML = renderSubmissionsList();
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Global functions for button actions
    window.viewSubmission = function(submissionId) {
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
            alert(`Viewing submission: ${submission.title}\nStudent: ${submission.studentName}\nStatus: ${submission.status}`);
            // In a real application, this would open a modal or navigate to a detailed view
        }
    };

    window.downloadSubmission = function(submissionId) {
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
            alert(`Downloading submission: ${submission.title}`);
            // In a real application, this would trigger a file download
        }
    };

    window.updateStatus = function(submissionId, newStatus) {
        if (!newStatus) return;
        
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
            submission.status = newStatus;
            // Update the display
            document.getElementById('submissions-list').innerHTML = renderSubmissionsList();
            alert(`Status updated to: ${newStatus}`);
        }
    };

    // Initialize the page
    init();
});

