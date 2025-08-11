// HOD Admitted Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let admittedStudents = [];
    let filteredStudents = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedStatus = '';
    let searchTerm = '';

    const sessions = ['2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry'];
    const statuses = ['Admitted', 'Enrolled', 'Deferred', 'Declined'];

    function init() {
        loadAdmittedStudents();
        setupEventListeners();
    }

    function loadAdmittedStudents() {
        // Mock data for admitted students
        admittedStudents = [
            {
                id: 1,
                studentName: 'Jennifer Adams',
                applicationId: 'APP/2024/001',
                studentId: 'CS/2024/001',
                programme: 'Computer Science',
                session: '2024/2025',
                semester: 'First Semester',
                admissionDate: '2024-02-01',
                status: 'Enrolled',
                email: 'jennifer.adams@email.com',
                phone: '+234-801-111-2222',
                previousDegree: 'B.Sc Computer Science',
                previousInstitution: 'University of Lagos',
                cgpa: '3.75',
                researchArea: 'Artificial Intelligence',
                assignedSupervisor: 'Dr. Smith Johnson',
                enrollmentDate: '2024-02-15',
                feesStatus: 'Paid'
            },
            {
                id: 2,
                studentName: 'Michael Thompson',
                applicationId: 'APP/2024/002',
                studentId: 'DS/2024/002',
                programme: 'Data Science',
                session: '2024/2025',
                semester: 'First Semester',
                admissionDate: '2024-02-03',
                status: 'Enrolled',
                email: 'michael.thompson@email.com',
                phone: '+234-802-222-3333',
                previousDegree: 'B.Sc Mathematics',
                previousInstitution: 'Obafemi Awolowo University',
                cgpa: '3.82',
                researchArea: 'Big Data Analytics',
                assignedSupervisor: 'Prof. Mary Wilson',
                enrollmentDate: '2024-02-18',
                feesStatus: 'Paid'
            },
            {
                id: 3,
                studentName: 'Sarah Mitchell',
                applicationId: 'APP/2024/003',
                studentId: 'MATH/2024/003',
                programme: 'Mathematics',
                session: '2024/2025',
                semester: 'First Semester',
                admissionDate: '2024-02-05',
                status: 'Admitted',
                email: 'sarah.mitchell@email.com',
                phone: '+234-803-333-4444',
                previousDegree: 'B.Sc Mathematics',
                previousInstitution: 'University of Ibadan',
                cgpa: '3.95',
                researchArea: 'Applied Mathematics',
                assignedSupervisor: 'Dr. Lisa Anderson',
                enrollmentDate: null,
                feesStatus: 'Pending'
            },
            {
                id: 4,
                studentName: 'David Rodriguez',
                applicationId: 'APP/2024/004',
                studentId: 'PHY/2024/004',
                programme: 'Physics',
                session: '2024/2025',
                semester: 'First Semester',
                admissionDate: '2024-02-07',
                status: 'Deferred',
                email: 'david.rodriguez@email.com',
                phone: '+234-804-444-5555',
                previousDegree: 'B.Sc Physics',
                previousInstitution: 'Ahmadu Bello University',
                cgpa: '3.68',
                researchArea: 'Quantum Physics',
                assignedSupervisor: 'Prof. James Taylor',
                enrollmentDate: null,
                feesStatus: 'Not Applicable',
                deferralReason: 'Personal circumstances',
                deferralPeriod: '2025/2026 Session'
            },
            {
                id: 5,
                studentName: 'Amanda Foster',
                applicationId: 'APP/2024/006',
                studentId: 'CHEM/2024/005',
                programme: 'Chemistry',
                session: '2024/2025',
                semester: 'First Semester',
                admissionDate: '2024-02-10',
                status: 'Declined',
                email: 'amanda.foster@email.com',
                phone: '+234-805-666-7777',
                previousDegree: 'B.Sc Chemistry',
                previousInstitution: 'University of Port Harcourt',
                cgpa: '3.71',
                researchArea: 'Organic Chemistry',
                assignedSupervisor: 'Dr. Patricia Moore',
                enrollmentDate: null,
                feesStatus: 'Not Applicable',
                declineReason: 'Accepted offer from another institution',
                declineDate: '2024-02-20'
            }
        ];
        
        filteredStudents = [...admittedStudents];
        renderPage();
    }

    function renderPage() {
        const container = document.getElementById('hod-admitted-students-content');
        container.innerHTML = `
            <div class="admitted-students-page">
                <div class="page-header">
                    <h2>Admitted Students</h2>
                    <p>View and manage students who have been admitted to your department</p>
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
                            <label>Status:</label>
                            <select id="status-filter">
                                <option value="">All Statuses</option>
                                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label>Search:</label>
                            <input type="text" id="search-input" placeholder="Search by name or ID...">
                        </div>
                        
                        <div class="filter-actions">
                            <button class="btn btn-secondary" onclick="clearFilters()">
                                <i class="fas fa-times"></i> Clear Filters
                            </button>
                            <button class="btn btn-primary" onclick="exportList()">
                                <i class="fas fa-download"></i> Export List
                            </button>
                        </div>
                    </div>
                </div>

                <div class="results-summary">
                    <p>Showing ${filteredStudents.length} of ${admittedStudents.length} admitted students</p>
                    <div class="summary-stats">
                        <span class="stat-item success">
                            Enrolled: ${admittedStudents.filter(s => s.status === 'Enrolled').length}
                        </span>
                        <span class="stat-item info">
                            Admitted: ${admittedStudents.filter(s => s.status === 'Admitted').length}
                        </span>
                        <span class="stat-item warning">
                            Deferred: ${admittedStudents.filter(s => s.status === 'Deferred').length}
                        </span>
                        <span class="stat-item danger">
                            Declined: ${admittedStudents.filter(s => s.status === 'Declined').length}
                        </span>
                    </div>
                </div>

                <div class="students-list">
                    ${renderStudentsList()}
                </div>
            </div>
        `;
    }

    function renderStudentsList() {
        if (filteredStudents.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No admitted students found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }

        return filteredStudents.map(student => `
            <div class="student-card">
                <div class="student-header">
                    <div class="student-info">
                        <h4>${student.studentName}</h4>
                        <p class="student-meta">
                            <strong>${student.studentId}</strong> • ${student.programme}
                        </p>
                        <p class="student-details">
                            ${student.session} • ${student.semester} • Admitted: ${student.admissionDate}
                        </p>
                    </div>
                    <div class="student-status ${getStatusColor(student.status)}">
                        ${student.status}
                    </div>
                </div>
                
                <div class="student-body">
                    <div class="academic-info">
                        <div class="degree-info">
                            <strong>Previous Degree:</strong> ${student.previousDegree}<br>
                            <strong>Institution:</strong> ${student.previousInstitution}<br>
                            <strong>CGPA:</strong> ${student.cgpa}
                        </div>
                        
                        <div class="research-info">
                            <strong>Research Area:</strong> ${student.researchArea}<br>
                            <strong>Assigned Supervisor:</strong> ${student.assignedSupervisor}
                        </div>
                    </div>
                    
                    <div class="enrollment-info">
                        ${student.enrollmentDate ? `<div><strong>Enrollment Date:</strong> ${student.enrollmentDate}</div>` : ''}
                        
                        <div class="fees-status">
                            <strong>Fees Status:</strong> 
                            <span class="fees-badge ${getFeesStatusColor(student.feesStatus)}">
                                ${student.feesStatus}
                            </span>
                        </div>
                    </div>
                    
                    <div class="contact-info">
                        <span><i class="fas fa-envelope"></i> ${student.email}</span>
                        <span><i class="fas fa-phone"></i> ${student.phone}</span>
                    </div>
                    
                    ${student.deferralReason ? `
                        <div class="deferral-info">
                            <strong>Deferral Reason:</strong> ${student.deferralReason}<br>
                            <strong>Deferred to:</strong> ${student.deferralPeriod}
                        </div>
                    ` : ''}
                    
                    ${student.declineReason ? `
                        <div class="decline-info">
                            <strong>Decline Reason:</strong> ${student.declineReason}<br>
                            <strong>Decline Date:</strong> ${student.declineDate}
                        </div>
                    ` : ''}
                </div>
                
                <div class="student-actions">
                    <button class="btn btn-primary" onclick="viewProfile(${student.id})">
                        <i class="fas fa-eye"></i> View Profile
                    </button>
                    <button class="btn btn-info" onclick="viewAcademicRecords(${student.id})">
                        <i class="fas fa-file-alt"></i> Academic Records
                    </button>
                    ${student.status === 'Admitted' ? `
                        <button class="btn btn-success" onclick="confirmEnrollment(${student.id})">
                            <i class="fas fa-user-check"></i> Confirm Enrollment
                        </button>
                    ` : ''}
                    <button class="btn btn-warning" onclick="sendMessage(${student.id})">
                        <i class="fas fa-envelope"></i> Send Message
                    </button>
                    <button class="btn btn-secondary" onclick="printDetails(${student.id})">
                        <i class="fas fa-print"></i> Print Details
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
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
            } else if (e.target.id === 'status-filter') {
                selectedStatus = e.target.value;
                applyFilters();
            }
        });

        document.addEventListener('input', function(e) {
            if (e.target.id === 'search-input') {
                searchTerm = e.target.value;
                applyFilters();
            }
        });
    }

    function applyFilters() {
        let filtered = admittedStudents;

        if (selectedSession) {
            filtered = filtered.filter(student => student.session === selectedSession);
        }
        if (selectedSemester) {
            filtered = filtered.filter(student => student.semester === selectedSemester);
        }
        if (selectedProgramme) {
            filtered = filtered.filter(student => student.programme === selectedProgramme);
        }
        if (selectedStatus) {
            filtered = filtered.filter(student => student.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(student => 
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredStudents = filtered;
        renderPage();
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Enrolled': return 'success';
            case 'Admitted': return 'info';
            case 'Deferred': return 'warning';
            case 'Declined': return 'danger';
            default: return 'primary';
        }
    }

    function getFeesStatusColor(status) {
        switch (status) {
            case 'Paid': return 'success';
            case 'Pending': return 'warning';
            case 'Overdue': return 'danger';
            default: return 'secondary';
        }
    }

    // Global functions for button actions
    window.clearFilters = function() {
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
        
        applyFilters();
    };

    window.exportList = function() {
        alert('Export functionality will be implemented here');
    };

    window.viewProfile = function(studentId) {
        alert(`View profile for student ID: ${studentId}`);
    };

    window.viewAcademicRecords = function(studentId) {
        alert(`View academic records for student ID: ${studentId}`);
    };

    window.confirmEnrollment = function(studentId) {
        if (confirm('Are you sure you want to confirm enrollment for this student?')) {
            alert(`Enrollment confirmed for student ID: ${studentId}`);
        }
    };

    window.sendMessage = function(studentId) {
        alert(`Send message to student ID: ${studentId}`);
    };

    window.printDetails = function(studentId) {
        alert(`Print details for student ID: ${studentId}`);
    };

    init();
});

