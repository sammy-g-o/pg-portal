// Dean Submissions Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let submissions = [];
    let filteredSubmissions = [];
    let selectedDepartment = '';
    let selectedStatus = '';
    let selectedType = '';
    let searchTerm = '';

    // Available options for filters
    const departments = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const statuses = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Requires Revision'];
    const types = ['Project Proposal', 'Thesis Draft', 'Final Project', 'Research Proposal', 'Lab Report'];

    // Initialize the page
    function init() {
        loadSubmissions();
        renderPage();
        setupEventListeners();
    }

    // Load submissions data
    function loadSubmissions() {
        const mockSubmissions = [
            {
                id: 1,
                studentName: 'John Doe',
                studentId: 'CS/2023/001',
                department: 'Computer Science',
                submissionType: 'Project Proposal',
                title: 'AI-Based Student Management System',
                submissionDate: '2024-01-15',
                status: 'Pending',
                supervisor: 'Dr. Smith Johnson',
                hodRecommendation: 'Recommended',
                description: 'Development of an intelligent student management system using machine learning algorithms.'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                studentId: 'DS/2023/002',
                department: 'Data Science',
                submissionType: 'Thesis Draft',
                title: 'Big Data Analytics in Healthcare',
                submissionDate: '2024-01-12',
                status: 'Under Review',
                supervisor: 'Prof. Mary Wilson',
                hodRecommendation: 'Recommended',
                description: 'Analysis of large healthcare datasets to improve patient outcomes and operational efficiency.'
            },
            {
                id: 3,
                studentName: 'Michael Brown',
                studentId: 'CS/2022/003',
                department: 'Computer Science',
                submissionType: 'Final Project',
                title: 'Blockchain-Based Voting System',
                submissionDate: '2024-01-10',
                status: 'Approved',
                supervisor: 'Dr. Robert Davis',
                hodRecommendation: 'Recommended',
                description: 'Secure and transparent voting system implementation using blockchain technology.'
            }
        ];
        
        submissions = mockSubmissions;
        filteredSubmissions = mockSubmissions;
    }

    // Render the page content
    function renderPage() {
        const content = document.getElementById('dean-submissions-content');
        content.innerHTML = `
            <div class="dean-submissions-container">
                <div class="dean-submissions-header">
                    <h2>Faculty Submissions Review</h2>
                    <p>Review and approve submissions from all departments</p>
                </div>

                <!-- Filters Section -->
                <div class="dean-filters-section">
                    <div class="dean-filters-grid">
                        <div class="dean-filter-group">
                            <label for="department-filter">Department:</label>
                            <select id="department-filter" class="dean-filter-select">
                                <option value="">All Departments</option>
                                ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                            </select>
                        </div>
                        <div class="dean-filter-group">
                            <label for="status-filter">Status:</label>
                            <select id="status-filter" class="dean-filter-select">
                                <option value="">All Statuses</option>
                                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                            </select>
                        </div>
                        <div class="dean-filter-group">
                            <label for="type-filter">Type:</label>
                            <select id="type-filter" class="dean-filter-select">
                                <option value="">All Types</option>
                                ${types.map(type => `<option value="${type}">${type}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="dean-search-section">
                        <div class="dean-search-box">
                            <input type="text" id="search-input" placeholder="Search by student name, ID, or title..." class="dean-search-input">
                            <button class="dean-search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <button id="clear-filters-btn" class="dean-clear-filters-btn">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                    </div>
                </div>

                <!-- Submissions List -->
                <div class="dean-submissions-list" id="submissions-list">
                    ${renderSubmissionsList()}
                </div>
            </div>
        `;
    }

    // Render submissions list
    function renderSubmissionsList() {
        if (filteredSubmissions.length === 0) {
            return `
                <div class="dean-no-submissions">
                    <i class="fas fa-inbox"></i>
                    <h3>No submissions found</h3>
                    <p>No submissions match the current filters.</p>
                </div>
            `;
        }

        return filteredSubmissions.map(submission => `
            <div class="dean-submission-card" data-id="${submission.id}">
                <div class="dean-submission-header">
                    <div class="dean-submission-title">
                        <h3>${submission.title}</h3>
                        <span class="dean-submission-type">${submission.submissionType}</span>
                    </div>
                    <div class="dean-submission-status">
                        <span class="dean-status-badge dean-status-${submission.status.toLowerCase().replace(' ', '-')}">
                            ${submission.status}
                        </span>
                    </div>
                </div>
                <div class="dean-submission-details">
                    <div class="dean-submission-info">
                        <div class="dean-info-row">
                            <span class="dean-info-label">Student:</span>
                            <span class="dean-info-value">${submission.studentName} (${submission.studentId})</span>
                        </div>
                        <div class="dean-info-row">
                            <span class="dean-info-label">Department:</span>
                            <span class="dean-info-value">${submission.department}</span>
                        </div>
                        <div class="dean-info-row">
                            <span class="dean-info-label">Supervisor:</span>
                            <span class="dean-info-value">${submission.supervisor}</span>
                        </div>
                        <div class="dean-info-row">
                            <span class="dean-info-label">HOD Recommendation:</span>
                            <span class="dean-info-value dean-recommendation-${submission.hodRecommendation.toLowerCase()}">${submission.hodRecommendation}</span>
                        </div>
                        <div class="dean-info-row">
                            <span class="dean-info-label">Submitted:</span>
                            <span class="dean-info-value">${formatDate(submission.submissionDate)}</span>
                        </div>
                    </div>
                    <div class="dean-submission-description">
                        <p>${submission.description}</p>
                    </div>
                </div>
                <div class="dean-submission-actions">
                    <button class="dean-action-btn dean-view-btn" onclick="viewSubmission(${submission.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="dean-action-btn dean-download-btn" onclick="downloadSubmission(${submission.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <div class="dean-status-actions">
                        <select class="dean-status-select" onchange="updateStatus(${submission.id}, this.value)">
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
        document.getElementById('department-filter').addEventListener('change', function(e) {
            selectedDepartment = e.target.value;
            applyFilters();
        });

        document.getElementById('status-filter').addEventListener('change', function(e) {
            selectedStatus = e.target.value;
            applyFilters();
        });

        document.getElementById('type-filter').addEventListener('change', function(e) {
            selectedType = e.target.value;
            applyFilters();
        });

        document.getElementById('search-input').addEventListener('input', function(e) {
            searchTerm = e.target.value;
            applyFilters();
        });

        document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);
    }

    // Apply filters
    function applyFilters() {
        filteredSubmissions = submissions.filter(submission => {
            const matchesDepartment = !selectedDepartment || submission.department === selectedDepartment;
            const matchesStatus = !selectedStatus || submission.status === selectedStatus;
            const matchesType = !selectedType || submission.submissionType === selectedType;
            const matchesSearch = !searchTerm || 
                submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                submission.title.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesDepartment && matchesStatus && matchesType && matchesSearch;
        });

        document.getElementById('submissions-list').innerHTML = renderSubmissionsList();
    }

    // Clear all filters
    function clearFilters() {
        selectedDepartment = '';
        selectedStatus = '';
        selectedType = '';
        searchTerm = '';

        document.getElementById('department-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('type-filter').value = '';
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
        }
    };

    window.downloadSubmission = function(submissionId) {
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
            alert(`Downloading submission: ${submission.title}`);
        }
    };

    window.updateStatus = function(submissionId, newStatus) {
        if (!newStatus) return;
        
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
            submission.status = newStatus;
            document.getElementById('submissions-list').innerHTML = renderSubmissionsList();
            alert(`Status updated to: ${newStatus}`);
        }
    };

    // Initialize the page
    init();
});

