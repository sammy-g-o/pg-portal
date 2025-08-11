// Admissions Applications Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let applications = [];
    let filteredApplications = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedStatus = '';
    let selectedPriority = '';
    let searchTerm = '';
    let showApplicationModal = false;
    let selectedApplication = null;
    
    const sessions = ['2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
    const levels = ['Undergraduate', 'Masters', 'PhD', 'Postgraduate Diploma'];
    const statuses = ['New', 'In Review', 'Document Verification', 'Interview Required', 'Pending Decision', 'Approved', 'Rejected', 'Waitlisted'];
    const priorities = ['High', 'Medium', 'Low', 'Urgent'];
    
    const mockApplications = [
        {
            id: 1,
            applicantName: 'Jennifer Adams',
            applicationId: 'APP/2024/001',
            email: 'jennifer.adams@email.com',
            phone: '+234-801-111-2222',
            programme: 'Computer Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-20',
            status: 'In Review',
            priority: 'High',
            previousDegree: 'B.Sc Computer Science',
            previousInstitution: 'University of Lagos',
            cgpa: '4.75',
            nationality: 'Nigerian',
            stateOfOrigin: 'Lagos',
            dateOfBirth: '1998-05-15',
            documents: ['Transcript', 'CV', 'Statement of Purpose', 'References', 'Birth Certificate'],
            documentsStatus: 'Complete',
            applicationFee: 'Paid',
            reviewNotes: 'Strong academic background, good research potential',
            assignedReviewer: 'Dr. Smith Johnson'
        },
        {
            id: 2,
            applicantName: 'Michael Thompson',
            applicationId: 'APP/2024/002',
            email: 'michael.thompson@email.com',
            phone: '+234-802-222-3333',
            programme: 'MBA',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-18',
            status: 'Interview Required',
            priority: 'Medium',
            previousDegree: 'B.Sc Business Administration',
            previousInstitution: 'Obafemi Awolowo University',
            cgpa: '4.82',
            nationality: 'Nigerian',
            stateOfOrigin: 'Osun',
            dateOfBirth: '1995-08-22',
            documents: ['Transcript', 'CV', 'Essays', 'References', 'Work Experience Letter'],
            documentsStatus: 'Complete',
            applicationFee: 'Paid',
            reviewNotes: 'Excellent work experience, leadership potential',
            assignedReviewer: 'Prof. Mary Wilson',
            interviewScheduled: '2024-02-15'
        },
        {
            id: 3,
            applicantName: 'Sarah Mitchell',
            applicationId: 'APP/2024/003',
            email: 'sarah.mitchell@email.com',
            phone: '+234-803-333-4444',
            programme: 'Mathematics',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-15',
            status: 'Approved',
            priority: 'High',
            previousDegree: 'M.Sc Mathematics',
            previousInstitution: 'University of Ibadan',
            cgpa: '4.95',
            nationality: 'Nigerian',
            stateOfOrigin: 'Oyo',
            dateOfBirth: '1992-03-10',
            documents: ['Transcript', 'CV', 'Research Proposal', 'References', 'Publications'],
            documentsStatus: 'Complete',
            applicationFee: 'Paid',
            reviewNotes: 'Outstanding research proposal, excellent academic record',
            assignedReviewer: 'Prof. David Brown'
        },
        {
            id: 4,
            applicantName: 'Robert Chen',
            applicationId: 'APP/2024/004',
            email: 'robert.chen@email.com',
            phone: '+234-804-444-5555',
            programme: 'Data Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-22',
            status: 'Document Verification',
            priority: 'Medium',
            previousDegree: 'B.Sc Statistics',
            previousInstitution: 'University of Benin',
            cgpa: '4.68',
            nationality: 'Nigerian',
            stateOfOrigin: 'Edo',
            dateOfBirth: '1997-11-28',
            documents: ['Transcript', 'CV', 'Statement of Purpose', 'References'],
            documentsStatus: 'Pending',
            applicationFee: 'Paid',
            reviewNotes: 'Good academic background, needs additional documents',
            assignedReviewer: 'Dr. Lisa Wang'
        },
        {
            id: 5,
            applicantName: 'Emily Rodriguez',
            applicationId: 'APP/2024/005',
            email: 'emily.rodriguez@email.com',
            phone: '+234-805-555-6666',
            programme: 'Physics',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-25',
            status: 'New',
            priority: 'Low',
            previousDegree: 'M.Sc Physics',
            previousInstitution: 'Ahmadu Bello University',
            cgpa: '4.70',
            nationality: 'Nigerian',
            stateOfOrigin: 'Kaduna',
            dateOfBirth: '1994-07-14',
            documents: ['Transcript', 'CV', 'Research Proposal', 'References'],
            documentsStatus: 'Complete',
            applicationFee: 'Paid',
            reviewNotes: 'Application received, pending initial review',
            assignedReviewer: 'Prof. James Wilson'
        }
    ];

    function init() {
        loadApplications();
        renderPage();
        setupEventListeners();
    }

    function loadApplications() {
        applications = [...mockApplications];
        filteredApplications = [...applications];
    }

    function renderPage() {
        const content = document.getElementById('applications-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Admission Applications</h2>
                <p>Process and manage admission applications across all programs and levels</p>
            </div>

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
                        <label>Programme:</label>
                        <select id="programme-filter">
                            <option value="">All Programmes</option>
                            ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Level:</label>
                        <select id="level-filter">
                            <option value="">All Levels</option>
                            ${levels.map(level => `<option value="${level}">${level}</option>`).join('')}
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
                        <label>Priority:</label>
                        <select id="priority-filter">
                            <option value="">All Priorities</option>
                            ${priorities.map(priority => `<option value="${priority}">${priority}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="search-input" placeholder="Search by name, ID, or email...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Applications
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-chart-bar"></i> Application Statistics
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredApplications.length} of ${applications.length} applications</p>
                <div class="summary-stats">
                    <span class="stat-item light">
                        New: ${applications.filter(a => a.status === 'New').length}
                    </span>
                    <span class="stat-item info">
                        In Review: ${applications.filter(a => a.status === 'In Review').length}
                    </span>
                    <span class="stat-item warning">
                        Document Verification: ${applications.filter(a => a.status === 'Document Verification').length}
                    </span>
                    <span class="stat-item primary">
                        Interview Required: ${applications.filter(a => a.status === 'Interview Required').length}
                    </span>
                    <span class="stat-item success">
                        Approved: ${applications.filter(a => a.status === 'Approved').length}
                    </span>
                </div>
            </div>

            <div class="applications-list" id="applications-list"></div>
        `;

        renderApplicationsList();
    }

    function renderApplicationsList() {
        const listContainer = document.getElementById('applications-list');
        if (!listContainer) return;

        if (filteredApplications.length > 0) {
            listContainer.innerHTML = filteredApplications.map(application => `
                <div class="application-card" data-id="${application.id}">
                    <div class="application-header">
                        <div class="application-info">
                            <h3>${application.applicantName}</h3>
                            <p class="application-id">${application.applicationId}</p>
                            <p class="application-email">${application.email}</p>
                        </div>
                        <div class="application-status">
                            <span class="status-badge ${getStatusColor(application.status)}">${application.status}</span>
                            <span class="priority-badge ${getPriorityColor(application.priority)}">${application.priority}</span>
                        </div>
                    </div>
                    
                    <div class="application-details">
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Programme:</strong> ${application.programme}
                            </div>
                            <div class="detail-item">
                                <strong>Level:</strong> ${application.level}
                            </div>
                            <div class="detail-item">
                                <strong>Session:</strong> ${application.session}
                            </div>
                        </div>
                        
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Previous Degree:</strong> ${application.previousDegree}
                            </div>
                            <div class="detail-item">
                                <strong>Institution:</strong> ${application.previousInstitution}
                            </div>
                            <div class="detail-item">
                                <strong>CGPA:</strong> ${application.cgpa}
                            </div>
                        </div>
                        
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Documents:</strong> 
                                <span class="documents-badge ${getDocumentsStatusColor(application.documentsStatus)}">
                                    ${application.documentsStatus}
                                </span>
                            </div>
                            <div class="detail-item">
                                <strong>Fee:</strong> ${application.applicationFee}
                            </div>
                            <div class="detail-item">
                                <strong>Reviewer:</strong> ${application.assignedReviewer}
                            </div>
                        </div>
                    </div>
                    
                    <div class="application-actions">
                        <button class="btn btn-primary view-application" data-id="${application.id}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-edit"></i> Edit Application
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-comment"></i> Add Notes
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No applications found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Filter event listeners
        document.getElementById('session-filter')?.addEventListener('change', (e) => {
            selectedSession = e.target.value;
            applyFilters();
        });

        document.getElementById('semester-filter')?.addEventListener('change', (e) => {
            selectedSemester = e.target.value;
            applyFilters();
        });

        document.getElementById('programme-filter')?.addEventListener('change', (e) => {
            selectedProgramme = e.target.value;
            applyFilters();
        });

        document.getElementById('level-filter')?.addEventListener('change', (e) => {
            selectedLevel = e.target.value;
            applyFilters();
        });

        document.getElementById('status-filter')?.addEventListener('change', (e) => {
            selectedStatus = e.target.value;
            applyFilters();
        });

        document.getElementById('priority-filter')?.addEventListener('change', (e) => {
            selectedPriority = e.target.value;
            applyFilters();
        });

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            applyFilters();
        });

        document.getElementById('clear-filters')?.addEventListener('click', clearFilters);

        // Application card event listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-application')) {
                const applicationId = parseInt(e.target.closest('.view-application').dataset.id);
                const application = applications.find(app => app.id === applicationId);
                if (application) {
                    handleViewApplication(application);
                }
            }
        });
    }

    function applyFilters() {
        filteredApplications = applications.filter(application => {
            const sessionMatch = !selectedSession || application.session === selectedSession;
            const semesterMatch = !selectedSemester || application.semester === selectedSemester;
            const programmeMatch = !selectedProgramme || application.programme === selectedProgramme;
            const levelMatch = !selectedLevel || application.level === selectedLevel;
            const statusMatch = !selectedStatus || application.status === selectedStatus;
            const priorityMatch = !selectedPriority || application.priority === selectedPriority;
            
            const searchMatch = !searchTerm || 
                application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                application.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                application.email.toLowerCase().includes(searchTerm.toLowerCase());

            return sessionMatch && semesterMatch && programmeMatch && levelMatch && statusMatch && priorityMatch && searchMatch;
        });

        renderPage();
    }

    function clearFilters() {
        selectedSession = '';
        selectedSemester = '';
        selectedProgramme = '';
        selectedLevel = '';
        selectedStatus = '';
        selectedPriority = '';
        searchTerm = '';
        
        // Reset form values
        document.getElementById('session-filter').value = '';
        document.getElementById('semester-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('level-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('priority-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

    function handleViewApplication(application) {
        selectedApplication = application;
        showApplicationModal = true;
        renderApplicationModal();
    }

    function renderApplicationModal() {
        if (!showApplicationModal || !selectedApplication) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content application-modal">
                <div class="modal-header">
                    <h3>Application Details: ${selectedApplication.applicantName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="application-full-details">
                        <div class="detail-section">
                            <h4>Personal Information</h4>
                            <div class="detail-grid">
                                <div><strong>Full Name:</strong> ${selectedApplication.applicantName}</div>
                                <div><strong>Email:</strong> ${selectedApplication.email}</div>
                                <div><strong>Phone:</strong> ${selectedApplication.phone}</div>
                                <div><strong>Date of Birth:</strong> ${selectedApplication.dateOfBirth}</div>
                                <div><strong>Nationality:</strong> ${selectedApplication.nationality}</div>
                                <div><strong>State of Origin:</strong> ${selectedApplication.stateOfOrigin}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Application Information</h4>
                            <div class="detail-grid">
                                <div><strong>Application ID:</strong> ${selectedApplication.applicationId}</div>
                                <div><strong>Programme:</strong> ${selectedApplication.programme}</div>
                                <div><strong>Level:</strong> ${selectedApplication.level}</div>
                                <div><strong>Session:</strong> ${selectedApplication.session}</div>
                                <div><strong>Semester:</strong> ${selectedApplication.semester}</div>
                                <div><strong>Application Date:</strong> ${selectedApplication.applicationDate}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Academic Background</h4>
                            <div class="detail-grid">
                                <div><strong>Previous Degree:</strong> ${selectedApplication.previousDegree}</div>
                                <div><strong>Institution:</strong> ${selectedApplication.previousInstitution}</div>
                                ${selectedApplication.cgpa !== 'N/A' ? `<div><strong>CGPA:</strong> ${selectedApplication.cgpa}</div>` : ''}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Documents Submitted</h4>
                            <div class="documents-list-modal">
                                ${selectedApplication.documents.map(doc => `
                                    <div class="document-item-modal">
                                        <i class="fas fa-file"></i> ${doc}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Review Information</h4>
                            <div class="review-info-modal">
                                <div><strong>Status:</strong> 
                                    <span class="status-badge ${getStatusColor(selectedApplication.status)}">
                                        ${selectedApplication.status}
                                    </span>
                                </div>
                                <div><strong>Priority:</strong> 
                                    <span class="priority-badge ${getPriorityColor(selectedApplication.priority)}">
                                        ${selectedApplication.priority}
                                    </span>
                                </div>
                                <div><strong>Assigned Reviewer:</strong> ${selectedApplication.assignedReviewer}</div>
                                <div><strong>Documents Status:</strong> 
                                    <span class="documents-badge ${getDocumentsStatusColor(selectedApplication.documentsStatus)}">
                                        ${selectedApplication.documentsStatus}
                                    </span>
                                </div>
                                <div><strong>Application Fee:</strong> ${selectedApplication.applicationFee}</div>
                            </div>
                            
                            ${selectedApplication.reviewNotes ? `
                                <div class="review-notes-modal">
                                    <strong>Review Notes:</strong>
                                    <p>${selectedApplication.reviewNotes}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                closeApplicationModal();
            }
        });
    }

    function closeApplicationModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        showApplicationModal = false;
        selectedApplication = null;
    }

    function getStatusColor(status) {
        const colors = {
            'New': 'light',
            'In Review': 'info',
            'Document Verification': 'warning',
            'Interview Required': 'primary',
            'Pending Decision': 'secondary',
            'Approved': 'success',
            'Rejected': 'danger',
            'Waitlisted': 'warning'
        };
        return colors[status] || 'secondary';
    }

    function getPriorityColor(priority) {
        const colors = {
            'High': 'danger',
            'Medium': 'warning',
            'Low': 'success',
            'Urgent': 'danger'
        };
        return colors[priority] || 'secondary';
    }

    function getDocumentsStatusColor(status) {
        const colors = {
            'Complete': 'success',
            'Pending': 'warning',
            'Incomplete': 'danger'
        };
        return colors[status] || 'secondary';
    }

    // Initialize the page
    init();
});
