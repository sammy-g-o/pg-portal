// Registrar Students Page JavaScript
let students = [];
let filteredStudents = [];
let selectedSession = '';
let selectedSemester = '';
let selectedProgramme = '';
let selectedLevel = '';
let selectedStatus = '';
let searchTerm = '';
let showStudentModal = false;
let selectedStudent = null;

// Available options for filters
const sessions = ['2023/2024', '2024/2025', '2025/2026'];
const semesters = ['First Semester', 'Second Semester'];
const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
const levels = ['100 Level', '200 Level', '300 Level', '400 Level', 'Masters', 'PhD'];
const statuses = ['Active', 'Graduated', 'Suspended', 'Withdrawn', 'On Leave', 'Deferred'];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    loadStudents();
    setupEventListeners();
}

function loadStudents() {
    // Mock student data
    students = [
        {
            id: 1,
            studentName: 'Jennifer Adams',
            studentId: 'CS/2022/001',
            email: 'jennifer.adams@student.edu.ng',
            phone: '+234-801-111-2222',
            programme: 'Computer Science',
            level: 'Masters',
            currentLevel: '2nd Year',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2022-09-15',
            status: 'Active',
            cgpa: '4.25',
            totalCredits: 45,
            completedCredits: 30,
            supervisor: 'Dr. Smith Johnson',
            dateOfBirth: '1998-05-15',
            nationality: 'Nigerian',
            stateOfOrigin: 'Lagos',
            address: '123 University Road, Lagos',
            emergencyContact: 'Mrs. Adams - 08012345678',
            feesStatus: 'Paid',
            registrationStatus: 'Registered',
            lastLogin: '2024-01-25',
            academicStanding: 'Good Standing'
        },
        {
            id: 2,
            studentName: 'Michael Thompson',
            studentId: 'MBA/2023/002',
            email: 'michael.thompson@student.edu.ng',
            phone: '+234-802-222-3333',
            programme: 'MBA',
            level: 'Masters',
            currentLevel: '1st Year',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2023-09-10',
            status: 'Active',
            cgpa: '3.85',
            totalCredits: 60,
            completedCredits: 25,
            supervisor: 'Prof. Mary Wilson',
            dateOfBirth: '1995-08-22',
            nationality: 'Nigerian',
            stateOfOrigin: 'Osun',
            address: '456 Business District, Osogbo',
            emergencyContact: 'Mr. Thompson - 08023456789',
            feesStatus: 'Paid',
            registrationStatus: 'Registered',
            lastLogin: '2024-01-24',
            academicStanding: 'Good Standing'
        },
        {
            id: 3,
            studentName: 'Sarah Mitchell',
            studentId: 'MATH/2021/003',
            email: 'sarah.mitchell@student.edu.ng',
            phone: '+234-803-333-4444',
            programme: 'Mathematics',
            level: 'PhD',
            currentLevel: '3rd Year',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2021-09-20',
            status: 'Active',
            cgpa: '4.85',
            totalCredits: 90,
            completedCredits: 75,
            supervisor: 'Dr. Lisa Anderson',
            dateOfBirth: '1996-12-10',
            nationality: 'Nigerian',
            stateOfOrigin: 'Oyo',
            address: '789 Academic Avenue, Ibadan',
            emergencyContact: 'Dr. Mitchell - 08034567890',
            feesStatus: 'Paid',
            registrationStatus: 'Registered',
            lastLogin: '2024-01-26',
            academicStanding: 'Excellent'
        },
        {
            id: 4,
            studentName: 'David Rodriguez',
            studentId: 'PHY/2020/004',
            email: 'david.rodriguez@student.edu.ng',
            phone: '+234-804-444-5555',
            programme: 'Physics',
            level: '400 Level',
            currentLevel: '4th Year',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2020-09-05',
            status: 'Suspended',
            cgpa: '2.15',
            totalCredits: 120,
            completedCredits: 95,
            supervisor: 'Dr. James Taylor',
            dateOfBirth: '2001-03-18',
            nationality: 'Nigerian',
            stateOfOrigin: 'Kaduna',
            address: '321 Student Village, Kaduna',
            emergencyContact: 'Mrs. Rodriguez - 08045678901',
            feesStatus: 'Outstanding',
            registrationStatus: 'Not Registered',
            lastLogin: '2023-12-15',
            academicStanding: 'Academic Probation',
            suspensionReason: 'Poor academic performance',
            suspensionDate: '2024-01-10'
        },
        {
            id: 5,
            studentName: 'Lisa Chen',
            studentId: 'DS/2022/005',
            email: 'lisa.chen@student.edu.ng',
            phone: '+234-805-555-6666',
            programme: 'Data Science',
            level: 'Masters',
            currentLevel: '2nd Year',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2022-09-12',
            status: 'On Leave',
            cgpa: '3.95',
            totalCredits: 45,
            completedCredits: 35,
            supervisor: 'Prof. James Taylor',
            dateOfBirth: '1999-07-30',
            nationality: 'Nigerian',
            stateOfOrigin: 'Edo',
            address: '654 Tech Hub, Benin City',
            emergencyContact: 'Mr. Chen - 08056789012',
            feesStatus: 'Paid',
            registrationStatus: 'On Leave',
            lastLogin: '2023-11-20',
            academicStanding: 'Good Standing',
            leaveReason: 'Medical leave',
            leaveStartDate: '2023-11-01',
            expectedReturnDate: '2024-03-01'
        },
        {
            id: 6,
            studentName: 'Robert Kim',
            studentId: 'CHEM/2019/006',
            email: 'robert.kim@alumni.edu.ng',
            phone: '+234-806-666-7777',
            programme: 'Chemistry',
            level: 'Masters',
            currentLevel: 'Graduated',
            session: '2023/2024',
            semester: 'Second Semester',
            admissionDate: '2019-09-08',
            status: 'Graduated',
            cgpa: '3.65',
            totalCredits: 45,
            completedCredits: 45,
            supervisor: 'Dr. Patricia Moore',
            dateOfBirth: '1997-11-12',
            nationality: 'Nigerian',
            stateOfOrigin: 'Rivers',
            address: '987 Alumni Street, Port Harcourt',
            emergencyContact: 'Mrs. Kim - 08067890123',
            feesStatus: 'Cleared',
            registrationStatus: 'Graduated',
            lastLogin: '2023-08-15',
            academicStanding: 'Good Standing',
            graduationDate: '2023-07-20',
            degreeClass: 'Second Class Upper'
        }
    ];
    
    filteredStudents = [...students];
    renderPage();
}

function renderPage() {
    const content = `
        <!-- Page Header -->
        <div class="page-header">
            <h2>Student Records Management</h2>
            <p>Manage and maintain comprehensive student academic records and information</p>
        </div>

        <!-- Filters Section -->
        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label>Session:</label>
                    <select id="session-filter">
                        <option value="">All Sessions</option>
                        ${sessions.map(session => `<option value="${session}" ${selectedSession === session ? 'selected' : ''}>${session}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Semester:</label>
                    <select id="semester-filter">
                        <option value="">All Semesters</option>
                        ${semesters.map(semester => `<option value="${semester}" ${selectedSemester === semester ? 'selected' : ''}>${semester}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Programme:</label>
                    <select id="programme-filter">
                        <option value="">All Programmes</option>
                        ${programmes.map(programme => `<option value="${programme}" ${selectedProgramme === programme ? 'selected' : ''}>${programme}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Level:</label>
                    <select id="level-filter">
                        <option value="">All Levels</option>
                        ${levels.map(level => `<option value="${level}" ${selectedLevel === level ? 'selected' : ''}>${level}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Status:</label>
                    <select id="status-filter">
                        <option value="">All Statuses</option>
                        ${statuses.map(status => `<option value="${status}" ${selectedStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Search:</label>
                    <input
                        type="text"
                        id="search-filter"
                        placeholder="Search by name, ID, or email..."
                        value="${searchTerm}"
                    />
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-secondary" id="clear-filters">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i> Export Records
                    </button>
                    <button class="btn btn-success">
                        <i class="fas fa-chart-bar"></i> Student Statistics
                    </button>
                </div>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
            <p>Showing ${filteredStudents.length} of ${students.length} student records</p>
            <div class="summary-stats">
                <span class="stat-item success">
                    Active: ${students.filter(s => s.status === 'Active').length}
                </span>
                <span class="stat-item info">
                    Graduated: ${students.filter(s => s.status === 'Graduated').length}
                </span>
                <span class="stat-item danger">
                    Suspended: ${students.filter(s => s.status === 'Suspended').length}
                </span>
                <span class="stat-item warning">
                    Withdrawn: ${students.filter(s => s.status === 'Withdrawn').length}
                </span>
                <span class="stat-item secondary">
                    On Leave: ${students.filter(s => s.status === 'On Leave').length}
                </span>
            </div>
        </div>

        <!-- Students List -->
        <div class="students-list">
            ${renderStudentsList()}
        </div>

        <!-- Student Modal -->
        ${showStudentModal ? renderStudentModal() : ''}
    `;
    
    document.getElementById('students-page-content').innerHTML = content;
    setupModalEventListeners();
}

function renderStudentsList() {
    if (filteredStudents.length === 0) {
        return `
            <div class="no-results">
                <i class="fas fa-user-graduate"></i>
                <h3>No student records found</h3>
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
                        ${student.level} • ${student.currentLevel} • ${student.session}
                    </p>
                </div>
                <div class="student-badges">
                    <div class="student-status ${getStatusColor(student.status)}">
                        ${student.status}
                    </div>
                    <div class="academic-standing ${getAcademicStandingColor(student.academicStanding)}">
                        ${student.academicStanding}
                    </div>
                </div>
            </div>
            
            <div class="student-body">
                <div class="academic-summary">
                    <div class="academic-metrics">
                        <div class="metric-item">
                            <span class="metric-label">CGPA:</span>
                            <span class="metric-value">${student.cgpa}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Credits:</span>
                            <span class="metric-value">${student.completedCredits}/${student.totalCredits}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Supervisor:</span>
                            <span class="metric-value">${student.supervisor}</span>
                        </div>
                    </div>
                </div>
                
                <div class="student-status-info">
                    <div class="status-grid">
                        <div class="status-item">
                            <strong>Fees Status:</strong>
                            <span class="status-badge ${getFeesStatusColor(student.feesStatus)}">
                                ${student.feesStatus}
                            </span>
                        </div>
                        <div class="status-item">
                            <strong>Registration:</strong>
                            <span class="status-value">${student.registrationStatus}</span>
                        </div>
                        <div class="status-item">
                            <strong>Admission Date:</strong>
                            <span class="status-value">${student.admissionDate}</span>
                        </div>
                        <div class="status-item">
                            <strong>Last Login:</strong>
                            <span class="status-value">${student.lastLogin}</span>
                        </div>
                    </div>
                </div>
                
                <div class="contact-info">
                    <span><i class="fas fa-envelope"></i> ${student.email}</span>
                    <span><i class="fas fa-phone"></i> ${student.phone}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${student.stateOfOrigin}</span>
                </div>
                
                ${student.suspensionReason ? `
                    <div class="suspension-info">
                        <strong>Suspension Reason:</strong> ${student.suspensionReason}
                        <br />
                        <strong>Suspension Date:</strong> ${student.suspensionDate}
                    </div>
                ` : ''}
                
                ${student.leaveReason ? `
                    <div class="leave-info">
                        <strong>Leave Reason:</strong> ${student.leaveReason}
                        <br />
                        <strong>Expected Return:</strong> ${student.expectedReturnDate}
                    </div>
                ` : ''}
                
                ${student.graduationDate ? `
                    <div class="graduation-info">
                        <strong>Graduation Date:</strong> ${student.graduationDate}
                        <br />
                        <strong>Degree Class:</strong> ${student.degreeClass}
                    </div>
                ` : ''}
            </div>
            
            <div class="student-actions">
                <button class="btn btn-primary view-student-btn" data-student-id="${student.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button class="btn btn-info">
                    <i class="fas fa-file-alt"></i> Academic Records
                </button>
                <button class="btn btn-success">
                    <i class="fas fa-edit"></i> Update Info
                </button>
                <button class="btn btn-warning">
                    <i class="fas fa-graduation-cap"></i> Course Registration
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-print"></i> Generate Report
                </button>
            </div>
        </div>
    `).join('');
}

function renderStudentModal() {
    if (!selectedStudent) return '';
    
    return `
        <div class="modal-overlay" id="student-modal-overlay">
            <div class="modal-content student-modal">
                <div class="modal-header">
                    <h3>Student Details: ${selectedStudent.studentName}</h3>
                    <button id="close-student-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="student-full-details">
                        <div class="detail-section">
                            <h4>Personal Information</h4>
                            <div class="detail-grid">
                                <div><strong>Full Name:</strong> ${selectedStudent.studentName}</div>
                                <div><strong>Student ID:</strong> ${selectedStudent.studentId}</div>
                                <div><strong>Email:</strong> ${selectedStudent.email}</div>
                                <div><strong>Phone:</strong> ${selectedStudent.phone}</div>
                                <div><strong>Date of Birth:</strong> ${selectedStudent.dateOfBirth}</div>
                                <div><strong>Nationality:</strong> ${selectedStudent.nationality}</div>
                                <div><strong>State of Origin:</strong> ${selectedStudent.stateOfOrigin}</div>
                                <div><strong>Address:</strong> ${selectedStudent.address}</div>
                                <div><strong>Emergency Contact:</strong> ${selectedStudent.emergencyContact}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Academic Information</h4>
                            <div class="detail-grid">
                                <div><strong>Programme:</strong> ${selectedStudent.programme}</div>
                                <div><strong>Level:</strong> ${selectedStudent.level}</div>
                                <div><strong>Current Level:</strong> ${selectedStudent.currentLevel}</div>
                                <div><strong>Session:</strong> ${selectedStudent.session}</div>
                                <div><strong>Semester:</strong> ${selectedStudent.semester}</div>
                                <div><strong>Admission Date:</strong> ${selectedStudent.admissionDate}</div>
                                <div><strong>CGPA:</strong> ${selectedStudent.cgpa}</div>
                                <div><strong>Credits Completed:</strong> ${selectedStudent.completedCredits}/${selectedStudent.totalCredits}</div>
                                <div><strong>Supervisor:</strong> ${selectedStudent.supervisor}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Status Information</h4>
                            <div class="status-info-modal">
                                <div><strong>Status:</strong> 
                                    <span class="status-badge ${getStatusColor(selectedStudent.status)}">
                                        ${selectedStudent.status}
                                    </span>
                                </div>
                                <div><strong>Academic Standing:</strong> 
                                    <span class="status-badge ${getAcademicStandingColor(selectedStudent.academicStanding)}">
                                        ${selectedStudent.academicStanding}
                                    </span>
                                </div>
                                <div><strong>Fees Status:</strong> 
                                    <span class="status-badge ${getFeesStatusColor(selectedStudent.feesStatus)}">
                                        ${selectedStudent.feesStatus}
                                    </span>
                                </div>
                                <div><strong>Registration Status:</strong> ${selectedStudent.registrationStatus}</div>
                                <div><strong>Last Login:</strong> ${selectedStudent.lastLogin}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
        } else if (e.target.id === 'level-filter') {
            selectedLevel = e.target.value;
            applyFilters();
        } else if (e.target.id === 'status-filter') {
            selectedStatus = e.target.value;
            applyFilters();
        }
    });

    // Search event listener
    document.addEventListener('input', function(e) {
        if (e.target.id === 'search-filter') {
            searchTerm = e.target.value;
            applyFilters();
        }
    });

    // Clear filters button
    document.addEventListener('click', function(e) {
        if (e.target.id === 'clear-filters') {
            clearFilters();
        } else if (e.target.classList.contains('view-student-btn')) {
            const studentId = parseInt(e.target.getAttribute('data-student-id'));
            handleViewStudent(studentId);
        }
    });
}

function setupModalEventListeners() {
    if (showStudentModal) {
        const overlay = document.getElementById('student-modal-overlay');
        const closeBtn = document.getElementById('close-student-modal');
        
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeStudentModal();
                }
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeStudentModal);
        }
    }
}

function applyFilters() {
    let filtered = students;

    if (selectedSession) {
        filtered = filtered.filter(student => student.session === selectedSession);
    }
    if (selectedSemester) {
        filtered = filtered.filter(student => student.semester === selectedSemester);
    }
    if (selectedProgramme) {
        filtered = filtered.filter(student => student.programme === selectedProgramme);
    }
    if (selectedLevel) {
        filtered = filtered.filter(student => student.level === selectedLevel);
    }
    if (selectedStatus) {
        filtered = filtered.filter(student => student.status === selectedStatus);
    }
    if (searchTerm) {
        filtered = filtered.filter(student => 
            student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredStudents = filtered;
    renderPage();
}

function clearFilters() {
    selectedSession = '';
    selectedSemester = '';
    selectedProgramme = '';
    selectedLevel = '';
    selectedStatus = '';
    searchTerm = '';
    
    // Reset form values
    const sessionFilter = document.getElementById('session-filter');
    const semesterFilter = document.getElementById('semester-filter');
    const programmeFilter = document.getElementById('programme-filter');
    const levelFilter = document.getElementById('level-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchFilter = document.getElementById('search-filter');
    
    if (sessionFilter) sessionFilter.value = '';
    if (semesterFilter) semesterFilter.value = '';
    if (programmeFilter) programmeFilter.value = '';
    if (levelFilter) levelFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    
    applyFilters();
}

function handleViewStudent(studentId) {
    selectedStudent = students.find(student => student.id === studentId);
    showStudentModal = true;
    renderPage();
}

function closeStudentModal() {
    showStudentModal = false;
    selectedStudent = null;
    renderPage();
}

function getStatusColor(status) {
    switch (status) {
        case 'Active': return 'success';
        case 'Graduated': return 'info';
        case 'Suspended': return 'danger';
        case 'Withdrawn': return 'warning';
        case 'On Leave': return 'secondary';
        case 'Deferred': return 'primary';
        default: return 'primary';
    }
}

function getFeesStatusColor(status) {
    switch (status) {
        case 'Paid': return 'success';
        case 'Cleared': return 'success';
        case 'Outstanding': return 'danger';
        case 'Partial': return 'warning';
        default: return 'secondary';
    }
}

function getAcademicStandingColor(standing) {
    switch (standing) {
        case 'Excellent': return 'success';
        case 'Good Standing': return 'info';
        case 'Academic Probation': return 'warning';
        case 'Academic Suspension': return 'danger';
        default: return 'secondary';
    }
}
