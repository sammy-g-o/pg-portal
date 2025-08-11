// HOD Current Applicants Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let currentApplicants = [];
    let filteredApplicants = [];
    let selectedProgramme = '';
    let selectedStatus = '';
    let searchTerm = '';

    // Available options for filters
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry'];
    const statuses = ['Pending Review', 'Under Review', 'Recommended', 'Not Recommended', 'Waitlisted'];

    // Initialize the page
    function init() {
        loadCurrentApplicants();
        renderPage();
        setupEventListeners();
    }

    // Load current applicants data
    function loadCurrentApplicants() {
        const mockCurrentApplicants = [
            {
                id: 1,
                applicantName: 'Alice Johnson',
                applicantId: 'APP/2025/001',
                programme: 'Computer Science',
                applicationDate: '2024-12-15',
                status: 'Pending Review',
                gpa: '3.85',
                undergraduateDegree: 'B.Sc. Computer Science',
                researchInterest: 'Machine Learning and AI',
                supervisor: 'Dr. Smith Johnson',
                email: 'alice.johnson@email.com'
            },
            {
                id: 2,
                applicantName: 'Bob Wilson',
                applicantId: 'APP/2025/002',
                programme: 'Data Science',
                applicationDate: '2024-12-10',
                status: 'Under Review',
                gpa: '3.92',
                undergraduateDegree: 'B.Sc. Statistics',
                researchInterest: 'Big Data Analytics',
                supervisor: 'Prof. Mary Wilson',
                email: 'bob.wilson@email.com'
            }
        ];
        
        currentApplicants = mockCurrentApplicants;
        filteredApplicants = mockCurrentApplicants;
    }

    // Render the page content
    function renderPage() {
        const content = document.getElementById('hod-current-applicants-content');
        content.innerHTML = `
            <div class="hod-current-applicants-container">
                <div class="hod-current-applicants-header">
                    <h2>Current Applicants</h2>
                    <p>Review and manage current applications for your department</p>
                </div>

                <!-- Filters Section -->
                <div class="hod-filters-section">
                    <div class="hod-filters-grid">
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
                            <input type="text" id="search-input" placeholder="Search by applicant name or ID..." class="hod-search-input">
                            <button class="hod-search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <button id="clear-filters-btn" class="hod-clear-filters-btn">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                    </div>
                </div>

                <!-- Applicants List -->
                <div class="hod-applicants-list" id="applicants-list">
                    ${renderApplicantsList()}
                </div>
            </div>
        `;
    }

    // Render applicants list
    function renderApplicantsList() {
        if (filteredApplicants.length === 0) {
            return `
                <div class="hod-no-applicants">
                    <i class="fas fa-user-plus"></i>
                    <h3>No applicants found</h3>
                    <p>No current applicants match the current filters.</p>
                </div>
            `;
        }

        return filteredApplicants.map(applicant => `
            <div class="hod-applicant-card" data-id="${applicant.id}">
                <div class="hod-applicant-header">
                    <div class="hod-applicant-info">
                        <h3>${applicant.applicantName}</h3>
                        <span class="hod-applicant-id">${applicant.applicantId}</span>
                    </div>
                    <div class="hod-applicant-status">
                        <span class="hod-status-badge hod-status-${applicant.status.toLowerCase().replace(' ', '-')}">
                            ${applicant.status}
                        </span>
                    </div>
                </div>
                <div class="hod-applicant-details">
                    <div class="hod-applicant-academic">
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">Programme:</span>
                            <span class="hod-academic-value">${applicant.programme}</span>
                        </div>
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">GPA:</span>
                            <span class="hod-academic-value">${applicant.gpa}</span>
                        </div>
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">Degree:</span>
                            <span class="hod-academic-value">${applicant.undergraduateDegree}</span>
                        </div>
                    </div>
                    <div class="hod-applicant-research">
                        <h4>Research Interest:</h4>
                        <p>${applicant.researchInterest}</p>
                        <div class="hod-supervisor-info">
                            <span class="hod-supervisor-label">Supervisor:</span>
                            <span class="hod-supervisor-name">${applicant.supervisor}</span>
                        </div>
                    </div>
                </div>
                <div class="hod-applicant-actions">
                    <button class="hod-action-btn hod-view-btn" onclick="viewApplicant(${applicant.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="hod-action-btn hod-download-btn" onclick="downloadApplication(${applicant.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <div class="hod-status-actions">
                        <select class="hod-status-select" onchange="updateApplicantStatus(${applicant.id}, this.value)">
                            <option value="">Change Status</option>
                            ${statuses.map(status => `<option value="${status}" ${status === applicant.status ? 'selected' : ''}>${status}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Setup event listeners
    function setupEventListeners() {
        document.getElementById('programme-filter').addEventListener('change', function(e) {
            selectedProgramme = e.target.value;
            applyFilters();
        });

        document.getElementById('status-filter').addEventListener('change', function(e) {
            selectedStatus = e.target.value;
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
        filteredApplicants = currentApplicants.filter(applicant => {
            const matchesProgramme = !selectedProgramme || applicant.programme === selectedProgramme;
            const matchesStatus = !selectedStatus || applicant.status === selectedStatus;
            const matchesSearch = !searchTerm || 
                applicant.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.applicantId.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesProgramme && matchesStatus && matchesSearch;
        });

        document.getElementById('applicants-list').innerHTML = renderApplicantsList();
    }

    // Clear all filters
    function clearFilters() {
        selectedProgramme = '';
        selectedStatus = '';
        searchTerm = '';

        document.getElementById('programme-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';

        filteredApplicants = currentApplicants;
        document.getElementById('applicants-list').innerHTML = renderApplicantsList();
    }

    // Global functions for button actions
    window.viewApplicant = function(applicantId) {
        const applicant = currentApplicants.find(a => a.id === applicantId);
        if (applicant) {
            alert(`Viewing applicant: ${applicant.applicantName}\nStatus: ${applicant.status}`);
        }
    };

    window.downloadApplication = function(applicantId) {
        const applicant = currentApplicants.find(a => a.id === applicantId);
        if (applicant) {
            alert(`Downloading application for: ${applicant.applicantName}`);
        }
    };

    window.updateApplicantStatus = function(applicantId, newStatus) {
        if (!newStatus) return;
        
        const applicant = currentApplicants.find(a => a.id === applicantId);
        if (applicant) {
            applicant.status = newStatus;
            document.getElementById('applicants-list').innerHTML = renderApplicantsList();
            alert(`Status updated to: ${newStatus}`);
        }
    };

    // Initialize the page
    init();
});
