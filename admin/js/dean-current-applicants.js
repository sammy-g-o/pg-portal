// Dean Current Applicants Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let applicants = [];
    let filteredApplicants = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedDepartment = '';
    let selectedStatus = '';
    let searchTerm = '';

    const sessions = ['2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const statuses = ['Submitted', 'Under HOD Review', 'HOD Recommended', 'Dean Review', 'Interview Scheduled', 'Approved', 'Rejected'];

    function init() {
        loadApplicants();
        setupEventListeners();
    }

    function loadApplicants() {
        // Mock data for current applicants
        applicants = [
            {
                id: 1,
                applicantName: 'Jennifer Adams',
                applicationId: 'APP/2024/001',
                programme: 'Computer Science',
                department: 'Computer Science',
                session: '2024/2025',
                semester: 'First Semester',
                applicationDate: '2024-01-20',
                status: 'HOD Recommended',
                email: 'jennifer.adams@email.com',
                phone: '+234-801-111-2222',
                previousDegree: 'B.Sc Computer Science',
                previousInstitution: 'University of Lagos',
                cgpa: '3.75',
                researchInterest: 'Artificial Intelligence and Machine Learning',
                proposedSupervisor: 'Dr. Smith Johnson',
                hodRecommendation: 'Highly Recommended',
                hodComments: 'Excellent academic record and strong research potential',
                documents: ['Transcript', 'CV', 'Statement of Purpose', 'References']
            },
            {
                id: 2,
                applicantName: 'Michael Thompson',
                applicationId: 'APP/2024/002',
                programme: 'Mathematics',
                department: 'Mathematics',
                session: '2024/2025',
                semester: 'First Semester',
                applicationDate: '2024-01-18',
                status: 'Dean Review',
                email: 'michael.thompson@email.com',
                phone: '+234-802-222-3333',
                previousDegree: 'B.Sc Mathematics',
                previousInstitution: 'Obafemi Awolowo University',
                cgpa: '3.82',
                researchInterest: 'Statistical Methods and Data Analysis',
                proposedSupervisor: 'Prof. Lisa Anderson',
                hodRecommendation: 'Recommended',
                hodComments: 'Strong mathematical background, good research potential',
                documents: ['Transcript', 'CV', 'Statement of Purpose', 'References', 'Portfolio']
            },
            {
                id: 3,
                applicantName: 'Sarah Mitchell',
                applicationId: 'APP/2024/003',
                programme: 'Physics',
                department: 'Physics',
                session: '2024/2025',
                semester: 'First Semester',
                applicationDate: '2024-01-15',
                status: 'Interview Scheduled',
                email: 'sarah.mitchell@email.com',
                phone: '+234-803-333-4444',
                previousDegree: 'B.Sc Physics',
                previousInstitution: 'University of Ibadan',
                cgpa: '3.95',
                researchInterest: 'Quantum Physics and Condensed Matter',
                proposedSupervisor: 'Dr. James Taylor',
                hodRecommendation: 'Highly Recommended',
                hodComments: 'Outstanding academic performance, excellent research proposal',
                documents: ['Transcript', 'CV', 'Statement of Purpose', 'References'],
                interviewDate: '2024-02-15',
                interviewTime: '10:00 AM'
            },
            {
                id: 4,
                applicantName: 'David Rodriguez',
                applicationId: 'APP/2024/004',
                programme: 'Chemistry',
                department: 'Chemistry',
                session: '2024/2025',
                semester: 'First Semester',
                applicationDate: '2024-01-12',
                status: 'Under HOD Review',
                email: 'david.rodriguez@email.com',
                phone: '+234-804-444-5555',
                previousDegree: 'B.Sc Chemistry',
                previousInstitution: 'Ahmadu Bello University',
                cgpa: '3.68',
                researchInterest: 'Organic Chemistry and Drug Discovery',
                proposedSupervisor: 'Dr. Patricia Moore',
                hodRecommendation: 'Pending',
                hodComments: 'Under review',
                documents: ['Transcript', 'CV', 'Statement of Purpose', 'References']
            },
            {
                id: 5,
                applicantName: 'Lisa Chen',
                applicationId: 'APP/2024/005',
                programme: 'Biology',
                department: 'Biology',
                session: '2024/2025',
                semester: 'First Semester',
                applicationDate: '2024-01-10',
                status: 'Approved',
                email: 'lisa.chen@email.com',
                phone: '+234-805-555-6666',
                previousDegree: 'B.Sc Biology',
                previousInstitution: 'University of Benin',
                cgpa: '3.85',
                researchInterest: 'Molecular Biology and Genetics',
                proposedSupervisor: 'Dr. Maria Rodriguez',
                hodRecommendation: 'Recommended',
                hodComments: 'Good academic record, clear research focus',
                documents: ['Transcript', 'CV', 'Statement of Purpose', 'References'],
                approvalDate: '2024-01-28',
                deanComments: 'Approved for admission'
            },
            {
                id: 6,
                applicantName: 'Robert Kim',
                applicationId: 'APP/2024/006',
                programme: 'Data Science',
                department: 'Computer Science',
                session: '2024/2025',
                semester: 'First Semester',
                applicationDate: '2024-01-08',
                status: 'Rejected',
                email: 'robert.kim@email.com',
                phone: '+234-806-666-7777',
                previousDegree: 'B.Sc Computer Science',
                previousInstitution: 'Federal University of Technology',
                cgpa: '3.25',
                researchInterest: 'Data Mining and Analytics',
                proposedSupervisor: 'Prof. Mary Wilson',
                hodRecommendation: 'Not Recommended',
                hodComments: 'Below minimum CGPA requirement, weak research proposal',
                documents: ['Transcript', 'CV', 'Statement of Purpose'],
                rejectionDate: '2024-01-25',
                rejectionReason: 'Does not meet minimum academic requirements'
            }
        ];
        
        filteredApplicants = [...applicants];
        renderPage();
    }

    function renderPage() {
        const container = document.getElementById('dean-current-applicants-content');
        container.innerHTML = `
            <div class="dean-current-applicants-container">
                <!-- Page Header -->
                <div class="page-header">
                    <h2>College Admission Applications</h2>
                    <p>Review and manage current admission applications across all departments in your college</p>
                </div>

                <!-- Filters Section -->
                <div class="filters-section">
                    <div class="filters-grid">
                        <div class="filter-group">
                            <label>Session:</label>
                            <select id="session-filter">
                                <option value="">All Sessions</option>
                                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Semester:</label>
                            <select id="semester-filter">
                                <option value="">All Semesters</option>
                                ${semesters.map(semester => `<option value="${semester}">${semester}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Department:</label>
                            <select id="department-filter">
                                <option value="">All Departments</option>
                                ${departments.map(department => `<option value="${department}">${department}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Programme:</label>
                            <select id="programme-filter">
                                <option value="">All Programmes</option>
                                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Status:</label>
                            <select id="status-filter">
                                <option value="">All Statuses</option>
                                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Search:</label>
                            <input type="text" id="search-input" placeholder="Search by name, ID, or email...">
                        </div>
                        
                        <div class="filter-actions">
                            <button class="btn btn-secondary" onclick="clearFilters()">
                                <i class="fas fa-times"></i> Clear Filters
                            </button>
                            <button class="btn btn-primary" onclick="exportApplications()">
                                <i class="fas fa-download"></i> Export Applications
                            </button>
                            <button class="btn btn-success" onclick="viewAdmissionStatistics()">
                                <i class="fas fa-chart-bar"></i> Admission Statistics
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Summary -->
                <div class="results-summary">
                    <p>Showing ${filteredApplicants.length} of ${applicants.length} current applications</p>
                    <div class="summary-stats">
                        <span class="stat-item light">
                            Submitted: ${applicants.filter(a => a.status === 'Submitted').length}
                        </span>
                        <span class="stat-item secondary">
                            Under HOD Review: ${applicants.filter(a => a.status === 'Under HOD Review').length}
                        </span>
                        <span class="stat-item info">
                            HOD Recommended: ${applicants.filter(a => a.status === 'HOD Recommended').length}
                        </span>
                        <span class="stat-item warning">
                            Dean Review: ${applicants.filter(a => a.status === 'Dean Review').length}
                        </span>
                        <span class="stat-item success">
                            Approved: ${applicants.filter(a => a.status === 'Approved').length}
                        </span>
                    </div>
                </div>

                <!-- Applicants List -->
                <div class="applicants-list" id="applicants-list">
                    ${renderApplicantsList()}
                </div>
            </div>
        `;
    }

    function renderApplicantsList() {
        if (filteredApplicants.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No current applicants found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }

        return filteredApplicants.map(applicant => `
            <div class="applicant-card">
                <div class="applicant-header">
                    <div class="applicant-info">
                        <h4>${applicant.applicantName}</h4>
                        <p class="applicant-meta">
                            <strong>${applicant.applicationId}</strong> • ${applicant.programme}
                        </p>
                        <p class="applicant-details">
                            ${applicant.department} Department • ${applicant.session} • ${applicant.semester}
                        </p>
                    </div>
                    <div class="applicant-status ${getStatusColor(applicant.status)}">
                        ${applicant.status}
                    </div>
                </div>
                
                <div class="applicant-body">
                    <div class="academic-background">
                        <div class="degree-info">
                            <strong>Previous Degree:</strong> ${applicant.previousDegree}
                            <br />
                            <strong>Institution:</strong> ${applicant.previousInstitution}
                            <br />
                            <strong>CGPA:</strong> ${applicant.cgpa}
                        </div>
                        
                        <div class="research-info">
                            <strong>Research Interest:</strong> ${applicant.researchInterest}
                            <br />
                            <strong>Proposed Supervisor:</strong> ${applicant.proposedSupervisor}
                        </div>
                    </div>
                    
                    <div class="hod-recommendation">
                        <strong>HOD Recommendation:</strong>
                        <span class="recommendation-badge ${getHodRecommendationColor(applicant.hodRecommendation)}">
                            ${applicant.hodRecommendation}
                        </span>
                        <br />
                        <strong>HOD Comments:</strong> ${applicant.hodComments}
                    </div>
                    
                    <div class="contact-info">
                        <span><i class="fas fa-envelope"></i> ${applicant.email}</span>
                        <span><i class="fas fa-phone"></i> ${applicant.phone}</span>
                        <span><i class="fas fa-calendar"></i> Applied: ${applicant.applicationDate}</span>
                    </div>
                    
                    <div class="documents-info">
                        <strong>Submitted Documents:</strong>
                        <div class="documents-list">
                            ${applicant.documents.map(doc => `<span class="document-badge">${doc}</span>`).join('')}
                        </div>
                    </div>
                    
                    ${applicant.interviewDate ? `
                        <div class="interview-info">
                            <strong>Interview Scheduled:</strong> ${applicant.interviewDate} at ${applicant.interviewTime}
                        </div>
                    ` : ''}
                    
                    ${applicant.approvalDate ? `
                        <div class="approval-info">
                            <strong>Approved:</strong> ${applicant.approvalDate}
                            <br />
                            <strong>Dean Comments:</strong> ${applicant.deanComments}
                        </div>
                    ` : ''}
                    
                    ${applicant.rejectionReason ? `
                        <div class="rejection-info">
                            <strong>Rejection Reason:</strong> ${applicant.rejectionReason}
                            <br />
                            <strong>Date:</strong> ${applicant.rejectionDate}
                        </div>
                    ` : ''}
                </div>
                
                <div class="applicant-actions">
                    <button class="btn btn-primary" onclick="viewFullApplication(${applicant.id})">
                        <i class="fas fa-eye"></i> View Full Application
                    </button>
                    <button class="btn btn-info" onclick="downloadDocuments(${applicant.id})">
                        <i class="fas fa-download"></i> Download Documents
                    </button>
                    ${applicant.status === 'Dean Review' ? `
                        <button class="btn btn-success" onclick="approveApplication(${applicant.id})">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-danger" onclick="rejectApplication(${applicant.id})">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    ` : ''}
                    <select class="status-select" onchange="changeStatus(${applicant.id}, this.value)">
                        ${statuses.map(status => 
                            `<option value="${status}" ${status === applicant.status ? 'selected' : ''}>${status}</option>`
                        ).join('')}
                    </select>
                    <button class="btn btn-warning" onclick="addComments(${applicant.id})">
                        <i class="fas fa-comment"></i> Add Comments
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Filter event listeners
        document.addEventListener('change', function(e) {
            if (e.target.id === 'session-filter') {
                selectedSession = e.target.value;
                applyFilters();
            } else if (e.target.id === 'semester-filter') {
                selectedSemester = e.target.value;
                applyFilters();
            } else if (e.target.id === 'programme-filter') {
                selectedProgramme = e.target.value;
                applyFilters();
            } else if (e.target.id === 'department-filter') {
                selectedDepartment = e.target.value;
                applyFilters();
            } else if (e.target.id === 'status-filter') {
                selectedStatus = e.target.value;
                applyFilters();
            }
        });

        // Search event listener
        document.addEventListener('input', function(e) {
            if (e.target.id === 'search-input') {
                searchTerm = e.target.value;
                applyFilters();
            }
        });
    }

    function applyFilters() {
        let filtered = applicants;

        if (selectedSession) {
            filtered = filtered.filter(app => app.session === selectedSession);
        }
        if (selectedSemester) {
            filtered = filtered.filter(app => app.semester === selectedSemester);
        }
        if (selectedProgramme) {
            filtered = filtered.filter(app => app.programme === selectedProgramme);
        }
        if (selectedDepartment) {
            filtered = filtered.filter(app => app.department === selectedDepartment);
        }
        if (selectedStatus) {
            filtered = filtered.filter(app => app.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(app => 
                app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredApplicants = filtered;
        renderPage();
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Approved': return 'success';
            case 'HOD Recommended': return 'info';
            case 'Interview Scheduled': return 'primary';
            case 'Dean Review': return 'warning';
            case 'Under HOD Review': return 'secondary';
            case 'Rejected': return 'danger';
            case 'Submitted': return 'light';
            default: return 'primary';
        }
    }

    function getHodRecommendationColor(recommendation) {
        switch (recommendation) {
            case 'Highly Recommended': return 'success';
            case 'Recommended': return 'info';
            case 'Not Recommended': return 'danger';
            case 'Pending': return 'warning';
            default: return 'secondary';
        }
    }

    // Global functions for button actions
    window.clearFilters = function() {
        selectedSession = '';
        selectedSemester = '';
        selectedProgramme = '';
        selectedDepartment = '';
        selectedStatus = '';
        searchTerm = '';
        
        // Reset form values
        document.getElementById('session-filter').value = '';
        document.getElementById('semester-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    };

    window.exportApplications = function() {
        alert('Exporting applications... This would generate a CSV/Excel file with all current applications.');
    };

    window.viewAdmissionStatistics = function() {
        alert('Opening admission statistics dashboard... This would show detailed analytics and charts.');
    };

    window.viewFullApplication = function(applicantId) {
        const applicant = applicants.find(a => a.id === applicantId);
        alert(`Viewing full application for ${applicant.applicantName} (${applicant.applicationId})`);
    };

    window.downloadDocuments = function(applicantId) {
        const applicant = applicants.find(a => a.id === applicantId);
        alert(`Downloading documents for ${applicant.applicantName}... This would download a ZIP file with all submitted documents.`);
    };

    window.approveApplication = function(applicantId) {
        const applicant = applicants.find(a => a.id === applicantId);
        if (confirm(`Are you sure you want to approve ${applicant.applicantName}'s application?`)) {
            applicant.status = 'Approved';
            applicant.approvalDate = new Date().toISOString().split('T')[0];
            applicant.deanComments = 'Approved by Dean';
            applyFilters();
            alert('Application approved successfully!');
        }
    };

    window.rejectApplication = function(applicantId) {
        const applicant = applicants.find(a => a.id === applicantId);
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
            applicant.status = 'Rejected';
            applicant.rejectionDate = new Date().toISOString().split('T')[0];
            applicant.rejectionReason = reason;
            applyFilters();
            alert('Application rejected successfully!');
        }
    };

    window.changeStatus = function(applicantId, newStatus) {
        const applicant = applicants.find(a => a.id === applicantId);
        applicant.status = newStatus;
        applyFilters();
    };

    window.addComments = function(applicantId) {
        const applicant = applicants.find(a => a.id === applicantId);
        const comments = prompt('Add your comments:', applicant.deanComments || '');
        if (comments !== null) {
            applicant.deanComments = comments;
            applyFilters();
            alert('Comments added successfully!');
        }
    };

    init();
});

